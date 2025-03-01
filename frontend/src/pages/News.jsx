import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.png"
import axios from "axios"
import {useAuthContext} from '../context/authContext'
import { useDarkThemeContext } from '../context/DarkTheme'
import { CiHome } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const News = () => {
  const {authUser}=useAuthContext()
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [isForAll, setIsForAll] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [news, setnews] = useState([]);
  const {isDark, setDark}=useDarkThemeContext()
  const API= "http://localhost:5000"
  useEffect(() => {
    const getNews= async ()=>{
      const res= await axios.get(`${API}/api/user/getNews`,{withCredentials:true})
    console.log(res.data)
    setnews(res.data?.news.reverse())
    }
    console.log(typeof(isDark))
    console.log(isDark)
    getNews()
  },[])
  const deleteNews = async (id) => {
    const res = await axios.post(`${API}/api/admin/deleteNews/${id}`, {withCredentials:true},{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data =res.data
    console.log(data)
    window.location.reload();
  }
  const submit = async (e) => {

    e.preventDefault()
    scrollTo(0, 0)
    const formData = new FormData();
    if(file){
      formData.append('image', file);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isForAll', isForAll);
    setIsAdding(false)
    await axios.post(`${API}/api/user/addNews` ,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },  
      withCredentials:true
    }).then((res) => {
      // console.log(res.data.message); // Display server success message
      window.location.reload();
    }).catch((error) => {
      console.error("Error:", error.response?.data?.message || "An error occurred");
    });
  }
  const [fullScreenImage, setfullScreenImage] = useState(null);
  return (
    <div className={isDark==="false"?'min-h-screen bg-black flex flex-col jusify-center items-center bg-black':' flex flex-col  min-h-screen jusify-center items-center bg-white'} >
      {fullScreenImage && <div className='h-screen z-50 flex  justify-center items-center absolute top-[50%] bottom-[50%] translate-y-[-50%]  left-0 right-0 bg-[rgba(0,0,0,0.8)] '><h1 onClick={() => setfullScreenImage(null)} className='text-white text-3xl absolute top-2 right-2'  >  x</h1><img src={fullScreenImage} alt="" className='h-[80%]' /></div>}
      <button className= "text-black"  ><CiHome onClick={() => window.location.href = "/"   } className={isDark==="false"?"HomeButton text-white":"HomeButton text-black"}  /></button>
      <h1 className={isDark==="false"?"Post_latest_happening text-3xl   mt-[20px]":'Post_latest_happening  text-gray-400   text-3xl '} >Latest News</h1>
  
      {news?.length==0 && <h1 className={isDark==="false"?"Post_latest_happening2 text-white  text-3xl" :'Post_latest_happening2  text-3xl text-black  '} >Ohh, Such a Empty 😞 <span className={isDark==="false"?'post_something_na text-white ':'post_something_na text-black'}  >What's happening in Your College ? Share it.</span></h1>}
      <div className="newsDiv2">
        
      {news?.map((item) => {
        return (
          <div className={isDark==="false"?"newsDiv border-1 border-white w-[97vw]":'newsDiv  border-1 border-black  text-black w-[97vw]  '}  key={item._id}      >
            <div  className='w-full flex items-center'  ><h1 className={isDark==="false"?"newsTitle text-2xl text-white  max-w-[80vw] overflow-auto ":'newsTitle text-2xl text-black min-w-[80vw]   max-w-[80vw] overflow-auto '}  >{item.title}</h1><span className='absolute text-blue-700 right-1'  >{item.isForAll ?  "University": item.college.name}</span></div>
            <p className={isDark==="false"?'newsDescription text-gray-300    ':"newsDescription text-black "}  >{item.description}</p>
            {item.image && <div className={isDark==="false"?'newsImageDiv newsImageDivDark':"newsImageDiv"}>
              <img src={item.image} onClick={() => setfullScreenImage(item.image)} className='newsImage' alt="" />
            </div>}
            <a href={`/profile/${item.postedBy._id}`} className="newsPostedBy"  ><span className={isDark==="false"?"text-white ":"text-black text-sm text-opacity-70"} >posted by: </span> <img src={dp} alt="" className='postedByDp'   /> <h5 className={isDark==="false"?"text-white ":"text-black"}> {item.postedBy.username}</h5></a>
            {(authUser.isAdmin || authUser._id === item.postedBy._id) &&  < MdDelete onClick={() => deleteNews(item._id)} className='text-red-500'  />}
          </div>
        )
      })}
      </div>
      {isAdding && <div className="bg-black bg-opacity-70 w-screen h-screen fixed top-0 left-0"> <form onSubmit={submit} className='addPostForm w-[90vw] absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] translate-y-[-50%] h-[500px]  bg-white pt-10'  >
        <button className='offButton'  >x</button>
        <h1 className="Post_latest_happening2 text-3xl text-gray-600 " >Post latest happening</h1>
        <input type="text" className='Newsinputs   border-[1px] border-black' onChange={e => setTitle(e.target.value)} value={title} placeholder='Title' />
        <input type="text" className='Newsinputs   border-[1px] border-black' onChange={e => setDescription(e.target.value)} value={description} placeholder='Add Description' />
        <div className='ImageBox   border-[1px] border-black' ><input type="file"  className='w-[95px] mr-[10px]' onChange={e => setFile(e.target.files[0])} accept='image/*' /> <h4 className='text-black'>Only if Required</h4> </div>
        <div className='isForAllBox   border-[1px] border-black'  >
          <input type="checkbox" onChange={e => setIsForAll(e.target.checked)} checked={isForAll} />Only Check if you want to post for all Colleges ?
        </div>
        <button type="submit" className='submitbtn' >submit</button>
      </form></div>}
      <button onClick={() => setIsAdding(!isAdding)} className={isDark==="false"?'isAddingBtn border-[1px] border-white text-white':"isAddingBtn border-[1px] border-black text-black "}   >+</button>
    </div>
  )
}

export default News