import {Container, Box, Typography} from '@mui/material'
import axios from 'axios'

import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import Navbar from '../components/Navbar'
import CardItem from '../components/CardItem'
import AccountIcon from '../constants/icons/AccountIcon'

export default function Account() {
  const {userAuth} = useContext(UserContext);
  console.log(userAuth.token)
  const [activePage, setActivePage] = useState('Teklif Aldıklarım');
  const [userProducts, setUserProducts] = useState([]);
  const [deletedItemOfferId, setDeletedItemOfferId] = useState();
  const [deletedItemId, setDeletedItemId] = useState();
  async function getUserProducts(){
    const address = `https://bootcamp.akbolat.net/products?users_permissions_user=${userAuth.id}`;

    await axios.get(address, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`
      }
    }).then(response => {setUserProducts(response.data); console.log(response.data)}).catch(err => console.log(err))
  }

  useEffect(()=> {
    getUserProducts();
  }, [])

  useEffect(()=>{
    // filter rejected offers
    if(deletedItemOfferId){
      const filteredArray = [];
      userProducts.forEach(product => {
        if(product.id === deletedItemId){
          let filteredOffers = product.offers.filter(offer => offer.id !== deletedItemOfferId)
          if(filteredOffers?.length > 0){
            filteredArray.push({...product, offers: filteredOffers});
          }
        }else filteredArray.push(product);
      })
     setUserProducts(filteredArray);
    }
   
  }  
 , [deletedItemOfferId])

  function renderAccountCard(email){
    return(
      <Box sx={{background: '#fff', display: 'flex', gap: 1, pl: 3, py: 2, borderRadius: '8px'}}>
        <AccountIcon/>
        <Typography sx={{alignSelf: 'center',fontWeight: '700', color: '#525252', fontSize: '15px'}}>{email}</Typography>
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

  function renderUserProducts(){
   return userProducts?.map(product => {
     return product.offers?.map((offer, index) => (
      <CardItem key={index} name={product.name} image={`https://bootcamp.akbolat.net${product.image?.url}`} offer={offer.offerPrice} activePage={activePage} offerId={offer.id}
      setDeletedItemOfferId={setDeletedItemOfferId} setDeletedItemId={setDeletedItemId}/>
   ))
    })
  }

  function renderPage(){
    if(activePage === 'Teklif Aldıklarım'){
      // render new offers first with reverse direction
      return(
        <Box sx={{display: 'flex', flexDirection: 'column-reverse'}}>
          {renderUserProducts()}
        </Box>
      ) 
    }else{
      return 0;
    }
  }
  return (
    <Box sx={{background: '#F2F2F2', minHeight: '120vh', pb: 10}}>
      <Navbar/>
      <Container sx={{pt: 12}} maxWidth="xl">
        {renderAccountCard(userAuth.email)}
        <Box sx={{background: '#fff', mt: 1.5, borderRadius: '8px', px: 3, pb: 18}}>
          {renderOfferNavs()}
          {renderPage()}
        </Box>
      </Container>
    </Box>
  )
}
