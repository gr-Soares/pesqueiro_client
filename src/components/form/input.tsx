import React from "react";


export const InputText = React.forwardRef((
    { register, inputType, placeholder, name, title, value }:
        { value?:any, register: any, inputType: "text" | "password" | "number", placeholder: string, name: string, title: string }, ref
) => {
    return (
        <div>
            <label className="text-sm text-gray-700 block mb-1 font-bold">{title}</label>
            <input {...register(name)} value={value} type={inputType} placeholder={placeholder} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
        </div>
    )
})

export const InputSelect = React.forwardRef((
    { register, options, name, title}:
        { register: any, options: string[], name: string, title: string }, ref
) => {
    return (
        <div>
            <label className="text-sm text-gray-700 block mb-1 font-bold">{title}</label>
            <select {...register(name)} name={name} id={name} defaultValue={options[0]} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">
                {options.map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
})