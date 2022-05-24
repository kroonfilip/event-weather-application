import { Link, NavLink } from 'react-router-dom';


const Menu = () => {
    return (
        <nav>
            <ul class>
                <a>
                    <Link to="/">
                        <li>
                        <img src="home-icon.png" alt="Home icon" /> HOME
                        </li>
                    </Link>
                </a>
                <a>
                    <Link to="/favorites">
                        <li>
                        <img src="favorite-icon.png" alt="Favorite icon" /> FAVORITES
                        </li>
                    </Link>
                </a>
            </ul>
        </nav>
    )
}

export default Menu;