const path = require("path")
const express = require("express")
const hbs = require("hbs")
const Case = require("../node_modules/case")
const weather = require("./weather")
const port = process.env.PORT || 3000


// define paths for Express confid
const publicdirectorypath = path.join(__dirname,"../public")
const dynamicdirectory = path.join(__dirname,"../templates/views")
const partialsdirectory = path.join(__dirname,"../templates/partials")
const app = express()

//setup handle bar engines and views location
app.set('view engine', 'hbs')
app.set('views',dynamicdirectory)
hbs.registerPartials(partialsdirectory)

// setting up static directory
app.use(express.static(publicdirectorypath))

app.get("",(req,res)=>{
  
    res.render('index',{
        name:"Weather",
        age:22,
        owner:"sehaj"
    })
    

})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide the address!"
        })
    }else if(req.query.address && req.query.country){

    weather.getweather(Case.capital(req.query.address),(req.query.country).toUpperCase(),(error,data)=>{
        if(error){
           return res.send({error})
        }
      return  res.send({
                    City:Case.capital(req.query.address),
                    Temperature:data.Temperature,
                    Condition:data.Condition
                    
        })
    })
}
    // res.render('weather',{
    //     name:"Weather",
    //     owner:"sehaj"


    // })

})
app.get("/about",(req,res)=>{
    res.render('about',{
        name:"About Us",
        owner:"sehaj"


    })

})
app.get("/help",(req,res)=>{
    res.render("help",{
        name:"Help",
        owner:"sehaj"
    })
})
app.get("/*",(req,res)=>{
    res.render("error",{
        errorType: "Sorry page not Found",
        owner:"Sehaj"
    })
})


app.listen(port,()=>{
    console.log("Server is Running")
})

