    import React, { useEffect } from 'react'
import { useDarkThemeContext } from '../context/DarkTheme';
import { useAuthContext } from '../context/authContext';
import randomChatLogo from "../assets/randomChatLogo.png"
import last_24_hrs from "../assets/last_24_hrs.png"
import studyTogether from "../assets/studyTogether.png"
import podium from "../assets/podium.png"
import eventsLogo from "../assets/events.png"
const Home = () => {

    const {isDark,setDark}=useDarkThemeContext()  
    const {authUser}=useAuthContext();
    useEffect(() => {
        console.log(isDark)
        console.log(authUser)
    }, [])
    
    console.log(isDark)
  return (
    <>
    <h1 className='text-2xl text-white text-center' >Heyy <span className='text-purple-500'  >{authUser.username}</span></h1>
    <div className="navigation">
                <button className="card " onClick={()=>{window.location.href="/chatHome"}}> <img className={isDark ? "homeLogos text-black":'homeLogos text-white'}   src={randomChatLogo} alt="" /> talkRandomly</button>
                <button className="card " onClick={()=>{window.location.href="/news"}}   ><img  className={isDark ? "homeLogos text-white":'homeLogos text-white'} src={last_24_hrs} alt="" />last_24_hrs</button>
                <button className="card " onClick={()=>{window.location.href="/study-zone"}}  > <img className={isDark ? "homeLogos text-white":'homeLogos text-white'}   src={studyTogether} alt="" />  studyTogether</button>
                <button className="card " onClick={()=>{window.location.href="/events"}}  > <img className={isDark ? "homeLogos text-white":'homeLogos text-white'}   src={eventsLogo} alt="" />Events</button>
                <button className="card "  onClick={()=>{window.location.href="/Leadboard"}} > <img  className={isDark ? "homeLogos text-white":'homeLogos text-white'}  src={podium} alt="" />Leadboard</button>
        </div>
        </>
  )
}

export default Home