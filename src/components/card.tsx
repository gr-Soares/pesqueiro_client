import { Cliente, ClienteComanda } from "@/api/models/cliente"
import { Peixe, PeixeTanque, Tanque } from "@/api/models/peixe"
import { Consumo, Produto } from "@/api/models/produto"
import Image from "next/image"
import Link from "next/link"


export type CardLinkProps = {
    title: string
    href: string
    image?: string
}

export const CardLink = (props: CardLinkProps) => {

    return (
        <Link href={props.href}>
            <div className="w-40">
                <div className="relative w-full rounded px-4 py-6 bg-white -l">
                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max">
                        {props.title}
                    </p>
                    <div className="flex items-center justify-center my-6 space-x-2">
                        <span>
                            {props.image ? <Image src={props.image} alt={""} width="48" height="48" /> : <></>}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const CardClienteInfo = (props: { cliente: Cliente, comanda?: ClienteComanda }) => {

    return (
        <div className="">
            <div className="relative w-full rounded px-4 py-6 bg-white -l">
                <p className="border-b font-semibold text-gray-700 border-gray-200 w-max">
                    Informações Cliente
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Nome: {props.cliente.nome}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Email: {props.cliente.email}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    CPF: {props.cliente.cpf}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Celular: {props.cliente.celular}
                </p>
                {props.comanda ? <>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Gasto: {props.comanda.gasto}
                    </p>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Status: {props.comanda.comanda.status}
                    </p>
                </> : <></>}
            </div>
        </div>
    )
}

export const CardProtudoInfo = (props: { produto: Produto }) => {

    return (
        <div className="">
            <div className="relative w-full rounded px-4 py-6 bg-white -l">
                <p className="border-b font-semibold text-gray-700 border-gray-200 w-max">
                    Informações Produto
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Descrição: {props.produto.descricao}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Valor Compra: {props.produto.valor_c}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Valor Final: {props.produto.valor_f}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Quantidade: {props.produto.qtde}
                </p>
                {props.produto.marca && props.produto.marca.fornecedor ? <>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Marca: {props.produto.marca.nome}
                    </p>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Forncedor: {props.produto.marca.fornecedor.nome}
                    </p>
                </> : <></>}
            </div>
        </div>
    )
}

export const CardPeixeInfo = (props: { peixe: Peixe }) => {

    return (
        <div className="">
            <div className="relative w-full rounded px-4 py-6 bg-white -l">
                <p className="border-b font-semibold text-gray-700 border-gray-200 w-max">
                    Informações Peixe
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Especie: {props.peixe.especie}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Valor: {props.peixe.valor}
                </p>
                <p className="text-sm font text-gray-700 border-gray-200 w-max">
                    Reprodução: {props.peixe.reproducao}%
                </p>
                {props.peixe.fornecedor ? <>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Fornecedor: {props.peixe.fornecedor.nome}
                    </p>
                </> : <></>}
            </div>
        </div>
    )
}

export const CardTanqueInfo = (props: { data: PeixeTanque[] }) => {

    return (
        <div className="">
            <div className="relative w-full rounded px-4 py-6 bg-white -l">
                <p className="border-b font-semibold text-gray-700 border-gray-200 w-max">
                    Informações Tanque
                </p>
                {props.data.map((e) =>
                    <>
                        <p className="text-sm font text-gray-700 border-gray-200 w-max">
                            {e.qtde} {e.peixe.especie}
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export const CardConsumo = (props: { data: Consumo[] }) => {
    return (
        <div className="">
            <div className="relative w-full rounded px-4 py-6 bg-white -l">
                <p className="border-b font-semibold text-gray-700 border-gray-200 w-max">
                    Informações Consumo
                </p>
                <tr />
                {props.data.map((d: Consumo) => <>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Produto: {d.produto.descricao}
                    </p>
                    <p className="text-sm font text-gray-700 border-gray-200 w-max">
                        Valor: {d.produto.valor_f * d.qtde}
                    </p>
                </>)}
            </div>
        </div>
    )
}

export const CardDashInfo = (props: { valor: string, titulo: string, image: string }) => {
    return (

        <div className="p-4 bg-white rounded-2xl w-60">
            <div className="flex items-center">
                <Image src={props.image} alt={""} width="24" height="24" />
                <p className="ml-2 text-gray-700 text-md ">
                    {props.titulo}
                </p>
            </div>
            <div className="flex flex-col justify-center">
                <p className="my-4 text-4xl font-bold text-left text-gray-800">
                    {props.valor}
                </p>
            </div>
        </div>

    )
}