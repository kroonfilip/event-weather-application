import React, {useState, useRef} from 'react'
import axios from 'axios'
import {Route, Link} from 'react-router-dom'

const Startpage = () => {
    
    const [weather, setWeather] = useState([])
    const [event, setEvent] = useState([]) 
    const location = useRef()
    const date = useRef()
    
    const dateToday = new Date()

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7);


    const searchFunction = (e) => {
        e.preventDefault()
        if (location.current.value !=="" && date.current.value !== ""){
            let diffDays = getDiffDays(date.current.value)
            const apiUrlGeoLocation = 'http://api.openweathermap.org/geo/1.0/direct?q='+location.current.value+'&appid=bcea789825d8474a842b9612811b70e3'
            axios.get(apiUrlGeoLocation).then((response) => {
                var lat = response.data[0].lat
                var long = response.data[0].lon
                getWeather(lat, long, diffDays)  
            })
            getEvents()
            

        } else {
            alert("You need to give location and date to be able to get events!")
        }
}

function getWeather(lat, long, diff) {
    const apiUrlWeather = 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+long+'&units=metric&lang=en&exclude=hourly,minutely&appid=7b876dba81adf23c3ab28f297a4ac7aa'
    axios.get(apiUrlWeather).then((response) => {
        var weatherDaily = response.data.daily[diff]
        setWeather(weatherDaily)
        console.log(weatherDaily)
})}

function getEvents(){
    let startDateWithTime = date.current.value + 'T00:01:00Z'
    let endDateWithTime = date.current.value + 'T23:59:59Z'
    const apiUrlTicketmaster = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+location.current.value+'&startDateTime='+startDateWithTime+'&endDateTime='+endDateWithTime+'&apikey=4Kl2lBFXuu3mkGzmE4P6VXRoXqfgar8O'
    axios.get(apiUrlTicketmaster).then((answer) => {
        try {
        var events = answer.data._embedded;
        console.log('I getEvents:')
        console.log(events)
        setEvent(events)
        
        }
        catch(err){
        }
    })
}


function getDiffDays(choosenDate) {
    let convertedDate = new Date(choosenDate)
    let difference = convertedDate.getTime() - dateToday.getTime();
    var DifferenceInDays = difference / (1000 * 3600 * 24);
    return Math.ceil(DifferenceInDays);

}
   
function renderEvent(){
    try {
    var renderEvent = event.events ? event.events.map(item => {
        return (
            <li><p>{item.name}</p><p>{item._embedded.venues[0].name}</p><a src={item.url}>Book here</a>/<img src={item.images[3].url} alt="event-poster"></img></li>
        )
    }):""
    return renderEvent
    }catch(err) {
        return (
            <li>No events on {date.current.value}</li>
        )
    }

}   

    return (
        <>
        <div className="start-page">
            <h1><span className="bolded">YOUR EVENT AND WEATHER GUIDE</span></h1>
            <p>
                <span className="info">A tool used for retrieving a seven day weather forcast and upcoming events in an optional city.</span>
            </p>
            <h4>Enter city</h4>
            <form action="#" onSubmit={searchFunction}>
            <input type="text" 
            id ="location" ref={location} 
            placeholder="Enter city"></input>
            <label for="start">Start date:</label>

            <input type="date" id="date" ref={date}
                min={dateToday.toISOString().split('T')[0]} max={endDate.toISOString().split('T')[0]}></input>
            <button type="submit" >
                
            </button>
            </form>
            <h3 className='bolded'>RESULT</h3>
            <div id="location-info">
                <div id="weather">
                {weather.weather ? <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='weather icon'></img>:null }
                {weather.temp ? <p> {weather.temp.day.toFixed()}°C</p>:null}
                {weather.weather ?<p>{weather.weather[0].description}</p>:null}
                </div>
                <div id="event">
                <h3>Event:</h3>
                <ul className='list-of-events'>
                {renderEvent()}
                </ul>
                    
                </div> 
            </div>
                
                
        </div>
        
        </>
        
    )
} 
export default Startpage;