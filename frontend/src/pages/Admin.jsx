import React, { useState } from 'react'
import axios from "axios"
const Admin = () => {
    // const mode=import.meta.env.VITE_MODE
    // const API= mode==="DEVELOPMENT"?import.meta.env.VITE_API_DEV:import.meta.env.VITE_API
    const API="http://localhost:5000"
    const [isAddingCollege, setIsAddingCollege] = useState(false);
    const [collegeName, setCollegeName] = useState('');
    const [isAddingMeet, setIsAddingMeet] = useState(false);
    const [meetLink, setMeetLink] = useState('');
    const [meetName, setMeetName] = useState('');
    
    const addMeet=async (e)=>{

        try {
            e.preventDefault()
            const res= await axios.post(`${API}/api/admin/addMeet`,{
                    withCredentials:true,
                name:meetName,
                link:meetLink   
                    
            })
            const data=res.data
            console.log(data);
        } catch (error) {
            console.log(error);
            
        }
    }
    const addCollege=async (e)=>{
        try {
            e.preventDefault()
            const res= await fetch(`${API}/api/admin/addCollege`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({name:collegeName}) 

            })
            const data=await res.json()
            console.log(data);
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <>
            {isAddingCollege && <  form  onSubmit={addCollege}   className='addPostForm'  >
                
                <input type="text" className='Newsinputs' value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder='College Name' />
                <button type="submit" className='submitbtn' >submit</button>
            </form>}
            {isAddingMeet && <  form className='addPostForm' onSubmit={addMeet}    >
                <input type="text" className='Newsinputs' value={meetName} onChange={(e) => setMeetName(e.target.value)} placeholder='Meet Name' />
                <input type="text" className='Newsinputs' value={meetLink} onChange={(e) => setMeetLink(e.target.value)}  placeholder='Enter the meet Link'  />
                <button type="submit" className='submitbtn'   >submit</button>
            </form>}

            <div className="navigation">

                <button className="card"  onClick={() => {setIsAddingMeet(!isAddingMeet); }}  >  Add meet</button>

                <button className="card"  onClick={() => setIsAddingCollege(!isAddingCollege)}  >Add College</button>
                <button className="card"  onClick={() => setIsAddingCollege(!isAddingLeadboard)}  >Add LeadBoard</button>

            </div>
        </>
    )
}

export default Admin
