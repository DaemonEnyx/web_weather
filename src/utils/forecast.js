const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/11bc10bfa1e3c9ab0f7dd80b4cc987a8/'+latitude+','+longitude+'?units=si'
    request({ url, json: true }, (error, {body}) =>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            //callback(response.body.error,undefined)
            console.log(response.body.error,undefined)
        }else{
            callback(undefined, (body.daily.data[0].summary+'The temperature is '+body.currently.temperature+'°, the precipProbability is '+body.currently.precipProbability+', and the pressure is '+body.currently.pressure+'. Timezone: '+body.timezone))
        }
    })

} 

module.exports = forecast