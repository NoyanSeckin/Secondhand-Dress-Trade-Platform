import axios from 'axios';
import {useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';

import './styles.css'
import  {globalTheme}  from './constants/globalTheme';
import Home from './pages/Home'
import Authentication from './pages/Authentication'
function App() {
  async function fetchApi(){
    // const response = await axios(https://bootcampapi.techcs.io/api/fe/v1/)
  }
  // useEffect(()=> {
  //   axios.get('https://bootcamp.akbolat.net/documentation/v1.0.0').then(data => console.log(data))
  // }, [])
  return (
    <ThemeProvider theme={globalTheme}>
      <div className="App">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/authentication" component={Authentication} />
        </div>
      </BrowserRouter>
     </div>
    </ThemeProvider>
  );
}

export default App;
