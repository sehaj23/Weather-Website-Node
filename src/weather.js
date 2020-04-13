const request = require("request")
const chalk = require("chalk")
const fs = require("fs")




const LoadCityList=()=>{

    try {
        
        const databuffer = fs.readFileSync("./city.list.json");
        const  dataJSON = databuffer.toString();
      // console.log(dataJSON)
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}






const getweather=(CityName,CountryCode,callback)=>{

    

    const cities = LoadCityList()
  
   
    const RequestedCity = cities.filter((city) => city.name === CityName && city.country === CountryCode)

    
    
    if(RequestedCity.length === 0 ){
        callback("Unable to find the City",undefined)

    }else{
        const id = RequestedCity[0].id
      
    
    
        
    const Weatherurl = "https://api.openweathermap.org/data/2.5/weather?id=" + encodeURIComponent(id) + "&appid=6b8630e18537115c76c10d09f8aa7ee3"
    request({url:Weatherurl},(error,response)=>{
        if(error){
            callback("Sorry! Unable to Connect to Weather Services!",undefined)
        }else if(response.body.error){
            callback("Unable to find Location!!",undefined)
    
        }
        else{
                   const WeatherObject = JSON.parse(response.body)
                  

                   const celsius = (WeatherObject.main.temp - 273).toFixed(2)
                   const farhenit= ((celsius * 9/5)+32).toFixed(2)
                  
                 // console.log(WeatherObject)

              //  callback(undefined,'\n\t~~~~~~~~~~~ Weather Forecast ~~~~~~~~~~')

            //  callback(undefined,(chalk.blue('\tCity: '), chalk.redBright.bold(CityName)))
             //   callback(undefined,(chalk.blue('\tCountry: '), chalk.redBright.bold(CountryCode)))
           // callback(undefined,(chalk.blue('\tCondition: '), chalk.redBright.bold(WeatherObject.weather[0].description)))
                callback(undefined,{Temperature:farhenit + '°F / ' + celsius + '°C',
                                            Condition:WeatherObject.weather[0].description})
                
        
                  
        }

    })
    }

    
}
   

module.exports.getweather = getweather;

