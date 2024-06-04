import { CardLink } from "@/components/card";


export default function Tanque() {

    return (
        <>
            <CardLink href="tanque/cadastrar" image="/icons/icons8-rectangular-aquarium-48.png" title="Cadastrar" />
            <CardLink href="tanque/vincular" image="/icons/icons8-rectangular-aquarium-48.png" title="Vincular Peixe" />
            <CardLink href="tanque/entrada_peixe" image="/icons/icons8-rectangular-aquarium-48.png" title="Entrada Peixe" />
            <CardLink href="tanque/saida_peixe" image="/icons/icons8-rectangular-aquarium-48.png" title="Saida Peixe" />
            <CardLink href="tanque/view" image="/icons/icons8-rectangular-aquarium-48.png" title="Visualizar" />
        </>
    )
}