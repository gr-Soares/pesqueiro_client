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
            <div className="w-40">
                <div className="relative w-full px-4 py-6 bg-white shadow-l">
                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max">
                        {props.title}
                    </p>
                    <div className="flex items-center justify-center my-6 space-x-2">
                        <span>
                            {props.image ? <Image src={props.image} alt={""} width="48" height="48" /> : <></>}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}