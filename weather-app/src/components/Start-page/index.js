import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Startpage = () => {
    
    const [weather, setWeather] = useState([]); 
    const [event, setEvent] = useState([]);
    const location = useRef();
    const date = useRef();
    
    const [save, setSave] = useState([]);
    
    const dateToday = new Date(); //get's today's date.

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); //get's the date in 7 days from today 


    const searchFunction = (e) => {
        /*
        The code below is the code that runs when the user is submitting 
        the form on startpage.
        The funcion is both handeling so that it is correct input and 
        then calls different functions that calls API:er to get correct data. 
        */
        e.preventDefault();
        //Checks that both location and date is filled in:
        if (location.current.value !=="" && date.current.value !== ""){ 
            let diffDays = getDiffDays(date.current.value); //get's the diffdays
            getCoords(diffDays);
            setsEvents();
        //if the user did not fill in the form correct:    
        } else{
            alert("You need to give location and date to be able to get events!");
        }
};

function getDiffDays(choosenDate) {
    /*
    The funtions takes the users choosen date as a parameter. 
    The code below does then convert the date to ISO format. 
    Then it count's how many days it diffs from todays date and 
    returns that number of days. 
    */
    let convertedDate = new Date(choosenDate); //converts choosen date to ISO format. 
    let difference = convertedDate.getTime() - dateToday.getTime(); 
    var DifferenceInDays = difference / (1000 * 3600 * 24);
    return Math.ceil(DifferenceInDays);

};


function getCoords(diffDays) {
    /*
    The functions takes the diffdays so that it can send in that parameter to setsWeather. 
    The code below is calling the GeoLocation API and takes out both lat and long from the response.
    Then it calls the setWeather functions.  
    */

    //The Geolocation API URL:
    const apiUrlGeoLocation = 'http://api.openweathermap.org/geo/1.0/direct?q='+location.current.value+'&appid=';

    axios.get(apiUrlGeoLocation).then((response) => { //Does the call and handles the response
        try {
            let lat = response.data[0].lat;
            let long =  response.data[0].lon;
            setsWeather(lat, long, diffDays); 
        }catch {
        }
    })
};


function setsWeather(lat, long, diff) {
    /*
    The functions takes three parameter: lat, long and the diff from todays
    date and the choosen date (that it got from function getDiffDays)
    The code below calls the one call weather API and then takes out the 
    the correct weather from the response and set's the weather variable.  
    */

    //One call weather API url:
    const apiUrlWeather = 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+long+'&units=metric&lang=en&exclude=hourly,minutely&appid=';

    axios.get(apiUrlWeather).then((response) => { //Does the API call and handles the response.
        try {
            var weatherDaily = response.data.daily[diff];
            setWeather(weatherDaily); //Set's the weather variable. 
        }catch(err) {
        }
})}

function setsEvents(){
    /*
    The code below calls the Ticketmaster API and then set's
    the event variable with correct data. 
    */
    //Add's the time to the date so it is in correct format:
    let startDateWithTime = date.current.value + 'T00:01:00Z';
    let endDateWithTime = date.current.value + 'T23:59:59Z';
    
    //The Ticketmaster URL:
    const apiUrlTicketmaster = 'https://app.ticketmaster.com/discovery/v2/events.json?city='+location.current.value+'&startDateTime='+startDateWithTime+'&endDateTime='+endDateWithTime+'&apikey=';

    axios.get(apiUrlTicketmaster).then((answer) => { //Does the API call. 
        try { //Tries to set events
        var events = answer.data._embedded;
        setEvent(events); //set's events variable. 
        
        }
        catch(err){ //if error stop's the try. 
        }
    })
};
const newId = save.length > 0 ? save[save.length - 1].id + 1: 1;
const notify = () => toast.success("Added to favorites!");

function renderEvent(){   //<---- SAKNAR KOMMENTARER!
    /*
    The code below renders the event. 
    */
    
    try {
    var renderEvent = event.events ? event.events.map(item => {
        return (
            <li>
                
                <input type="image" src="fav-star.png" className="save-button" value="Save"
                onClick={() =>{notify(); setSave([...save,{
                    id: newId,
                    date:date.current.value,
                    location:location.current.value,
                    event:item.name,
                    link: item.url}])}} >

                </input>
                <ToastContainer/>
                <img src={item.images[3].url} className="w3-round" alt="event-poster"></img>
                <p span className="bolded">{item.name}</p>
                <p>Venue: {item._embedded.venues[0].name}</p>
                <a href={item.url} className="w3-button w3-black w3-hover-white" target="_blank" rel="noreferrer">Book here</a>
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