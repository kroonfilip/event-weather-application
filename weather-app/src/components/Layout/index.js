import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const Layout = () => {
  return (
    <>
      <header>
        <h1>Event and weather app</h1>
      </header>
      <nav>
        <Sidebar />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favories</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      <footer>
       <p>FOOTER</p>
      </footer>
    </>
  )
};

export default Layout;