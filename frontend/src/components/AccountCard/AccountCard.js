import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { styles } from './StylesAccountCard';
import UserContext from 'contexts/UserContext';

export const AccountCard = ({ activePage, setItemInfos, setIsAcceptOrReject, setIsBuyModal, offerInfos }) => {
  const { userAuth } = useContext(UserContext);

  // update users recieved offers
  async function updateOfferStatus(bool) {
    const id = offerInfos.offerId;
    const address = `https://bootcamp.akbolat.net/offers/${id}`;

    await axios
      .put(
        address,
        {
          isStatus: bool,
        },
        {
          headers: {
            Authorization: `Bearer ${userAuth.token}`,
          },
        }
      )
      .then((response) => {
        setItemInfos((prevInfos) => ({ ...prevInfos, itemId: response.data.product.id, offerId: response.data.id }));
      })
      .catch((err) => console.log(err));
  }

  const handlePurchase = () => {
    setIsBuyModal(true);
    setItemInfos((prevInfos) => ({ ...prevInfos, boughtProductId: offerInfos.productId }));
  };
  const checkOfferStatus = () => {
    const offerStatus = offerInfos.status;
    let text = '';
    let textColor = '';

    // if offer approved
    if (offerStatus) {
      text = 'Onaylandı';
      textColor = 'primary.main';
    }
    // if offer not responded yet
    else if (offerStatus === null) {
      text = 'Beklemede';
      textColor = 'orange';
    }
    // if offer rejected
    else if (!offerStatus) {
      text = 'Reddedildi';
      textColor = 'danger';
    }

    return { text, textColor };
  };

  const renderOfferStatus = () => {
    const { text, textColor } = checkOfferStatus();

    return (
      <Typography variant="h6" sx={{ ...styles.offerStatus, color: textColor }}>
        {text}
      </Typography>
    );
  };

  const handleApprove = () => {
    setIsAcceptOrReject(true);
    updateOfferStatus(true);
  };

  const handleReject = () => {
    setIsAcceptOrReject(false);
    updateOfferStatus(false);
  };

  function renderRecievedOfferBtnsAndText() {
    const status = offerInfos.status;

    if (status === null) {
      return (
        <Box
          sx={{
            alignSelf: { xs: 'end', lg: 'center' },
          }}
        >
          <Button
            variant="contained"
            onClick={handleApprove}
            sx={{
              ...styles.approveButton,
              px: { xs: 3.85 },
            }}
          >
            Onayla
          </Button>

          <Button onClick={handleReject} variant="contained" sx={styles.rejectButton}>
            Reddet
          </Button>
        </Box>
      );
    } else {
      const statusView = renderOfferStatus();
      return statusView;
    }
  }

  function renderSentOffersBtnAndStatus() {
    const status = offerInfos.status;
    const isSold = offerInfos.isSold;

    let buttonView;
    const statusView = renderOfferStatus();

    if (status && !isSold) {
      buttonView = (
        <Button
          variant="contained"
          onClick={handlePurchase}
          sx={{
            ...styles.approveButton,
            mr: 3.5,
          }}
        >
          Satın AI
        </Button>
      );
    }
    return (
      <Box
        sx={{
          alignSelf: { xs: 'end', lg: 'center' },
          display: 'flex',
        }}
      >
        {buttonView}
        {statusView}
      </Box>
    );
  }

  const buttonsView =
    activePage === 'Teklif Aldıklarım' ? renderRecievedOfferBtnsAndText() : renderSentOffersBtnAndStatus();

  return (
    <Box sx={styles.offerContainer}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <img src={offerInfos.image} alt="" style={styles.image} />
        <Box>
          <Typography variant="h6">{offerInfos.name}</Typography>
          <Box sx={styles.priceContainer}>
            <Typography
              sx={{
                ...styles.priceText,
                color: '#B1B1B1',
              }}
            >
              AIınan Teklif:
            </Typography>
            <Typography
              sx={{
                ...styles.priceText,
                fontWeight: '700',
              }}
            >
              {parseFloat(offerInfos.offerPrice).toFixed(2)} TL
            </Typography>
          </Box>
        </Box>
      </Box>
      {buttonsView}
    </Box>
  );
};
