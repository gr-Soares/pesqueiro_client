"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Cliente } from "@/api/models/cliente";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function ClienteView() {

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

    const [data, setData] = useState<Cliente[]>([])

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Clientes"} data={data} header={["nome", "cpf", "email", "celular"]} />
        </>
    )
}