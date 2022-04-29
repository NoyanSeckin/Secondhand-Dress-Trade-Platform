import {Box, Container, Button, Typography, Grid} from '@mui/material'

import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import BuyModal from '../components/BuyModal'
import OfferModal from '../components/OfferModal'
export default function Detail() {
  const [isBuyModal, setIsBuyModal] = useState(false);
  const [isOfferModal, setIsOfferModal] = useState(false);

  function renderDetailPage(title, brand, color, condition, price, detail, image){
    return(
      <Container sx={{pt: 12}} maxWidth='xl'>
        <Grid container sx={{background: '#fff', p: 2, borderRadius: '8px'}}>
          <Grid item xs={6}>
            {renderItemImage(image)}
          </Grid>
          <Grid item xs={6} sx={{pl: 5}}>
            {renderTitle(title)}
            {renderItemDetails(brand, color, condition)}
            {renderPrice(price)}
            {renderBtns()}
            {renderDetails(detail)}
          </Grid>
        </Grid>
      </Container>  
    )
  }
  function renderItemImage(image){
    return <img  style={{width: '100%'}} src={image} alt="" />
  }

  function renderTitle(title) {
    return <Typography variant='h3' sx={{mt: 1.5}}>{title}</Typography>
  }

  function renderItemDetails(brand, color, condition) {
    return(
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
    )
  }
  function renderPrice(price){
    return(
      <Typography sx={{fontWeight: '700', fontSize: '25px', my: 2.5}}>
      {price} TL
    </Typography>
    )
  }
  function renderBtns() {
    return(
      <Box>
         <Button sx={{color: '#fff', background: '#4B9CE2', fontWeight: 700, fontSize: '18px', px: 10.5, mr: 1,borderRadius: '8px','&:hover': {background: '#4B9CE2'}}}
          onClick={()=> setIsBuyModal(true)}>
            Satın AI
          </Button>
          <Button sx={{color: 'primary.main', background: '#F0F8FF', fontSize: '18px', px: 10.5, borderRadius: '8px'}} 
          onClick={() => setIsOfferModal(true)}>
            Teklif Ver
          </Button>
      </Box>
    )
  }
  function renderDetails(detail) {
    return(
      <Box>
         <Typography variant='h6' sx={{fontWeight: '700', mt: 2.5, mb: 0.5}}>Açıklama</Typography>
          <Typography sx={{fontSize: '15px', pr: 18, mr: 6, color: '#555555'}}>{detail || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur officia modi dignissimos aliquid atque? Aspernatur exercitationem nulla optio illo magni, ratione aliquid et, nesciunt ut quaerat ipsam deserunt. Amet, placeat.'}</Typography>
      </Box>
    )
  }
 
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      {renderDetailPage('Beli Uzun Trençkot Kareli', 'Luis Viton', 'Bej Rengi', 'Az Kullanılmış', '319,90',undefined, `${require("../images/detail-image-0.png")}`)}
      <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal}/>
      <OfferModal isOfferModal={isOfferModal} setIsOfferModal={setIsOfferModal}/>
    </Box>
  )
}
