"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("services");

  // Data states
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [images, setImages] = useState([]);

  // Form states - Adding 'isEditing' and 'editId'
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
    isEditing: false,
    editId: null,
  });
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    title: "",
    image: "",
    experience: "",
    whatsapp: "",
    description1: "",
    description2: "",
    facebook: "",
    instagram: "",
    isEditing: false,
    editId: null,
  });
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState({
    services: false,
    doctors: false,
    images: false,
  });

  useEffect(() => {
    // Load initial data from Supabase
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setServices(data);
    };

    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setDoctors(data);
    };

    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setImages(data.map((img) => img.image_url)); // Assuming we just want URLs for compatibility
    };

    fetchServices();
    fetchDoctors();
    fetchImages();
  }, []);

  // --- Utility: Convert File to Base64 ---
  const handleFileUpload = (file, callback) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("الرجاء رفع ملف صورة صالح");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result); // This is the Base64 string
    };
    reader.readAsDataURL(file);
  };

  // --- Services handlers ---
  const handleAddOrUpdateService = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, services: true }));
    try {
      if (newService.isEditing) {
        // Update existing
        const { error } = await supabase
          .from("services")
          .update({
            title: newService.title,
            description: newService.description,
            icon: newService.icon,
          })
          .eq("id", newService.editId);

        if (!error) {
          setServices(
            services.map((s) =>
              s.id === newService.editId
                ? {
                    ...s,
                    title: newService.title,
                    description: newService.description,
                    icon: newService.icon,
                  }
                : s,
            ),
          );
          alert("تم تحديث الخدمة بنجاح");
          setNewService({
            title: "",
            description: "",
            icon: "",
            isEditing: false,
            editId: null,
          });
        } else {
          console.error("Error updating service:", error);
          alert("حدث خطأ أثناء تحديث الخدمة: " + error.message);
        }
      } else {
        // Add new
        const { data, error } = await supabase
          .from("services")
          .insert([
            {
              title: newService.title,
              description: newService.description,
              icon: newService.icon,
            },
          ])
          .select();

        if (!error && data) {
          setServices([...data, ...services]);
          alert("تم إضافة الخدمة بنجاح");
          setNewService({
            title: "",
            description: "",
            icon: "",
            isEditing: false,
            editId: null,
          });
        } else {
          console.error("Error adding service:", error);
          alert("حدث خطأ أثناء الإضافة: " + (error?.message || "فشل الاتصال"));
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("حدث خطأ غير متوقع");
    } finally {
      setLoading((prev) => ({ ...prev, services: false }));
    }
  };

  const handleEditService = (service) => {
    setNewService({
      title: service.title || "",
      description: service.description || "",
      icon: service.icon || "",
      isEditing: true,
      editId: service.id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top where form is
  };

  const handleDeleteService = async (id) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) {
        setServices(services.filter((s) => s.id !== id));
      } else {
        alert("حدث خطأ أثناء الحذف");
      }
    }
  };

  const handleCancelServiceEdit = () => {
    setNewService({
      title: "",
      description: "",
      icon: "",
      isEditing: false,
      editId: null,
    });
  };

  // --- Doctors handlers ---
  const handleAddOrUpdateDoctor = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, doctors: true }));
    try {
      if (newDoctor.isEditing) {
        const { error } = await supabase
          .from("doctors")
          .update({
            name: newDoctor.name,
            title: newDoctor.title,
            image: newDoctor.image,
            experience: newDoctor.experience,
            whatsapp: newDoctor.whatsapp,
            description1: newDoctor.description1,
            description2: newDoctor.description2,
            facebook: newDoctor.facebook,
            instagram: newDoctor.instagram,
          })
          .eq("id", newDoctor.editId);

        if (!error) {
          setDoctors(
            doctors.map((d) =>
              d.id === newDoctor.editId
                ? {
                    ...newDoctor,
                    id: d.id,
                    isEditing: undefined,
                    editId: undefined,
                  }
                : d,
            ),
          );
          alert("تم تحديث الطبيب بنجاح");
          setNewDoctor({
            name: "",
            title: "",
            image: "",
            experience: "",
            whatsapp: "",
            description1: "",
            description2: "",
            facebook: "",
            instagram: "",
            isEditing: false,
            editId: null,
          });
        } else {
          console.error("Error updating doctor:", error);
          alert("حدث خطأ أثناء التحديث: " + error.message);
        }
      } else {
        const { data, error } = await supabase
          .from("doctors")
          .insert([
            {
              name: newDoctor.name,
              title: newDoctor.title,
              image: newDoctor.image,
              experience: newDoctor.experience,
              whatsapp: newDoctor.whatsapp,
              description1: newDoctor.description1,
              description2: newDoctor.description2,
              facebook: newDoctor.facebook,
              instagram: newDoctor.instagram,
            },
          ])
          .select();

        if (!error && data) {
          setDoctors([...data, ...doctors]);
          alert("تم إضافة الطبيب بنجاح");
          setNewDoctor({
            name: "",
            title: "",
            image: "",
            experience: "",
            whatsapp: "",
            description1: "",
            description2: "",
            facebook: "",
            instagram: "",
            isEditing: false,
            editId: null,
          });
        } else {
          console.error("Error adding doctor:", error);
          alert("حدث خطأ أثناء الإضافة: " + (error?.message || "فشل الاتصال"));
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("حدث خطأ غير متوقع");
    } finally {
      setLoading((prev) => ({ ...prev, doctors: false }));
    }
  };

  const handleEditDoctor = (doctor) => {
    setNewDoctor({
      ...doctor,
      whatsapp: doctor.whatsapp || "",
      description2: doctor.description2 || "",
      facebook: doctor.facebook || "",
      instagram: doctor.instagram || "",
      isEditing: true,
      editId: doctor.id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteDoctor = async (id) => {
    if (confirm("هل أنت متأكد من حذف هذا الطبيب؟")) {
      const { error } = await supabase.from("doctors").delete().eq("id", id);
      if (!error) {
        setDoctors(doctors.filter((d) => d.id !== id));
      } else {
        alert("حدث خطأ أثناء الحذف");
      }
    }
  };

  const handleCancelDoctorEdit = () => {
    setNewDoctor({
      name: "",
      title: "",
      image: "",
      experience: "",
      whatsapp: "",
      description1: "",
      description2: "",
      facebook: "",
      instagram: "",
      isEditing: false,
      editId: null,
    });
  };

  // --- Images handlers ---
  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage) return;

    setLoading((prev) => ({ ...prev, images: true }));
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .insert([{ image_url: newImage }])
        .select();

      if (!error && data) {
        // Re-fetch images or append the new url to state to maintain compatibility with existing mapping structure
        setImages([data[0].image_url, ...images]);
        setNewImage("");
        alert("تم إضافة الصورة بنجاح");
      } else {
        console.error("Error adding image:", error);
        alert("حدث خطأ أثناء الإضافة: " + (error?.message || "فشل الاتصال"));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("حدث خطأ غير متوقع");
    } finally {
      setLoading((prev) => ({ ...prev, images: false }));
    }
  };

  const handleDeleteImage = async (indexToRemove) => {
    if (confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
      // Find the specific image url to delete
      const imageUrlToDelete = images[indexToRemove];
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("image_url", imageUrlToDelete);

      if (!error) {
        setImages(images.filter((_, i) => i !== indexToRemove));
      } else {
        alert("حدث خطأ أثناء الحذف");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          مرحباً بك في لوحة التحكم
        </h1>
        <p className="mt-2 text-gray-600">
          يمكنك هنا إدارة محتوى موقع EVIDENCE بسهولة.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 space-x-reverse bg-white p-2 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <button
          onClick={() => setActiveTab("services")}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "services"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          الخدمات
        </button>
        <button
          onClick={() => setActiveTab("doctors")}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "doctors"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          الأطباء
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "images"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          معرض النتائج
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">إدارة الخدمات</h2>
            </div>

            <form
              onSubmit={handleAddOrUpdateService}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border transition-colors ${newService.isEditing ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="md:col-span-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {newService.isEditing ? "تعديل خدمة" : "إضافة خدمة جديدة"}
                </h3>
                {newService.isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelServiceEdit}
                    className="text-sm text-red-600 hover:underline"
                  >
                    إلغاء التعديل
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم الخدمة
                </label>
                <input
                  required
                  type="text"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: زراعة الأسنان"
                />
              </div>
              <div>
                
                
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف
                </label>
                <textarea
                  required
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                  placeholder="وصف الخدمة..."
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                {newService.isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelServiceEdit}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    إلغاء
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading.services}
                  className={`${newService.isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"} text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                >
                  {loading.services ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري الحفظ...
                    </>
                  ) : newService.isEditing ? (
                    "حفظ التعديلات"
                  ) : (
                    "إضافة خدمة"
                  )}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-xl p-6 relative group transition-colors ${newService.isEditing && newService.editId === service.id ? "border-yellow-400 bg-yellow-50/30 shadow-md" : "border-gray-200"}`}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {service.description}
                  </p>

                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditService(service)}
                      className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && (
                <p className="text-gray-500 py-4 col-span-full text-center">
                  لا توجد خدمات مضافة حتى الآن
                </p>
              )}
            </div>
          </div>
        )}

        {/* DOCTORS TAB */}
        {activeTab === "doctors" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">إدارة الأطباء</h2>
            </div>

            <form
              onSubmit={handleAddOrUpdateDoctor}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border transition-colors ${newDoctor.isEditing ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="md:col-span-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {newDoctor.isEditing ? "تعديل طبيب" : "إضافة طبيب جديد"}
                </h3>
                {newDoctor.isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelDoctorEdit}
                    className="text-sm text-red-600 hover:underline"
                  >
                    إلغاء التعديل
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم الطبيب
                </label>
                <input
                  required
                  type="text"
                  value={newDoctor.name}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="د. محمد..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المسمى الوظيفي
                </label>
                <input
                  required
                  type="text"
                  value={newDoctor.title}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="استشاري..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سنوات الخبرة
                </label>
                <input
                  required
                  type="number"
                  value={newDoctor.experience}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, experience: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الواتساب (اختياري)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={newDoctor.whatsapp}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, whatsapp: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="201000000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رابط فيسبوك
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={newDoctor.facebook}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, facebook: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رابط انستجرام
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={newDoctor.instagram}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, instagram: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://instagram.com/..."
                />
              </div>

              {/* Image Drag and Drop Area for Doctor */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة الطبيب (رفع صورة أو رابط)
                </label>
                <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:bg-gray-50 transition-colors"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    handleFileUpload(file, (base64String) => {
                      setNewDoctor({ ...newDoctor, image: base64String });
                    });
                  }}
                >
                  <div className="space-y-1 text-center">
                    {newDoctor.image &&
                    newDoctor.image.startsWith("data:image") ? (
                      <div className="mx-auto w-24 h-24 mb-4 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={newDoctor.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="doctor-file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>اختر صورة</span>
                        <input
                          id="doctor-file-upload"
                          name="doctor-file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            handleFileUpload(e.target.files?.[0], (base64) =>
                              setNewDoctor({ ...newDoctor, image: base64 }),
                            );
                          }}
                        />
                      </label>
                      <p className="pr-1">أو اسحب الصورة وأفلتها هنا</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 5MB
                    </p>
                  </div>
                </div>

                <div className="relative mt-4 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
                    أو ضع رابط للصورة
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <input
                  type="url"
                  dir="ltr"
                  value={
                    newDoctor.image && !newDoctor.image.startsWith("data:image")
                      ? newDoctor.image
                      : ""
                  }
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, image: e.target.value })
                  }
                  className="w-full mt-4 px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نبذة 1
                </label>
                <textarea
                  required
                  value={newDoctor.description1}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, description1: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                  placeholder="الفقرة الأولى من السيرة..."
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نبذة 2 (اختياري)
                </label>
                <textarea
                  value={newDoctor.description2}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, description2: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                  placeholder="الفقرة الثانية..."
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                {newDoctor.isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelDoctorEdit}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    إلغاء
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading.doctors}
                  className={`${newDoctor.isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"} text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                >
                  {loading.doctors ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري الحفظ...
                    </>
                  ) : newDoctor.isEditing ? (
                    "حفظ التعديلات"
                  ) : (
                    "إضافة طبيب"
                  )}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`border rounded-xl p-4 flex gap-4 relative group items-center transition-colors ${newDoctor.isEditing && newDoctor.editId === doctor.id ? "border-yellow-400 bg-yellow-50/30 shadow-md" : "border-gray-200"}`}
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={
                        doctor.image ||
                        "https://placehold.co/150x150/e2e8f0/1e293b?text=Image"
                      }
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{doctor.name}</h4>
                    <p className="text-gray-500 text-sm mb-1">{doctor.title}</p>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-bold">
                      +{doctor.experience} سنوات
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {doctors.length === 0 && (
                <p className="text-gray-500 py-4 col-span-full text-center">
                  لا يوجد أطباء مضافين حتى الآن
                </p>
              )}
            </div>
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === "images" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">
                إدارة الصور والنتائج
              </h2>
            </div>

            <form
              onSubmit={handleAddImage}
              className="flex flex-col gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200"
            >
              {/* Image Drag and Drop Area for Slider */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة النتيجة (رفع صورة أو إضافة رابط)
                </label>
                <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    handleFileUpload(file, (base64) => setNewImage(base64));
                  }}
                  onClick={() =>
                    document.getElementById("slider-file-upload").click()
                  }
                >
                  <div className="space-y-1 text-center">
                    {newImage && newImage.startsWith("data:image") ? (
                      <div className="mx-auto w-48 h-32 mb-4 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={newImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="slider-file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>اختر صورة</span>
                        <input
                          id="slider-file-upload"
                          name="slider-file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            handleFileUpload(e.target.files?.[0], (base64) =>
                              setNewImage(base64),
                            );
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </label>
                      <p className="pr-1">أو اسحب الصورة وأفلتها هنا</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 5MB
                    </p>
                  </div>
                </div>

                <div className="relative mt-4 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
                    أو ضع رابط للصورة
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4 items-end">
                  <div className="flex-1 w-full">
                    <input
                      type="url"
                      dir="ltr"
                      value={
                        newImage && !newImage.startsWith("data:image")
                          ? newImage
                          : ""
                      }
                      onChange={(e) => setNewImage(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading.images}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading.images ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري الإضافة...
                      </>
                    ) : (
                      "إضافة صورة"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden group shadow-sm border border-gray-200"
                >
                  <img
                    src={
                      img ||
                      "https://placehold.co/150x150/e2e8f0/1e293b?text=Image"
                    }
                    alt={`نتيجة ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="bg-red-500 text-white p-2 text-sm rounded-lg hover:bg-red-600 transition shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <p className="text-gray-500 py-4 col-span-full text-center">
                  لا توجد صور مضافة حتى الآن
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
