"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Marca, Produto } from "@/api/models/produto";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function NovoProduto() {

    const { register, handleSubmit } = useForm<Produto>()

    const [marcas, setMarcas] = useState<Marca[]>([])

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Produto> = async (inputs) => {

        const dt = inputs
        dt.marca = marcas.filter((f) => f.nome == inputs.marca_m)[0]
        dt.marca_m = undefined

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/produto",
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

    const fetchMarcas = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/marca"
        };

        const data: api_response = await api(req);

        setMarcas(data.data)
    }

    useEffect(() => {
        fetchMarcas()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded  bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Novo Produto
                    </p>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Descrição" name="descricao" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Valor Compra" name="valor_c" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Valor Final" name="valor_f" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Quantidade" name="qtde" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={["COMPRA", "ALUGUEL"]} name="tipo" title="Tipo Produto" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={marcas.map((v) =>  `${v.nome}`)} name={"marca_m"} title="Marca" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold -md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Cadastrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao cadastrar este Produto!") : <></>}
                {success ? Success("Produto cadastrado!") : <></>}
            </div>
        </>
    )
}

function fetchMarcas() {
    throw new Error("Function not implemented.");
}
