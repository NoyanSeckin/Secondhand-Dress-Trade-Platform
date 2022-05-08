import Alert from '@mui/material/Alert';

import React,{useEffect} from 'react';
import SuccesIcon from '../constants/icons/SuccessIcon';

export default function BasicAlert({isAlert, setIsAlert, screen}) {

  console.log(isAlert)
  const style = {
    position: 'absolute',
    zIndex: 3,
    background: '#F1FFF0',
    color: '#46af32',
    boxShadow:' 0px 3px 12px #1E36482E',
    borderRadius:' 8px',
    fontSize: '16px',
  }

  const desktopStyle = {
    ...style, 
    width: '321px',
    py: 1.3,
    mr: 3,
    top: '85px',
    right: '-20px',
  }

  const mobileStyle = {
    ...style,
    width: '114%',
    top: '14px'
  }
  
  function handleClose(){
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }

  useEffect(()=> {
    if(isAlert){
      handleClose()
    }
  }, [isAlert])

  function renderAlert() {
    return(isAlert &&
    <Alert icon={<SuccesIcon/>} variant="filled" 
    sx={screen > 400 ? desktopStyle : mobileStyle} >
     Satın AIındı
    </Alert>)
  }
  return (
    <>
     {renderAlert()}
    </>
  );
}
