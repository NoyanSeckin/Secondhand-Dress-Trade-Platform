import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels({handleChange, values}) {
  const [selectedValue, setSelectedValue] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const renderValues = () => (
    values.map(value => {
    return(
      <MenuItem key={value} className='select-item' 
      onClick={()=> setSelectedValue(value)}>{value}</MenuItem>
    )
   }
  )
) 
  const handleChangeNative = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl 
      name='category'
      id='category'
       sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={selectedValue}
        onChange={handleChangeNative}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          Kategori Seç
        </MenuItem>
        {renderValues()}
      </Select>
    </FormControl>
  );
}
