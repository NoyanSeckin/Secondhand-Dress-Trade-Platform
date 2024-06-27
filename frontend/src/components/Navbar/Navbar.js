import { AppBar, Container, Button, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import Logo from '../../constants/icons/Logo.js'
import PlusIcon from '../../constants/icons/PlusIcon.js'
import PersonIcon from '../../constants/icons/PersonIcon.js'
import { styles } from './StylesNavbar.js'

export default function Navbar() {

  function renderAccountBtn() {

    const signIn = {
      text: 'Giriş Yap',
      path: '/',
    }
  
    const account = {
      text: 'Hesabım',
      path: '/account'
    }

    let buttonLabel;
    let path;
    const isUserAuth = Boolean(document.cookie);

      if (isUserAuth) {
          buttonLabel = account.text;
          path = account.path;
        } 
        else {
          buttonLabel = signIn.text;
          path = signIn.path;
        }

      return (
        <Link to={path}>
          <Button sx={styles.btn}><PersonIcon />{buttonLabel}</Button>
        </Link>
      )
      
  }
  
  function renderAddProductBtn() {

      return (
        <Link to="/addproduct">
            <Button sx={styles.btn}>
                <PlusIcon sx={styles.plusIcon}/>
                <Typography sx={styles.addProductText}>
                    Ürün Ekle
                </Typography>
            </Button>
          </Link>
      )
  }

  function  renderLogo() {
    
    return(
      <Link to="/home">
          <Logo sx={styles.logo} />
       </Link>
    )

  }

  const renderBtns = () => {

    return(
      <Box sx={styles.btnsContainer}>
          {renderAddProductBtn()}
          {renderAccountBtn()}
       </Box>
    )

  }

  const logoView = renderLogo();
  const btnsView = renderBtns();
  
  return (
    <AppBar elevation={0} sx={styles.appbar}>
        <Container maxWidth='xl' sx={styles.container}>
            {logoView}
            {btnsView}
        </Container>
    </AppBar>
  )
}
