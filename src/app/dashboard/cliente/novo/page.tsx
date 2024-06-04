"use client"

import { retrieveToken } from "@/api/auth"
import { api, api_request, api_response } from "@/api/conn"
import { Cliente } from "@/api/models/cliente"
import { Error, Success, Warning } from "@/components/alerts"
import { InputText } from "@/components/form/input"
import Link from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"


export default function NovoCliente() {

    const { register, handleSubmit } = useForm<Cliente>()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Cliente> = async (inputs) => {

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/cliente",
                data: inputs
            };

            const data: api_response = await api(req);

            return data
        };


        const response = await fetch()

        if (response.status == 200) {
            setSuccess(true)
            setError(false)
        } else {
            setSuccess(false)
            setError(true)
        }
    }

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded  bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Novo Cliente
                    </p>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Nome" name="nome" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="CPF" name="cpf" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Celular" name="celular" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold -md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Cadastrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao cadastrar este Cliente!") : <></>}
                {success ? Success("Cliente cadastrado!") : <></>}
            </div>
        </>
    )
}