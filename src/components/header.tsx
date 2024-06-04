"use client"

import Image from "next/image"
import Link from "next/link"

export const Header = () => {

    const data = localStorage.getItem("user")
    const user = JSON.parse(data ? data : "{}")[0]

    return (
        <header className="z-40 flex items-center justify-end pr-10 w-full h-12 bg-blue-500">
            <span className="flex items-center p-2 pl-6 my-2 transition-colors duration-200 text-white">
                <span className="mx-2 text-sm font-normal">
                    {user.nome}
                </span>
                <Link href="/dashboard/user">
                    <span className="text-left">
                        <Image src={"/icons/icons8-func-48.png"} alt={""} width="36" height="36" />
                    </span>
                </Link>
            </span>
        </header>
    )
}