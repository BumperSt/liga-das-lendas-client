import axios from 'axios'
import items_json from '../../public/item.json'


export default {
    getAll: () => {
        return getItens()
    },
    getByIds: (itemsIds) => {
        let tempArray = []
        console.log(itemsIds)
        itemsIds.map((id) => {
            tempArray.push(items_json.data[id])
        })
        return tempArray

    },
}