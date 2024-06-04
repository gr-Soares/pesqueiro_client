"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Cliente } from "@/api/models/cliente";
import { Success, Warning } from "@/components/alerts";
import { InputSelect } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function EntradaCliente() {

    const [data, setData] = useState<Cliente[]>([])

    const fetch = async () => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/cliente",
        };

        const data: api_response = await api(req);

        setData(data.data)
    };

    const { register, handleSubmit } = useForm<Cliente>()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Cliente> = async (inputs) => {

        const id = data.filter((f) => f.nome == inputs.nome)[0].id

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: `/comanda/open/${id}`
            };

            const data: api_response = await api(req);

            return data
        };


        const response = await fetch()

        console.log(response)

        if (response.status == 200) {
            setSuccess(true)
            setError(false)
        } else {
            setSuccess(false)
            setError(true)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <div className="relative w-full rounded px-4 py-6 bg-white -l">
                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max">
                        Registrar entrada cliente
                    </p>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex items-center justify-center my-6 space-x-2">
                            <InputSelect register={register} options={data.map((v) => v.nome)} name="nome" title="Selecionar Cliente" />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button type="submit" className="text-sm py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center font-semibold -md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {error ? Warning("Cliente ja consta com comanda!") : <></>}
            {success ? Success("Entrada registrada!") : <></>}
        </>
    )
}