import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <div className="w3-display-container w3-animate-opacity">
                    <div className="image-parent">
                        <img className="sky" src="sky.jpg" alt="sky" style={{width: "100%", minHeight: 350, maxHeight: 600,}}/>
                        <Link to="/">
                            <img className="logo" src="logo.png" alt="logo" style={{minHeight: 175, maxHeight: 200,}}/>
                        </Link>
                    </div>
                    <div className="w3-container w3-display-bottomleft w3-margin-bottom">  
                        <div className="guide w3-amber w3-xlarge" title="Info">YOUR DAILY GUIDE</div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;