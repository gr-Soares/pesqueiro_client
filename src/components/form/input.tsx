import React from "react";


export const InputText = React.forwardRef((
    { register, inputType, placeholder, name, title }:
        { register: any, inputType: "text" | "password", placeholder: string, name: string, title:string }, ref
) => {
    return (
        <div>
            <label className="text-sm text-gray-700 block mb-1 font-bold">{title}</label>
            <input {...register(name)} type={inputType} placeholder={placeholder} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
        </div>
    )
})