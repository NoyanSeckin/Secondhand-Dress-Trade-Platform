import * as React from 'react';
import Alert from '@mui/material/Alert';

import AlertIcon from '../constants/icons/AlertIcon';
export default function BasicAlert({isAlert, screen}) {
  const style = {
    position: 'absolute',
    zIndex: 3,
    background: '#FFE5E5',
    color: '#F77474',
    boxShadow:' 0px 3px 12px #1E36482E',
    borderRadius:' 8px',
    fontSize: '16px',
    
  }

  const desktopStyle = {
    ...style, 
    width: '321px',
    py: 1.3,
    mr: 3,
    top: '-60px',
    right: '-300px',
  }

  const mobileStyle = {
    ...style,
    width: '114%',
    top: '14px'
  }
  function renderAlert() {
    return(isAlert &&
    <Alert icon={<AlertIcon/>} variant="filled" 
    sx={screen > 400 ? desktopStyle : mobileStyle} >
      Emailiniz veya şifreniz hatalı.
    </Alert>)
  }
  return (
    <>
     {renderAlert()}
    </>
  );
}
