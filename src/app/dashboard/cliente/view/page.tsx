"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Cliente, ClienteComanda } from "@/api/models/cliente";
import { CardClienteInfo } from "@/components/card";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function ClienteView() {

    const [data, setData] = useState<Cliente[]>([])

    const [select, setSelect] = useState<Cliente>()
    const [comanda, setComanda] = useState<ClienteComanda>()

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

    const fetchComanda = async(id:string) => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: `/cliente/comanda/${id}`
        };

        const data: api_response = await api(req);

        return data.data
    }

    const selectCliente = async(cliente: Cliente) => {
        setSelect(cliente)

        const comanda = await fetchComanda(cliente.id)
        setComanda(comanda)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Clientes"} data={data} header={["nome", "cpf"]} setData={selectCliente} />
            {select ? <CardClienteInfo cliente={select} comanda={comanda}/> : <></>}
        </>
    )
}