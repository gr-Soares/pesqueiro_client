"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Cliente } from "@/api/models/cliente"
import { CardDashInfo } from "@/components/card";
import { useEffect, useState } from "react";


export default function Dashboard() {

  const fetch = async () => {
    const token = retrieveToken()

    const req: api_request = {
      method: "GET",
      token: token ? token : undefined,
      url: "/cliente",
    };

    const data: api_response = await api(req);

    const d = data.data

    var cm = 0
    var u = 0

    d.map((i: Cliente) => {
      if (i.clienteComanda != null) {
        cm += 1
      }
      u += 1
    })

    setComandas(cm)
    setclientes(u)
  };


  const [comandas, setComandas] = useState(0)
  const [clientes, setclientes] = useState(0)

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <CardDashInfo titulo="Clientes" valor={`${clientes}`} image="/icons/icons8-tag-48.png" />
      <CardDashInfo titulo="Clientes com comanda" valor={`${comandas}`} image="/icons/icons8-tag-48.png" />
    </>
  );
}
