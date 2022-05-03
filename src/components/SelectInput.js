import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DropdownIcon from '../constants/icons/DropdownIcon';
export default function SelectInput({values, placeholder}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);
  
  const handleOpen = ()=> {
    setIsOpen(true);
  }

  const handleClose = (value) => {
    setIsOpen(false);
    setSelectedValue(value);
  }

  const renderValues = () => (
      values.map(value => {
      return(
        <Typography key={value} className='select-item' variant='h6'
        onClick={()=> handleClose(value)}>{value}</Typography>
      )
     }
    )
  )
  
  const renderDropdown = () => {
    if(isOpen){
      return(
        <div className='options-wrapper'>
        <div>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant='h6'>{placeholder}</Typography>
            <DropdownIcon/>
          </Box>
          {renderValues()}
        </div>
      </div>
      )
    }
  }
  return (
    <Box sx={{position: 'relative'}} >
      <div className="select-wrapper" onClick={handleOpen}>
        {selectedValue}
        <DropdownIcon style={{alignSelf: 'center'}}/>
      </div>
     {renderDropdown()}
     
    </Box>
  )
}
