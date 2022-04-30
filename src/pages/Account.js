import {Container, Box, Typography, Button} from '@mui/material'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import AccountIcon from '../constants/icons/AccountIcon'
export default function Account() {
  const [activePage, setActivePage] = useState('Teklif Aldıklarım');

  function renderAccountCard(){
    return(
      <Box sx={{background: '#fff', display: 'flex', gap: 1, pl: 3, py: 2, borderRadius: '8px'}}>
        <AccountIcon/>
        <Typography sx={{alignSelf: 'center',fontWeight: '700', color: '#525252', fontSize: '15px'}}>aysegul@example.com</Typography>
      </Box>
    )
  }

  function renderOfferNavs(){
    const navs = ['Teklif Aldıklarım', 'Teklif Verdiklerim']
    return( 
      <Box sx={{display: 'flex', gap: 3,pt: 2}}> {navs.map(nav =>{
      return(
        <Typography className={nav === activePage && 'active-nav'} onClick={()=> setActivePage(nav)} sx={{color: '#B1B1B1',  fontWeight: nav === activePage && '700', '&:hover':{cursor: 'pointer'}}}>
          {nav}
        </Typography>
      )
    })} 
     </Box>)
  }

  function renderCardImageandOffer(){
    return(
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
    )
  }
  
  function renderRecievedOfferBtns(){
    return(
      <Box sx={{alignSelf: 'center'}}>
        <Button variant='contained' sx={{color: '#fff', fontSize: '15px', py: 0.3, px: 2, mr: 1.5, borderRadius: '8px', '&:hover': {background: '#4B9CE2'}}}>Onayla</Button>
        <Button variant='contained' sx={{background: '#F77474', color: '#fff', fontSize: '15px', py: 0.3, px: 2, borderRadius: '8px', '&:hover': {background: '#F77474'}}}>Reddet</Button>
      </Box>
    )
  }

  function renderSentOrderBtnAndStatus(){
    return(
      <Box sx={{alignSelf: 'center', display: 'flex'}}>
        <Button variant='contained' sx={{color: '#fff', fontSize: '15px', py: 0.3, px: 2, mr: 3.5, borderRadius: '8px', '&:hover': {background: '#4B9CE2'}}}>Satın AI</Button>
        <Typography sx={{color: 'primary.main', fontSize: '15px', alignSelf: 'center'}}>Onaylandı</Typography>
      </Box>
    )
  }
  
  function renderItemCard(){
    return(
      <Box sx={{display: 'flex', py: 1, pl: 2, pr: 3, mt: 2.5, justifyContent: 'space-between', border: '1px solid #F2F2F2', borderRadius: '8px'}}>
      {renderCardImageandOffer()}  
      {activePage === 'Teklif Aldıklarım' ? renderRecievedOfferBtns()
      : renderSentOrderBtnAndStatus()}
    </Box>
    )
  }
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      <Container sx={{pt: 12}} maxWidth="xl">
        {renderAccountCard()}
        <Box sx={{background: '#fff', mt: 1.5, borderRadius: '8px', px: 3, pb: 18}}>
          {renderOfferNavs()}
          {renderItemCard()}
          {renderItemCard()}
        </Box>
      </Container>
    </Box>
  )
}
