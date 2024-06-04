"use client"

import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Peixe, PeixeTanque, Tanque } from "@/api/models/peixe";
import { CardPeixeInfo, CardTanqueInfo } from "@/components/card";
import { SimpleTable } from "@/components/table";
import { useEffect, useState } from "react";

export default function TanqueView() {

    const [data, setData] = useState<Tanque[]>([])

    const [select, setSelect] = useState<PeixeTanque[]>([])

    const fetch = async () => {
        const token = retrieveToken()

        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/tanque",
        };

        const data: api_response = await api(req);

        setData(data.data)
    };

    const fetchPeixesTanque = async (value: string) => {

        const tanque = data.filter((f) => f.descricao == value)[0].id
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: `/controle_peixe/tanque/${tanque}`
        };

        const dt: api_response = await api(req);

        const peixeTanqueR = dt.data

        setSelect(peixeTanqueR)
    }

    const selectFunc = async (tanque: Tanque) => {
        fetchPeixesTanque(tanque.descricao)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <SimpleTable title={"Tanques"} data={data} header={["descricao","capacidade","status"]} setData={selectFunc} />
            {select ? <CardTanqueInfo data={select} /> : <></>}
        </>
    )
}