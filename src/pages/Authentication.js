import {Grid, Box} from '@mui/material'
import { useWindowSize } from "@react-hook/window-size/throttled";

import React, {useState, useContext} from 'react'
import Logo from '../constants/icons/Logo'
import MobileContext from "../contexts/MobileContext";

import Login from '../components/AuthForms/Login'
import Register from '../components/AuthForms/Register'

export default function Authentication() {

  const [ authType, setAuthType ] = useState("login");

  const [width] = useWindowSize({ fps: 60 });
  const mobileScreen = useContext(MobileContext)
  return (
    <Grid container >
      <Grid item lg={5} sx={{display: {xs: 'none', lg: 'block'}}}>  
        <img style={{height: '100vh', width: '42%',position: 'fixed'}} src={require('../images/intro.png')} alt="intro" />
      </Grid>
      <Grid item lg={7} xs={12} 
      sx={{
        background: {xs: '#f2f2f2', lg: '#FBFBFB '}, height: '100vh', display: 'flex',
        }}>
        <Box sx={{m: 'auto', display: 'flex',flexDirection: 'column', width: {xs: '75%' ,lg: '45%'}, height: {xs: '100%', lg: 'auto'},alignItems: 'center', position: 'relative'}}>
          {width < mobileScreen ? <Logo sx={{my: 3, width: 148.63, height: 48.46}}/> : <img className='intro-logo' src={require('../images/intro-logo.png')} alt="logo" />}
          {/* <LoginSignup mobileScreen={mobileScreen}/> */}
          {/* <Login setAuthType={setAuthType}/> */}
          <Register setAuthType={setAuthType}/>
        </Box>
      </Grid>
    </Grid>
  )
}

