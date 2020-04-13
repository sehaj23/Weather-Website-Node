

console.log("Client side JS")





const weatherform = document.querySelector('form')
const message1 = document.querySelector("#message_1")
const message2 =document.querySelector("#message_2")
const message3 =document.querySelector("#message_3")



weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
  
  
  
    const city = document.getElementById("city").value
    const country = document.getElementById("country").value
    
   
    fetch("/weather?address="+city+"&country="+country).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
            message2.textContent=""
            message3.textContent=""
        }else{
            message1.textContent="City :"+data.City
            message2.textContent="Temperature :"+data.Temperature
            message3.textContent="Condition :"+data.Condition
        }
    })
})
})