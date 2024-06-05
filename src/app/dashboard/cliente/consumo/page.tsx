"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Cliente, ClienteComanda } from "@/api/models/cliente";
import { Consumo } from "@/api/models/produto";
import { CardClienteInfo, CardConsumo } from "@/components/card";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function ClienteConsumo() {

    const [data, setData] = useState<Cliente[]>([])

    const [consumo, setConsumo] = useState<Consumo[]>([])

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

    const selectCliente = async (cliente: Cliente) => {
        const token = retrieveToken()

        if (cliente.clienteComanda == null) {
            setConsumo([])
            return
        }

        const id = cliente.clienteComanda.comanda.id

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: `/consumo/comanda/${id}`
        };

        const data: api_response = await api(req);

        setConsumo(data.data)

    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Clientes"} data={data} header={["nome", "cpf"]} setData={selectCliente} />
            {consumo ? <CardConsumo data={consumo} /> : <></>}
        </>
    )
}