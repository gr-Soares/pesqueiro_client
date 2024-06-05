"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Peixe } from "@/api/models/peixe";
import { Produto } from "@/api/models/produto";
import { CardPeixeInfo, CardProtudoInfo } from "@/components/card";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function PeixeView() {

    const [data, setData] = useState<Peixe[]>([])

    const [select, setSelect] = useState<Peixe>()

    const fetch = async () => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/peixe",
        };

        const data: api_response = await api(req);

        setData(data.data)
    };

    const selectFunc = async (peixe: Peixe) => {
        setSelect(peixe)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Peixes"} data={data} header={["especie", "valor"]} setData={selectFunc} />
            {select ? <CardPeixeInfo peixe={select} /> : <></>}
        </>
    )
}