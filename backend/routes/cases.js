const upload = require("../middleware/upload")
const express = require("express")
const router = express.Router()

const Case = require("../models/Case")
const generateTrackingId = require("../utils/generateTrackingId")
const auth = require("../middleware/auth")
router.post("/submit",auth(["staff","admin"]), async (req,res)=>{

 try{

  const lastCase = await Case.findOne().sort({ createdAt:-1 })

  let nextNumber = 1

  if(lastCase && lastCase.trackingId){
   const lastNumber = parseInt(lastCase.trackingId.split("-")[2])
   nextNumber = lastNumber + 1
  }

  const year = new Date().getFullYear()
  const trackingId = `NEO-${year}-${String(nextNumber).padStart(3,"0")}`

  const newCase = new Case({
   trackingId,
   ...req.body
  })

  await newCase.save()

  res.json(newCase)

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
// assign case to case manager
router.put("/assign/:id",auth(["secretariat","admin"]), async (req,res)=>{

 try{

  const {caseManagerId} = req.body

  const updatedCase = await Case.findByIdAndUpdate(
   req.params.id,
   {
    assignedTo: caseManagerId,
    status: "Assigned"
   },
   { new: true }
  )

  res.json(updatedCase)

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
// update case status
router.put("/status/:id", auth(["case_manager"]),async (req,res)=>{

 try{

  const {status} = req.body

  const updatedCase = await Case.findByIdAndUpdate(
   req.params.id,
   { status },
   { new: true }
  )

  res.json(updatedCase)

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
router.put("/notes/:id", auth(["case_manager"]),async(req,res)=>{

 try{

  const {notes} = req.body

  const updated = await Case.findByIdAndUpdate(

   req.params.id,
   {notes},
   {new:true}

  )

  res.json(updated)

 }catch(err){

  res.status(500).json({error:err.message})

 }

})
// get all cases
router.get("/all", auth(["secretariat","admin"]),  async(req,res)=>{

 try{

  const cases = await Case.find().populate("assignedTo")

  res.json(cases)

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
// get cases assigned to a case manager
router.get("/my/:managerId", auth(["case_manager","staff","admin","secretariat"]), async (req,res)=>{

 try{

  const cases = await Case.find({
   assignedTo: req.params.managerId
  })

  res.json(cases)

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
router.get("/check-escalations", async (req,res)=>{

 try{

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const cases = await Case.updateMany(
   {
    status: "Assigned",
    createdAt: { $lt: sevenDaysAgo }
   },
   {
    status: "Escalated"
   }
  )

  res.json({message:"Escalation check complete"})

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
// get resolved cases (public hub)
router.get("/resolved", async (req,res)=>{

 try{

  const cases = await Case.find({
   status: "Resolved"
  })

  res.json(cases)

 }catch(err){
  res.status(500).json({error:err.message})
 }

})
router.get("/", async (req,res)=>{

 try{

  const cases = await Case.find().populate("assignedTo")

  res.json(cases)

 }catch(err){

  res.status(500).json({error:err.message})

 }

})


router.get("/analytics/departments", async (req,res)=>{

 try{

  const data = await Case.aggregate([
   {
    $group:{
     _id:"$department",
     count:{ $sum:1 }
    }
   }
  ])

  res.json(data)

 }catch(err){

  res.status(500).json({error:err.message})

 }

})
router.get("/analytics/categories", async (req,res)=>{

 try{

  const data = await Case.aggregate([
   {
    $group:{
     _id:"$category",
     count:{ $sum:1 }
    }
   }
  ])

  res.json(data)

 }catch(err){

  res.status(500).json({error:err.message})

 }

})
router.get("/analytics/status", async (req,res)=>{

 try{

  const data = await Case.aggregate([
   {
    $group:{
     _id:"$status",
     count:{ $sum:1 }
    }
   }
  ])

  res.json(data)

 }catch(err){

  res.status(500).json({error:err.message})

 }

})
router.get("/analytics/hotspots", async (req,res)=>{

 try{

  const data = await Case.aggregate([
   {
    $group:{
     _id:{
      department:"$department",
      category:"$category"
     },
     count:{ $sum:1 }
    }
   },
   {
    $match:{
     count:{ $gte:5 }
    }
   }
  ])

  res.json(data)

 }catch(err){

  res.status(500).json({error:err.message})

 }

})
router.get("/track/:id", async(req,res)=>{

const caseData = await Case.findOne({
 trackingId: req.params.id
})

res.json(caseData)

})

module.exports = router