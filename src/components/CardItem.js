import {Box, Typography, Button} from '@mui/material'
import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import React, {useContext} from 'react'
import UserContext from '../contexts/UserContext'

export default function CardItem({activePage, name, image, offer, offerId, status, isSold, offerStatus,  offerPrice, productId, setUpdatedItemId, setUpdatedItemOfferId, setIsAcceptOrReject, setBoughtProductId, setIsBuyModal}) {

  const {userAuth} = useContext(UserContext);
  const [width] = useWindowSize({ fps: 60 });
  const mobileScreen = 400;
  // update users recieved offers
  async function updateOfferStatus(id, bool){

    const address = `https://bootcamp.akbolat.net/offers/${id}`
  
    await axios.put(address, {isStatus: bool}, {
      headers: {
      Authorization: `Bearer ${userAuth.token}`
    }}).then(response=> {
      setUpdatedItemOfferId(response.data.id)
      setUpdatedItemId(response.data.product.id)
     
      console.log(response.data)
    }).catch(err => console.log(err))

  }

  function handlePurchase(productId){
    setIsBuyModal(true); 
    setBoughtProductId(productId);
  }

  function checkNameLength(str){
    if(width < mobileScreen && str){
      const totalWhitespace = str.split(' ').length -1;
      const totalCharacters = str.length;
      const totalSpace = totalWhitespace + totalCharacters;
      if(totalSpace > 24 ){
        return (str.substring(0, 23) + '...')
      } else return str;
    } else return str;
  }

  function renderCardNameImageOffer(name, image, offer){
    return(
      <Box sx={{display: 'flex', gap: 1.5}}>
        <img src={image} alt=""
        style={{
          borderRadius: '8px',
          width: width > mobileScreen ? '74px' : '78px', 
          height: '84px',
          }}/>
        <Box>
          <Typography variant='h6'>
            {checkNameLength(name)}
          </Typography>
          <Box sx={{
            background: '#F2F2F2', 
            borderRadius: '8px', 
            display: 'flex', 
            gap: 1, 
            pl: 1.3, 
            pr: {xs: 7.1, lg: 7}, 
            py: 1,
            mt: 0.8,
            }}>
          <Typography sx={{
            color: '#B1B1B1',
            fontSize: {xs: '15px', lg: '16px'}
            }}>
            AIınan Teklif:
          </Typography>
          <Typography sx={{
            fontWeight: '700',
            fontSize: {xs: '15px', lg: '16px'}
            }}>
            {parseFloat(offer).toFixed(2)} TL
          </Typography>
          </Box>
        </Box>
      </Box>
    )
  }
  
  function renderRecievedOfferBtnsAndText(id, status){
    // offer status 
    if(status === null){
      return(
        <Box sx={{
          alignSelf: {xs: 'end', lg: 'center'}
          }}>
          <Button variant='contained' 
          onClick={()=> {
            setIsAcceptOrReject(true); 
            updateOfferStatus(id, true);
          }}
          sx={{
            color: '#fff', 
            fontSize: '15px', 
            py: 0.3, 
            px: {xs: 3.85, lg: 2}, 
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
          sx={{
            background: '#F77474', 
            color: '#fff', 
            fontSize: '15px', 
            py: 0.3, 
            px: {xs: 3.85, lg: 2}, 
            borderRadius: '8px', 
            '&:hover': {background: '#F77474'}
            }}>Reddet</Button>
        </Box>
      )
    }else if(status){
      return renderOfferStatusText('OnayIandı', 'primary.main')
     
    }else if(!status){
       return renderOfferStatusText('Reddedildi', 'danger')
    }

  }

  function renderOfferStatusText(text, color){
    return(
      <Typography variant='h6' 
      sx={{
        alignSelf: {xs: 'end', lg:'center'},
        color: color, 
        fontSize: {xs: '15px', xl: '1.125rem'},
        mr: {xs: 2.3, lg: 0}
      }}>{text}</Typography>
    )
  }

  function renderSentOffersBtnAndStatus(offerStatus, isSold, productId){
    if(offerStatus){
    return(
      <Box sx={{
        alignSelf: {xs: 'end', lg: 'center'}, 
        display: 'flex',
        }}>
        {!isSold && 
        <Button variant='contained'
        onClick={()=> handlePurchase(productId)} 
        sx={{
          color: '#fff', 
          fontSize: '15px', 
          py: 0.3, 
          px: {xs: 4.2,lg: 2}, 
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
      <Box sx={{
        borderRadius: '8px',
        border: '1px solid #F2F2F2', 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: {xs: 'column', lg: 'row'},
        mt: {xs: 1.2, lg: 2.5}, 
        pl: {xs: 1,lg: 2}, 
        pr: {xs: 1, xl: 3}, 
        py: 1, 
        }}>
      {renderCardNameImageOffer(name, image, offer)}  
      {renderRecievedOfferBtnsAndText(offerId, status)}
    </Box>
    )
  }

  function renderSentOffers(name, image, offerPrice, offerStatus, isSold, productId){
    return(
      <Box sx={{
        border: '1px solid #F2F2F2', 
        borderRadius: '8px',
        display: 'flex', 
        flexDirection: {xs: 'column', lg: 'row'},
        justifyContent: 'space-between', 
        mt: {xs: 1.2, lg: 2.5}, 
        pl: {xs: 1,lg: 2}, 
        pr: {xs: 1, xl: 3}, 
        py: 1, 
        }}>
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
