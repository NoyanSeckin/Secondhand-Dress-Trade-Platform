import Alert from '@mui/material/Alert';

import React,{useEffect} from 'react';
import SuccesIcon from '../../constants/icons/SuccessIcon';

export default function BasicAlert({ isAlert, setIsAlert }) {

  const style = {
    background: '#F1FFF0',
    borderRadius:' 8px',
    boxShadow:' 0px 3px 12px #1E36482E',
    color: '#46af32',
    fontSize: '16px',
    position: 'fixed',
    zIndex: 3,
    width: {
      xs: '89%',
      sm: '321px',
    },
    top: {
      xs: '81px',
      sm: '90px',
    },
    right: {
      xs: 'auto',
      sm: '-20px',
    },
    left: {
      xs: '10px',
      sm: 'auto'
    },
    mr: {
      xs: 0,
      sm: 3
    },
    px: 1.4,
    py: 1.2,
  }
  
  useEffect(()=> {
            
    if(isAlert){

      setTimeout(() => {
        setIsAlert(false);
      }, 3000);
      
    }
  }, [isAlert, setIsAlert])

  function renderAlert() {
    if(!isAlert){

      return(
        <Alert icon={<SuccesIcon/>} variant="filled" 
        sx={style} >
          Satın AIındı
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
