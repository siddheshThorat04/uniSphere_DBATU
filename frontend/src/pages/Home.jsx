import React from 'react'
import { useDarkThemeContext } from '../context/DarkTheme';
import { useAuthContext } from '../context/authContext';
import randomChatLogo from "../assets/randomChatLogo.png"
import last_24_hrs from "../assets/last_24_hrs.png"
import studyTogether from "../assets/studyTogether.png"
import podium from "../assets/podium.png"
import darkmode from "../assets/darkmode.png"
import lightmode from "../assets/lightmode.png"
import eventsLogo from "../assets/events.png"

const Home = () => {

  const { isDark, setDark } = useDarkThemeContext()
  const { authUser } = useAuthContext();
  const SwitchDarkMode=()=>{
    if(isDark==="false"){
      setDark("true")
      localStorage.setItem("isDark","true")
    }else{
      setDark("false")
      localStorage.setItem("isDark","false")
    }
  }
  console.log(isDark)
  return (
    <> 
 <button  onClick={SwitchDarkMode}  className={isDark==="false" ? ' text-white absolute border-[1px] p-2 rounded-lg    top-2 right-2  bg-none   ' : " text-black absolute border-[1px] border-black  p-2 rounded-lg    top-2 right-2  bg-none  "}>{isDark==="false"?<img src={lightmode} className='h-7   '  alt="" />:<img src={darkmode} className='h-7'  alt="" />}</button>
      <div className={isDark==="false" ? 'bg-black min-h-screen ' : "bg-white min-h-screen"}  >
        <h1 className='text-2xl text-black text-center ' ><span className={isDark==="false"?"text-white":"text-black"}>Welcome</span> <span className='text-purple-500'  >{authUser.username} </span>🙋🏼‍♂ </h1>
        <div className="navigation mt-[70px]  ">
          <button className={isDark==="false"?"card  text-white  border-1 border-white":"card  border-1 border-black"} onClick={() => { window.location.href = "/chatHome" }}> <img className={isDark ? "homeLogos text-white" : 'homeLogos text-black'} src={randomChatLogo} alt="" /> talkRandomly</button>
          <button className={isDark==="false"?"card  text-white  border-1 border-white":"card  border-1 border-black"} onClick={() => { window.location.href = "/news" }}   ><img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={last_24_hrs} alt="" />last_24_hrs</button>
          <button className={isDark==="false"?"card  text-white  border-1 border-white":"card  border-1 border-black"} onClick={() => { window.location.href = "/study-zone" }}  > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={studyTogether} alt="" />  studyTogether</button>
          <button className={isDark==="false"?"card  text-white  border-1 border-white":"card  border-1 border-black"} onClick={() => { window.location.href = "/events" }}  > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={eventsLogo} alt="" />Events</button>
          <button className={isDark==="false"?"card  text-white  border-1 border-white":"card  border-1 border-black"} onClick={() => { window.location.href = "/Leadboard" }} > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={podium} alt="" />Leadboard</button>
        </div>
      </div>
    </>
  )
}

export default Home