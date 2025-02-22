import React, { useEffect, useState } from 'react'
import { BsWindowSidebar } from 'react-icons/bs';
import { MdGroups } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { redirect } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { useDarkThemeContext } from '../context/DarkTheme';
import { GoHome } from "react-icons/go"
import { FaInstagram } from "react-icons/fa";
const StudyZone = () => {
    const { authUser } = useAuthContext()
    const { isDark } = useDarkThemeContext()
    const mode=import.meta.env.MODE
    const API= mode==="DEVELOPMENT"?import.meta.env.VITE_API_DEV:import.meta.env.VITE_API
    const [meetZone, setMeetZone] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await fetch('/api/user/getMeet')
                const data = await res.json()
                console.log(data.meet);
                setMeetZone(data.meet)
            } catch (error) {
                console.log(error);
            }
        }
        getNews()
    }, [])

    const deleteMeet = async (id) => {
        const res = await fetch(`/api/admin/deleteMeet/${id}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                window.location.reload();
            })

        const data = await res.json()
        console.log(data);
    }
    return (
        <div className='studyZoneMainDiv '  >
            <button className={isDark === "false" ? "HomeButton HomeButtonDark" : "HomeButton"}  ><GoHome onClick={() => window.location.href = "/"} className={isDark === "false" ? "HomeButton text-balck" : "HomeButton text-white"} /></button>
            {meetZone.length == 0 && <h1 className={isDark === "false" ? 'studyZoneNoMeet text-black ' : "studyZoneNoMeet  text-gray-200  "}  >Remind Us To Add New Meetings  <a target="_blank" href="https://www.instagram.com/sid__.4216/"><FaInstagram className='inline text-red-500' /></a></h1>}
            <h1 className={isDark === "false" ? 'studyZoneHeading text-black text-3xl  ' : "studyZoneHeading  text-gray-200 text-3xl "}  >Study Zone</h1>
            {
                meetZone.map((item) => {
                    return (
                        <div className={isDark === "false" ? 'studyZoneDiv studyZoneDivDark' : "studyZoneDiv"} key={item._id}  >
                            <div className='flex items-center justify-between w-full' >
                                <div>
                                    <h1 className={isDark === "false" ? 'studyZoneSubHeading text-black text-3xl ' : "studyZoneSubHeading text-white text-3xl"}  >{item.name}</h1>
                                    <button className='studyZoneButton'  ><a href={item.link}>Join</a></button>
                                </div>
                                <MdGroups className={isDark === "false" ? 'text-4xl text-black' : 'text-4xl text-white'} />
                                {authUser.isAdmin && <MdDelete onClick={() => deleteMeet(item._id)} />}
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default StudyZone
