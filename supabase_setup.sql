-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Services Table
CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create Doctors Table
CREATE TABLE public.doctors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    experience TEXT,
    whatsapp TEXT,
    description1 TEXT NOT NULL,
    description2 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create Gallery Images Table
CREATE TABLE public.gallery_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies for Public Read Access
CREATE POLICY "Allow public read access on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_images" ON public.gallery_images FOR SELECT USING (true);

-- 6. Create Policies for Public Create/Update/Delete (Since custom auth is used)
CREATE POLICY "Allow public insert on services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on services" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on services" ON public.services FOR DELETE USING (true);

CREATE POLICY "Allow public insert on doctors" ON public.doctors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on doctors" ON public.doctors FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on doctors" ON public.doctors FOR DELETE USING (true);

CREATE POLICY "Allow public insert on gallery_images" ON public.gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on gallery_images" ON public.gallery_images FOR DELETE USING (true);

-- Note: The policies are now public to match the local custom admin login mechanism.
