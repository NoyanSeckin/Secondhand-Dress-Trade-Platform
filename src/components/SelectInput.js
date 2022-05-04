import { Box, Typography } from '@mui/material';
import {Field} from 'formik'
import React, { useState, useEffect, useRef } from 'react';
import DropdownIcon from '../constants/icons/DropdownIcon';
export default function SelectInput({values, placeholder, handleChange, id, label}) {


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

  const renderOptionValues = () => (
      values.map(value => {
      return(
        <Typography key={value} variant='h6' className={`option-value ${selectedValue === value && 'active-option-value'}`}
        onClick={()=> handleClose(value)}>{value}</Typography>
      )
     }
    )
  ) 
  
  const renderDropdown = () => {
    if(isOpen){
      return(
       <div className='options-wrapper'>
          {renderOptionValues()}
      </div>
      )
    }
  }

  const renderSelectInput = ()=> {
    return(
      <div className={`select-wrapper ${isOpen && 'active-select-wrapper'}`}onClick={handleOpen}>
        <Typography variant='h6' 
        sx={{
          zIndex: `${isOpen && '7'}`, fontWeight: 'normal', color: `${isOpen ? '#B1B1B1' : '#99A0A7'}`}}>{isOpen ? placeholder : selectedValue}
          </Typography>
        <DropdownIcon 
        style={{alignSelf: 'center', transform: `${isOpen ? 'rotate(180deg) '  : 'rotate(0deg)'}`, marginRight: '-12px' }}/>
      </div>
    )
  }
  return (
    <Box sx={{position: 'relative', mb: 3}} >
      <label htmlFor='category'>{label}</label>
      <input style={{display: 'none'}} id={id} type="text" onChange={handleChange} ref={inputRef}/>
      {/* when isOpen active, dropdown and selectinput are nested to achive scrollbar design*/}
      {renderSelectInput()}
      {renderDropdown()}
    </Box>
  )
}
