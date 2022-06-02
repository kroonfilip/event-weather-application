


const Favorites = () => {
    
    
    const savedItem = JSON.parse(localStorage.getItem('save'))
/*
    const removeFav = (event) =>  {
    const oldSave = JSON.parse(localStorage.getItem('save'));

   
    const newSave = oldSave.filter(({ event: x }) => x === event);

    
    
    
    localStorage.setItem('save', JSON.stringify(newSave));
    
        }
       */
        const removeItem = (e, event) => {
            
            JSON.parse(localStorage.getItem('save')).filter(d => d !== event)
            
                let array = JSON.parse(localStorage.getItem("save"))
                array.splice(array.indexOf(event), 1)
                localStorage.setItem("save", JSON.stringify(array));
          };
    
        
        var printItems = savedItem.map(item => {
            return (
                <li>
                    
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                    <p>{item.event}</p>
                    <a href={item.link} target="_blank">Book here</a>
                    <input type="button" value="delete" onClick={e =>removeItem(e,item)}></input>
                  
                   
                </li>
            )
        })

       
    return (
        <div className="favorites">
            <h1>Favorites</h1>
            <h3>RESULTAT</h3>
            <ul id="saved-list">
                
                <p>{printItems}</p>
            </ul>
        </div>
    )
}

export default Favorites;