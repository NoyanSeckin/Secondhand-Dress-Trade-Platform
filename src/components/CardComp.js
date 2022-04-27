import {Card, CardContent, CardMedia, Typography, Box} from '@mui/material'

import React from 'react'

export default function CardComp({brand, color, price, image}) {
  function renderCard(brand, color, price, image){
    return(
      <Card elevation={0} sx={{p: 1,borderRadius: '8px' ,'&:hover': {cursor: 'pointer'}}}>
      <CardMedia 
       component='img'
       image={image}
       sx={{width: '260px', height: '297px', borderRadius: '8px'}}
      />
      <CardContent sx={{p: 0, pl: 1, mt: 0.5, height: '40px'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography sx={{color: '#4B9CE2', fontWeight: '700'}}>{brand}</Typography>
          <Typography sx={{fontWeight: '700'}}>Renk: <span style={{fontWeight: 'normal'}}>{color}</span></Typography>
        </Box>
        <Typography variant="h6" sx={{fontWeight: 'bold', mt: 2}}>{price} TL</Typography>
      </CardContent>
    </Card>
    )
  }
  return (
    <div>{renderCard(brand, color, price, image)}</div>
  )
}
