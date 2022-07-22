let citySearchForm = document.getElementById('citySearch')
citySearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let formData = new FormData(citySearchForm)
    let cityInput = formData.get('cityInput')
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=9ff0727737e5c6bf9edec7771cb034fb`)
            let data = await response.json()
            console.log(data)
            DisplayResults(data)
        } catch (err) {
            console.error(err);
            console.error("Hey something went wrong");
        } finally {
            console.log("THE REQUEST HAS FINISHED");
        }
    }
    fetchWeatherData()
})

let insertEl = document.getElementById('insert')
function DisplayResults(forecast) {
    let cityName = forecast['name']
    let highTemp = (forecast['main']['temp_max']- 273.15)* 9/5 + 32
    let lowTemp = (forecast['main']['temp_min']- 273.15) * 9/5 + 32
    let forecastDescription = forecast['weather'][0]['description']
    let forecastHumidity = forecast['main']['humidity']
    let insertHTML = `
    <div class="d-flex justify-content-center pt-5 pb-5">
    <h1>
        ${cityName}
    </h1>
</div>
<div class="d-flex justify-content-center">
    <div class="card bg-light mb-3 mr-3"style="width: 15rem; height:15rem">
        <div class="card-header d-flex justify-content: space-around"><img src="./sun_icon.svg" height="80px" width="80px"><h1>High</h1></div>
        <div class="card-body">
            <p class="card-text d-flex justify-content-center">${highTemp.toFixed()}\u00B0</p>
        </div>
        </div>
    <div class="card bg-light mb-3 mr-3" style="width: 15rem; height: 15rem;">
        <div class="card-header d-flex justify-content-center"><img src="./low_icon.svg" height="80px" width="85px"><h1>Low</h1></div>
        <div class="card-body">
            <p class="card-text d-flex justify-content-center">${lowTemp.toFixed()}\u00B0</p>
        </div>
        </div>
        <div class="card bg-light mb-3 mr-3" style="width: 15rem; height: 15rem;">
            <div class="card-header d-flex justify-content-center"><img src="./forecast_icon.svg" height="80px" width="75px"><h1>Forecast</h1></div>
            <div class="card-body">
                <p class="card-text d-flex justify-content-center">${forecastDescription}</p>
            </div>
            </div>
            <div class="card bg-light mb-3" style="width: 15rem; height: 15rem;">
                <div class="card-header d-flex justify-content-center"><img src="./humidity_icon.svg" height="75px" width="75px"><h1>Humidity</h1></div>
                <div class="card-body">
                    <p class="card-text d-flex justify-content-center">${forecastHumidity}%</p>
                </div>
                </div>
              </div>  
                
    `
    insertEl.innerHTML = insertHTML

}
