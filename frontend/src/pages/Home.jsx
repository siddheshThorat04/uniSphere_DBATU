    import React, { useEffect } from 'react'
import { useDarkThemeContext } from '../context/DarkTheme';
import randomChatLogo from "../assets/randomChatLogo.png"
import last_24_hrs from "../assets/last_24_hrs.png"
import studyTogether from "../assets/studyTogether.png"
import podium from "../assets/podium.png"
import eventsLogo from "../assets/events.png"
const Home = () => {
    const {isDark,setDark}=useDarkThemeContext()  
    useEffect(() => {
        console.log(isDark)
    }, [])
    
    console.log(isDark)
  return (
    <div className="navigation">
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/chatHome"}}> <img className='homeLogos'   src={randomChatLogo} alt="" /> talkRandomly</button>
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/news"}}   ><img  className='homeLogos' src={last_24_hrs} alt="" />last_24_hrs</button>
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/study-zone"}}  > <img className='homeLogos'   src={studyTogether} alt="" />  studyTogether</button>
                <button className={isDark==="false"?"card darkCard":"card "} onClick={()=>{window.location.href="/events"}}  > <img className='homeLogos'   src={eventsLogo} alt="" />Events</button>
                <button className={isDark==="false"?"card darkCard":"card "}  onClick={()=>{window.location.href="/Leadboard"}} > <img  className='homeLogos'  src={podium} alt="" />Leadboard</button>
        </div>
  )
}

export default Home