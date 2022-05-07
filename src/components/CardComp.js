import {Card, CardContent, CardMedia, Typography, Box} from '@mui/material'
import { useWindowSize } from "@react-hook/window-size/throttled";

import React from 'react'


export default function CardComp({brand, color, price, image}) {

  const [width] = useWindowSize({ fps: 60 });

  
  function renderCard(brand, color, price, image){
    return(
      <Card elevation={0} 
      sx={{
        p: 1,
        pb: {xs: 2, xl: 1},
        borderRadius: '8px',
        '&:hover': {cursor: 'pointer'}}}>
      <CardMedia 
       component='img'
       image={image}
       sx={{
         width: {xs: '157px',xl: '260px'}, 
         height: {xs: '184px', xl: '297px'}, 
         borderRadius: '8px',
        }}
      />
      <CardContent 
      sx={{p: 0, pl: 1, mt: 0.5, height: '40px'}}>
        <Box sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          flexDirection: {xs: 'column', lg: 'row', xl: 'row'} 
        }}>
          <Typography sx={{color: '#4B9CE2', fontWeight: '700'}}>{brand}</Typography>
          <Typography sx={{fontWeight: '700', fontSize: {xs: '12px'}}}>Renk: <span style={{fontWeight: 'normal'}}>{color}</span></Typography>
        </Box>
        <Typography variant="h6" sx={{fontWeight: 'bold', mt: {xs: 0.7, xl: 2}, 
        }}>{price} TL</Typography>
      </CardContent>
    </Card>
    )
  }
  return (
    <div>{renderCard(brand, color, price, image)}</div>
  )
}
