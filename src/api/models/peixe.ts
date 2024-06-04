import { Fornecedor } from "./produto"

export type Peixe = {
    id: string
    especie: string
    reproducao: number
    valor: number
    fornecedor_m?: string
    fornecedor: Fornecedor
}