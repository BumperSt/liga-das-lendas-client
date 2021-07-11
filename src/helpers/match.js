import maps_json from '../../public/maps.json'
import queue_json from '../../public/queues.json'

const objectToArray = (objects) => {
    let array = Object.keys(objects).map((key) => objects[key])
    return array
}

let mapArray = objectToArray(maps_json)

let queueArray = objectToArray(queue_json)

export default {

    findMapById: (mapId) =>{
        return mapArray.find((x) => Number(x.mapId) === mapId)
    },
    findQueueById: (queueId) => {
        return queueArray.find((x) => Number(x.queueId) === queueId)
    }
}