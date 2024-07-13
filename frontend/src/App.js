import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import './styles.css';
import { globalTheme } from './theme/GlobalTheme';
import UserToken from './contexts/UserContext';
import ProductContext from './contexts/ProductContext';
import Home from './pages/home/Home';
import Authentication from './pages/Authentication/Authentication';
import Detail from './pages/Detail/Detail';
import Account from './pages/Account/Account';
import AddProduct from './pages/AddProduct/AddProduct';
import ProtectedRoutes from './routes/ProtectedRoutes';
import MobileContext from './contexts/MobileContext';
import { Navbar } from 'components/navbar/Navbar';

function App() {
  let location = useLocation();

  const [userAuth, setUserAuth] = useState({});
  const [product, setProduct] = useState([]);

  useEffect(() => {
    function setAuthStateAfterRefresh() {
      const initialValue = {};
      const userInfo = document.cookie
        .split(';')
        .map((cookie) => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: value }), initialValue);

      setUserAuth({ email: userInfo.email, token: userInfo.token, id: userInfo.id });
    }

    setAuthStateAfterRefresh();
  }, []);

  function renderIndexElement() {
    return userAuth.token ? <Home /> : <Authentication />;
  }

  // display navbar except auth page
  function renderNavbar() {
    if (location.pathname !== '/auth') {
      return <Navbar />;
    }
  }

  const navbarView = renderNavbar();
  const indexElement = renderIndexElement();

  return (
    <div className="App">
      <MobileContext.Provider value={400}>
        <UserToken.Provider value={{ userAuth, setUserAuth }}>
          <ProductContext.Provider value={{ product, setProduct }}>
            <ThemeProvider theme={globalTheme}>
              {navbarView}
              <Routes>
                <Route path="/" element={indexElement} />
                <Route index path="/category/:categoryId" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/detail" element={<Detail />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/account" element={<Account />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </ProductContext.Provider>
        </UserToken.Provider>
      </MobileContext.Provider>
    </div>
  );
}

export default App;
