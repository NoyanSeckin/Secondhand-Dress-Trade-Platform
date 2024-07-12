import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styles } from './StylesCard';

interface ProductCardProps {
  brand: string;
  color: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ brand, color, price, imageUrl }: ProductCardProps) => {
  return (
    <Card elevation={0} sx={styles.card}>
      <CardMedia component="img" image={imageUrl} sx={styles.cardImage} />
      <CardContent sx={styles.cardContent}>
        <Typography sx={styles.brandText}>{brand}</Typography>

        <Typography sx={styles.colorText}>
          Renk:
          <span style={styles.colorSpan}>{color}</span>
        </Typography>

        <Typography variant="h6" sx={styles.priceText}>
          {price} TL
        </Typography>
      </CardContent>
    </Card>
  );
};
