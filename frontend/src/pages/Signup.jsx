import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
import { set } from 'mongoose';
// import { useDarkThemeContext } from '../context/DarkTheme';
// import { useDarkThemeContext } from '../context/DarkTheme';
// import eventsLogo from '../assets/events.png'
// import chattingPPLogo from '../assets/chatHomeLogo.png'
// import newsLogo from '../assets/last_24_hrs.png'
// import Slider from '../components/Slider';
// import eventsLogo from '../assets/events.png'

const Signup = () => {

  // const mode = import.meta.env.VITE_MODE;
  // const API = mode === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API
  const API = "http://localhost:5000"
  const { setauthUser } = useAuthContext();
  const [colleges, setcolleges] = useState([]);

  const [username2, setUsername] = useState("");
  const [password2, setPassword] = useState("");
  useEffect(() => {
    const username = "User" + Date.now() + Math.floor(Math.random() * 1000);
    const password = "Password" + Date.now() + Math.floor(Math.random() * 1000);
    setUsername(username);
    
    setPassword(password);
    console.log(username, password)
  }, [])
  // const {setDark}=useDarkThemeContext()
  useEffect(() => {
    const getCollleges = async () => {
      const res = await axios.get(`${API}/api/admin/getClg`)
      console.log(res.data)
      setcolleges(res.data.colleges)
    }

    getCollleges()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = username2;
    const password = password2;
    const college = e.target[2].value;
    const response = await axios.post(`${API}/api/auth/signup`, { username, password, college }, { withCredentials: true });
    console.log(response.data)
    if (response.data.error) {
      alert(response.data.error)

    } else {

      localStorage.setItem("authUser", JSON.stringify(response.data.user));
      setauthUser(response.data.user);
      localStorage.setItem("mbTheme", false)
    }
  }

  return (
    <>
      <div className="h-screen border-2 border-red-500 bg-[#EDE6D9]  ">
        <h1 className=''  >join<span className='Name'  > uniSphere</span></h1>
        <form onSubmit={handleSubmit} className='loginForm  w-full px-3 ' >

          <div className="inputContainer2 hidden">
            <label htmlFor="username" className='text-white' >what we can call you ?</label>
            <input type="text"  name='username' value={username2} placeholder='Enter the username' />
          </div>
          <div className="inputContainer2 hidden ">
            <label htmlFor="password" className='text-white'  >Password (keep it short)</label>
            <input type="text" name='password' value={password2} placeholder='Enter the password' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="college" className='text-white'  >Select college👇</label>
            <select className='selectCollege' name="college" id="">
              {
                colleges.map((clg) => <option className='bg-black' key={clg._id} value={clg._id}>{clg.name}</option>)
              }
            </select>
          </div>
          <button type='submit' className='loginBtn'   >join</button>
        </form>
      </div>
    </>

  )
}

export default Signup
