import React from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'

import { styles } from './CardStyles'

export default function CardComp({ brand, color, price, image }) {

  function renderCard(brand, color, price, image){

    return(
      <Card elevation={0} sx={styles.card}>

        <CardMedia 
        component='img'
        image={image}
        sx={styles.cardImage}/>

        <CardContent 
        sx={styles.cardContent}>
          
            <Typography sx={styles.brandText}>
                {brand}
            </Typography>

            <Typography sx={styles.colorText}>
                Renk:    
              <span style={styles.colorSpan}>
                {color}
              </span>
           </Typography>
          
          <Typography variant="h6" sx={styles.priceText}>
              {price} TL
          </Typography>

        </CardContent>

    </Card>
    )
  }

  const cardView = renderCard(brand, color, price, image);

  return (
    <>
      {cardView}
    </>
  )
}
