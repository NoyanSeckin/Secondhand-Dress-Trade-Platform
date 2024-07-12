import React, { useState, useContext } from 'react';
import { Container, Box, Typography } from '@mui/material';
import UserContext from '../../contexts/UserContext.js';
import { styles } from './StylesAccount.js';
import AccountIcon from '../../constants/icons/AccountIcon.js';
import { BuyModal } from 'components/BuyModal/BuyModal.js';
import Alert from '../../components/Alert/Alert.js';

const Account = () => {
  const { userAuth } = useContext(UserContext);
  const navs = ['Ürünlerim', 'Teklif Aldıklarım', 'Teklif Verdiklerim'];

  const [activePage, setActivePage] = useState('Teklif Aldıklarım');
  const [isProductBought, setIsProductBought] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  return (
    <Box sx={styles.boxContainer}>
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.emailContainer}>
          <AccountIcon />
          <Typography sx={styles.emailText}>{userAuth.email}</Typography>
        </Box>

        <Box sx={styles.pageContainer}>
          <Box sx={styles.navContainer}>
            {navs.map((nav) => (
              <Typography
                key={nav}
                className={nav === activePage && 'active-nav'}
                onClick={() => setActivePage(nav)}
                sx={{
                  ...styles.navText,
                  fontWeight: nav === activePage && '700',
                }}
              >
                {nav}
              </Typography>
            ))}
            <hr className="account-hr" />
          </Box>
        </Box>
      </Container>

      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        // TODO: Handle buy product
        onBuyProduct={() => {}}
      />

      <Alert isAlert={isProductBought} setIsAlert={setIsProductBought} alertText="Satın Alındı" />
    </Box>
  );
};

export default Account;
