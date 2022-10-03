import react, { useState } from "react"
import { useRouter } from 'next/router'

import { ButtonLupa, DivInput, Input } from "./styleSerachInput"
import Image from 'next/image'

export default function SearchInput({inputStyle, style, value, setValue, name, placeholder}) {
    const router = useRouter()

    const [nickName, setNickName] = useState('')


    const sendNickName = (event) => {
        event.preventDefault()
        router.push(`/summoner/${nickName}`)
        setNickName('')
    }
    console.log(value)
    if(value == undefined){
        return(
            <DivInput style={style ? style : {}}>
                <form method='POST' onSubmit={sendNickName}>
                    <Input style={inputStyle} name="ligaDasLendasSearch" value={nickName} onChange={(evt) => setNickName(evt.target.value)} placeholder="Digite seu usuário, invocador"></Input>
                    <ButtonLupa name="search">
                        <Image alt="lupa" src="/svg/lupa.svg" width="32" height="32"></Image>
                    </ButtonLupa>
                </form>
            </DivInput>
        )
    }else{
        return(
            <DivInput style={style ? style : {}}>
                <Input style={inputStyle} name={name} onChange={(evt) => setValue(evt.target.value)} placeholder={placeholder}></Input>
                <ButtonLupa name="search">
                    <Image alt="lupa" src="/svg/lupa.svg" width="32" height="32"></Image>
                </ButtonLupa>
            </DivInput>
        )
       
    }
}