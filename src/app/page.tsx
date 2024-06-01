import Image from "next/image"
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (

    <main className="relative h-screen overflow-hidden bg-gray-200">
      <div className="flex items-start justify-between">
        <div className="relative hidden h-screen shadow-lg lg:block w-60">
          <div className="h-full bg-blue-500">
            <div className="flex justify-center items-center align-middle pt-6">
              <Image src={"/icons/icons8-fish-48.png"} alt={""} width="42" height="642" />
            </div>
            <div className="flex items-center pt-6 ml-6">
              <p className="text-xl font-bold text-center text-white">
                SEU FERNANDO <br /> FISH
              </p>
            </div>
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-col w-full md:space-y-4">
          <Header />
          <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
            
          </div>
        </div>
      </div>
    </main>

  );
}
