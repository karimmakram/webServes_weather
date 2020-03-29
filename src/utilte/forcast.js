const request = require('request')

const forecast =(latitude,longtude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d4a6feee93a842a87fa1b29ebeb5d2fe/'+encodeURIComponent(latitude)+','+encodeURIComponent(longtude)+'?units=si&lang=ar'
    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback("Error to connection Network",undefined)
        }
        else if(body.error){
            callback("Error to find forcast to this location",undefined)
        }
        else{
            callback(undefined,{
                timezone:body.timezone,
                temp:body.currently.temperature,
                Probability :body.currently.precipProbability,
                summary:body.daily.data[0].summary,
                tempHigh:body.daily.data[0].temperatureHigh,
                tempLow:body.daily.data[0].temperatureLow
            })
        }
    })
}
module.exports = forecast

