"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Fornecedor } from "@/api/models/produto";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function NovoFornecedor() {

    const { register, handleSubmit } = useForm<Fornecedor>()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Fornecedor> = async (inputs) => {

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/fornecedor",
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
                <form className="max-w-sm p-10 m-auto rounded shadow-xl bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Novo Fornecedor
                    </p>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Nome" name="nome" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="CNPJ" name="cnpj" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Email" name="email" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Telefone" name="telefone" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Cadastrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao cadastrar este Fornecedor!") : <></>}
                {success ? Success("Fornecedor cadastrado!") : <></>}
            </div>
        </>
    )
}