import {Box, Typography, Button} from '@mui/material'
import axios from 'axios'

import React, {useContext} from 'react'
import UserContext from '../contexts/UserContext'
export default function CardItem({activePage, name, image, offer, offerId, setDeletedItemId, setDeletedItemOfferId}) {

  const {userAuth} = useContext(UserContext);

  async function rejectOrder(id){
    const address = `https://bootcamp.akbolat.net/offers/${id}`
    await axios.delete(address, {
      headers: {
      Authorization: `Bearer ${userAuth.token}`
    }}).then(response=> {
      setDeletedItemOfferId(response.data.id)
      setDeletedItemId(response.data.product.id)
      console.log(response.data)
    }).catch(err => console.log(err))
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
  
  function renderRecievedOfferBtns(id){
    return(
      <Box sx={{alignSelf: 'center'}}>
        <Button variant='contained' sx={{color: '#fff', fontSize: '15px', py: 0.3, px: 2, mr: 1.5, borderRadius: '8px', '&:hover': {background: '#4B9CE2'}}}>Onayla</Button>

        <Button onClick={()=> rejectOrder(id)} 
        variant='contained' 
        sx={{background: '#F77474', color: '#fff', fontSize: '15px', py: 0.3, px: 2, borderRadius: '8px', '&:hover': {background: '#F77474'}}}>Reddet</Button>
      </Box>
    )
  }

  function renderSentOffersBtnAndStatus(){
    return(
      <Box sx={{alignSelf: 'center', display: 'flex'}}>
        <Button variant='contained' sx={{color: '#fff', fontSize: '15px', py: 0.3, px: 2, mr: 3.5, borderRadius: '8px', '&:hover': {background: '#4B9CE2'}}}>Satın AI</Button>
        <Typography sx={{color: 'primary.main', fontSize: '15px', alignSelf: 'center'}}>Onaylandı</Typography>
      </Box>
    )
  }
  
  function renderCardItem(name, image, offer, offerId){
    return(
      <Box sx={{display: 'flex', py: 1, pl: 2, pr: 3, mt: 2.5, justifyContent: 'space-between', border: '1px solid #F2F2F2', borderRadius: '8px'}}>
      {renderCardNameImageOffer(name, image, offer)}  
      {activePage === 'Teklif Aldıklarım' ? renderRecievedOfferBtns(offerId)
      : renderSentOffersBtnAndStatus()}
    </Box>
    )
  }

  return (
    <div>{renderCardItem(name, image, offer, offerId)}</div>
  )
}
