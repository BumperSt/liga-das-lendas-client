import './globals.css'
import { useRouter } from 'next/router'
import summonerApi from '../api/summoner'
import PageLoading from '../components/LoadingPage'
import UserContext from '../context/userContext'
import { useEffect, useState } from 'react'
import HomePage from '.'
import Header from '../components/header'
import * as gtag from '../lib/gtag'


function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const userContextValue = {user, setUser}
  const { nickName } = router.query
  const [error, setError] = useState(false)
  const [userPage ,setUserPage] = useState(false)
  const [myUrl, setMyUrl] = useState('')

  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
      for (var i = 0; i < ads; i++) {
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { }
      }
  },[])

  useEffect(() => {
    let myUrl = window.location.pathname
    setMyUrl(myUrl)
    if(myUrl != '/'&& myUrl  != '/-champions' && myUrl.split('/')[1] != '-item'){
      setUserPage(true)
    }else{
      setUserPage(false)
    }
    setError(false)
    if (router.asPath !== router.route) {
      setUser(null)
      window.localStorage.setItem('lastSearch', nickName)
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

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return (
    <UserContext.Provider value={userContextValue}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7080721819896147"crossorigin="anonymous"></script>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}></script>
        <script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
     
      <Header myUrl={myUrl}/>
      {
  
        !error ?
          userPage?
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
