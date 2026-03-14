"use client"

import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Polls(){

 const router = useRouter()

 const [polls,setPolls] = useState<any[]>([])

 useEffect(()=>{

  const token = localStorage.getItem("token")

  // ✅ redirect if not logged in
  if(!token){
   router.push("/login")
   return
  }

  fetch("https://neoconnect-yui5.onrender.com/polls/all",{
   headers:{
    Authorization:`Bearer ${token}`
   }
  })
  .then(res=>res.json())
  .then(data=>setPolls(data))

 },[])


 const vote = async(pollId:string,index:number)=>{

  const token = localStorage.getItem("token")

  await fetch(
   `https://neoconnect-yui5.onrender.com/polls/vote/${pollId}/${index}`,
   {
    method:"POST",
    headers:{
     Authorization:`Bearer ${token}`
    }
   }
  )

  location.reload()

 }


 return(

  <div className="p-10 text-white">

   <h1 className="text-3xl font-bold mb-6">
    Staff Polls
   </h1>

   {polls.map((p:any)=>{

    const chartData = {
     labels: p.options.map((o:any)=>o.text),
     datasets: [
      {
       data: p.options.map((o:any)=>o.votes),
       backgroundColor:[
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444"
       ]
      }
     ]
    }

    return(

     <div key={p._id} className="border p-6 mb-6 rounded">

      <h2 className="text-xl mb-4">{p.question}</h2>

      {p.options.map((o:any,i:number)=>(
       <button
        key={i}
        className="block bg-blue-500 px-4 py-2 mb-2 rounded"
        onClick={()=>vote(p._id,i)}
       >
        {o.text} ({o.votes})
       </button>
      ))}

      <div className="mt-6 w-64">
       <Pie data={chartData}/>
      </div>

     </div>

    )

   })}

  </div>

 )
}