import { BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import './styles.css'
// import {useContext} from 'react'
import UserToken from './contexts/UserToken'
import  {globalTheme}  from './constants/globalTheme';
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Detail from './pages/Detail'
import Account from './pages/Account'
import ErrorPage from './pages/ErrorPage'
function App(props) {
  const userToken = document.cookie;
  console.log(userToken)
  console.log(userToken)

  return (
  <div className="App">
    <UserToken.Provider value={userToken}>
       <ThemeProvider theme={globalTheme}>
        <BrowserRouter >
          {/*if user signed in  */}
            <Routes>
              <Route  path="/" element={userToken ? <Home/> : <Authentication/>} >
              {/* {userToken ? <Redirect to="/home" /> : <Authentication />} */}
              </Route>
             <Route index path="/home" element={<Home/>} />
             <Route path="/detail" element={<Detail/>}/>
             <Route path="/account" element={<Account/>}/>
             <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserToken.Provider>
  </div>
  );
}

export default App;
