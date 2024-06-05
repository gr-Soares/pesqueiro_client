import { CardLink } from "@/components/card";


export default function Produtos() {
    return (
        <>
            <CardLink href="produtos/novo" image="/icons/icons8-basket-48.png" title="Novo" />
            <CardLink href="produtos/compra" image="/icons/icons8-basket-48.png" title="Compra" />
            <CardLink href="produtos/view" image="/icons/icons8-basket-48.png" title="Visualizar" />
            <CardLink href="produtos/reabastecimento" image="/icons/icons8-basket-48.png" title="Rebastecimento" />
        </>
    )
}