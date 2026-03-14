"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function MyCases(){

 const router = useRouter()

 const [cases,setCases] = useState<any[]>([])

 const managerId = "69b4d463797667f4e108fb71"


 // ✅ Check login
useEffect(()=>{

 const token = localStorage.getItem("token")

 fetch(`https://neoconnect-yui5.onrender.com/cases/my/${managerId}`,{
  headers:{
   Authorization:`Bearer ${token}`
  }
 })
 .then(res=>res.json())
 .then(data=>{
  console.log("Cases:",data)
  setCases(data)
 })

},[])


 const updateStatus = async(id:string,status:string)=>{

  const token = localStorage.getItem("token")

  await fetch(`https://neoconnect-yui5.onrender.com/cases/status/${id}`,{

   method:"PUT",

   headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
   },

   body: JSON.stringify({status})

  })

  location.reload()

 }



 const addNotes = async(id:string,notes:string)=>{

  const token = localStorage.getItem("token")

  await fetch(`https://neoconnect-yui5.onrender.com/cases/notes/${id}`,{

   method:"PUT",

   headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
   },

   body: JSON.stringify({notes})

  })

 }



 return(

  <div className="p-10 text-white">

   <h1 className="text-3xl font-bold mb-6">
    Case Manager Dashboard
   </h1>


   {cases.length === 0 && (
    <p>No cases assigned yet.</p>
   )}


   {Array.isArray(cases) && cases.map((c:any)=>(

    <div
     key={c._id}
     className="border border-gray-700 p-6 mb-6 rounded-lg bg-gray-900"
    >

     <p><b>Tracking ID:</b> {c.trackingId}</p>
     <p><b>Category:</b> {c.category}</p>
     <p><b>Department:</b> {c.department}</p>
     <p><b>Severity:</b> {c.severity}</p>
     <p><b>Status:</b> {c.status}</p>


     <select
      className="text-black mt-4 p-2"
      defaultValue={c.status}
      onChange={(e)=>updateStatus(c._id,e.target.value)}
     >

      <option>New</option>
      <option>Assigned</option>
      <option>In Progress</option>
      <option>Pending</option>
      <option>Resolved</option>

     </select>


     <textarea
      className="text-black p-2 mt-4 block w-full"
      placeholder="Add case response or notes..."
      defaultValue={c.notes}
      onBlur={(e)=>addNotes(c._id,e.target.value)}
     />


     {c.file && (
      <a
       href={`https://neoconnect-yui5.onrender.com/uploads/${c.file}`}
       target="_blank"
       className="text-blue-400 block mt-3"
      >
       View Attachment
      </a>
     )}

    </div>

   ))}

  </div>

 )
}