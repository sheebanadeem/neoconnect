const form = document.getElementById("loginForm")

form.addEventListener("submit", async (e)=>{

 e.preventDefault()

 const email = document.getElementById("email").value
 const password = document.getElementById("password").value

 try{

  fetch("https://neoconnect-yui5.onrender.com/auth/login"),{

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

   localStorage.setItem("userRole",data.user.role)

   window.location.href="/dashboard.html"

  }else{

   document.getElementById("error").innerText = data.error

  }

 }catch(err){

  document.getElementById("error").innerText = "Server error"

 }

})