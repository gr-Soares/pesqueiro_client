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
                <SideBarItem href="/" title="Clientes" image="/icons/icons8-client-48.png" />
            </div>
        </nav>
    )
}