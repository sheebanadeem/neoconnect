"use client"

import { useEffect, useState } from "react"

export default function PublicHub(){

 const [cases,setCases] = useState([])

 useEffect(()=>{
  fetchCases()
 },[])

 const fetchCases = async ()=>{

  const res = await fetch("https://neoconnect-yui5.onrender.com/cases/resolved")

  const data = await res.json()

  setCases(data)

 }

 return(

 <div className="p-10 max-w-5xl mx-auto">

 <h1 className="text-3xl font-bold mb-6">
  Public Transparency Hub
 </h1>

 <p className="mb-6 text-gray-600">
  This page shows how staff feedback has led to real improvements.
 </p>

 <div className="space-y-4">

 {cases.map((c:any)=>(

 <div key={c._id} className="border p-4 rounded shadow">

 <p><b>Tracking ID:</b> {c.trackingId}</p>

 <p><b>Issue Raised:</b> {c.description}</p>

 <p><b>Department:</b> {c.department}</p>

 <p><b>Status:</b> {c.status}</p>

 <p className="text-green-600 font-semibold">
  Action Taken: Case resolved by management
 </p>

 </div>

 ))}

 {cases.length === 0 && (
  <p>No resolved cases yet.</p>
 )}

 </div>

 </div>

 )
}