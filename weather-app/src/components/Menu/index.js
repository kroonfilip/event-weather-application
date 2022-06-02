import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Menu = () => {
    
    const menuRef = useRef(null);

    const openNav = event => {
        if (menuRef.current.classList.contains('w3-show')) {
            menuRef.current.classList.remove('w3-show')
        } else {
            menuRef.current.classList.add('w3-show')
        }
    };

    return (
        <nav>
            <div className="w3-top w3-black w3-padding-12">
                <div className="w3-bar w3-theme-d3 w3-left-align">
                    <div className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-amber w3-theme-d2" onClick={openNav}><i class="fa fa-bars"></i></div>
                    <span className="w3-right">
                        <Link to="/" className="w3-bar-item w3-button w3-hide-small w3-hover-amber">Home</Link>
                        <Link to="/favorites" className="w3-bar-item w3-button w3-hide-small w3-hover-amber">Favorites</Link>
                        <a className="w3-bar-item w3-button w3-hide-small w3-hover-amber">About</a>
                        <a className="w3-bar-item w3-button w3-hide-small w3-hover-amber">Contact</a>
                    </span>
                </div>

                <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-amber" ref={menuRef}>
                    <Link to="/" className="w3-bar-item w3-button w3-hover-amber">Home</Link>
                    <Link to="/favorites" className="w3-bar-item w3-button w3-hover-amber">Favorites</Link>
                    <a className="w3-bar-item w3-button w3-hover-amber">About</a>
                    <a className="w3-bar-item w3-button w3-hover-amber">Contact</a>
                </div>
            </div>
        </nav>
    )
}

export default Menu;