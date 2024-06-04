"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Peixe } from "@/api/models/peixe";
import { Fornecedor } from "@/api/models/produto";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function PeixeCadastro() {

    const { register, handleSubmit } = useForm<Peixe>()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])

    const submit: SubmitHandler<Peixe> = async (inputs) => {

        const fornecedor = fornecedores.filter((f) => f.nome == inputs.fornecedor_m)[0]

        inputs.fornecedor = fornecedor
        inputs.fornecedor_m = undefined

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/peixe",
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
                        Novo Peixe
                    </p>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Especie" name="especie" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="number" title="" placeholder="Reproducao" name="reproducao" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Valor" name="valor" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={fornecedores.map((v) => `${v.nome}`)} name={"fornecedor_m"} title="Forncedor" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Cadastrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao cadastrar este Peixe!") : <></>}
                {success ? Success("Peixe cadastrado!") : <></>}
            </div>
        </>
    )
}