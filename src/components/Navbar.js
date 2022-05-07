import {AppBar, Container, Button, Box} from '@mui/material'
import { Link } from 'react-router-dom'
import { useWindowSize } from "@react-hook/window-size/throttled";

import {React, useContext, useState, useEffect} from 'react'
// import UserToken from '../contexts/UserToken'
import SvgLogo from '../constants/icons/SvgLogo'
import PlusIcon from '../constants/icons/PlusIcon'
import PersonIcon from '../constants/icons/PersonIcon'

export default function Navbar() {
  // const userToken = useContext(UserToken);
  const [width, height] = useWindowSize({ fps: 60 });
  const signIn = {
    text: 'Giriş Yap',
    path: '/',
  }
  
  const account = {
    text: 'Hesabım',
    path: '/account'
  }
  
  function renderAccountBtn(){
    let buttonLabel;
    let path;
    const userToken = document.cookie;
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
  }
  function renderAddProductBtn() {
   if(width > 400 ){
     return <Button  sx={{color: 'primary.main', background: '#F0F8FF', fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PlusIcon style={{mb: 0.4, mr: 0.7}}/>Ürün Ekle</Button>
   }else {
     return <button style ={{color: '#4B9CE2', background: '#F0F8FF', fontWeight: '700', borderRadius: '8px', border: 'none', padding: '0.65rem 0.9rem' }}><PlusIcon/></button>
   } 
    
    
  }
  return (
    <AppBar elevation={0} sx={{background: '#fff', py: 2}}>
      <Container maxWidth='xl' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
          <Link to="/home">
            <SvgLogo style={width < 400 ? {width: 99.33, height: 32.39} : {width: 128.94, height: 42.04}}/>
          </Link>
          <Box sx={{display: 'flex', gap: 1.5}}>
            <Link to="/addproduct">
              {renderAddProductBtn()}
            </Link>
            {renderAccountBtn()}
          </Box>
      </Container>
    </AppBar>
  )
}
