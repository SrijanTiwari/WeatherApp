const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const express = require('express')

const app = express()
app.set('view engine', 'hbs')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))


app.get('', (req, res)=>{
    res.render('index', {
        name: 'srijan',
        title: 'weather'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'srijan',
        title: 'weather'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
      message:'you need help?',
      title:'Help page'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'provide an address'
        })
    }

    else{
        geocode(req.query.address, (error, {latitude, longitude, place}={})=>{
            if(error){
                return res.send(error)
            }
        
          
            forecast(latitude,longitude,(error, foredata) =>{
                if(error){
                    return res.send(error)
                }
                res.send({
                    address: place,   
                    temperature:foredata.temperature,
                    cloud:foredata.cloudcover})
         
            })
            
            
        })
    }
    
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'provide a search term'
        })
    }
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        message:'article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title:'404',
        message:'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})