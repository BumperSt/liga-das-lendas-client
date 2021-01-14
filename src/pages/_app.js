import './globals.css'
import { useRouter } from 'next/router'
import summonerApi from '../api/summoner'

import UserContext from '../context/userContext'
import { useEffect, useState } from 'react'


function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const userContextValue = {user, setUser}

  const { nickName } = router.query

  useEffect(() => {
    
  if (router.asPath !== router.route) {
    if(!user && nickName){

      summonerApi.sendNickName({
        nickName
      })
        .then(({ data }) => {
          setUser(data)
        })
        .catch((error) => {
          console.error(error)
        })

    }
  }

  }, [router])

  return (
    <UserContext.Provider value={userContextValue}>
      <Component {...pageProps} />
    </UserContext.Provider>
    )
}

export default MyApp
