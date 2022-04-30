import {Container, Box, Typography, Button} from '@mui/material'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import AccountIcon from '../constants/icons/AccountIcon'
export default function Account() {
  const [activePage, setActivePage] = useState('Teklif Aldıklarım');

  function renderOfferNavs(){
    const navs = ['Teklif Aldıklarım', 'Teklif Verdiklerim']
    return navs.map(nav =>{
      return(
        <Typography className={nav === activePage && 'active-nav'} onClick={()=> setActivePage(nav)} sx={{color: '#B1B1B1',  fontWeight: nav === activePage && '700', '&:hover':{cursor: 'pointer'}}}>
          {nav}
        </Typography>
      )
    })
  }
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      <Container sx={{pt: 12}} maxWidth="xl">
        {/* render account img and name */}
        <Box sx={{background: '#fff', display: 'flex', gap: 1, pl: 3, py: 2, borderRadius: '8px'}}>
          <AccountIcon/>
          <Typography sx={{alignSelf: 'center',fontWeight: '700', color: '#525252', fontSize: '15px'}}>aysegul@example.com</Typography>
        </Box>

        <Box sx={{background: '#fff', mt: 1.5, borderRadius: '8px', px: 3}}>
          <Box sx={{display: 'flex', gap: 3,pt: 2}}>
            {renderOfferNavs()}
          </Box>
          <Box sx={{display: 'flex', p: 1, mt: 2.5, justifyContent: 'space-between', border: '1px solid #F2F2F2', borderRadius: '8px'}}>
            <Box sx={{display: 'flex', gap: 1.5}}>
              <img src={require('../images/detail-image-0.png')} alt=""
              style={{width: '74px', height: '84px', borderRadius: '8px'}} />
              <Box>
                <Typography variant='h6'>Beli Uzun Trenckot Kareli</Typography>
                <Box sx={{display: 'flex', gap: 1, background: '#F2F2F2', borderRadius: '8px', pl: 1.3, pr: 7, py: 1, mt: 0.8}}>
                <Typography sx={{color: '#B1B1B1'}}>
                  AIınan Teklif:
                </Typography>
                <Typography sx={{fontWeight: '700'}}>
                  119,90 TL
                </Typography>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Container>
    </Box>
  )
}
