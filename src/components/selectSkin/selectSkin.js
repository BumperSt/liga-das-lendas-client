import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import champ from "../../helpers/champ"
import { AlignSkinColum, ChampionsCard, ChampName } from "../champions/stylePageChampions"
import { UpdateUserButton } from "../nickname/styles"
import { Continaer, SelectSkin } from "./selectSkinStyle"

const SelectSkinInPage = ({topChamp, setChampSkin, champSkin}) => {

    const [open, setOpen] = useState(false)

    const ref = useRef(null)

    const clickOutModal = (e) => {
        if (!ref.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", clickOutModal);
        return () => {
            document.removeEventListener("mousedown", clickOutModal);
        };
    }, []);
    return(
        <Continaer ref={ref}>
            {
                open &&
                <SelectSkin>
                    {
                        topChamp.skins.map((skin) => (
                            <AlignSkinColum active={skin.num == champSkin} title={skin.name}>
                            <ChampionsCard  hover={true} onClick={() => {
                                setChampSkin(skin.num)
                            }}>
                                <Image  width="310" height="560" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${topChamp.name}_${skin.num}.jpg`}></Image>
                            </ChampionsCard>
                            <ChampName style={{
                                marginTop:'1rem',
                                marginBottom:'0rem',
                            }}>{skin.num == 0 ? topChamp.name : skin.name}</ChampName>
                        </AlignSkinColum>
                        ))
                    }
                </SelectSkin>
            }
            <UpdateUserButton onClick={() => setOpen(!open)}>Trocar fundo</UpdateUserButton>
        </Continaer>
    )
}

export default SelectSkinInPage