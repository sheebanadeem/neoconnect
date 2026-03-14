"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState("")

 const login = async ()=>{

  try{

   const res = await fetch("https://neoconnect-yui5.onrender.com/auth/login",{
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body: JSON.stringify({
     email,
     password
    })
   })

   const data = await res.json()

   if(data.token){

    localStorage.setItem("token",data.token)

    router.push("/")

   }else{

    setError(data.error || "Login failed")

   }

  }catch(err){

   setError("Server error")

  }

 }

return (

<div className="flex items-center justify-center min-h-screen bg-black text-white">

<div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">

<h1 className="text-3xl font-bold mb-6 text-center">
 Login
</h1>

<input
 className="border p-2 mb-4 block w-full text-black rounded"
 placeholder="Email"
 onChange={(e)=>setEmail(e.target.value)}
/>

<input
 type="password"
 className="border p-2 mb-4 block w-full text-black rounded"
 placeholder="Password"
 onChange={(e)=>setPassword(e.target.value)}
/>

<button
 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
 onClick={login}
>
 Login
</button>


{/* DEMO CREDENTIALS */}

<div className="mt-6 border-t border-gray-700 pt-4 text-sm">

<h2 className="font-semibold mb-2">
 Demo Accounts
</h2>

<p>
 <b>Staff</b> → staff@test.com / 123456
</p>

<p>
 <b>Secretariat</b> → secretariat@test.com / 123456
</p>

<p>
 <b>Case Manager</b> → manager@test.com / 123456
</p>

</div>

</div>

</div>

)
}