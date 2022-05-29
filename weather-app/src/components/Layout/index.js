import { Outlet, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer'
import Menu from '../Menu';

const Layout = () => {
  return (
    <>
      <Menu />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;