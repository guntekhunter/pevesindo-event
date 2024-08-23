import React from 'react'

export default function Button(props: any) {
    return (
        <button onClick={props.onClick} disabled={props.disable} className={`${props.className} w-full bg-[#F6D232] py-[1rem] rounded-md flex justify-center text-white`}>{props.children}</button>
    )
}
