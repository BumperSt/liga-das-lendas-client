import summonerApi from '../../api/summoner'

export default{

    getMatchById:  (matchId, setMatchs) => {
        summonerApi.getMatch({
            matchId
        })
        .then(({data}) => {

            setMatchs(data)
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

}