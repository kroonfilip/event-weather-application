import { ticketmaster } from './safety.js'

console.log(ticketmaster)

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
