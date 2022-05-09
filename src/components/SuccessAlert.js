import Alert from '@mui/material/Alert';

import React,{useEffect} from 'react';
import SuccesIcon from '../constants/icons/SuccessIcon';

export default function BasicAlert({isAlert, setIsAlert, screen}) {

  const style = {
    background: '#F1FFF0',
    borderRadius:' 8px',
    boxShadow:' 0px 3px 12px #1E36482E',
    color: '#46af32',
    fontSize: '16px',
    position: 'absolute',
    zIndex: 3,
  }

  const desktopStyle = {
    ...style, 
    mr: 3,
    py: 1.3,
    right: '-20px',
    top: '85px',
    width: '321px',
  }

  const mobileStyle = {
    ...style,
    left: '10px',
    padding: '0.6rem 0.7rem',
    top: '81px',
    width: '89%',
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
