import { Box, Typography } from '@mui/material';
import {Field} from 'formik'
import React, { useState, useEffect, useRef } from 'react';
import DropdownIcon from '../constants/icons/DropdownIcon';
export default function SelectInput({values, placeholder, handleChange}) {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);
  const handleOpen = ()=> {
    setIsOpen(true);
  }
  
  const inputRef = useRef();
  // set input value
  const setNativeInput = ()=> {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      .set.call(inputRef.current, selectedValue);

    inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
  }

  useEffect(()=> {
    setNativeInput();
  }, [selectedValue])

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
     
      <input style={{display: 'none'}} id='category' type="text" onChange={handleChange} ref={inputRef}/>
      <div className="select-wrapper" onClick={handleOpen}>
        <p >{selectedValue}</p>
        <DropdownIcon style={{alignSelf: 'center'}}/>
      </div>
     {renderDropdown()}
     
    </Box>
  )
}
