const express = require("express")
const router = express.Router()

const Poll = require("../models/Poll")

// create poll
router.post("/create", async(req,res)=>{

 const poll = new Poll(req.body)
 await poll.save()

 res.json(poll)

})


// get polls
router.get("/all", async(req,res)=>{

 const polls = await Poll.find()

 res.json(polls)

})


// vote
router.post("/vote/:pollId/:optionIndex", async(req,res)=>{

 const poll = await Poll.findById(req.params.pollId)

 poll.options[req.params.optionIndex].votes++

 await poll.save()

 res.json(poll)

})

module.exports = router