import {Box, Container, Button, Typography, Grid} from '@mui/material'

import React, {useState, useContext, useEffect} from 'react'
import Navbar from '../components/Navbar'
import BuyModal from '../components/BuyModal'
import OfferModal from '../components/OfferModal'
import ProductContext from '../contexts/ProductContext'
export default function Detail() {
  const {product} = useContext(ProductContext)
  console.log(product)
  const [isBuyModal, setIsBuyModal] = useState(false);
  const [isOfferModal, setIsOfferModal] = useState(false);
  const alternativeText = 'Belirtilmemiş';

  useEffect(()=> {
    // scroll to the top of page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [])

  function renderDetailPage(name, brand, color, condition, price, detail, image){
    return(
      <Container sx={{pt: 12}} maxWidth='xl'>
        <Grid container sx={{background: '#fff', p: 2, borderRadius: '8px'}}>
          <Grid item xs={6}>
            {renderItemImage(image)}
          </Grid>
          <Grid item xs={6} sx={{pl: 5}}>
            {rendername(name)}
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
    return <img  style={{borderRadius: '8px', width: '100%', maxHeight: '737px', maxWidth: '700px'}} src={image} alt="" />
  }

  function rendername(name) {
    return <Typography variant='h3' sx={{mt: 1.5}}>{name}</Typography>
  }

  function renderItemDetails(brand, color, condition) {
    return(
      <Box sx={{mt: 2, width: '50%', display: 'flex', flexDirection: 'column', gap: 2}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography sx={{fontWeight: '700'}}>
            Marka: 
          </Typography>
          <Typography sx={{width: '55%'}}>
            {brand || alternativeText}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography sx={{fontWeight: '700'}}>
            Renk: 
          </Typography>
          <Typography sx={{width: '55%'}}>
            {color || alternativeText}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography sx={{fontWeight: '700'}}>
          Kullanım Durumu: 
        </Typography>
        <Typography sx={{width: '55%'}}> 
          {condition || alternativeText}
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
          <Typography sx={{fontSize: '15px', pr: 18, mr: 6, color: '#555555'}}>{detail || alternativeText}</Typography>
      </Box>
    )
  }
 
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      {renderDetailPage(product.name, product.brand, product.color, product.status, product.price, product.description, `https://bootcamp.akbolat.net${product.image?.url}`)}
      <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal}/>
      <OfferModal isOfferModal={isOfferModal} setIsOfferModal={setIsOfferModal}/>
    </Box>
  )
}
