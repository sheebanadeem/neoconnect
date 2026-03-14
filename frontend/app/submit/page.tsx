"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SubmitCase() {

 const router = useRouter()

 const [formData,setFormData] = useState({
  category:"",
  department:"",
  location:"",
  severity:"",
  description:"",
  anonymous:false
 })

 const [file,setFile] = useState<any>(null)

 // 🔐 Check login
 useEffect(()=>{

  const token = localStorage.getItem("token")

  if(!token){
   router.push("/login")
  }

 },[])


 const handleChange = (e:any)=>{
  const {name,value,type,checked} = e.target
  setFormData({
   ...formData,
   [name]: type==="checkbox" ? checked : value
  })
 }


 const handleSubmit = async (e:any)=>{
  e.preventDefault()

  const token = localStorage.getItem("token")

  const data = new FormData()

  Object.keys(formData).forEach(key=>{
   data.append(key,(formData as any)[key])
  })

  if(file){
   data.append("file",file)
  }

  const res = await fetch("https://neoconnect-yui5.onrender.com/cases/submit",{
   method:"POST",

   headers:{
    Authorization:`Bearer ${token}`
   },

   body:data
  })

  const result = await res.json()

  alert("Complaint submitted. Tracking ID: "+result.trackingId)

 }


 return(

 <div className="p-10 max-w-xl mx-auto">

 <h1 className="text-2xl font-bold mb-6">Submit Complaint</h1>

 <form onSubmit={handleSubmit} className="space-y-4">

  <input
   name="category"
   placeholder="Category"
   onChange={handleChange}
   className="border p-2 w-full"
  />

  <input
   name="department"
   placeholder="Department"
   onChange={handleChange}
   className="border p-2 w-full"
  />

  <input
   name="location"
   placeholder="Location"
   onChange={handleChange}
   className="border p-2 w-full"
  />

  <select
   name="severity"
   onChange={handleChange}
   className="border p-2 w-full"
  >
   <option value="">Select Severity</option>
   <option value="Low">Low</option>
   <option value="Medium">Medium</option>
   <option value="High">High</option>
  </select>

  <textarea
   name="description"
   placeholder="Description"
   onChange={handleChange}
   className="border p-2 w-full"
  />

  <div className="flex items-center gap-2">
   <input
    type="checkbox"
    name="anonymous"
    onChange={handleChange}
   />
   <label>Submit Anonymously</label>
  </div>

  <div>
   <label>Attach File</label>
   <input
    type="file"
    onChange={(e:any)=>setFile(e.target.files[0])}
   />
  </div>

  <button
   type="submit"
   className="bg-blue-500 text-white px-4 py-2 rounded"
  >
   Submit Complaint
  </button>

 </form>

 </div>
 )
}