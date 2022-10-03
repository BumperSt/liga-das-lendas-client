import Image from "next/image"
import { ItemDiv, ItemPrice, ListItemContainer, ListItemName, ListItemsDiv, ListItemByCategory,StyledLine,ActiveItemContainer, BuildsIntoDiv, BuildsIntoTitle, BuildIntosAlign, ItemFromDiv, ItemTreeContainer, AlignRow, ActiveItemInformations, ActiveItemName, ActiveItemPrice, AlignColum, ActiveItemDescption, ItemDescriptionDiv, TopBorder, FormatItemStyledInMobile } from "./itemsPageStyle"
import { useContext, useEffect, useState } from "react"
import LoadingPage from '../../components/LoadingPage'
import { Input } from "../searchInput/styleSerachInput"
import axios from "axios"
import LanguageContext from "../../context/languageContext"
import { useRouter } from "next/router"

const ListAllItems = () => {

    const [allItems, setAllItems] = useState(null)
    const [allItemsJson, setAllItemsJson] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    const [activeItemInto, setActiveItemInto] = useState(null)
    const [activeItemFrom, setActiveItemFrom] = useState(null)
    const [activeItemDescription, setActiveItemDescription] = useState(null)
    const [filter, setFilter] = useState('')
    const { language, setLanguage } = useContext(LanguageContext)
    const router = useRouter()
    const {itemId} = router.query

    
    useEffect(() => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.12.1/data/${language}/item.json`).then((data) => {
            const objectToArray = (objects) => {
                let array = Object.keys(objects).map((key) => objects[key])
                return array
            }
            setAllItemsJson(data.data)
            let array = objectToArray(data.data.data)
            array.sort(function (a, b) {
                if (a.gold.total > b.gold.total) {
                    return 1;
                }
                if (a.gold.total < b.gold.total) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            })
            setAllItems(array)

        }).catch((err) => {
            console.log(err)
        })
        
        

        
    },[])

    useEffect(() => {
        if(allItems){
            
            if(itemId){
                console.log(itemId)

                allItems.filter((item) => {
                    if(item.image.full.replace('.png', '') == itemId){
                        console.log(item)

                        setActiveItem(item)
                    }
                })
            }else{
                setActiveItem(allItems[190])
            }
            
        }
    },[allItems, itemId])

    useEffect(() => {
        if(activeItem){
            console.log(activeItem)
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
                setActiveItemInto(getByIds(activeItem.into))                        
            }
            if(activeItem.from){
              
                setActiveItemFrom(getByIds(activeItem.from))
            }            
        }
    }, [activeItem])


    useEffect(() => {
        if(filter != '' && allItems){
            Object.keys(allItems).map(champIndex => {
                for (let index = 1; index <= filter.length; index++) {
                    if(filter.length == index ){
                        if(allItems[champIndex].name.substring(0,index).toUpperCase() == filter.substring(0,index).toUpperCase()){
                            setActiveItem(allItems[champIndex])
                        }
                    }
                }
             });
        }
    }, [filter])

    const getByIds = (itemsIds) => {
        let tempArray = []
        itemsIds.map((id) => {
            tempArray.push(allItemsJson.data[id])
        })
        return tempArray
    }



    if(allItems){
        return(
            <ListItemContainer>
                <ListItemByCategory>
                    <ListItemName>Todos os items</ListItemName>
                    <Input value={filter}  name="itemSerch" onChange={(e) => setFilter(e.target.value)} style={{
                        height:'2rem',
                        marginBlock:'1rem'
                    }} placeholder="Pesquisar Item"/>
                    <ListItemsDiv>
                        {
                            allItems.map((item, index) => (
                                <>
                                {
                                    item.depth < 4 &&
                                    <ItemDiv key={`${index}`} active={activeItem == item} onClick={() => setActiveItem(item)} title={item.name}>
                                        <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${item.image.full}`} width="64" height="64"/>
                                        <ItemPrice>${item.gold.total}</ItemPrice>
                                    </ItemDiv>
                                }
                                </>
                                
                               
                            ))
                        }
                    </ListItemsDiv>
                </ListItemByCategory>
                <ActiveItemContainer>
                    {
                        activeItemInto != null && activeItemInto.length > 0 &&
                        <BuildsIntoDiv>
                            <BuildsIntoTitle>Pode construir:</BuildsIntoTitle>
                            <BuildIntosAlign>
                                {
                                    activeItemInto != null && activeItemInto.length > 0 ?
                                    activeItemInto.map((item, index) => (
                                        <>
                                        {
                                            item.depth < 4 ?
                                            <ItemDiv key={`${index} active`} onClick={() => setActiveItem(item)} title={item.name}>
                                                <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${item.image.full}`} width="64" height="64"/>
                                            </ItemDiv>
                                            :
                                            <ItemDiv style={{
                                                cursor: "default"
                                            }} key={`${index} active`}  title={'Sem item'}>
                                                <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/7050.png`} width="64" height="64"/>
                                            </ItemDiv>
                                        }
                                        </>

                                    ))
                                    :
                             
                                        <ItemDiv style={{
                                            cursor: "default"
                                        }}  title={'Sem item'}>
                                            <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/7050.png`} width="64" height="64"/>
                                        </ItemDiv>
                            
                                }
    
                            </BuildIntosAlign>
                        </BuildsIntoDiv>
                    }            
                    {
                        activeItem &&
                        
                        <ItemTreeContainer>
                        <FormatItemStyledInMobile>
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                        }}>
                        <ItemDiv style={{alignSelf:'center'}}title={activeItem.name}>
                            <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${activeItem.image.full}`} width="64" height="64"/>
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
                                                <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${item.image.full}`} width="64" height="64"/>                                                     
                                            </ItemDiv>
                                            {
                                                    item.from &&        
                                                        
                                                            getByIds(item.from).map((item, index) => (
                                                                <ItemDiv>
                                                                    <StyledLine/>
                                                                    <Image  src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${item.image.full}`} width="64" height="64"/>
                                                                </ItemDiv>
                                                            ))                                                        
                                                }                
                                            
                                    </ItemFromDiv>
                                ))
                            }
                        </AlignRow>
                        </AlignColum>
                        }
                        </div>
                        <ActiveItemInformations>
                                <ItemDiv>
                                    <Image src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${activeItem.image.full}` } width="64" height="64"/>
                                </ItemDiv>
                                <div style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    textAlign:'center'
                                }}>
                                    <ActiveItemName>{activeItem.name}</ActiveItemName>
                                    <ActiveItemPrice>${activeItem.gold.total}</ActiveItemPrice>
                                </div>
                            </ActiveItemInformations>
                            </FormatItemStyledInMobile>
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