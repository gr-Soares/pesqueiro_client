
export type Cliente = {
    id: string
    nome: string
    cpf: string
    email: string
    celular: string
    clienteComanda: ClienteComanda
}

export type ClienteComanda = {
    id:string
    gasto:number
    entrada:string
    saida:string
    comanda:Comanda
}

export type Comanda = {
    id:number
    status:string
}