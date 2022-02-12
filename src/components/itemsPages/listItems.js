import Image from "next/image"
import { ItemDiv, ItemPrice, ListItemContainer, ListItemName, ListItemsDiv, ListItemByCategory,StyledLine,ActiveItemContainer, BuildsIntoDiv, BuildsIntoTitle, BuildIntosAlign, ItemFromDiv, ItemTreeContainer, AlignRow, ActiveItemInformations, ActiveItemName, ActiveItemPrice, AlignColum, ActiveItemDescption, ItemDescriptionDiv, TopBorder } from "./itemsPageStyle"
import items from '../../helpers/items'
import { useEffect, useState } from "react"
import LoadingPage from '../../components/LoadingPage'

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
            setActiveItem(allItems[190])
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

    if(allItems){
        return(
            <ListItemContainer>
                <ListItemByCategory>
                    <ListItemName>Todos os items</ListItemName>
                    <ListItemsDiv>
                        {
                            allItems?.map((item, index) => (
                                <ItemDiv key={`${index} item`} active={activeItem == item} onClick={() => setActiveItem(item)} title={item.name}>
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
                                    activeItemInto.map((item, index) => (
                                        <ItemDiv key={`${index} active`} onClick={() => setActiveItem(item)} title={item.name}>
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
                            <ItemDiv style={{alignSelf:'center'}}title={activeItem.name}>
                                <Image src={`/item/${activeItem.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                {
                                    activeItem.from &&
                                    activeItem.from.length > 1  &&
                                    <StyledLine/>

                                }

                            </ItemDiv>
                            {
                             activeItemFrom&&
                             <AlignColum>
                                {
                                    activeItemFrom.length > 1 &&
                                    <TopBorder/>   

                                }
                             <AlignRow center={activeItemFrom.length == 1}>
                                {
                                    activeItemFrom.map((item, index) => (
                                        <ItemFromDiv key={`${index} from`}>
                                                <ItemDiv style={{
                                                        marginInline: '0px'
                                                }} onClick={() => setActiveItem(item)} title={item.name}>
                                                    <StyledLine/>
                                                    <Image src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>                                                     
                                                </ItemDiv>
                                                {
                                                        item.from &&        
                                                            item.from.length == 1 &&
                                                                items.getByIds(item.from).map((item, index) => (
                                                                    <>
                                                                        <StyledLine/>
                                                                        <Image  src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                                                    </>
                                                                ))                                                        
                                                    }                
                                                    {
                                                        item.from && 
                                                            item.from.length > 1 &&
                                                            <>
                                                                <StyledLine style={{
                                                                    marginLeft:'0',
                                                                    

                                                                }}/>
                                                                <TopBorder/>   
                                                                <AlignRow >
                                                                    {
                                                                        items.getByIds(item.from).map((item, index) => (
                                                                            <ItemDiv style={{
                                                                                marginInline: '10px'
                                                                            }} onClick={() => setActiveItem(item)} title={item.name}>
                                                                                <StyledLine/>
                                                                                <Image  src={`/item/${item.image.full.replace('png', 'webp')}`} width="64" height="64"/>
                                                                            </ItemDiv>
                                                                        ))                                                                 
                                                                    }
                                                                </AlignRow>
                                                            </>                                                            
                                                    }                                  
                                        </ItemFromDiv>
                                    ))
                                }
                            </AlignRow>
                            </AlignColum>
                            }
                        

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
                                    activeItemDescription?.map((str, index) => (
                                        <ActiveItemDescption key={`${index} descreption`}>{str}</ActiveItemDescption>
                                    ))
                                }
                            </ItemDescriptionDiv>
    
                        </ItemTreeContainer>
                        }
                </ActiveItemContainer>
            </ListItemContainer>
        )
    }else{
        return(
            <LoadingPage/>
        )
    }
   
}
export default ListAllItems