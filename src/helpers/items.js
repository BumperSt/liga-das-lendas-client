import items_json from '../../public/item.json'

const objectToArray = (objects) => {
    let array = Object.keys(objects).map((key) => objects[key])

    return array
}

let allItemsArray = objectToArray(items_json.data)

export default {
    getAll: () => {
        return allItemsArray
    },
    getByIds: (itemsIds) => {
        let tempArray = []

        itemsIds.map((id) => {
            tempArray.push(items_json.data[id])
        })
        return tempArray

    },
}