"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Peixe, PeixeTanque, Tanque } from "@/api/models/peixe";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function SaidaPeixe() {

    const { register, handleSubmit } = useForm<PeixeTanque>()

    const [tanques, setTanques] = useState<Tanque[]>([])
    const [peixes, setPeixes] = useState<Peixe[]>([])

    const [peixesOp, setPeixesOp] = useState<Peixe[]>([])

    const [peixeTanque, setPeixeTanque] = useState<PeixeTanque[]>([]);

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<PeixeTanque> = async (inputs) => {

        const tanque = tanques.filter((f) => f.descricao == inputs.tanque_m)[0]
        const peixe = peixes.filter((f) => f.especie == inputs.peixe_m)[0]

        inputs.peixe = peixe
        inputs.tanque = tanque

        const dt = peixeTanque.filter((f) => f.peixe.id == peixe.id && f.tanque.id == tanque.id)[0]

        dt.qtde = dt.qtde - Number(inputs.qtde)

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "PUT",
                token: token ? token : undefined,
                url: "/controle_peixe",
                data: dt
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

    const fetchTanques = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/tanque"
        };

        const data: api_response = await api(req);

        setTanques(data.data)
    }

    const fetchPeixesTanque = async (value: string) => {

        const tanque = tanques.filter((f) => f.descricao == value)[0].id
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: `/controle_peixe/tanque/${tanque}`
        };

        const data: api_response = await api(req);

        const peixeTanqueR = data.data

        setPeixeTanque(peixeTanqueR)

        const result: Peixe[] = []

        peixeTanqueR.forEach((data: PeixeTanque) => {
            const dt = peixes.filter((f) => f.id == data.peixe.id)[0]
            result.push(dt)
        });

        setPeixesOp(result)
    }

    const fetchPeixes = async () => {
        const token = retrieveToken()
        const req: api_request = {
            method: "GET",
            token: token ? token : undefined,
            url: "/peixe"
        };

        const data: api_response = await api(req);

        setPeixes(data.data)
    }

    useEffect(() => {
        fetchTanques()
        fetchPeixes()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded  bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Saida Peixes
                    </p>
                    <div className="mb-2">
                        <InputSelect register={register} options={tanques.map((f) => f.descricao)} onSelect={fetchPeixesTanque} name="tanque_m" title="Tanque" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={peixesOp.map((f) => f.especie)} name="peixe_m" title="Peixe" />
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
                {error ? Warning("Problemas ao cadastrar este Controle!") : <></>}
                {success ? Success("Controle cadastrado!") : <></>}
            </div>
        </>
    )
}