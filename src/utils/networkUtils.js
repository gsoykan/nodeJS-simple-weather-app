const request = require('request')
const mapboxAccessToken = 'pk.eyJ1IjoiZ3NveWthbiIsImEiOiJjanZleGNpZHQwcDRxNDFsY2k0dm8zMTB6In0.XTW_8v_MIcnxvJaZ_Kv8Og'
const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapboxAccessToken}&limit=1`
const url = 'https://api.darksky.net/forecast/04734f76cd75299b1ae0dd3d4cdb5272/37.8267,-122.4233?lang=tr'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + `.json?access_token=${mapboxAccessToken}&limit=1`
    request({ url: url, json: true }, (error, response, body) => {
        if (error) {
            callback(error, undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const forecast = (location, callback) => {
    const url = `https://api.darksky.net/forecast/04734f76cd75299b1ae0dd3d4cdb5272/${encodeURIComponent(location.latitude)},${encodeURIComponent(location.longitude)}?lang=tr`
    console.log(url)
    request({ url: url, json: true }, (error, response, body) => {
        if (error) {
            callback(error, undefined)
            // we can have 1 more test error case actually
        } else {
            callback(undefined, body)
        }
    })
}

const weatherCall = (address, callback) => {
    if (!address) {
        console.log('Please provide an address')
        callback('Please provide an address', undefined)
    } else {
        geocode(address, (error, data) => {
            if (error) {
                callback({ error: 'error' }, undefined)
                return console.log('error', error)
            }
            forecast(data, (error, forecastData) => {
                if (error) {
                    callback({ error: 'forecast error' }, undefined)
                    return console.log('forecast error', error)
                }
                console.log('forecast Data', forecastData)
                callback(undefined, { forecast: forecastData })
            })

        })
    }
}

module.exports = {
    weatherCall: weatherCall
}