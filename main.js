const apiKey = "d5225ce844a80bf1ffa5ecd14312e902"
// const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
// let city = "chicago"
// fetch ( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}` )
//     .then (res => res.json() )
//     .then (data => {
//         let p = document.querySelector('#test2')
//         p.innerHTML = data.main.temp
//     })
function KtoF (K) {
    let F = ((K - 273.15) * 9/5 + 32).toFixed(1)
    return F
}

let searchBar = document.querySelector("#cityform")
let input = document.querySelector("#form1")
let temp = document.querySelector("#temp")
let tempMax = document.querySelector("#tempMax")
let tempMin = document.querySelector("#tempMin")
let description = document.querySelector("#description")
let humidity = document.querySelector("#humidity")
let cityDisplay = document.querySelector("#cityDisplay")

searchBar.addEventListener( 'submit', ( e ) => {
    // prevent page refresh
    e.preventDefault();
    var city = input.value;
    fetch ( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}` )
        .then (res => res.json() )
        .then (data => {
            console.log(data)
            temp.innerHTML = KtoF(data.main.temp) + " °F"
            tempMax.innerHTML = KtoF(data.main.temp_max) + " °F"
            tempMin.innerHTML = KtoF(data.main.temp_min) + " °F"
            let descriptionList = data.weather[0].description.replace('_', ' ').split(' ')
            // I got this little trick from freeCodeCamp to Title case the forecast
            for ( let i = 0; i < descriptionList.length; i++) {
                descriptionList[i] = descriptionList[i].charAt(0).toUpperCase() + descriptionList[i].slice(1)
            }
            description.innerHTML = descriptionList.join(' ')
            humidity.innerHTML = data.main.humidity + "%"
            cityDisplay.innerHTML = data.name + ", " + data.sys.country
        })
} )

