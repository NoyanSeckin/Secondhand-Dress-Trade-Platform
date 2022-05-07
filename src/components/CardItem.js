import {Box, Typography, Button} from '@mui/material'
import axios from 'axios'

import React, {useContext} from 'react'
import UserContext from '../contexts/UserContext'
export default function CardItem({activePage, name, image, offer, offerId, status, isSold, offerStatus,  offerPrice, productId, setDeletedItemId, setDeletedItemOfferId, setIsAcceptOrReject, setBoughtProductId}) {

  const {userAuth} = useContext(UserContext);
  
  async function updateOfferStatus(id, bool){

    const address = `https://bootcamp.akbolat.net/offers/${id}`
  
    await axios.put(address, {isStatus: bool}, {
      headers: {
      Authorization: `Bearer ${userAuth.token}`
    }}).then(response=> {
      setDeletedItemOfferId(response.data.id)
      setDeletedItemId(response.data.product.id)
     
      console.log(response.data)
    }).catch(err => console.log(err))

  }

  async function buyProduct(){
    const address = `https://bootcamp.akbolat.net/products/${productId}`
    await axios.put(address, {isSold: true}, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      }, 
    }).then((response)=> setBoughtProductId(response.data.id)).catch((err)=> console.log(err.message))
  }

  function renderCardNameImageOffer(name, image, offer){
    return(
      <Box sx={{display: 'flex', gap: 1.5}}>
        <img src={image} alt=""
        style={{width: '74px', height: '84px', borderRadius: '8px'}} />
        <Box>
          <Typography variant='h6'>{name}</Typography>
          <Box sx={{display: 'flex', gap: 1, background: '#F2F2F2', borderRadius: '8px', pl: 1.3, pr: 7, py: 1, mt: 0.8}}>
          <Typography sx={{color: '#B1B1B1'}}>
            AIınan Teklif:
          </Typography>
          <Typography sx={{fontWeight: '700'}}>
            {parseFloat(offer).toFixed(2)} TL
          </Typography>
          </Box>
        </Box>
      </Box>
    )
  }
  
  function renderRecievedOfferBtns(id, status){
    if(status === null){
      return(
        <Box sx={{alignSelf: 'center'}}>
          <Button variant='contained' 
          onClick={()=> {
            setIsAcceptOrReject(true); 
            updateOfferStatus(id, true);
          }}
          sx={{
            color: '#fff', 
            fontSize: '15px', 
            py: 0.3, 
            px: 2, 
            mr: 1.5, 
            borderRadius: '8px', 
            '&:hover': {background: '#4B9CE2'}}}>
              Onayla
          </Button>

          <Button onClick={()=> {
            setIsAcceptOrReject(false); 
            updateOfferStatus(id, false);
          }} 
          variant='contained' 
          sx={{background: '#F77474', color: '#fff', fontSize: '15px', py: 0.3, px: 2, borderRadius: '8px', '&:hover': {background: '#F77474'}}}>Reddet</Button>
        </Box>
      )
    }else if(status){
      return(
        <Typography variant='h6' sx={{color: 'primary.main', alignSelf: 'center'}}>
          OnayIandı
        </Typography>
      )
    }else if(!status){
       return(
        <Typography variant='h6' sx={{color: '#F77474', alignSelf: 'center'}}>
          Reddedildi
        </Typography>
       )
    }

  }

  function renderOfferStatusText(text, color){
    return(
      <Typography sx={{color: color, fontSize: '15px', alignSelf: 'center'}}>{text}</Typography>
    )
  }

  function renderSentOffersBtnAndStatus(offerStatus, isSold, productId){
    if(offerStatus){
    return(
      <Box sx={{alignSelf: 'center', display: 'flex'}}>
        {!isSold && 
        <Button variant='contained'
        onClick={()=> buyProduct(productId)} 
        sx={{
          color: '#fff', 
          fontSize: '15px', 
          py: 0.3, 
          px: 2, 
          mr: 3.5, 
          borderRadius: '8px', 
          '&:hover': {background: '#4B9CE2'}
          }}>
            Satın AI
          </Button>}
          {renderOfferStatusText('OnayIandı', 'primary.main')}
      </Box>
    )
   }else if(offerStatus === null){
    return renderOfferStatusText('Beklemede', 'orange')
  }
   else if(!offerStatus){
    return renderOfferStatusText('Reddedildi', 'danger')
   }

  }
  
  function renderUserProducts(name, image, offer, offerId, status){
    return(
      <Box sx={{display: 'flex', py: 1, pl: 2, pr: 3, mt: 2.5, justifyContent: 'space-between', border: '1px solid #F2F2F2', borderRadius: '8px'}}>
      {renderCardNameImageOffer(name, image, offer)}  
      {renderRecievedOfferBtns(offerId, status)}
    </Box>
    )
  }

  function renderSentOffers(name, image, offerPrice, offerStatus, isSold, productId){
    return(
      <Box sx={{display: 'flex', py: 1, pl: 2, pr: 3, mt: 2.5, justifyContent: 'space-between', border: '1px solid #F2F2F2', borderRadius: '8px'}}>
      {renderCardNameImageOffer(name, image, offerPrice)}  
      {renderSentOffersBtnAndStatus(offerStatus, isSold, productId)}
    </Box>
    )
  }

  return (
    <div>{activePage === 'Teklif Aldıklarım' ? 
          renderUserProducts(name, image, offer, offerId, status)
          : renderSentOffers(name, image, offerPrice, offerStatus, isSold, productId)}
    </div>
  )
}
