import { Comanda } from "./cliente"

export type Produto = {
    id: string
    descricao: string
    valor_c: number
    valor_f: number
    qtde: number
    tipo: "ALUGUEL" | "COMPRA"
    marca: Marca
    marca_m?: string
}

export type Marca = {
    id: string
    nome: string
    fornecedor: Fornecedor
    fornecedor_m?: string
}

export type Fornecedor = {
    id: string
    nome: string
    cnpj: string
    email: string
    telefone: string
    marcas: Marca[]
}

export type Consumo = {
    qtde: number
    valor: number
    comanda: Comanda
    produto: Produto
    produto_m?: string
    comanda_m?: number
}

export type Aluguel = {
    qtde: number
    valor: number
    comanda: Comanda
    produto: Produto
    produto_m?: string
    comanda_m?: number
}