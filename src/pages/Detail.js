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
          <Grid item xs={12} lg={6}> 
            {renderItemImage(image)}
          </Grid>
          <Grid item xs={12} lg={6} 
          sx={{pl: {xs: 1, xl: 5}}}>
            {renderName(name)}
            {width > mobileScreen ? renderItemDetails(brand, color, condition) : renderPriceAndOffer(price, offer)}
            {width < mobileScreen ? renderItemDetails(brand, color, condition) : renderPriceAndOffer(price, offer)}
            {renderIsSold(isSold)}
            {renderBtns(isSold)}
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
        <Box sx={{
          display: 'flex',
          background: {xs: '#fff', sm: 'none'},
          bottom: 0,
          left: {xs: '0', sm: 0},
          mb: {xs: 0.6, sm: 0},
          pt: {xs: 1, sm: 0},
          pb: {xs: 0.7, sm: 0},
          position: {xs: 'fixed', sm: 'relative'},
          width: {xs: '100%', sm : '100%'},

        }}>
          <Typography variant='h6' 
          sx={{
            color: '#FAAD60', 
            fontWeight: '600', 
            borderRadius: '8px', 
            background: '#FFF0E2', 
            px: {xs: 10.5, sm: 3}, 
            py: 1,
            mx: {xs: 'auto', sm: 0}
            }}>Bu Ürün Satışta Değil</Typography>
        </Box>
      )
    }
  }

  function renderItemImage(image){
    return <img style={{
      borderRadius: '8px', 
      width: '100%', 
      maxHeight: '737px', 
      maxWidth: '700px', 
      height: `${width < mobileScreen ? '362px' : 'auto'}`,
    }} src={image} alt="" />
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
    const details = {[brand]: 'Marka', [color]: 'Renk', [condition]: 'Kullanım Durumu'};
    const detailsArray = [brand, color, condition];
    return(
      <Box sx={{
        mt: {xs: 0, xl: 2}, 
        width: {xs: '100%', lg: '50%'}, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: {xs: 0.6, xl: 2}
        }}>
        {detailsArray.map((detail, index) => {
          return(
            <Box key={index} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={{
              fontWeight: '700',
              fontSize: {xs: '15px', lg: '16px'}
              }}>
              {details[detail]}: 
            </Typography>
            <Typography sx={{width: '55%'}}>
              {detail || alternativeText}
            </Typography>
          </Box>
          )
        })}
      </Box>
    )
  }
  function renderPriceAndOffer(price, offer){
    return(
      <Box sx={{
        my:{xs: 1,xl: 2.5},
        display: {xs: 'flex', xl: 'block'},
        justifyContent: 'space-between',
        maxWidth: {sm: '285px', lg: '250px'}
        }}>
        <Typography 
        sx={{
          fontWeight: '700', 
          fontSize: {xs: '20px', xl: '25px'}
          }}>
        {price} TL
        </Typography>
        {renderGivenOffer(offer)}
      </Box>
    )
  }
  function renderBtns(isSold) {
      if(!isSold){
        return(
          <Box sx={{
            background: {xs: '#fff', sm: 'none'},
            bottom: 0,
            left: {xs: '-24px', sm: 0},
            mb: {xs: 0.6, sm: 0},
            py: {xs: 1, sm: 0},
            position: {xs: 'fixed', sm: 'relative'},
            width: {xs: '110%', sm : '100%'},
          }}>
          <Button variant='contained' sx={{
            background: '#4B9CE2', 
            borderRadius: '8px',
            color: '#fff', 
            fontWeight: 700, 
            fontSize: {xs: '18px', lg: '20px'}, 
            mr: 1,
            ml: {xs: 5, lg: 0},
            px: {xs: 6.15, lg: 10.5}, 
          }}
            onClick={()=> setIsBuyModal(true)}>
              Satın AI
            </Button>
            <Button sx={{
              background: '#F0F8FF', 
              borderRadius: '8px',
              color: 'primary.main', 
              fontSize: {xs: '18px', lg: '20px'}, 
              px: {xs: 6.15, xl: 10.5}, 
            }} 
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
         <Typography sx={{
           fontWeight: '700', 
           mt: {xs: 0.6, lg: 2.5}, 
           mb: 0.5, 
           fontSize: {xs: '15px', lg: '20px'}
           }}>
             Açıklama
          </Typography>
          <Typography sx={{
            color: '#555555',
            fontSize: '15px', 
            pr: {xs: 0, lg: 18}, 
            mr: 6, 
            mb: {xs: 2, lg: 0}
            }}>
              {description || alternativeText}
          </Typography>
      </Box>
    )
  }
 
  return (
    <Box sx={{
      background: '#F2F2F2', 
      height: {xs: 'auto', xl: '120vh'},
      pb: {xs: 9, xl: 0}
      }}>
      <Navbar/>

      {renderDetailPage(product.name, product.brand, product.color, product.status, product.price, product.description, `https://bootcamp.akbolat.net${product.image?.url}`, product.isSold, localOffer)}
     
      <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal} productId={product.id} setProduct={setProduct} token={userAuth.token}/>
     
      <OfferModal isOfferModal={isOfferModal} setIsOfferModal={setIsOfferModal} product={product} userAuth={userAuth} setLocalOffer={setLocalOffer} setOfferError={setOfferError} offerError={offerError} screen={width} mobileScreen={mobileScreen}/>
    </Box>
  )
}
