"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Marca, Produto } from "@/api/models/produto";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function ReabastecerProduto() {

    const { register, handleSubmit } = useForm<Produto>()

    const [produtos, setProdutos] = useState<Produto[]>([])

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Produto> = async (inputs) => {

        const produto = produtos.filter((f) => f.descricao == inputs.produto_m)[0]

        produto.qtde += Number(inputs.qtde)

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "PUT",
                token: token ? token : undefined,
                url: "/produto",
                data: produto
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

    const fetchProduto = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/produto/tipo/COMPRA"
        };

        const data: api_response = await api(req);

        setProdutos(data.data)
    }

    useEffect(() => {
        fetchProduto()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded  bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Reabastecimento Produto
                    </p>
                    <div className="mb-2">
                        <InputSelect register={register} options={produtos.map((v) => `${v.descricao}`)} name={"produto_m"} title="Produto" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="text" title="" placeholder="Quantidade" name="qtde" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold -md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Registrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao registrar este Reabastecimento!") : <></>}
                {success ? Success("Reabastecimento registrado!") : <></>}
            </div>
        </>
    )
}

function fetchMarcas() {
    throw new Error("Function not implemented.");
}
