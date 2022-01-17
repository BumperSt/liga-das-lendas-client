import summonerApi from '../../api/summoner'

export default{

    getMatchById:  (matchId, setMatchs) => {
        summonerApi.getMatch({
            matchId
        })
        .then(({data}) => {
            console.log(data)
            setMatchs(data)
        })
        .catch((error) => {
            console.log(error)

            console.log(error)
        })
        
    }

}