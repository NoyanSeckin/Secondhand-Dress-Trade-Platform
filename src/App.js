import {BrowserRouter, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';

import './styles.css'
import  {globalTheme}  from './constants/globalTheme';
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Detail from './pages/Detail'
function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <div className="App">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/authentication" component={Authentication} />
          <Route path="/detail" component={Detail}/>
        </div>
      </BrowserRouter>
     </div>
    </ThemeProvider>
  );
}

export default App;
