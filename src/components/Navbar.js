import {AppBar, Container, Button, Box} from '@mui/material'

import { Link } from 'react-router-dom'
import {React, useContext, useState, useEffect} from 'react'
import UserToken from '../contexts/UserToken'
import SvgLogo from '../constants/icons/SvgLogo'
import PlusIcon from '../constants/icons/PlusIcon'
import PersonIcon from '../constants/icons/PersonIcon'
export default function Navbar() {
  const userToken = useContext(UserToken);
  const signIn = {
    text: 'Giriş Yap',
    path: '/',
  }
  
  const account = {
    text: 'Hesabım',
    path: '/account'
  }
  function renderButton(){
    let buttonLabel;
    let path;
    if(userToken){
      buttonLabel = account.text;
      path = account.path;
    }else{
      buttonLabel = signIn.text;
      path = signIn.path;
    }
    return (
      <Link to={path}>
        <Button sx={{color: 'primary.main', background: '#F0F8FF',  fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PersonIcon/>{buttonLabel}</Button>
      </Link>
    )
    // if(userToken){
    //   return <Button sx={{color: 'primary.main', background: '#F0F8FF',  fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PersonIcon/>Hesabim</Button>
    // } else{
    //   return <Button sx={{color: 'primary.main', background: '#F0F8FF',  fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PersonIcon/>Giris Yap</Button>
    // }
  }
  return (
    <AppBar elevation={0} sx={{background: '#fff', py: 2}}>
      <Container maxWidth='xl' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
          <SvgLogo/>
          <Box sx={{display: 'flex', gap: 1.5}}>
            <Button  sx={{color: 'primary.main', background: '#F0F8FF', fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PlusIcon/>Ürün Ekle</Button>
            {renderButton()}
          </Box>
      </Container>
    </AppBar>
  )
}
