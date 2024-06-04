"use client"
import { retrieveToken } from "@/api/auth";
import { api, api_request, api_response } from "@/api/conn";
import { Peixe, PeixeTanque, Tanque } from "@/api/models/peixe";
import { Success, Warning } from "@/components/alerts";
import { InputSelect, InputText } from "@/components/form/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function EntradaPeixe() {

    const { register, handleSubmit } = useForm<PeixeTanque>()

    const [tanques, setTanques] = useState<Tanque[]>([])
    const [peixes, setPeixes] = useState<Peixe[]>([])

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<PeixeTanque> = async (inputs) => {

        const tanque = tanques.filter((f) => f.descricao == inputs.tanque_m)[0]
        const peixe = peixes.filter((f) => f.especie == inputs.peixe_m)[0]

        inputs.peixe = peixe
        inputs.tanque = tanque

        const fetch = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "POST",
                token: token ? token : undefined,
                url: "/controle_peixe",
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
        fetchPeixes()
        fetchTanques()
    }, [])

    return (
        <>
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto rounded  bg-white" onSubmit={handleSubmit(submit)}>
                    <p className="mb-8 text-2xl font-light text-center text-gray-600">
                        Vincular Peixe Tanque
                    </p>
                    <div className="mb-2">
                        <InputSelect register={register} options={tanques.map((f) => f.descricao)} name="tanque_m" title="Tanque" />
                    </div>
                    <div className="mb-2">
                        <InputSelect register={register} options={peixes.map((f) => f.especie)} name="peixe_m" title="Peixe" />
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