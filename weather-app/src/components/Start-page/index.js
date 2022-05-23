
import React, {useState} from 'react'
import axios from 'axios'
const Startpage = () => {
    
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
   
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=metric&lang=se&exclude=hourly,minutely&appid=7b876dba81adf23c3ab28f297a4ac7aa`
    //const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&lang=se&units=metric&appid=bcea789825d8474a842b9612811b70e3`;
    const searchFunction = (event) => {
        if (event.key === 'Enter') {
            axios.get(apiUrl).then((response) => {
                setData(response.data)
                console.log(response.data)
                
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
        <div className="container start-page">
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