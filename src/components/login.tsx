"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { InputSelect, InputText } from "./form/input"
import { Login, Register } from "@/api/models/user"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login, retrieveToken } from "@/api/auth"
import { api, api_request, api_response } from "@/api/conn"
import { useState } from "react"
import { Success, Warning } from "./alerts"

const LoginForm = () => {

    const { register, handleSubmit } = useForm<Login>()

    const router = useRouter();

    const submit: SubmitHandler<Login> = async (inputs) => {
        const req = await login(inputs)

        const fetchUser = async () => {
            const token = retrieveToken()
            const req: api_request = {
                method: "GET",
                token: token ? token : undefined,
                url: "/user"
            };

            const data: api_response = await api(req);
            localStorage.setItem("user", JSON.stringify(data.data))
        };


        if (req) {
            await fetchUser()
            router.push("/dashboard")
        }
    }

    return (

        <div className="w-full h-screen font-sans bg-cover bg-landscape bg-blue-600">
            <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                        <form className="max-w-sm p-10 m-auto rounded shadow-xl bg-white" onSubmit={handleSubmit(submit)}>
                            <p className="mb-8 text-2xl font-light text-center text-gray-600">
                                Sistema Pesqueiro
                            </p>
                            <div className="mb-2">
                                <InputText register={register} inputType="text" title="" placeholder="Usuario" name="username" />
                            </div>
                            <div className="mb-2">
                                <InputText register={register} inputType="password" title="" placeholder="Senha" name="password" />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Entrar
                                </button>
                            </div>
                            <div className="text-center">
                                <Link href="/register">
                                    <span className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800">
                                        Registrar funcionario
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default LoginForm

export const RegisterForm = () => {

    const { register, handleSubmit } = useForm<Register>()

    const router = useRouter();

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const submit: SubmitHandler<Register> = async (inputs) => {


        const fetchUser = async () => {

            const req: api_request = {
                method: "POST",
                url: "/user",
                data: inputs
            };

            const data: api_response = await api(req);

            if (data.status == 200) {
                setSuccess(true)
                setError(false)
                router.push("/")
            } else {
                setError(true)
                setSuccess(false)
            }
        };


        await fetchUser()
    }

    return (
        <>
            <div className="w-full h-screen font-sans bg-cover bg-landscape bg-blue-600">
                <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm p-10 m-auto rounded shadow-xl bg-white" onSubmit={handleSubmit(submit)}>
                                <p className="mb-8 text-2xl font-light text-center text-gray-600">
                                    Sistema Pesqueiro
                                </p>
                                <div className="mb-2">
                                    <InputText register={register} inputType="text" title="" placeholder="Usuario" name="username" />
                                </div>
                                <div className="mb-2">
                                    <InputText register={register} inputType="text" title="" placeholder="Nome" name="nome" />
                                </div>
                                <div className="mb-2">
                                    <InputText register={register} inputType="text" title="" placeholder="CPF" name="cpf" />
                                </div>
                                <div className="mb-2">
                                    <InputText register={register} inputType="text" title="" placeholder="Email" name="email" />
                                </div>
                                <div className="mb-2">
                                    <InputText register={register} inputType="text" title="" placeholder="Salario" name="salario" />
                                </div>
                                <div className="mb-2">
                                    <InputText register={register} inputType="password" title="" placeholder="Senha" name="password" />
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Registrar
                                    </button>
                                </div>
                            </form>
                            {error ? Warning("Problemas ao cadastrar este Funcionario!") : <></>}
                            {success ? Success("Funcionario cadastrado!") : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}