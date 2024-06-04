import { Fornecedor } from "./produto"

export type Peixe = {
    id: string
    especie: string
    reproducao: number
    valor: number
    fornecedor_m?: string
    fornecedor: Fornecedor
}

export type Tanque = {
    id: string
    descricao: string
    capacidade: number
    status: string
}

export type PeixeTanque = {
    id: string
    peixe: Peixe
    tanque: Tanque
    qtde: number
    peixe_m?: string
    tanque_m?: string
}