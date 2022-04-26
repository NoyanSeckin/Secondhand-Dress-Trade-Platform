import {Container, Grid, Box} from '@mui/material'

import React from 'react'
import LoginSignup from '../components/LoginSignup'
import Alert from '../components/Alert'
export default function Authentication() {
  return (
    <Grid container >
      <Grid item xs={5}>  
        <img style={{height: '100vh', width: '42%',position: 'fixed'}} src={require('../images/intro.png')} alt="intro" />
      </Grid>
      <Grid item xs={7} sx={{background: '#FBFBFB ', height: '100vh', display: 'flex'}}>
        <Box sx={{m: 'auto', display: 'flex',flexDirection: 'column', width: '45%',alignItems: 'center', position: 'relative'}}>
          <img className='intro-logo' src={require('../images/intro-logo.png')} alt="logo" />
          <LoginSignup/>
        </Box>
      </Grid>
    </Grid>
  )
}

