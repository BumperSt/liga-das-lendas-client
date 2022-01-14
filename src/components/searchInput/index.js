import react, { useState } from "react"
import { useRouter } from 'next/router'

import { ButtonLupa, DivInput, Input } from "./styleSerachInput"
import Image from 'next/image'

export default function SearchInput() {
    const router = useRouter()

    const [nickName, setNickName] = useState('')


    const sendNickName = (event) => {
        event.preventDefault()
        router.push(nickName)
    }
    return(
        <DivInput>
            <form method='POST' onSubmit={sendNickName}>
                <Input name="ligaDasLendasSearch" value={nickName} onChange={(evt) => setNickName(evt.target.value)} placeholder="Digite seu usuário, invocador"></Input>
                <ButtonLupa name="search">
                    <Image alt="lupa" src="/svg/lupa.svg" width="32" height="32"></Image>
                </ButtonLupa>
            </form>
        </DivInput>
    )
}