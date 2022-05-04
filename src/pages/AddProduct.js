import {Box, Container, Typography, Grid, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'
import Navbar from '../components/Navbar'
import SelectInput from '../components/SelectInput';
import MuiSelectComp from '../components/MuiSelectComp'
export default function AddProduct() {

  const requiredText = 'Bu alan zorunludur.'

  const inputInfos = {
    productName: {label: 'Ürün Adı', placeholder: 'Örnek: Iphone 12 Pro Max'},
    description: {label: 'Açıklama', placeholder: 'Ürün açıkIaması girin',},
    category: {label: 'Kategori', placeholder: 'Kategori seç'},
    brand: {label: 'Marka', placeholder: 'Marka seç'},
    color: {label: 'Renk', placeholder: 'Renk seç'},
    condition: {label: 'Kullanım Durumu', placeholder: 'Kullanım durumu seç'},
  }

  const categories = ['Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];

  function renderInput(value, error, handleChange, valueName){
    return(
      <Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
        <label htmlFor={valueName}> 
          {inputInfos[valueName].label}
        </label>
        <input id={valueName} type='text' value={value} onChange={handleChange} 
        />
        <Typography sx={{mt: 0}}>{error}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth="xl" sx={{pt: 12}}>
        <Grid container sx={{background: '#fff', borderRadius: '8px', pt: 2, pb: 10}}>
          <Grid item xs='7' sx={{ px: 2}}>
          <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor'}}>Ürün DetayIarı</Typography>
          <Formik 
          initialValues={{
            productName: '',
            description: '',
            category: '',
            // brand: '',
            // color: '',
            // condition: '',
            // price: '',
            // isOfferOption: false,
          }}
          validationSchema={
            Yup.object({
              productName: Yup.string().max(100, 'Maksimum 100 karakter giriniz.').required(requiredText),
              description: Yup.string().max(500, 'Maksimum 500 karakter giriniz').required(requiredText),
              category: Yup.string()
            })
          }
          onSubmit={(values) => {
            console.log(values)
          }}
          >
            {({values, errors, handleSubmit, dirty, handleChange}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  
                  {renderInput(values.productName, errors.productName, handleChange, 'productName')}
                  {renderInput(values.description, errors.description, handleChange, 'description')}

                  
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{width: '48%'}}>
                      <label htmlFor='category'>Kategori</label>
                      {/* <input type="text" value={} /> */}
                      <SelectInput values={categories} placeholder={inputInfos.category.placeholder} value={values.category} handleChange={handleChange}/>
                      {/* <MuiSelectComp values={categories} handleChange={handleChange}/> */}
                    </Box>
                  
                  </Box>
                </Box>
                <Button type='submit'>Submit</Button>
              </form>
            )}
          </Formik>
          

          </Grid>

          <Grid item xs='5'>
            <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor'}}>Ürün GörseIi</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
