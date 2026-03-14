"use client"

import { useState } from "react"

export default function TrackComplaint(){

 const [trackingId,setTrackingId] = useState("")
 const [caseData,setCaseData] = useState<any>(null)

 const searchCase = async () => {

 const res = await fetch(`https://neoconnect-yui5.onrender.com/cases/track/${trackingId}`)
 const data = await res.json()

 setCaseData(data)

 }

 return(

 <div className="max-w-xl mx-auto p-10">

 <h1 className="text-3xl font-bold mb-6">
 Track Complaint
 </h1>

 <input
 className="border p-3 w-full mb-4 text-blue"
 placeholder="Enter Tracking ID (NEO-2026-001)"
 value={trackingId}
 onChange={(e)=>setTrackingId(e.target.value)}
 />

 <button
 onClick={searchCase}
 className="bg-blue-600 text-white px-6 py-2 rounded"
 >
 Search
 </button>

 {caseData && (

 <div className="mt-6 border p-4 rounded">

 <p><b>Status:</b> {caseData.status}</p>
 <p><b>Department:</b> {caseData.department}</p>
 <p><b>Category:</b> {caseData.category}</p>
 <p><b>Severity:</b> {caseData.severity}</p>

 </div>

 )}

 </div>

 )
}