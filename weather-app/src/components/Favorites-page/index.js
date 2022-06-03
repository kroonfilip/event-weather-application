import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

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
                    
                    <input type="image" className="bin" alt='Delete' src='bin-closed.png' value="Delete"
                    onMouseOver = {e => e.currentTarget.src = 'bin-open.png'} 
                    onMouseLeave = {e => e.currentTarget.src = 'bin-closed.png'}
                    onClick={e =>{removeItem(e,item.id); notify()}}></input>
                    <img src={item.img} className="w3-round" alt="event-poster"></img>
                    <p>{item.date}</p>
                    <p>{item.location}</p>                    
                    <p>{item.event}</p>
                    <p>{item.venue}</p>
                    <a href={item.link} target="_blank" rel='noreferrer' className="w3-button w3-black w3-hover-white" >Book here</a>

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
            {printFavorites()}
        </ul>
        <ToastContainer/>
    </div>
)
}

export default Favorites;