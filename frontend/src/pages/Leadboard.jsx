import React,{useEffect, useState} from 'react'
import dp from "../assets/dp.png"
import { FaUniversity } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { useDarkThemeContext } from '../context/DarkTheme';
import axios from 'axios';
const Leadboard = () => {
    // const API="http://localhost:5000"
    const API = import.meta.env.VITE_MODE === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PRODUCTION

    const [Leadboard, setLeadboard] = useState([]);
    const {isDark}=useDarkThemeContext()
    useEffect(() => {
        const getLeadboard = async () => {
            try {
                const res = await axios.get(`${API}/api/admin/getLeadboard`)
                setLeadboard(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getLeadboard()
    }, [])
    return (
        <div  className='flex flex-col items-center justify-center'>
            <button className="HomeButton"   ><GoHome onClick={() => window.location.href = "/" } className={isDark==="false"?'text-black':'text-white'}  /></button>
      
            <h4 className={isDark==="false"?'BoardOfAppreciationHeading text-black ':'BoardOfAppreciationHeading'}  >Board of Appreciation</h4>
            <div className=" flex flex-col items-center justify-center mt-[50px] gap-[20px]  border-2 border-red-500 ">
            {Leadboard.map((item) => {
                return (
                    <div   key={item._id} className={isDark==="false"?'profileCard  w-[100%] border border-black '  :'profileCard w-[100%] border border-white'} >
                        <h1  className={isDark==="false"?'text-black':'text-white'} > <img src={dp} alt=""    /> {item.username} {item.instagramLink &&<a href={item.instagramLink} className={isDark==="false"?'text-black instagram2 ':'text-white instagram2'}  ><FaInstagram className='instaIcon2'  /> <span>instagram</span> </a> }   </h1>
                        <h4 className={isDark==="false"?'text-black':'text-white'} >Contributions: {item.contributions}</h4>
                        <h4  className={isDark==="false"?'text-black opacity-50 ':'text-white opacity-50'}  ><FaUniversity/> {item.college.name} </h4>
                    </div>
                )
            })}
            </div>
            <p  className={isDark==="false"?'text-black  absolute  bottom-0  text-center ':'text-white  absolute  bottom-0  text-center '} >To see YourSelf on this board share news and gain contribution points. 1 point for each news. </p>
        </div>
    )
}

export default Leadboard
