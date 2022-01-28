import Image from "next/image"
import { ItemDiv, ItemPrice, ListItemContainer, ListItemName, ListItemsDiv, ListItemByCategory, ActiveItemContainer, BuildsIntoDiv, BuildsIntoTitle, BuildIntosAlign, ItemFromDiv, ItemTreeContainer, AlignRow, ActiveItemInformations, ActiveItemName, ActiveItemPrice, AlignColum, ActiveItemDescption, ItemDescriptionDiv } from "./itemsPageStyle"
import items from '../../helpers/items'
import { useEffect, useState } from "react"
const ListAllItems = () => {

    const [allItems, setAllItems] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    const [activeItemInto, setActiveItemInto] = useState(null)
    const [activeItemFrom, setActiveItemFrom] = useState(null)
    const [activeItemDescription, setActiveItemDescription] = useState(null)
    useEffect(() => {
        setAllItems(items.getAll())
    },[])

    useEffect(() => {
        if(allItems){
            console.log(allItems)
            setActiveItem(allItems[158])
        }
    },[allItems])

    useEffect(() => {
        if(activeItem){
            setActiveItemInto(null)
            setActiveItemFrom(null)
            let atributesStr = []
            console.log(activeItem.description.replaceAll(/<[^>]*>/g, ""))
            let descripText =  activeItem.description.replaceAll(/<[^>]*>/g, "\n").replaceAll(/^\s*\n/gm,'').replaceAll(/<[^>]*>/g, "\n").split('\n')
            for (let index = 0; index < descripText.length; index++) {  
                let str = descripText[index]  
                index += 1
                if(index < descripText.length){
                 
                        atributesStr.push(`${str} ${descripText[index]}`)

                    
                }
     
            }
            setActiveItemDescription(atributesStr)
            console.log(atributesStr)

            if(activeItem.into){
                setActiveItemInto( items.getByIds(activeItem.into))
                
            }
            if(activeItem.from){
                setActiveItemFrom(items.getByIds(activeItem.from))
            }
            
        }
    }, [activeItem])

    return(
        <ListItemContainer>
            <ListItemByCategory>
                <ListItemName>Todos os items</ListItemName>
                <ListItemsDiv>
                    {
                        allItems?.map((item, index) => (
                            <ItemDiv active={activeItem == item} onClick={() => setActiveItem(item)} title={item.name}>
                                <Image src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                <ItemPrice>${item.gold.total}</ItemPrice>
                            </ItemDiv>
                        ))
                    }
                </ListItemsDiv>
            </ListItemByCategory>
            <ActiveItemContainer>
                {
                    activeItemInto &&
                    <BuildsIntoDiv>
                        <BuildsIntoTitle>Pode construir:</BuildsIntoTitle>
                        <BuildIntosAlign>
                            {
                                activeItemInto.map((item) => (
                                    <ItemDiv onClick={() => setActiveItem(item)} title={item.name}>
                                        <Image src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                    </ItemDiv>
                                ))
                            }

                        </BuildIntosAlign>
                    </BuildsIntoDiv>
                }            
                {
                    activeItem &&
                    <ItemTreeContainer>
                        <ItemDiv style={{
                            alignSelf:'center'
                            
                        }}title={activeItem.name}>
                            <Image src={`/item/${activeItem.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                        </ItemDiv>
                        <AlignRow>
                            {
                                activeItemFrom?.map((item) => (
                                    <ItemFromDiv>
                                        <ItemDiv onClick={() => setActiveItem(item)} title={item.name}>
                                            <Image src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                        </ItemDiv>
                                        <AlignRow>
                                            {
                                                item.from &&
                                                items.getByIds(item.from).map((item) => (
                                                    <ItemDiv onClick={() => setActiveItem(item)} title={item.name}>
                                                        <Image src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                                    </ItemDiv>
                                                ))
                                            }
                                        </AlignRow>
                                    </ItemFromDiv>
                                ))
                            }
                        </AlignRow>
                        <ActiveItemInformations>
                            <ItemDiv>
                                <Image src={`/item/${activeItem.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                            </ItemDiv>
                            <AlignColum>
                                <ActiveItemName>{activeItem.name}</ActiveItemName>
                                <ActiveItemPrice>${activeItem.gold.total}</ActiveItemPrice>
                            </AlignColum>
                        </ActiveItemInformations>
                        <ItemDescriptionDiv>
                            {
                                activeItemDescription?.map((str) => (
                                    <ActiveItemDescption>{str}</ActiveItemDescption>
                                ))
                            }
                        </ItemDescriptionDiv>

                    </ItemTreeContainer>
                    }
            </ActiveItemContainer>
        </ListItemContainer>
    )
}
export default ListAllItems