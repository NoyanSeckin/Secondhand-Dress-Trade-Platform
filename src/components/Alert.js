import * as React from 'react';
import Alert from '@mui/material/Alert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import AlertIcon from '../components/AlertIcon'
export default function BasicAlert({isAlert}) {
  return (
      <Alert icon={<AlertIcon/>} variant="filled" 
      sx={{
        position: 'absolute',
        top: '60px',
        right: '10px',
        zIndex: 3,
        background: '#FFE5E5',
        color: '#F77474',
        boxShadow:' 0px 3px 12px #1E36482E',
        borderRadius:' 8px',
        fontSize: '16px',
        width: '321px',
        py: 1.3
      }} >
        Emailiniz veya şifreniz hatalı.
      </Alert>
  );
}
