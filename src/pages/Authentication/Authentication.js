import React, {useState} from 'react'

import {Grid, Box} from '@mui/material'


import AuthTypeContext from '../../contexts/AuthTypeContext'
import Logo from '../../constants/icons/Logo'
import {styles} from './AuthenticationStyles'
import Login from '../../components/AuthForms/Login'
import Register from '../../components/AuthForms/Register'

export default function Authentication() {
  
  // used in AuthForms Form
  const [ authType, setAuthType ] = useState("login");
  
  const renderAuthForm = () => {

    if(authType === 'login'){
      return <Login/>
    }
    else{
      return <Register/>
    }
  }

  const renderLogo = () => {

    return(
      <>
      <Box sx={styles.mobileLogoWrapper}>
        <Logo sx={styles.logo}/> 
      </Box>
      <Box sx={styles.desktopLogoWrapper}>
        <img className='intro-logo' src={'/images/intro-logo.png'} alt="logo" />
      </Box>
    </>
    )
  }

  const renderImageGrid = () => {

    return(
      <Grid item lg={5} sx={styles.imageGrid}>  
        <img style={styles.image} src={'/images/intro.png'} alt="intro" />
      </Grid>
    )
  }

  const renderFormGrid = () => {

    const logoView = renderLogo();
    const authFormView = renderAuthForm();

    return(
      <Grid item lg={7} xs={12} 
      sx={styles.formGrid}>
        <Box sx={styles.formGridContainer}>
          {logoView}
          <AuthTypeContext.Provider value={{setAuthType}}>
             {authFormView}
          </AuthTypeContext.Provider>
        </Box>
      </Grid>
    )
  }

  const imageGridView = renderImageGrid();
  const formGridView = renderFormGrid();

  return (
    <Grid container>
      {imageGridView}
      {formGridView}    
    </Grid>
  )
}

