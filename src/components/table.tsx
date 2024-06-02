export type SimpleTableProps = {
    title: String
    header: string[]
    data: any[]
}

export const SimpleTable = (props: SimpleTableProps) => {

    return (
        <div className="w-5/6">
            <div className="relative w-full rounded px-4 py-6 bg-white shadow-l">
                <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max">
                    {props.title}
                </p>
                <div className="flex items-center justify-center my-6 space-x-2">

                    <table className="table p-4 bg-white rounded-lg shadow">
                        <thead>
                            <tr>
                                {props.header.map((v) => (
                                    <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                        {v.toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((l: any) => (
                                <tr className="text-gray-700">
                                    {
                                        props.header.map((h) => (
                                            <td className="border-b-2 p-4 dark:border-dark-5">
                                                {l[h]}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )

}