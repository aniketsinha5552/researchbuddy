import React from 'react'

interface iButton {
    children: React.ReactNode,
    type: "primary" | "danger" | "success" | "gray",
    onClick?: any
}

const Button = ({ children, type, onClick }: iButton) => {

    switch (type) {
        case "primary":
            return (
                <div onClick={onClick} className='bg-blue-400 hover:cursor-pointer rounded-md hover:bg-blue-500 p-3 text-sm font-bold transition-colors w-fit'>
                    {children}
                </div>
            )
            break;
        case "danger":
            return (
                <div onClick={onClick} className='bg-red-300 rounded-md hover:cursor-pointer hover:bg-red-500 p-3 text-sm font-bold transition-colors w-fit'>
                    {children}
                </div>
            )
            break;
        case "success":
            return (
                <div onClick={onClick} className='bg-green-300 rounded-md hover:cursor-pointer hover:bg-green-500 p-3 text-sm font-bold transition-colors w-fit'>
                    {children}
                </div>
            )
        case "gray":
            return (
                <div onClick={onClick} className='bg-slate-300 rounded-md hover:cursor-pointer hover:bg-slate-500 p-3 text-sm font-bold transition-colors w-fit'>
                    {children}
                </div>
            )
    }

}

export default Button