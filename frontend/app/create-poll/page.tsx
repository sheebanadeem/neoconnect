"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CreatePoll(){

 const router = useRouter()

 const [question,setQuestion] = useState("")
 const [options,setOptions] = useState(["",""])

 // ✅ Check if user is logged in
 useEffect(()=>{

  const token = localStorage.getItem("token")

  if(!token){
   router.push("/login")
  }

 },[])


 const submitPoll = async()=>{

  const token = localStorage.getItem("token")

  await fetch("https://neoconnect-yui5.onrender.com/polls/create",{

   method:"POST",

   headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
   },

   body: JSON.stringify({
    question,
    options: options.map(o=>({text:o}))
   })

  })

  alert("Poll created")

 }


 return(

  <div className="p-10 text-white">

   <h1 className="text-3xl mb-6">
    Create Poll
   </h1>

   <input
    className="border p-2 mb-4 block text-white"
    placeholder="Poll Question"
    onChange={(e)=>setQuestion(e.target.value)}
   />

   {options.map((o,i)=>(
    <input
     key={i}
     className="border p-2 mb-2 block text-white"
     placeholder={`Option ${i+1}`}
     onChange={(e)=>{

      const newOptions=[...options]
      newOptions[i]=e.target.value
      setOptions(newOptions)

     }}
    />
   ))}

   <button
    className="bg-green-500 px-4 py-2 rounded mt-4"
    onClick={submitPoll}
   >
    Create Poll
   </button>

  </div>

 )
}