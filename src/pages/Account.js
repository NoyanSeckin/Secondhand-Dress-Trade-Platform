import {Container, Box, Typography} from '@mui/material'
import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import MobileContext from "../contexts/MobileContext"; 
import Navbar from '../components/Navbar'
import CardItem from '../components/CardItem'
import AccountIcon from '../constants/icons/AccountIcon'
import BuyModal from '../components/BuyModal'
import SuccessAlert from '../components/SuccessAlert'

export default function Account() {
  const {userAuth} = useContext(UserContext);
  const [width] = useWindowSize({ fps: 60 });
  const mobileScreen = useContext(MobileContext);

  const [activePage, setActivePage] = useState('Teklif Aldıklarım');
  const [userProducts, setUserProducts] = useState([]);
  const [updatedItemOfferId, setUpdatedItemOfferId] = useState();
  const [updatedItemId, setUpdatedItemId] = useState();
  const [isAcceptOrReject, setIsAcceptOrReject] = useState(false);
  const [sentOffers, setSentOffers] = useState([]);
  const [boughtProductId, setBoughtProductId] = useState();
  const [isBuyModal, setIsBuyModal] = useState(false);
  const [isProductBought, setIsProductBought] = useState(false);
   // fetch data 
  useEffect(()=> {
    if(activePage === 'Teklif Aldıklarım'){
      getUserProducts();
      console.log(userProducts)
    }else if(activePage === 'Teklif Verdiklerim'){
      getSentOffers();
    }
  }, [activePage])

  // update userProducts on change to avoid api request
  useEffect(()=>{
    if(updatedItemOfferId){
      const filteredArray = [];
      userProducts.forEach(product => {
        if(product.id === updatedItemId){

          product.offers.forEach(offer => {
            if(offer.id === updatedItemOfferId){
              offer.isStatus = isAcceptOrReject;
              filteredArray.push(product);
            }
          })
        }else filteredArray.push(product);
      })
     setUserProducts(filteredArray);
    }
  }  
 , [updatedItemOfferId])

  //  update sentOffers array to avoid api request
  useEffect(()=>{
    
    if(isProductBought){
      let filteredArray = [];
      sentOffers.forEach(offer => {
        if(offer?.product?.id === boughtProductId){
          offer.product.isSold = true;
          filteredArray.push(offer);
        }else filteredArray.push(offer);
      })
      setSentOffers(filteredArray);
      console.log('product bought effect calisti')
    }
  }, [isProductBought])

  async function getUserProducts(){
    const address = `https://bootcamp.akbolat.net/products?users_permissions_user=${userAuth.id}`;
    await axios.get(address, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`
      }
    }).then(response => setUserProducts(response.data)).catch(err => console.log(err))
  }

  function renderUserProducts(){
    return userProducts?.map(product => {
      return product.offers?.map((offer, index) => (
      <CardItem key={index} name={product.name} 
      image={`https://bootcamp.akbolat.net${width > mobileScreen ? product.image?.url : product?.image?.formats?.thumbnail?.url}`} 
      offer={offer.offerPrice} activePage={activePage} offerId={offer.id} status={offer?.isStatus} 
      setUpdatedItemOfferId={setUpdatedItemOfferId} setUpdatedItemId={setUpdatedItemId} setIsAcceptOrReject={setIsAcceptOrReject} 
      />
    ))
    })
  }

  async function getSentOffers(){
    const address = `https://bootcamp.akbolat.net/offers?users_permissions_user=${userAuth.id}`;
    await axios.get(address, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`
      }
    }).then(response => setSentOffers(response.data)).catch(err => console.log(err))
  }

  function renderSentOffers(){
    return sentOffers.map((offer, index) => (
      <CardItem key={index} name={offer?.product?.name} image={`https://bootcamp.akbolat.net${offer?.product?.image?.url}`} offerPrice={offer?.offerPrice} activePage={activePage} offerStatus={offer?.isStatus} 
      productId={offer?.product?.id} setBoughtProductId={setBoughtProductId}
      isSold={offer?.product?.isSold} setIsBuyModal={setIsBuyModal}/>
    ))
  }

  function renderAccountCard(email){
    return(
      <Box sx={{
        background: '#fff', 
        borderRadius: '8px',
        display: 'flex', 
        gap: 1, 
        pl: 3, 
        py: 2
        }}>
        <AccountIcon/>
        <Typography sx={{
          alignSelf: 'center',
          color: '#525252', 
          fontWeight: '700', 
          fontSize: '15px'}}>{email}</Typography>
      </Box>
    )
  }

  function renderOfferNavs(){
    const navs = ['Teklif Aldıklarım', 'Teklif Verdiklerim']
    return( 
      <Box sx={{
        display: 'flex', 
        gap: {xs: 5,lg: 3},
        justifyContent: {xs: 'center', lg: 'start'},
        pt: 2, 
        position: 'relative'
      }}> {navs.map(nav =>{
      return(
        <Typography key={nav} className={nav === activePage && 'active-nav'} onClick={()=> setActivePage(nav)} 
        sx={{
          color: '#B1B1B1',  
          fontSize: {xs: '15px', lg: '16px'},
          fontWeight: nav === activePage && '700', 
          '&:hover':{cursor: 'pointer'}}}>
          {nav}
        </Typography>
      )
    })} 
      <hr style={{
        padding: width > mobileScreen ? '0 1.46rem' : '0 1rem',
        left: width > mobileScreen ? '-24px' : '-10px',
        width: width > mobileScreen ? '100%' : '96%'
        }} className='account-hr'/>
     </Box>)
  }

  function renderPage(){
    return(
      <Box sx={{display: 'flex', flexDirection: 'column-reverse'}}>
        {activePage === 'Teklif Aldıklarım' ? renderUserProducts() : renderSentOffers()}
      </Box>
    ) 
  }

  return (
    <Box sx={{
      background: '#F2F2F2', 
      minHeight: '120vh', 
      pb: {xs: 4, lg: 10}}}>
      <Navbar/>
      <Container maxWidth="xl" 
      sx={{
        pt: {xs: 10, lg: 12},
        px: {xs: 1.2, lg: 0}
        }}>
        {renderAccountCard(userAuth.email)}
        <Box sx={{
          background: '#fff', 
          borderRadius: '8px', 
          mt: 1.5, 
          px: {xs: 1, lg: 3}, 
          pb: {xs: 1.5, lg: 18}
          }}>
          {renderOfferNavs()}
          {renderPage()}
        </Box>
      </Container>
      <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal} productId={boughtProductId} setIsProductBought={setIsProductBought}
      token={userAuth.token}/>
      <SuccessAlert isAlert={isProductBought} setIsAlert={setIsProductBought} screen={width}/>
    </Box>
  )
}
