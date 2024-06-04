"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Comanda } from "@/api/models/cliente";
import { Consumo, Produto } from "@/api/models/produto";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function PedidoCompra() {

    const { register, handleSubmit } = useForm<Consumo>()

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [comandas, setComandas] = useState<Comanda[]>([])

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Consumo> = async (inputs) => {

        const comanda = comandas.filter((f) => f.id == inputs.comanda_m)[0]
        const produto = produtos.filter((f) => f.descricao == inputs.produto_m)[0]

        inputs.comanda = comanda
        inputs.produto = produto
        
        const valor = produto.valor_f * inputs.qtde

        inputs.valor = valor

        console.log(inputs)

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/consumo",
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

    const fetchComanda = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/comanda/status/ABERTA"
        };

        const data: api_response = await api(req);

        setComandas(data.data)
    }

    useEffect(() => {
        fetchProduto()
        fetchComanda()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded  bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Novo Pedido
                    </p>
                    <div className="mb-2">
                        <InputSelect register={register} options={produtos.map((v) => `${v.descricao}`)} name={"produto_m"} title="Produto" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={comandas.map((v) => `${v.id}`)} name={"comanda_m"} title="Comanda" />
                    </div>
                    <div className="mb-2">
                        <InputText register={register} inputType="number" title="" placeholder="Quantidade" name="qtde" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold -md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Registrar
                        </button>
                    </div>
                </form>
                {error ? Warning("Problemas ao registar este consumo!") : <></>}
                {success ? Success("Consumo registrado!") : <></>}
            </div>
        </>
    )
}
