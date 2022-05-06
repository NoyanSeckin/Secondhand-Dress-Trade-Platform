import { BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import './styles.css'
import {useState, useEffect} from 'react'
import UserToken from './contexts/UserContext'
import ProductContext from "./contexts/ProductContext";
import  {globalTheme}  from './constants/globalTheme';
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Detail from './pages/Detail'
import Account from './pages/Account'
import AddProduct from "./pages/AddProduct";
import ErrorPage from './pages/ErrorPage'
import ProtectedRoutes from './constants/ProtectedRoutes'
function App(props) {
  const [userAuth, setUserAuth] = useState({});
  const [product, setProduct] = useState([]);

  useEffect(()=> {
    // detect page refresh and keep user logged in
    if(performance.getEntriesByType("navigation")[0].type){
      setAuthStateAfterRefresh();
    }
  }, [])

  function setAuthStateAfterRefresh(){
    const initialValue = {};
      const userInfo = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: value}), initialValue);
      setUserAuth({email: userInfo.email, token: userInfo.token});
  }
  
  return (
  <div className="App">
    <UserToken.Provider value={{userAuth, setUserAuth}}>
     <ProductContext.Provider value={{product, setProduct}}>
       <ThemeProvider theme={globalTheme}>
        <BrowserRouter >
            <Routes>
              <Route  path="/" element={ userAuth.token ? <Home/> :  <Authentication/>} >
              </Route>
              <Route index path="/home" element={<Home/>} />
              <Route path="/detail" element={<Detail/>}/>
              <Route path="*" element={<ErrorPage/>}/>
              <Route element={<ProtectedRoutes/>}>
                <Route path="/account" element={<Account/>}/>
                <Route path="/addproduct" element={<AddProduct/>}/>
              </Route>  
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
      </ProductContext.Provider> 
    </UserToken.Provider>
  </div>
  );
}

export default App;
