const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode') 
const forecast = require ('./utils/forecast') 

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handbar
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Andrew'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Andrew'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        error:'this is a error message',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

        //place
    geocode(req.query.adress,(error, {latitude,longitude,location}={}) =>{
        if(error){
            return res.send({error})
        }   

        //latitude,longitude
        forecast(latitude, longitude, (error, forecast_data)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecast_data,
                location,
                adress: req.query.adress
            })  
        })
    })
})



app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    req.query
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message:'Documentation help not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message:'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})