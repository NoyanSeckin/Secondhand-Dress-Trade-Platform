import React from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'

import { styles } from './StylesCard'

export default function CardComp({ brand, color, price, image }) {

  function renderCard(){

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

  const cardView = renderCard();

  return (
    <>
      {cardView}
    </>
  )
}
