import Image from "next/image"
import Link from "next/link"

export type SideBarMenuProps = {
    href: string
    title: string
    image: string
}

export const SideBarItem = (props: SideBarMenuProps) => {


    return (
        <Link href={props.href}>
            <span className="flex items-center justify-start w-full p-2 pl-6 my-2 transition-colors duration-200 text-white">
                <span className="text-left">
                    <Image src={props.image} alt={""} width="24" height="24" />
                </span>
                <span className="mx-2 text-sm font-normal">
                    {props.title}
                </span>
            </span>
        </Link>
    )
}

export const Sidebar = () => {
    return (
        <nav className="mt-6">
            <div>
                <SideBarItem href="/dashboard" title="Inicio" image="/icons/icons8-home-48.png" />
            </div>
            <div>
                <SideBarItem href="/dashboard/cliente" title="Clientes" image="/icons/icons8-client-48.png" />
            </div>
            <div>
                <SideBarItem href="/dashboard/pedido" title="Pedido" image="/icons/icons8-order-48.png" />
            </div>
            <div>
                <SideBarItem href="/dashboard/peixes" title="Peixes" image="/icons/icons8-fish-48.png" />
            </div>
            <div>
                <SideBarItem href="/dashboard/produtos" title="Produtos" image="/icons/icons8-basket-48.png" />
            </div>
            <div>
                <SideBarItem href="/dashboard/fornecedor" title="Fornecedor" image="/icons/icons8-supplier-48.png" />
            </div>
        </nav>
    )
}