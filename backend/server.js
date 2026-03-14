require("dotenv").config()
const cron = require("node-cron")
const Case = require("./models/Case")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const caseRoutes = require("./routes/cases")
const authRoutes = require("./routes/auth")
const pollRoutes = require("./routes/polls")

app.use("/cases", caseRoutes)
app.use("/auth", authRoutes)
app.use("/polls",pollRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Escalation rule: check every hour
cron.schedule("0 * * * *", async () => {

 console.log("Checking escalation rules...")

 const sevenDaysAgo = new Date()
 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

 try {

  await Case.updateMany(

   {
    status: { $ne: "Resolved" },
    createdAt: { $lt: sevenDaysAgo }
   },

   {
    status: "Escalated"
   }

  )

 } catch(err) {

  console.log(err)

 }

})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`)
})