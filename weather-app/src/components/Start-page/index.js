
import React, {useState} from 'react'
import axios from 'axios'
const Startpage = () => {
    
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
   

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lang=se&units=metric&q=${location}&appid=bcea789825d8474a842b9612811b70e3`;
    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(apiUrl).then((response) => {
                setData(response.data)
                console.log(response.data)
                
        })
        
    }
}       



        
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
            onKeyUp={searchLocation}
            placeholder="Sök stad"></input>
            
            <h3>RESULTAT</h3>
            <div id="location-info">
      
                
                    <h3>{data.name}</h3>
                    {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"></img>: null}
                    {data.main ? <p>Temperatur: {data.main.temp}°C</p> : null}
                    {data.weather ? <p>Är just nu: {data.weather[0].description}</p>: null}
                    {data.main ? <p>Luftfuktighet: {data.main.humidity}</p> : null}
                    {data.wind ? <p>Vindhastighet: {data.wind.speed}</p> : null}
                    </div>
                
                
            </div>
        
        </>
        
    )
} 
export default Startpage;