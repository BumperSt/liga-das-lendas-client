import champ_json from '../../public/championFull.json'
import simple_json from '../../public/champion.json'

const objectToArray = (objects) => {
    let array = Object.keys(objects).map((key) => objects[key])
    return array
}

let full_champs_array = objectToArray(champ_json.data)
let simple_champs_array = objectToArray(simple_json.data)

export default {
    filterRotationChamps: (champsIds) => {
        return simple_champs_array.filter((champion) => (
            champsIds.includes(Number(champion.key))
        ))
    },
    findChampById: (champId) =>{
        return full_champs_array.find((x) => Number(x.key) === champId)
    },

    findChampByName:(champName) =>{
        return full_champs_array.find((x) => String(x.id) === champName)
    },
}