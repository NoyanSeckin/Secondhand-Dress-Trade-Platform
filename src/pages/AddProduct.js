import {Box, Container, Typography, Grid, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'
import Navbar from '../components/Navbar'
import SelectInput from '../components/SelectInput';
import MuiSelectComp from '../components/MuiSelectComp'
export default function AddProduct() {
  const placeholders = {
    productName: 'Örnek: Iphone 12 Pro Max',
    description: 'Ürün açıkIaması girin',
    category: 'Kategori seç',
    brand: 'Marka seç',
    color: 'Renk seç',
    condition: 'Kullanım durumu seç',

  }
  const categories = ['Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];


  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth="xl" sx={{pt: 12}}>
        <Grid container sx={{background: '#fff', borderRadius: '8px', pt: 2, pb: 10}}>
          <Grid item xs='7' sx={{ px: 2}}>
          <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor'}}>Ürün DetayIarı</Typography>
          <Formik 
          initialValues={{
            productName: '12',
            description: '11',
            // category: '22',
            // brand: '',
            // color: '',
            // condition: '',
            // price: '',
            // isOfferOption: false,
          }}
          validationSchema={
            Yup.object({
              productName: Yup.string().max(100, '').required(''),
              description: Yup.string().max(500, '').required(""),
              // category: Yup.string().required(),
            })
          }
          onSubmit={(values) => {
            console.log(values)
          }}
          >
            {({values, errors, handleSubmit, dirty, handleChange}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  
                  <label htmlFor={values.productName}>Ürün Adı</label>
                  <input type="text" onChange={handleChange} value={values.productName} id={1}/>

                  <label htmlFor={values.description}>Açıklama</label>
                  <input type="text" onChange={handleChange} value={values.description} id={2}/>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{width: '48%'}}>
                      <label htmlFor={values.category}>Kategori</label>
                      <SelectInput values={categories} placeholder={placeholders.category}/>
                      {/* <MuiSelectComp/> */}
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
