

const Startpage = () => {

    return (
        <>
        <div className="start-page">
            <h1>Startpage</h1>
            <h2>INFO</h2>
            <p>
                TEXT MED INFORMATION
            </p>
            <h3>Ange stad</h3>
            <input type="text" id ="search-field" placeholder="Sök stad"></input>
            <h3>RESULTAT</h3>
            <ul id="item-list">

            </ul>
        </div>
        </>
    )
} 
export default Startpage;