import {Grid, Box} from '@mui/material'

import {React} from 'react'
import LoginSignup from '../components/LoginSignup'
import SvgLogo from '../constants/icons/SvgLogo'
import { useWindowSize } from "@react-hook/window-size/throttled";
export default function Authentication() {
  const [width, height] = useWindowSize({ fps: 60 });
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
          {width < 400 ? <SvgLogo style={{my: 3, width: 148.63, height: 48.46}}/> : <img className='intro-logo' src={require('../images/intro-logo.png')} alt="logo" />}
          <LoginSignup/>
        </Box>
      </Grid>
    </Grid>
  )
}

