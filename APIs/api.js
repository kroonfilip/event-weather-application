
import { ticketmaster, openWeather } from './safety.js' //Detta funkar inte...


//Ticketmaster - tar ut 20 *senaste* eventen i en specifik stad.  
$.ajax({ //Gör en request till API:et
    type: 'GET',
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?city=Malmo&apikey='+ticketmaster,
    async: true,
    dataType: "json",
    success: function(data){
        console.log(data)
    }, 
    error: function(error) { //Hanterar om vi får error av API:et. 
        console.log(error)

    }
})

//OpenWeather - Geocoding call
let place = 'Malmo'

$.ajax({ //Gör en request till API:et
    type: 'GET',
    url: 'http://api.openweathermap.org/geo/1.0/direct?q='+place+'&appid='+openWeather,
    success: function(data){
        $.each(data, function(i, item) {
            let lat = item.lat
            let long = item.lon
            $.ajax({
                type: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid='+openWeather,
                success: function(data){
                    console.log(data.list)
                },
                error: function(error){
                    console.log(error)
                }
            })
        })
    }, 
    error: function(error) { //Hanterar om vi får error av API:et. 
        console.log(error)
    }
})

