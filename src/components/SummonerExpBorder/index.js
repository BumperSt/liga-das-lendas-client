import React, {useContext, useState, useEffect} from 'react'

import {
    ExpBorder
} from './styles'

export default function SummonerExpBorder({level}){
    const expEmblems = [[30,50],[50,75],[75,100],[100,125],[125,150],[150,175],[175,200],[200,225],[225,250],[250,275],[275,300],[300,325],[325,350],[350,375],[375,400],[400,425],[425,450],[450,475],[475,500],[500]]
    const [expBorderLevel, setExpBorderLevel] = useState('')

    useEffect(() => {


        if(level){
            for(let x in expEmblems){
                if(level < 500){
                    if(level >= expEmblems[x][0] && level < expEmblems[x][1]){
                        setExpBorderLevel(
                            `${expEmblems[x][0]}-${expEmblems[x][1]}`
                        )
                    }
                }else{
                    setExpBorderLevel(
                        500
                    )
                }
            }
        }



    }, [level])


    return(
        <ExpBorder src={`/exp-emblems/${expBorderLevel}.png`}></ExpBorder>
    )
}
