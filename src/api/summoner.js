import api from './index'

export default {
    sendNickName: (data) => api.post('/summoner', data),
    getLeague: (data) => api.post('/getLeague', data),
    getMatch: (data) => api.post('/getMatch', data),
    getMatchList: (data) => api.post('/getMatchList', data)
}