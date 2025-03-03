
"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"

import { CiHome } from "react-icons/ci";
import { useDarkThemeContext } from '../context/DarkTheme';
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../context/authContext';
const Events = () => {

  // const mode=import.meta.env.VITE_MODE
  // const API= mode==="DEVELOPMENT"?import.meta.env.VITE_API_DEV:import.meta.env.VITE_API
  const API="http://localhost:5000"
  const [file, setFile] = useState();
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isForAll, setIsForAll] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [events, setevents] = useState([]);
  const {isDark}=useDarkThemeContext()
  const {authUser}=useAuthContext()
  useEffect(() => {
    const getEvents = async () => {
      const res = await axios.get(`${API}/api/user/getEvents`, {withCredentials:true
      })
      const eventArray=res.data.events?.reverse()
      console.log(eventArray)
      setevents(eventArray)

    }

    getEvents()
  }, [])
  const deleteEvent = async (id) => {
    const res = await axios.post(`${API}/api/admin/deleteEvent/${id}`, {
      withCredentials:true
    })
    console.log(res.data)
    window.location.reload();
  }
  const submit = async (e) => {

    e.preventDefault()
    scrollTo(0, 0)
    const formData = new FormData();
    if(file){
      formData.append('image', file);
    }
    formData.append('Name', Name);
    formData.append('description', description);
    formData.append('isForAll', isForAll);
    setIsAdding(false)
    const res= await axios.post(`${API}/api/user/addEvent`, formData, {
      withCredentials :true
    }).then((res) => {
      console.log(res.data); // Display server success message
      window.location.reload();
    }).catch((error) => {
      console.error("Error:", error.response?.data?.message || "An error occurred");
    });
  }
  const [fullScreenImage, setfullScreenImage] = useState(null);
  return (
    <div className={isDark==="false"?'bg-black min-h-screen flex felx-col justify-center ':'bg-white  min-h-screen flex felx-col justify-center  '} >
      {fullScreenImage && <div className='h-screen z-50 flex  justify-center items-center fixed top-[50%] bottom-[50%] translate-y-[-50%]  left-0 right-0 bg-[rgba(0,0,0,0.8)] ' onClick={() => setfullScreenImage(null)} ><h1 onClick={() => setfullScreenImage(null)} className='text-white text-3xl absolute top-2 right-2'  >  x</h1><img src={fullScreenImage} alt="" className='h-[80%] h-fit' /></div>}
      <button className={isDark==="false"?"HomeButton text-white":"HomeButton text-black"}   ><CiHome onClick={() => window.location.href = "/" }/></button>
      <h1 className={isDark==="false"?'fixed z-1000 top-1 heading text-white  text-gray-400 text-3xl':"fixed z-1000 top-1  heading   text-black text-3xl  "} >Events</h1>
      {events.length==0 && <h1 className={isDark==="false"?'Post_latest_happening2 text-black':'Post_latest_happening2 text-white'} >No upcoming Events.😞 <span className={isDark==="false"?'post_something_na text-black':'post_something_na text-white'}  >What's happening in Your College ? Share it.</span></h1>}
      <div className="mt-10">
      {events.map((item) => {
        return (
          <div className={isDark==="false"?'eventDiv border-white w-[97vw]':"eventDiv border-black w-[97vw]"} key={item._id}  >
      
            <h1 className={isDark==="false"?'flex justify-between ':" flex justify-between "}  > <span className={isDark==="false"?'w-[90%] eventTitle text-white tracking-wider text-2xl  overflow-auto':'w-[90%] eventTitle tracking-wider text-black text-xl overflow-auto'}> {item.Name} </span> <span className='clgName'  >{item.isForAll ?  "University": item.college.name}</span> </h1>
            <p className={isDark==="false"?'text-gray-200 max-h-[250px] overflow-auto':'eventDescription text-black'}  >{item.description}</p>
            {item.image && <div className={isDark==="false"?'eventImageDiv eventImageDivDark':"eventImageDiv"}>
              <img src={item.image} onClick={() => setfullScreenImage(item.image)} className='eventImage' alt="" />
            </div>}
            {(authUser.isAdmin || authUser.postedBy === item.postedBy ) &&  <MdDelete  onClick={() => deleteEvent(item._id)}  className='text-red-500 text-xl'  />}

          </div>
        )
      })}
      </div>
      {isAdding &&  <div className='bg-black bg-opacity-70 w-screen h-screen fixed top-0 left-0'  >  <form onSubmit={submit} className='addPostForm w-[90vw] absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] translate-y-[-50%] h-[500px]  bg-white pt-10'  >
        <button className='offButton'  >x</button>
        <h1 className="Post_latest_event" >Post New Event</h1>
        <input type="text" className='Newsinputs  border-[1px] border-black  ' onChange={e => setName(e.target.value)} value={Name} placeholder='Title' />
        <input type="text" className='Newsinputs border-[1px] border-black' onChange={e => setDescription(e.target.value)} value={description} placeholder='Add Description' />
        <div className='ImageBox  border-[1px] border-black ' ><input type="file"className='w-[95px] mr-[10px]'  onChange={e => setFile(e.target.files[0])} accept='image/*' />Only if Required </div>
        <div className='isForAllBox border-[1px] border-black'  >
          <input type="checkbox" onChange={e => setIsForAll(e.target.checked)} checked={isForAll} />Only check if it is for all colleges Affiliated to DBATU ?
        </div>
        <button type="submit" className='submitbtn' >Post</button>
      </form></div>}
      <button onClick={() => setIsAdding(!isAdding)} className={isDark==="false"?'isAddingBtn text-black border-black  ':'isAddingBtn text-white border-white'}   >+</button>
    </div>
  )
}

export default Events
