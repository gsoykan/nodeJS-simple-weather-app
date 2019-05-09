const path = require('path')
const networkUtils = require('./utils/networkUtils')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//hmtl - app.use dan sonra burası artık çağırılmıyor bunu silebiliriz reyiz  ama kalsın :) ( Statik iken index.html var iken böyleydi)
// HBS için şuan req ten veri geldiğini düşün :)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Gurkan Soykan Web App Test NODE JS',
        subtitle: 'Yeah Babe',
        creator_name: 'Gürkan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Personalite III",
        creator_name: 'Gürkan'
    })
})

//json  - array de yollasak json olarak alıyor. 
app.get('/help', (req, res) => {
    // res.send({
    //     name: 'Gurkan',
    //     age: 25
    // })
    res.render('help', {
        title: 'help title',
        helpful_text: 'Some Help Pls !',
        creator_name: 'Gürkan'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    networkUtils.weatherCall(address, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data.forecast)
        }
    })
})

// app.com olsa 
//app.com/about
//app.com/help
// multiple route muz var olsun.

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        creator_name: 'Gurkan',
        content: 'No Such Article'
    })
})

// Route Handler For Other Pages That Do Not Have Matches
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        creator_name: 'Gurkan',
        content: 'No Such Page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})