import { CardLink } from "@/components/card";

export default function Pedido() {


    return (
        <>
            <CardLink href="pedido/compra" image="/icons/icons8-order-48.png" title="Compra" />
            <CardLink href="pedido/aluguel" image="/icons/icons8-order-48.png" title="Aluguel" />
        </>
    )
}