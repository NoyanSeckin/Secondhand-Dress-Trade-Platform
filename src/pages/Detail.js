import {Box, Container, Button, Typography, Grid} from '@mui/material'

import React, {useState, useContext, useEffect} from 'react'
import Navbar from '../components/Navbar'
import BuyModal from '../components/BuyModal'
import OfferModal from '../components/OfferModal'
import ProductContext from '../contexts/ProductContext'
import UserContext from '../contexts/UserContext'
import { useWindowSize } from "@react-hook/window-size/throttled";

export default function Detail() {
  const {product, setProduct} = useContext(ProductContext)
  const {userAuth} = useContext(UserContext)
  const [width] = useWindowSize({ fps: 60 });
  const mobileScreen = 400;


  const [localOffer, setLocalOffer] = useState('')
  const [offerError, setOfferError] = useState('')
  const [isBuyModal, setIsBuyModal] = useState(false);
  const [isOfferModal, setIsOfferModal] = useState(false);
  const alternativeText = 'Belirtilmemiş';
  useEffect(()=> {
    // scroll to the top of page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [])

  function renderDetailPage(name, brand, color, condition, price, description, image, isSold, offer){
    return(
      <Container maxWidth='xl' sx={{pt: {xs: 10, xl: 12}}}>
        <Grid container 
        sx={{
          background: '#fff', 
          p: {xs: 0.7, xl: 2}, 
          borderRadius: '8px'
          }}>
          <Grid item xs={12} xl={6}> 
            {renderItemImage(image)}
          </Grid>
          <Grid item xs={12} xl={6} 
          sx={{pl: {xs: 1, xl: 5}}}>
            {renderName(name)}
            {width > mobileScreen ? renderItemDetails(brand, color, condition) : renderPriceAndOffer(price, offer)}
            {width < mobileScreen ? renderItemDetails(brand, color, condition) : renderPriceAndOffer(price, offer)}
            {renderIsSold(isSold)}
            {renderBtns(isSold, offer)}
            {renderDescription(description)}
          </Grid>
        </Grid>
      </Container>  
    )
  }

  function renderGivenOffer(offer){
    if(offer){
      return(
        <Box sx={{display: 'flex'}}>
          <Box sx={{
            display: 'flex', 
            background: '#F2F2F2', 
            borderRadius: '8px', 
            pl: {xs: 1.3, xl: 1.6}, 
            pr: {xs: 1.3, xl: 5.3}, 
            py: {xs: 0.3, xl: 0.9},
            }}>
            {offerError ? 
            <Typography variant='h6'>{offerError}</Typography> 
            : <Box sx={{display: 'flex'}}>
              <Typography variant='h6' 
              sx={{
                color: '#B1B1B1',
                mr: 0.4, 
                fontSize: {xs: '12px', xl: '1.125rem'},
                alignSelf: {xs: 'center', xl: 'start'}
                }}>
              Verilen Teklif: 
              </Typography>
              <Typography variant='h6' 
              sx={{
                color: 'textColor', 
                fontWeight: 'bold',
                fontSize: {xs: '15px', xl: '1.125rem'}
                }}>
              {offer} TL
            </Typography>
            </Box>
          } 
          </Box>
        </Box>
      )
    }
  }
  
  function renderIsSold(isSold){
    if(isSold){
      return(
        <Box sx={{display: 'flex'}}>
          <Typography variant='h6' sx={{color: '#FAAD60', fontWeight: '600', borderRadius: '8px', background: '#FFF0E2', px: 3, py: 1}}>Bu Ürün Satışta Değil</Typography>
        </Box>
      )
    }
  }

  function renderItemImage(image){
    return <img  style={{borderRadius: '8px', width: '100%', maxHeight: '737px', maxWidth: '700px'}} src={image} alt="" />
  }

  function renderName(name) {
    return <Typography variant='h3' 
            sx={{
              mt: 1.5, 
              fontSize: {xs: '18px', xl: '2.125rem'}
              }}>
              {name}
            </Typography>
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
  function renderPriceAndOffer(price, offer){
    return(
      <Box sx={{
        my:{xs: 1,xl: 2.5},
        display: {xs: 'flex', xl: 'block'},
        justifyContent: 'space-between'
        }}>
        <Typography 
        sx={{
          fontWeight: '700', fontSize: {xs: '20px', xl: '25px'}}}>
        {price} TL
        </Typography>
        {renderGivenOffer(offer)}
      </Box>
    )
  }
  function renderBtns(isSold, offer) {
      if(!isSold){
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
  }
  function renderDescription(description) {
    return(
      <Box>
         <Typography sx={{fontWeight: '700', mt: 2.5, mb: 0.5, fontSize: '20px'}}>Açıklama</Typography>
          <Typography sx={{fontSize: '15px', pr: 18, mr: 6, color: '#555555'}}>{description || alternativeText}</Typography>
      </Box>
    )
  }
 
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>

      {renderDetailPage(product.name, product.brand, product.color, product.status, product.price, product.description, `https://bootcamp.akbolat.net${product.image?.url}`, product.isSold, localOffer)}
     
      <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal} productId={product.id} setProduct={setProduct} token={userAuth.token}/>
     
      <OfferModal isOfferModal={isOfferModal} setIsOfferModal={setIsOfferModal} product={product} userAuth={userAuth} setLocalOffer={setLocalOffer} setOfferError={setOfferError} offerError={offerError}/>
    </Box>
  )
}
