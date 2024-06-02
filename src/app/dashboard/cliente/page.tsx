import { CardLink } from "@/components/card";

export default function Cliente() {
    return (
        <>
            <CardLink href="cliente/novo" image="/icons/icons8-client-48.png" title="Novo" />
            <CardLink href="cliente/view" image="/icons/icons8-client-48.png" title="Visualizar" />
            <CardLink href="cliente/entrada" image="/icons/icons8-client-48.png" title="Entrada" />
            <CardLink href="cliente/saida" image="/icons/icons8-client-48.png" title="Saida" />
        </>
    );
}