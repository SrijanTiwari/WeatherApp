const request = require('request')
// const geocode = require('./utils/geocode')


const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a441183fd920b48e915e0a0a2fb0e795&query='+ latitude + ',' + longitude +'?units=m'
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('cannot connect to server', undefined)
        }else if(body.error){
            callback('cannot find location', undefined)
        }
        else{
            callback(undefined, {
                temperature: body.current.temperature,
                cloudcover:body.current.cloudcover
            })
        }
    })
}

module.exports = forecast
