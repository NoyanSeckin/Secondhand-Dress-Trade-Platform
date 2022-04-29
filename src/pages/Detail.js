import {Box, Container, Button, Typography, Grid} from '@mui/material'

import React from 'react'
import Navbar from '../components/Navbar'
import BuyModal from '../components/BuyModal'
import OfferModal from '../components/OfferModal'
export default function Detail() {
  function renderDetailPage(title, brand, color, condition, price, detail, image){
    return(
      <Grid container sx={{background: '#fff', p: 2, borderRadius: '8px'}}>
        <Grid item xs={6}>
          <img  style={{width: '100%'}} src={image} alt="" />
        </Grid>
        <Grid item xs={6} sx={{pl: 5}}>
          <Typography variant='h3' sx={{mt: 1.5}}>{title}</Typography>
          <Box sx={{mt: 2, width: '50%', display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography sx={{fontWeight: '700'}}>
                Marka: 
              </Typography>
              <Typography sx={{width: '55%'}}>
                {brand}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography sx={{fontWeight: '700'}}>
                Renk: 
              </Typography>
              <Typography sx={{width: '55%'}}>
                {color}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={{fontWeight: '700'}}>
              Kullanım Durumu: 
            </Typography>
            <Typography sx={{width: '55%'}}> 
              {condition}
            </Typography>
            </Box>
          </Box>
          <Typography sx={{fontWeight: '700', fontSize: '25px', my: 2.5}}>
            {price} TL
          </Typography>
          <Button sx={{color: '#fff', background: '#4B9CE2', fontWeight: 700, fontSize: '18px', px: 10.5, mr: 1,borderRadius: '8px','&:hover': {background: '#4B9CE2'}}}>
            Satın AI
          </Button>
          <Button sx={{color: 'primary.main', background: '#F0F8FF', fontSize: '18px', px: 10.5, borderRadius: '8px'}}>
            Teklif Ver
          </Button>
          <Typography variant='h6' sx={{fontWeight: '700', mt: 2.5, mb: 0.5}}>Açıklama</Typography>
          <Typography sx={{fontSize: '15px', pr: 18, mr: 6, color: '#555555'}}>{detail || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur officia modi dignissimos aliquid atque? Aspernatur exercitationem nulla optio illo magni, ratione aliquid et, nesciunt ut quaerat ipsam deserunt. Amet, placeat.'}</Typography>
        </Grid>
      </Grid>
    )
  }
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      <Container sx={{pt: 12}} maxWidth='xl'>
        {renderDetailPage('Beli Uzun Trençkot Kareli', 'Luis Viton', 'Bej Rengi', 'Az Kullanılmış', '319,90',undefined, `${require("../images/detail-image-0.png")}`)}
      </Container>
      <BuyModal/>
      <OfferModal/>
    </Box>
  )
}
