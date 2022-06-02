import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import './index.css';

const Startpage = () => {
    
    const [weather, setWeather] = useState([])
    const [event, setEvent] = useState([]) 
    const location = useRef()
    const date = useRef()
    const eventRef = useRef()
    const [save, setSave] = useState([])
    
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
            <li>
                
                <input type="button" value="Save"
                onClick={(e) =>{setSave([...save,{
                    
                    date:date.current.value,
                    location:location.current.value,
                    event:item.name,
                    link: item.url}])}} >

                </input>
                <img src={item.images[3].url} className="w3-round" alt="event-poster"></img>
                <p span className="bolded">{item.name}</p>
                <p>Venue: {item._embedded.venues[0].name}</p>
                <a href={item.url} className="w3-button w3-black w3-hover-white" target="_blank">Book here</a>
            </li>
        )
    }):""
    
    return renderEvent
   
    }catch(err) {
        return (
            <li>No events on {date.current.value}</li>
        )
    }

}  






useEffect(() => {
    saveLocalItems()
    
}, [save])


useEffect(() => {
    getLocalItems()
  }, []);

  const saveLocalItems = () => {
    if(save.length!== 0){       
      localStorage.setItem('save', JSON.stringify(save))
    }   
    }
const getLocalItems = () => {
    if(localStorage.getItem('save') === null){
        localStorage.setItem('save', JSON.stringify([]));
    }else {
        let saveLocal = JSON.parse(localStorage.getItem('save'));
        setSave(saveLocal)
    }
    }


    return (
        <>
        <div className="start-page">
            <h1><span className="bolded">THE EVENT AND WEATHER APP</span></h1>
            <p>
                <span className="info">A tool used to retrieve a one day weather forecast and upcoming events in any city.</span>
            </p>
            <form action="#" onSubmit={searchFunction}>
                <div className="search-padding">
                    <label for="location">Enter city:</label>
                </div>
                <div className="search-padding">
                    <input type="text" 
                    id ="location" ref={location} 
                    placeholder="Enter city"></input>
                </div>
                
                <div className="search-padding">
                    <label for="date">Date:</label>
                </div>
                <div className="search-padding">
                    <input type="date" id="date" ref={date}
                        min={dateToday.toISOString().split('T')[0]} max={endDate.toISOString().split('T')[0]}></input>
                </div>
                <div className="search-padding-button">
                    <input className="w3-amber w3-button" type='submit' value="Search"/>
                </div>
            </form>
            <h3><span className="bolded">Weather</span></h3>
            <div id="location-info">
                <div id="weather">
                    {date.current ? <p id="chosen-date"> {date.current.value}</p> :null} 
                    {weather.temp ? <p id='temp'> {weather.temp.day.toFixed()}°C</p>:null}
                    {weather.temp ? <p id='min-max-temp'> min {weather.temp.min.toFixed()}°C, max {weather.temp.max.toFixed()}°C</p>:null}
                    {weather.weather ? <div><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='weather icon'></img></div>:null }
                    {weather.weather ?<p id='description'> {weather.weather[0].main} ({weather.weather[0].description})</p>:null}
                </div>
                <div id="event">
                    <h3><span className="bolded">Events</span></h3>
                    <ul className="w3-ul w3-border">
                        {renderEvent()}
                    </ul>
                </div> 
            </div>
        </div>
        
        </>
        
    )
} 
export default Startpage;