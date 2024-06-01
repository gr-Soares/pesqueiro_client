import Image from "next/image"
import Link from "next/link"


export type CardLinkProps = {
    title: string
    href: string
    image?: string
}

export const CardLink = (props: CardLinkProps) => {

    return (
        <Link href={props.href}>
            <div className="w-full">
                <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                        {props.title}
                    </p>
                    <div className="flex items-end my-6 space-x-2">
                        <span>
                            {props.image ? <Image src={props.image} alt={""} width="68" height="68" /> : <></>}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}