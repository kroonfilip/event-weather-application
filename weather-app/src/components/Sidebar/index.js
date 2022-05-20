import './index.css';
import { Link, NavLink } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div>
            <h1>Logotype</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/favorites">Favories</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;