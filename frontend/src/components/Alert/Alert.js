import React, { useEffect } from 'react';

import Alert from '@mui/material/Alert';

import AlertIcon from '../../constants/icons/AlertIcon';
import SuccesIcon from '../../constants/icons/SuccessIcon';
import { styles } from './StylesAlert'

export default function BasicAlert({ isAlert, setIsAlert, alertText, alertType }) {

  function renderAlertIcon() {
    
    if(alertType === 'warning'){
      return <AlertIcon/>
    }
    else
    {
      return <SuccesIcon/>
    }
  }

  function renderAlertColor() {

    if (alertType === 'warning'){
      return styles.warningStyle;
    }
    else{
      return styles.successStyle;
    }
  }

  useEffect(() => {

    if (isAlert) {

      setTimeout(() => {
        setIsAlert(false);
      }, 3000);
    }
  }, [isAlert, setIsAlert])

  function renderAlert() {
    const alertColor = renderAlertColor();
    const alertIcon = renderAlertIcon();

    if (isAlert) {
      return (
        <Alert icon={alertIcon} variant="filled"
          sx={{...styles.alertStyle, ...alertColor}} >
          {alertText}
        </Alert>
      )
    }
  }

  const alertView = renderAlert();

  return (
    <>
      {alertView}
    </>
  );
}
