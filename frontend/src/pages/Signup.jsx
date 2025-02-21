import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
import { useDarkThemeContext } from '../context/DarkTheme';
// import { useDarkThemeContext } from '../context/DarkTheme';
// import eventsLogo from '../assets/events.png'
// import chattingPPLogo from '../assets/chatHomeLogo.png'
// import newsLogo from '../assets/last_24_hrs.png'
// import Slider from '../components/Slider';
// import eventsLogo from '../assets/events.png'

    const Signup = () => {

    const mode = import.meta.env.VITE_MODE;
    // const API = mode === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API
    const API="http://localhost:5000"
    const {authUser,setauthUser}=useAuthContext();
    const [colleges, setcolleges] = useState([]);
    const {setDark}=useDarkThemeContext()
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
    const username = e.target[0].value
    const password = e.target[1].value
    const college = e.target[2].value;
    const response = await axios.post(`${API}/api/auth/signup`, { username, password, college });
    console.log(response.data)
    if(response.data.error){
        alert(response.data.error)

    }else{
    
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
        setauthUser(response.data.user);
        localStorage.setItem("mbTheme", false)
    }
  }

  return (
    <>
      <div className="login">
        <h1 className=''  >join<span className='Name'  >uniSphere</span></h1>
        <form onSubmit={handleSubmit} className='loginForm  w-full px-3 ' >

          <div className="inputContainer2">
            <label htmlFor="username" className='text-white' >what we can call you ?</label>
            <input type="text" name='username' placeholder='Enter the username' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="password" className='text-white'  >Password (keep it short)</label>
            <input type="text" name='password' placeholder='Enter the password' />
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
