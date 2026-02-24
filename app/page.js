import Image from "next/image";
import Hero from "@/compoonts/Hero";
import Doctors from "@/compoonts/Doctors";
import Imgs from "@/compoonts/Imgs";
import Services from "@/compoonts/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Imgs />
      <Doctors />
    </>
  );
}
