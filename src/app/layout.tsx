import type { Metadata } from "next";
import Image from "next/image"
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pesqueiro",
  description: "Trabalho Eng. Software S1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
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
              <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row pl-4">
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
