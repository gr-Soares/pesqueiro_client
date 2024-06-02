export type Produto = {
    id: string
    descricao: string
    valor_c: number
    valor_f: number
    qtde: number
    tipo: "COMIDA" | "BEBIDA" | "PEIXE"
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