import { Cliente, ClienteComanda } from "@/api/models/cliente"
import { Produto } from "@/api/models/produto"
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
                <div className="relative w-full rounded px-4 py-6 bg-white shadow-l">
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
            <div className="relative w-full rounded px-4 py-6 bg-white shadow-l">
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
            <div className="relative w-full rounded px-4 py-6 bg-white shadow-l">
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