import {Box, Container, Typography, Grid, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import SelectInput from '../components/SelectInput';
import Switch from '../components/Switch'

export default function AddProduct() {
  const [apiColors, setApiColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [usingStatuses, setUsingStatuses] = useState([]);
  // let apiColors = [];

  async function getApiValue(extension, setState){
    const response = await axios.get(`https://bootcamp.akbolat.net/${extension}`);
    
    const reducedArray = response?.data?.reduce((accumulator, currValue) => [...accumulator, currValue.name], [])
    setState([...reducedArray]);
  } 

  useEffect(()=> {
    getApiValue('colors', setApiColors)
    getApiValue('brands', setBrands)
    getApiValue('using-statuses', setUsingStatuses)
  }, [])

  // Categories was a large data, instead of request I wrote them down.
  const categories = ['Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Cüzdan', 'Elbise', 'Etek'];

  const requiredText = 'Bu alan zorunludur.'

  const inputInfos = {
    productName: {label: 'Ürün Adı', placeholder: 'Örnek: Iphone 12 Pro Max'},
    description: {label: 'Açıklama', placeholder: 'Ürün açıkIaması girin',},
    category: {label: 'Kategori', placeholder: 'Kategori seç'},
    brand: {label: 'Marka', placeholder: 'Marka seç'},
    color: {label: 'Renk', placeholder: 'Renk seç'},
    status: {label: 'Kullanım Durumu', placeholder: 'Kullanım durumu seç'},
    price: {label: 'Fiyat', placeholder: 'Bir fiyat girin'}
  }



  function renderInput(value, error, handleChange, valueName){
    return(
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <label htmlFor={valueName}> 
          {inputInfos[valueName].label}
        </label>
        <textarea className={error && 'form-error'} id={valueName} type='text' value={value} onChange={handleChange} rows={`${valueName === 'description' ? '3' : '1'}`}
        />
      </Box>
    )
  }

  function renderSelectOption(values, placeholder, id, label,handleChange, error){
    return(
      <Box sx={{width: '46%'}}>
        <SelectInput error={error} values={values} placeholder={placeholder} handleChange={handleChange} id={id} label={label}/>
      </Box>
    )
  }

  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth="xl" sx={{pt: 12}}>
        <Grid container sx={{background: '#fff', borderRadius: '8px', pt: 2, pb: 10}}>
          <Grid item xs={7} sx={{ px: 2}}>
          <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor', mb: 3}}>Ürün DetayIarı</Typography>
          <Formik 
          initialValues={{
            productName: '',
            description: '',
            // category: '',
            // brand: '',
            // color: '',
            // condition: '',
            price: '',
            isOfferOption: false,
          }}
          validationSchema={
            Yup.object({
              productName: Yup.string().max(100, 'Maksimum 100 karakter giriniz.').required(requiredText),
              description: Yup.string().max(500, 'Maksimum 500 karakter giriniz').required(requiredText),
              category: Yup.string().required(),
              color: Yup.string().required(),
              status: Yup.string().required(),
              price: Yup.number().required(),
              isOfferOption: Yup.boolean()
              // oneOf([true], false)
            })
          }
          onSubmit={(values) => {
            console.log(values)
          }}
          >
            {({values, errors, handleSubmit, dirty, handleChange}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                  
                  {renderInput(values.productName, errors.productName, handleChange, 'productName')}
                  {renderInput(values.description, errors.description, handleChange, 'description')}
                  
                  <Box sx={{display: 'flex', justifyContent: 'space-between', width: '95.5%', flexWrap: 'wrap'}}>
                    {renderSelectOption(categories, inputInfos.category.placeholder, 'category', 'Kategori', handleChange, errors.category)}
                    {renderSelectOption(brands, inputInfos.brand.placeholder, 'brand', 'Marka', handleChange, errors.brand)}
                    {renderSelectOption(apiColors, inputInfos.color.placeholder, 'color', 'Renk', handleChange, errors.color)}
                    {renderSelectOption(usingStatuses, inputInfos.status.placeholder, 'status', 'Kullanım Durumu', handleChange, errors.status)}
                  </Box>

                  <Box sx={{width: '36%'}}>
                    <label htmlFor="price">{inputInfos.price.label}</label>
                    <div className='price-wrapper'>
                      <input className={'price-input'} type="text" value={values.price} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}/>
                    </div>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <label style={{color: '#B1B1B1', fontSize: '1.125rem', alignSelf: 'center', marginBottom: '0.2rem'}} htmlFor="isOfferOption">Teklif Opsiyonu</label>
                      <Switch handleChange={handleChange} id='isOfferOption'/>
                    </Box>
                  </Box>

                  <Button type="submit">Submit</Button>
                </Box>
              </form>
            )}
          </Formik>
          </Grid>

          <Grid item xs={5}>
            <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor'}}>Ürün GörseIi</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
