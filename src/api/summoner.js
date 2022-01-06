import api from './index'

export default {
    sendNickName: (data) => api.post('/summoner', data),
    updateSummoner: (data) => api.post('/updateSummoner', data),
    getMatch: (data) => api.post('/getMatch', data),
    getMatchList: (data) => api.post('/getMatchList', data)
}