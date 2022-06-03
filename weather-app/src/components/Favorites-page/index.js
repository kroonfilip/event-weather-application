import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {

    const [eventItems, SetEventItems] = useState(JSON.parse(localStorage.getItem('save')))
    
    const notify = () => toast.info("Event removed from favorites!");
        
    function printFavorites() {
        /*
        The following function maps the content in localstorage and displays it 
        on the website.
        */
        
        var printItems = eventItems.map((item) => {
            return (
                <li key={item.id}>
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                    <img src={item.img} className="w3-round" alt="event-poster"></img>
                    <p>{item.event}</p>
                    <a href={item.link} target="_blank">Book here</a>
                    <input type="image" src='bin-closed.png' value="Delete"
                    onMouseOver = {e => e.currentTarget.src = 'bin-open.png'} 
                    onMouseLeave = {e => e.currentTarget.src = 'bin-closed.png'}
                    onClick={e =>{removeItem(e,item.id); notify()}}></input>
                </li>
            )
        })
        return printItems
    }



    function removeItem(e, id) {
    /*
    The following function filters the items in the array 
    and deletes the saved event from localstorage.
    */
        var eventFilter = eventItems.filter(function(item){
            return id !== item.id
        })
        localStorage.setItem('save', JSON.stringify(eventFilter))
        SetEventItems(eventFilter)
    }
       
    return ( //returns and renders the components of the site.
        <div className="favorites">
            <h1 className='w3-center'>Favorites</h1>
            <h3>Your saved events:</h3>
            <ul id="saved-list">
                <p>{printFavorites()}</p>
            </ul>
            <ToastContainer/>
        </div>
    )
}

export default Favorites;