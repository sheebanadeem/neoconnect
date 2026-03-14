"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SecretariatDashboard(){

 const router = useRouter()

 const [cases,setCases] = useState([])

 const fetchCases = async ()=>{

  const token = localStorage.getItem("token")

  const res = await fetch("https://neoconnect-yui5.onrender.com/cases",{
   headers:{
    Authorization:`Bearer ${token}`
   }
  })

  const data = await res.json()

  setCases(data)
 }

 useEffect(()=>{

  const token = localStorage.getItem("token")

  // 🔐 redirect if not logged in
  if(!token){
   router.push("/login")
   return
  }

  fetchCases()

 },[])

const assignCase = async (id:string)=>{

 const managerId = prompt("Enter Case Manager User ID")

 const token = localStorage.getItem("token")

 const res = await fetch(`https://neoconnect-yui5.onrender.com/cases/assign/${id}`,{
  method:"PUT",
  headers:{
   "Content-Type":"application/json",
   Authorization:`Bearer ${token}`
  },
  body: JSON.stringify({
   caseManagerId: managerId
  })
 })

 const data = await res.json()
 console.log("Assign response:",data)

 fetchCases()
}

 return(

 <div className="p-10">

 <h1 className="text-2xl font-bold mb-6">
 Secretariat Case Inbox
 </h1>

 <div className="space-y-4">

 {cases.map((c:any)=>(

 <div key={c._id} className="border p-4 rounded shadow">

 <p><b>Tracking ID:</b> {c.trackingId}</p>
 <p><b>Department:</b> {c.department}</p>
 <p><b>Category:</b> {c.category}</p>
 <p><b>Status:</b> {c.status}</p>

 <button
  onClick={()=>assignCase(c._id)}
  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
 >
 Assign Case Manager
 </button>

 </div>

 ))}

 </div>

 </div>

 )
}