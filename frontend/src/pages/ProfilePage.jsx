import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dp from "../assets/dp.png"
import { FaUniversity } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import { useAuthContext } from "../context/authContext"
import { IoIosLogOut } from 'react-icons/io'
import { GoHome } from "react-icons/go";
import axios from 'axios';
import { useDarkThemeContext } from '../context/DarkTheme';
const ProfilePage = () => {
  // const mode=import.meta.env.VITE_MODE
  // const API= mode==="DEVELOPMENT"?import.meta.env.VITE_API_DEV:import.meta.env.VITE_API
  const API = "http://localhost:5000"
  const userId = useParams().id
  const [user, setUser] = useState()
  const { authUser, setauthUser } = useAuthContext()
  const { isDark } = useDarkThemeContext()
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`${API}/api/user/getProfile/` + userId, { withCredentials: true })
      const data = await res.data
      setUser(data.user)
      console.log(data);
    }
    getProfile()
  }, [])
  const logout = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/api/auth/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setauthUser(null)
    localStorage.setItem("mbAuth", null)
    localStorage.setItem("mbTheme", null)
    console.log(data);

  }
  const updateProfile = async (e) => {
    e.preventDefault()
    const username = e.target[0].value.trim()
    if (!username) {
      alert("Username cannot be empty!");
      return;
    }
    const res = await axios.post(`${API}/api/user/updateProfile`,
      { username },
      { withCredentials: true }
    );
    console.log(res.data);
    if (res.data.error) {
      alert(res.data.error);
      return;
    }
    localStorage.setItem("authUser", JSON.stringify(res.data.user));
    setauthUser(res.data.user);
    window.location.reload()
  }

  return (

    <div className='profile'>
      <button className="HomeButton"   ><GoHome onClick={() => window.location.href = "/"} className={isDark === "false" ? 'text-black' : "text-white"} /></button>
      <div className={isDark === "false" ? 'profileHeader border-black ' : "profileHeader"}>
        <img src={dp} alt="" />
        <div className='name_and_insta' >
          <h1 className={isDark === "false" ? 'text-black' : "text-white"}  >{user?.username}</h1>
          {user?.instagramLink && <a href={user?.instagramLink} target='_blank' className='instagram'   ><FaInstagram className='instaIcon' /> <span className={isDark === "false" ? 'text-black' : "text-white"} > instagram.com</span> </a>}
        </div>
      </div>
      <div className="profileDetails">
        <FaUniversity className={isDark === "false" ? 'text-black' : "text-white"} />
        <h4 className={isDark === "false" ? 'text-black' : "text-white"} >{user?.college.name}</h4>
      </div>
      {(user?._id == authUser._id) && <div className="updateProfile"><form onSubmit={updateProfile} className='updateForm'   > <input type="text" placeholder='Update Username' maxLength={15} className={isDark === "false" ? 'text-black' : 'text-white bg-transparent'} /> <button type='submit' className={isDark === "false" ? 'updateButton text-black bg-blue-300' : ' bg-blue-800 text-black'} id='updateButton'   >Update</button>  </form></div>}
      {user?.contributions && <h3 className={isDark === "false" ? 'contributions text-black' : "text-white"}  >Contributions: {user?.contributions}</h3>}
      <button className='logoutButton2'><IoIosLogOut onClick={logout} className={isDark === "false" ? 'text-black' : "text-white"} /> <h4 className={isDark === "false" ? 'text-black' : "text-white"}  > Logout</h4> </button>


    </div>
  )
}

export default ProfilePage
