"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Produto } from "@/api/models/produto";
import { CardProtudoInfo } from "@/components/card";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function ProdutoView() {

    const [data, setData] = useState<Produto[]>([])

    const [select, setSelect] = useState<Produto>()

    const fetch = async () => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/produto",
        };

        const data: api_response = await api(req);

        setData(data.data)
    };

    const selectFunc = async (produto: Produto) => {
        setSelect(produto)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Produtos"} data={data} header={["descricao", "valor_f", "qtde"]} setData={selectFunc} />
            {select ? <CardProtudoInfo produto={select} /> : <></>}
        </>
    )
}