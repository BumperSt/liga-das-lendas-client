import maps_json from '../../public/maps.json'
import queue_json from '../../public/queues.json'
import summonerSpell_json from '../../public/summoner.json'
import runes from '../../public/runesReforged.json'
import itens_json from '../../public/item.json'

const objectToArray = (objects) => {
    let array = Object.keys(objects).map((key) => objects[key])
    return array
}

let mapArray = objectToArray(maps_json)

let queueArray = objectToArray(queue_json)

let spellArray = objectToArray(summonerSpell_json.data)

let runesArray = objectToArray(runes)

let itensArray = objectToArray(Object.getOwnPropertyNames(itens_json.data).sort())


export default {

    findMapById: (mapId) =>{
        return mapArray.find((x) => parseInt(x.mapId) === mapId)
    },
    findQueueById: (queueId) => {
        return queueArray.find((x) => parseInt(x.queueId) === queueId)
    },
    getParticipantID: (participants, accountId) => {
        return participants.find((participant) => participant.puuid === accountId)
    },
    getSummonerSpellName: (spellId) => {
        return spellArray.find((spell) => parseInt(spell.key) === spellId)
    },
    getRuneById: (runeId) => {
        return runesArray.find((rune) => rune.id === runeId)
    },
    getItemById: (itemId) => {
        itensArray.find((item) => {
            if(parseInt(item) === itemId){
                return itens_json.data[item]
            }
        })
    }
}