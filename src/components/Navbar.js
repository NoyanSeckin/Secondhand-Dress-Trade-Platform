import {AppBar, Toolbar, Container, Button, Box} from '@mui/material'

import React from 'react'
import SvgLogo from '../constants/icons/SvgLogo'
import PlusIcon from '../constants/icons/PlusIcon'
import PersonIcon from '../constants/icons/PersonIcon'
export default function Navbar() {
  return (
    <AppBar elevation={0} sx={{background: '#fff', py: 2}}>
      <Container maxWidth='xl' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
          <SvgLogo/>
          <Box sx={{display: 'flex', gap: 1.5}}>
            <Button  sx={{color: 'primary.main', background: '#F0F8FF', textTransform: 'none', fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PlusIcon/>Ürün Ekle</Button>
            <Button  sx={{color: 'primary.main', background: '#F0F8FF', textTransform: 'none', fontWeight: '700',pl: 1.5, pr: 2, borderRadius: '8px'}}><PersonIcon/>Giriş Yap</Button>
          </Box>
      </Container>
    </AppBar>
  )
}
