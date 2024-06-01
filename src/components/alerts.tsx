import Image from "next/image"

export function Warning(message: string) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="rounded-md bg-yellow-400 p-4 text-sm text-white">
                <Image src={`/icons/icons8-warning-48.png`} alt={""} width="48" height="48" />
                {message}
            </div>
        </div>
    )
}

export function Success(message: string) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="rounded-md bg-green-400 p-4 text-sm text-white">
                <Image src={`/icons/icons8-success-48.png`} alt={""} width="48" height="48" />
                {message}
            </div>
        </div>
    )
}

export function Error(message: string) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="rounded-md bg-red-400 p-4 text-sm text-white">
                <Image src={`/icons/icons8-error-48.png`} alt={""} width="48" height="48" />
                {message}
            </div>
        </div>
    )
}