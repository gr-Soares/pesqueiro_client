"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Fornecedor, Marca } from "@/api/models/produto";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function ClienteView() {

    const [data, setData] = useState<Fornecedor[]>([])

    const [marcas, setMarca] = useState<Marca[]>([])

    const fetch = async () => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/fornecedor",
        };

        const data: api_response = await api(req);

        setData(data.data)
    };

    const select = async (fornecedor: Fornecedor) => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: `/fornecedor/marcas/${fornecedor.id}`,
        };

        const data: api_response = await api(req);

        if (data.status == 200) {
            setMarca(data.data)
        }

    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Fornecedores"} data={data} header={["nome", "cnpj", "email", "telefone"]} setData={select} />
            <SimpleTable title={"Marcas"} data={marcas} header={["nome"]} setData={() => { }} />
        </>
    )
}