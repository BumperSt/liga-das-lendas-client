import React, {useContext, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Container } from '../../components/itemsPages/itemsPageStyle'
import ListAllItems from '../../components/itemsPages/listItems'
export default function ItemPage (){
    const router = useRouter()
    return(
        <Container>
            <ListAllItems/>
        </Container>
    )
}