

const Favorites = () => {
    
    const savedItem = JSON.parse(localStorage.getItem('save'))
        
        var printItems = savedItem.map(item => {
            return (
                <li>
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                    <p>{item.event}</p>
                    <a href={item.link} target="_blank">Book here</a>
                  
                   
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