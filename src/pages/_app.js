import './globals.css'
import { useRouter } from 'next/router'
import summonerApi from '../api/summoner'
import PageLoading from '../components/LoadingPage'
import UserContext from '../context/userContext'
import { useEffect, useState } from 'react'
import HomePage from '.'


function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const userContextValue = {user, setUser}
  const [myUrl, setMyUrl] = useState(null)
  const { nickName } = router.query
  const [error, setError] = useState(false)
  
  useEffect(() => {
    setMyUrl(window.location.pathname)
    console.log(window.location.pathname)
  },[])

  useEffect(() => {
    console.log("change")
    setError(false)

    if (router.asPath !== router.route) {
      setUser(null)
      if(nickName){
        summonerApi.sendNickName({
          nickName
        })
        .then(({ data }) => {
          setUser(data)
        })
        .catch((error) => {
          console.error(error)
          setError(true)
        })

    }
  }

  }, [router])

  return (
    <UserContext.Provider value={userContextValue}>
      {
        
        !error ?
          myUrl&&
            myUrl != '/' && myUrl != '/-champions' && myUrl.split('/')[1] != '-item'?
              user ?
              <Component {...pageProps} />
              :
              <PageLoading/>
            :
            <Component {...pageProps} />

        :
        <HomePage/>
      }
    </UserContext.Provider>
    )
}

export default MyApp
