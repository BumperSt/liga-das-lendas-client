import React, { useEffect, useState } from "react";
import { AlignItems, Container, ItemContainer } from "./styleItems";
import matchHelper from '../../helpers/match'
import itens_json from '../../../public/item.json'
import Link from "next/link";
const MatchItems = ({myParticipation}) => {

    const [arrayItems, setArrayItems] = useState([])

    useEffect(() => {
        let localArray = []
        localArray.push(myParticipation.item0)
        localArray.push(myParticipation.item1)
        localArray.push(myParticipation.item2)
        localArray.push(myParticipation.item3)
        localArray.push(myParticipation.item4)
        localArray.push(myParticipation.item5)
        localArray.push(myParticipation.item6)
        let arrayItemsTemp = []
        localArray.forEach(element => {
            let item = itens_json.data[element]
            arrayItemsTemp.push(item)
        });
        setArrayItems(arrayItemsTemp)
        console.log(arrayItemsTemp)
    }, [myParticipation])

    return(
        <Container>
        {
            arrayItems[6] != null &&
            <>
            <AlignItems>
                {
                    arrayItems.slice(0, 3).map((item, index) => (
                        
                      
                        item?
                        <Link href={`/items?itemId=${item.image.full.replace('.png', '')}`}>
                        <a>
                            <ItemContainer key={index} title={item.name} src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${item.image.full}`}/>
                            </a>
                        </Link>
                        :
                        <ItemContainer key={index} src="/undefinedItem.webp"/>

                      
                       
                    ))
                }
                <ItemContainer  title={arrayItems[6].name} src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${arrayItems[6].image.full}`}/>

            
            </AlignItems>
            <AlignItems>
            {
                    arrayItems.slice(3, 6).map((item, index) => (
                
                        item?
                        <Link href={`/items?itemId=${item.image.full.replace('.png', '')}`}>
                        <a>
                        <ItemContainer key={index} title={item.name}  src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${item.image.full}`}/>
                            </a>
                        </Link>
                        :
                        <ItemContainer key={index}   src="/undefinedItem.webp"/>

                 

                    ))
                }
            </AlignItems>
        </>
        }
       

        </Container>

    )
}


export default MatchItems