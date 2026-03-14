
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 PieChart,
 Pie,
 Cell
} from "recharts"

export default function Home(){
  const router = useRouter()

useEffect(()=>{

 const token = localStorage.getItem("token")

 if(!token){
  router.push("/login")
 }

},[])

 const [departments,setDepartments] = useState<any[]>([])
 const [categories,setCategories] = useState<any[]>([])
 const [hotspots,setHotspots] = useState<any[]>([])
 const [totalCases,setTotalCases] = useState(0)

 useEffect(()=>{

  fetch("https://neoconnect-yui5.onrender.com/cases/analytics/departments")
   .then(res=>res.json())
   .then(data=>{
    const formatted = data
     .filter((d:any)=>d._id)
     .map((d:any)=>({
      name:d._id,
      value:d.count
     }))

    setDepartments(formatted)

    const total = formatted.reduce((sum:any,d:any)=>sum + d.value,0)
    setTotalCases(total)
   })

  fetch("https://neoconnect-yui5.onrender.com/cases/analytics/categories")
   .then(res=>res.json())
   .then(data=>{
    const formatted = data
     .filter((c:any)=>c._id)
     .map((c:any)=>({
      name:c._id,
      value:c.count
     }))
    setCategories(formatted)
   })

  fetch("https://neoconnect-yui5.onrender.com/cases/analytics/hotspots")
   .then(res=>res.json())
   .then(data=>setHotspots(data))

 },[])

 const COLORS = ["#8884d8","#82ca9d","#ffc658","#ff7f50"]

 return(

  <div className="p-10 bg-black min-h-screen text-white">

   <h1 className="text-3xl font-bold mb-8">
    NeoConnect Analytics Dashboard
   </h1>


   {/* Summary Cards */}

   <div className="grid grid-cols-3 gap-6 mb-10">

    <div className="bg-gray-800 p-6 rounded text-center">
     <p className="text-gray-400 text-sm">
      Total Cases
     </p>
     <p className="text-3xl font-bold">
      {totalCases}
     </p>
    </div>

    <div className="bg-gray-800 p-6 rounded text-center">
     <p className="text-gray-400 text-sm">
      Departments
     </p>
     <p className="text-3xl font-bold">
      {departments.length}
     </p>
    </div>

    <div className="bg-gray-800 p-6 rounded text-center">
     <p className="text-gray-400 text-sm">
      Hotspots
     </p>
     <p className="text-3xl font-bold text-red-400">
      {hotspots.length}
     </p>
    </div>

   </div>


   {/* Charts */}

   <div className="grid grid-cols-3 gap-8">

    {/* Department Chart */}

    <div className="border border-gray-600 p-4 rounded">

     <h2 className="mb-4 font-semibold">
      Cases by Department
     </h2>

     <ResponsiveContainer width="100%" height={220}>
      <BarChart data={departments}>
       <XAxis dataKey="name" stroke="#fff"/>
       <YAxis stroke="#fff"/>
       <Tooltip/>
       <Bar dataKey="value" fill="#8884d8"/>
      </BarChart>
     </ResponsiveContainer>

     <div className="mt-4 text-sm text-gray-300">
      {departments.map((d,i)=>(
       <p key={i}>
        {d.name} — {d.value} cases
       </p>
      ))}
     </div>

    </div>


    {/* Category Chart */}

    <div className="border border-gray-600 p-4 rounded">

     <h2 className="mb-4 font-semibold">
      Cases by Category
     </h2>

     <ResponsiveContainer width="100%" height={220}>
      <PieChart>
       <Pie
        data={categories}
        dataKey="value"
        nameKey="name"
        outerRadius={80}
       >
        {categories.map((entry,index)=>(
         <Cell key={index} fill={COLORS[index % COLORS.length]}/>
        ))}
       </Pie>
       <Tooltip/>
      </PieChart>
     </ResponsiveContainer>

     <div className="mt-4 text-sm text-gray-300">
      {categories.map((c,i)=>(
       <p key={i}>
        {c.name} — {c.value} cases
       </p>
      ))}
     </div>

    </div>


    {/* Hotspots */}

    <div className="border border-gray-600 p-4 rounded">

     <h2 className="mb-4 font-semibold">
      Hotspot Alerts
     </h2>

     {hotspots.length === 0 ? (
      <p>No hotspots detected</p>
     ) : (
      hotspots.map((h,i)=>(
       <div key={i} className="bg-red-900 border border-red-500 p-3 rounded mb-2">
        {h._id.department} - {h._id.category} : {h.count}
       </div>
      ))
     )}

    </div>

   </div>

  </div>

 )
}