function generateTrackingId(count){

 const year = new Date().getFullYear()

 const number = String(count + 1).padStart(3,"0")

 return `NEO-${year}-${number}`

}

module.exports = generateTrackingId