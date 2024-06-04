"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Funcionario } from "@/api/models/user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User() {

    const [data, setData] = useState<Funcionario>()

    const fetchUser = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            url: "/user/auth",
            token: token ? token : undefined,
        };

        const data: api_response = await api(req);

        setData(data.data)
    }

    useEffect(() => {
        fetchUser()
    })

    return (
        <>
            <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Funcionario
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                        Detalhes e informações sobre o funcionario
                    </p>
                </div>
                {data ? <div className="border-t border-gray-200">
                    <dl>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Nome
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.nome}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Privilegio
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.role}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.email}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Celular
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.celular}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div></div>
                            <Link href={"/"}>
                                <button type="submit" className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold -md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Sair
                                </button>
                            </Link>
                        </div>
                    </dl>
                </div> : <></>}
            </div>
        </>
    )
}