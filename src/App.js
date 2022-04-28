import {BrowserRouter, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';

import './styles.css'
// import {useContext} from 'react'
import UserToken from './contexts/UserToken'
import  {globalTheme}  from './constants/globalTheme';
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Detail from './pages/Detail'
import { Redirect } from "react-router-dom";
function App() {
  // let loggedInValue = useContext(LoggedIn);
  // document.cookie = 'test'
  // document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  const userToken = document.cookie;
  console.log(userToken)
  return (
    <UserToken.Provider value={userToken}>
      <ThemeProvider theme={globalTheme}>
        <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Authentication}>
            </Route>
              {userToken ? <Redirect to="/home"/> : <Authentication/>}
            <Route path="/home" component={Home} />
            <Route path="/detail" component={Detail}/>
          </div>
        </BrowserRouter>
       </div>
      </ThemeProvider>
    </UserToken.Provider>
  );
}

export default App;
