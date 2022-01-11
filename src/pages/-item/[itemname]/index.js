import React, {useContext, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
export default function ItemPage (){
    const router = useRouter()
    const { itemname } = router.query
    return(
        <>
            <h1>{itemname}</h1>
        </>
    )
}