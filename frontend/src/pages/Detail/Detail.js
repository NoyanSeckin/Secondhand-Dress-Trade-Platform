import React, { useState, useContext, useEffect } from 'react';
import { Box, Container, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { styles } from './StylesDetail';
import ProductContext from 'contexts/ProductContext';
import OfferModal from 'components/OfferModal/OfferModal';
import UserContext from 'contexts/UserContext';
import Alert from 'components/Alert/Alert';
import { BuyModal } from 'components/BuyModal/BuyModal';

export default function Detail() {
  const { product, setProduct } = useContext(ProductContext);
  const { userAuth } = useContext(UserContext);

  const [offer, setOffer] = useState({});
  const [offerError, setOfferError] = useState('');
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isOfferModal, setIsOfferModal] = useState(false);
  const [isProductBought, setIsProductBought] = useState(false);
  const alternativeText = 'Belirtilmemiş';

  useEffect(() => {
    // scroll to the top of page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // use local storage to avoid data crash on refresh
    const isSessionItem = sessionStorage.getItem('product-detail');
    if (product.id) {
      sessionStorage.setItem('product-detail', JSON.stringify(product));
    } else if (isSessionItem && !product.id) {
      setProduct(JSON.parse(isSessionItem));
    }
  }, []);

  async function withdrawOffer() {
    const address = `https://bootcamp.akbolat.net/offers/${offer.id}`;

    await axios
      .delete(address, {
        headers: {
          Authorization: `Bearer ${userAuth.token}`,
        },
      })
      .then(() => setOffer({}))
      .catch((err) => console.log(err));
  }

  function renderDetails(brand, color, condition) {
    const detailTitles = { [brand]: 'Marka', [color]: 'Renk', [condition]: 'Kullanım Durumu' };

    const detailsArray = [brand, color, condition];

    return (
      <Box sx={styles.detailsContainer}>
        {detailsArray.map((detail, index) => {
          return (
            <Box key={index} sx={styles.detailContainer}>
              <Typography sx={styles.detailText}>{detailTitles[detail]}:</Typography>
              <Typography sx={{ width: '55%' }}>{detail || alternativeText}</Typography>
            </Box>
          );
        })}
      </Box>
    );
  }

  function renderOfferBtn() {
    let buttonText;
    let buttonOnClick;

    if (!product.isOfferable) {
      buttonText = 'Teklif Verilemez';
    } else if (offer?.price) {
      buttonText = 'Teklifi Geri Çek';
      buttonOnClick = withdrawOffer;
    } else {
      buttonText = 'Teklif Ver';
      buttonOnClick = () => setIsOfferModal(true);
    }

    return (
      <Button
        disabled={!product.isOfferable}
        sx={{
          ...styles.offerButton,
          px: {
            xs: offer?.price ? 3.15 : 6.15,
            lg: offer?.price ? 7 : 10.5,
          },
        }}
        onClick={buttonOnClick}
      >
        {buttonText}
      </Button>
    );
  }

  function renderBtns(isSold) {
    const offerBtnView = renderOfferBtn();

    if (!isSold) {
      return (
        <Box sx={styles.buttonsContainer}>
          <Button variant="contained" sx={styles.buyButton} onClick={() => setIsBuyModalOpen(true)}>
            Satın AI
          </Button>
          {offerBtnView}
        </Box>
      );
    }
  }

  function renderDetailPage(name, brand, color, condition, productPrice, description, image, isSold, offerPrice) {
    const detailsView = renderDetails(brand, color, condition);
    const buttonsView = renderBtns(isSold);

    return (
      <Container maxWidth="xl" sx={styles.container}>
        <Grid container sx={styles.gridContainer}>
          <Grid item xs={12} lg={6}>
            <img className="detail-img" style={styles.image} src={image} alt="" />
          </Grid>
          <Grid item xs={12} lg={6} sx={styles.gridItemWithText}>
            <Typography variant="h3" sx={styles.title}>
              {name}
            </Typography>

            {detailsView}

            <Box sx={styles.priceContainer}>
              <Typography sx={styles.priceText}>{productPrice} TL</Typography>
              {offerPrice && (
                <Box sx={{ display: 'flex' }}>
                  <Box sx={styles.givenOfferContainer}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="h6" sx={styles.offerText}>
                        Verilen Teklif:
                      </Typography>
                      <Typography variant="h6" sx={styles.offerPriceText}>
                        {offerPrice} TL
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {!isSold && (
              <Box sx={styles.soldContainer}>
                <Typography variant="h6" sx={styles.soldText}>
                  Bu Ürün Satışta Değil
                </Typography>
              </Box>
            )}

            {buttonsView}

            <Box sx={{ order: 5 }}>
              <Typography sx={styles.descriptionTitle}>Açıklama</Typography>
              <Typography sx={styles.descriptionText}>{description || alternativeText}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const pageView = renderDetailPage(
    product.name,
    product.brand,
    product.color,
    product.status,
    product.price,
    product.description,
    `https://bootcamp.akbolat.net${product.image?.url}`,
    product.isSold
  );

  return (
    <Box sx={styles.boxContainer}>
      {pageView}

      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        //TODO: handle buy product
        onBuyProduct={() => {}}
      />

      <OfferModal
        isOfferModal={isOfferModal}
        setIsOfferModal={setIsOfferModal}
        product={product}
        userAuth={userAuth}
        setOffer={setOffer}
        setOfferError={setOfferError}
        offerError={offerError}
      />

      <Alert isAlert={isProductBought} setIsAlert={setIsProductBought} alertText="Satın Alındı" />
    </Box>
  );
}
