import { AppBar, Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import Logo from 'constants/icons/Logo.js';
import PlusIcon from 'constants/icons/PlusIcon.js';
import PersonIcon from 'constants/icons/PersonIcon.js';
import { styles } from 'components/navbar/StylesNavbar';

export const Navbar = () => {
  return (
    <AppBar elevation={0} sx={styles.appbar}>
      <Container maxWidth="xl" sx={styles.container}>
        <Link to="/home">
          <Logo sx={styles.logo} />
        </Link>

        <Box sx={styles.btnsContainer}>
          <Link to="/addproduct">
            <Button sx={styles.btn}>
              <PlusIcon sx={styles.plusIcon} />
              <Typography sx={styles.addProductText}>Ürün Ekle</Typography>
            </Button>
          </Link>

          <Link to={'/account'}>
            <Button sx={styles.btn} startIcon={<PersonIcon />}>
              Hesabım
            </Button>
          </Link>
        </Box>
      </Container>
    </AppBar>
  );
};
