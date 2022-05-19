import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer'

const Layout = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  )
};

export default Layout;