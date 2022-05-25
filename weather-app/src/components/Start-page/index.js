import React, {useState} from 'react'
import axios from 'axios'

const Startpage = () => {
    
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    let place = 'Malmö'
    const apiUrlGeoLocation = 'http://api.openweathermap.org/geo/1.0/direct?q='+location+'&appid='

    const searchFunction = (event) => {
        if (event.key === 'Enter') {
            axios.get(apiUrlGeoLocation).then((response) => {
                var lat = response.data[0].lat
                var long = response.data[0].lon
                const apiUrlWeather = 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+long+'&units=metric&lang=se&exclude=hourly,minutely&appid='
                axios.get(apiUrlWeather).then((response) => {
                    setData(response.data)
                    console.log(response.data)
                })
            })
            const apiUrlTicketmaster = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+location+'&apikey='
            axios.get(apiUrlTicketmaster).then((answer) => {
                console.log(answer.data)
            })
        
    }
}       
    
    var days = {weekday: 'long', month: 'long', day: 'numeric'};
    
    var renderApiDataForWeek = data.daily 
        ? data && data.daily.map(item =>{
                return (
                <React.Fragment key={item}>
                <div className="weather-one-day">
                <p><span className="bolded">Datum: {new Date(item.dt * 1000).toLocaleDateString("se", days)}</span></p>
                <img src = {`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather-icon"></img>
                <p>Temperatur: {item.temp.day}°C</p>
                <p>{item.weather[0].description}</p>
                </div>
                </React.Fragment>
                )
            }) : "laddar..."
    return (
        <>
        <div className="start-page">
            <h1><span className="bolded">YOUR EVENT AND WEATHER GUIDE</span></h1>
            <p>
                <span className="info">A tool used for retrieving a seven day weather forcast and upcoming events in an optional city.</span>
            </p>
            <h4>Enter city</h4>
            <input type="text" 
            id ="search-field" 
            onChange={event => setLocation(event.target.value)} 
            value={location}
            onKeyUp={searchFunction}
            placeholder="Enter city"></input>
            
            <h3><span className="bolded">Results</span></h3>
            <div id="location-info">
                <div id="current-weather">
            
                    {data.current ? <img src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather icon"></img>: null}
                    {data.current ? <p>Temperature: {data.current.temp}°C</p>: null}
                    {data.current ? <p>Right now: {data.current.weather[0].description}</p>: null}
                </div>

                <div id="weather-seven-days">
                <h3><span className="bolded">7 day forcast</span></h3>
                    {renderApiDataForWeek}
                </div> 
            </div>
                
                
        </div>
        
        </>
        
    )
} 
export default Startpage;