import React, {useState} from 'react'
import axios from 'axios'

const Startpage = () => {
    
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    let place = 'Kazakstan'
    const apiUrlGeoLocation = 'http://api.openweathermap.org/geo/1.0/direct?q='+place+'&appid='
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
        
    }
}       
    
    var days = {weekday: 'long', month: 'long', day: 'numeric'};
    
    var renderApiDataForWeek = data.daily 
        ? data && data.daily.map(item =>{
                return (
                <React.Fragment key={item}>
                <p>Datum: {new Date(item.dt * 1000).toLocaleDateString("se", days)}</p>
                <img src = {`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather-icon"></img>
                <p>Temperatur: {item.temp.day}°C</p>
                <p>{item.weather[0].description}</p>
                
                </React.Fragment>
                )
            }) : "laddar..."
    return (
        <>
        <div className="start-page">
            <h1>Startpage</h1>
            <h2>INFO</h2>
            <p>
                TEXT MED INFORMATION
            </p>
            <h3>Ange stad</h3>
            <input type="text" 
            id ="search-field" 
            onChange={event => setLocation(event.target.value)} 
            value={location}
            onKeyUp={searchFunction}
            placeholder="Sök stad"></input>
            
            <h3>RESULTAT</h3>
            <div id="location-info">
                <div id="current-weather">
            
                    {data.current ? <img src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather icon"></img>: null}
                    {data.current ? <p>Temperatur: {data.current.temp}°C</p>: null}
                    {data.current ? <p>Är just nu: {data.current.weather[0].description}</p>: null}
                </div>

                <div id="weather-seven-days">
                <h3>7 dagar frammåt</h3>
                    {renderApiDataForWeek}
                </div> 
            </div>
                
                
        </div>
        
        </>
        
    )
} 
export default Startpage;