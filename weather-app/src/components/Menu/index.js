import { Link, NavLink } from 'react-router-dom';


const Menu = () => {
    return (
        <nav>
            <ul class>
                <a>
                    <Link to="/">
                        <li>
                            HOME
                        </li>
                    </Link>
                </a>
                <a>
                    <Link to="/favorites">
                        <li>
                            FAVORITES
                        </li>
                    </Link>
                </a>
            </ul>
        </nav>
    )
}

export default Menu;