

import { CardLink } from "@/components/card";


export default function Fornecedor() {
    return (
        <>
            <CardLink href="fornecedor/novo" image="/icons/icons8-supplier-48.png" title="Novo Fornecedor" />
            <CardLink href="fornecedor/marca/novo" image="/icons/icons8-supplier-48.png" title="Nova Marca" />
            <CardLink href="fornecedor/view" image="/icons/icons8-supplier-48.png" title="Visualizar" />
        </>
    )
}