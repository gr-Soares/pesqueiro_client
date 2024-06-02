"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Fornecedor, Marca } from "@/api/models/produto";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function NovaMarca() {

    const { register, handleSubmit } = useForm<Marca>()

    const [forncedores, setFornecedores] = useState<Fornecedor[]>([])

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Marca> = async (inputs) => {

        const dt = inputs
        dt.fornecedor = forncedores.filter((f) => `${f.nome} ${f.cnpj}` == inputs.fornecedor_m)[0]
        dt.fornecedor_m = undefined

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/marca",
                data: dt
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

    const fetchFornecedores = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/fornecedor"
        };

        const data: api_response = await api(req);

        setFornecedores(data.data)
    }

    useEffect(() => {
        fetchFornecedores()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded shadow-xl bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Nova Marca
                    </p>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Nome" name="nome" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={forncedores.map((v) => `${v.nome} ${v.cnpj}`)} name={"fornecedor_m"} title="Fornecedor" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Cadastrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao cadastrar esta Marca!") : <></>}
                {success ? Success("Marca cadastrada!") : <></>}
            </div>
        </>
    )
}