import React, {useState, useRef} from 'react'
import axios from 'axios'

const Startpage = () => {
    
    const [data, setData] = useState([])
    const location = useRef()
    const date = useRef()
    
    const dateToday = new Date()

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7);
    console.log(endDate)

    const dateChoosen = '2022-05-26T11:00:00Z'


    const searchFunction = (event) => {
        event.preventDefault()
        if (location.current.value !=="" && date.current.value !== ""){
            const apiUrlGeoLocation = 'http://api.openweathermap.org/geo/1.0/direct?q='+location.current.value+'&appid=bcea789825d8474a842b9612811b70e3'
            axios.get(apiUrlGeoLocation).then((response) => {
                var lat = response.data[0].lat
                var long = response.data[0].lon
                getWeather(lat, long, dateChoosen)  
            })
            /*const apiUrlTicketmaster = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+location.current.value+'&startDateTime='+startDateWithTime+'&endDateTime='+endDateWithTime+'&apikey=4Kl2lBFXuu3mkGzmE4P6VXRoXqfgar8O'
            axios.get(apiUrlTicketmaster).then((answer) => {
                //const events = answer.data._embedded.events;
                console.log(answer.data)
            })
            */

        } else {
            alert("You need to give location and date to be able to get events!")
        }

        location.current.value= "";
        date.current.value = "";
}

function getWeather(lat, long, dateChoosen) {
    const apiUrlWeather = 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+long+'&units=metric&lang=en&exclude=hourly,minutely&appid=7b876dba81adf23c3ab28f297a4ac7aa'
    axios.get(apiUrlWeather).then((response) => {
        const DiffDays = getDiffDays('2022-05-26')
        var weatherDaily = response.data.daily[DiffDays]
        console.log(weatherDaily)
        setData(weatherDaily)
})}

function getDiffDays(otherDate) {
    const dateNew = new Date(otherDate)
    let difference = dateNew.getTime() - dateToday.getTime();
    var DifferenceInDays = difference / (1000 * 3600 * 24);
    return Math.ceil(DifferenceInDays);

}

    var img = '{<img src={`http://openweathermap.org/img/w/${data.weather.icon}.png`} alt="weather icon"></img>}'
    
    var days = {weekday: 'long', month: 'long', day: 'numeric'};

    /*
    var renderApiDataForWeek = data.daily
        ? data && data.daily.map(item =>{
                return (
                <React.Fragment key={item}>
                <div id={item.dt}>
                <p>{new Date(item.dt * 1000).toLocaleDateString("en", days)}</p>
                <img src = {`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather-icon"></img>
                <p>{item.temp.day.toFixed()}°C</p>
                <p>{item.weather[0].description}</p>
                </div>
                
                </React.Fragment>
                )
            }) : "laddar..."
            */
    return (
        <>
        <div className="start-page">
            <h1>Startpage</h1>
            <h2>INFO</h2>
            <p>
                TEXT MED INFORMATION
            </p>
            <h3>Ange stad</h3>
            <form action="#" onSubmit={searchFunction}>
            <input type="text" 
            id ="location" ref={location} 
            placeholder="Sök stad"></input>
            <label for="start">Start date:</label>

            <input type="date" id="date" ref={date}
                min={dateToday} max={endDate}></input>
            <button type="submit"  >
                
            </button>
            </form>
            <h3>RESULTAT</h3>
            <div id="location-info">
                <div id="current-weather">
                {data.temp ? <p> {data.temp.day.toFixed()}°C</p>:null}
                {data.weather ?<p>{data.weather[0].description}</p>:null}
                    {data.clouds}
                </div>

                <div id="weather-seven-days">
                <h3>7 dagar frammåt</h3>
                    
                </div> 
            </div>
                
                
        </div>
        
        </>
        
    )
} 
export default Startpage;