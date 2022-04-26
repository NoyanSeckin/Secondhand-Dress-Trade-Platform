import * as React from 'react';
import Alert from '@mui/material/Alert';

import AlertIcon from '../constants/icons/AlertIcon';
export default function BasicAlert({isAlert}) {
  function renderAlert() {
    return(isAlert &&
    <Alert icon={<AlertIcon/>} variant="filled" 
    sx={{
      position: 'absolute',
      top: '-60px',
      right: '-300px',
      zIndex: 3,
      background: '#FFE5E5',
      color: '#F77474',
      boxShadow:' 0px 3px 12px #1E36482E',
      borderRadius:' 8px',
      fontSize: '16px',
      width: '321px',
      py: 1.3,
      mr: 3
    }} >
      Emailiniz veya şifreniz hatalı.
    </Alert>)
  }
  return (
    <>
     {renderAlert()}
    </>
  );
}
