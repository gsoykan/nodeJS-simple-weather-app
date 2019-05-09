console.log('APP IN APP JS IN WEB SERVER')
// this is client side JS

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherURL = '/weather?address='

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //alert(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(weatherURL + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = ''
            if (data.error) {
                messageTwo.textContent = data.error
            } else {
                messageTwo.textContent = data.daily.summary
            }
        })
    })
})