import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {

    const [eventItems, SetEventItems] = useState(JSON.parse(localStorage.getItem('save')))
    
    const notify = () => toast.info("Event removed from favorites!");
        
    function printFavorites() {
        
        
        var printItems = eventItems.map((item) => {
            return (
                <li key={item.id}>
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                    <p>{item.event}</p>
                    <a href={item.link} target="_blank">Book here</a>
                    <input type="button" value="delete" onClick={e =>{removeItem(e,item.id); notify()}}></input>
                    <ToastContainer/>
                  
                   
                </li>
            )
        
        })
        return printItems
    
}



function removeItem(e, id) {
    
    var eventFilter = eventItems.filter(function(item){
        return id !== item.id
    })
    localStorage.setItem('save', JSON.stringify(eventFilter))
    SetEventItems(eventFilter)
}
       
         return (
        <div className="favorites">
            <h1 className='w3-center'>Favorites</h1>
            <h3 className='w3-center'>Your favorites</h3>
            <ul id="saved-list">
                
                <p>{printFavorites()}</p>
            </ul>
        </div>
    )
}

export default Favorites;