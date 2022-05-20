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
      </nav>

      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;