import summonerApi from '../../api/summoner'

export default{

    getMatchById:  (matchId, setMatchs) => {
        console.log(matchId)
        summonerApi.getMatch({
            matchId
        })
        .then(({data}) => {
            setMatchs(data)
        })
        .catch((error) => {
            console.log(error)

            console.log(error)
        })
        
    }

}