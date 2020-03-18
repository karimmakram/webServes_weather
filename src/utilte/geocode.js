const request = require('request')

const geolocation =(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FyaW1tYWtyYW0iLCJhIjoiY2s3aDBpc2hxMDR5YTNlbzI0YmdtbzR2ZCJ9.akQB1rUf8YpnlHMHsZmMXQ&limit=1'
    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback("Error to connection Network",undefined)
        }
        else if(body.features.length ===0){
            callback("Can not found location try another search",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longtude:body.features[0].center[0],
                placeName:body.features[0].place_name
            })
        }
    }
    )
}

module.exports = geolocation