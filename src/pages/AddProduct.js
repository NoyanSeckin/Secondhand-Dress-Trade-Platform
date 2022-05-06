import {Box, Container, Typography, Grid, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import React, {useState, useEffect, useContext, useRef} from 'react'
import Navbar from '../components/Navbar'
import SelectInput from '../components/SelectInput';
import Switch from '../components/Switch'
import UserContext from '../contexts/UserContext'
import DropzoneComp from '../components/DropzoneComp';

export default function AddProduct() {
  const {userAuth} = useContext(UserContext);
  const [apiColors, setApiColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [usingStatuses, setUsingStatuses] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedFileError, setSelectedFileError] = useState('')

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
    name: {label: 'Ürün Adı', placeholder: 'Örnek: Iphone 12 Pro Max'},
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



  function categoryToNumber(category){
    return categories.indexOf(category) + 1;
  }
  const postProduct = async (userData) =>{
    const form = new FormData();
 
    const postObject = { ...userData, category: categoryToNumber(userData.category), isSold: false, users_permissions_user: 1} 


    form.append('data', JSON.stringify(postObject));
    form.append('files.image', selectedFile)
    
    await axios.post('https://bootcamp.akbolat.net/products', form, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`
      }, 
    }).then((response)=> console.log(response)).catch((err)=> console.log(err.message))
  }

  function renderSelectedFileError(){
    if(selectedFileError){
      return(
      <Typography sx={{color: '#F77474'}}>
        {selectedFileError}
      </Typography>
      )
    }
}
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      <Container maxWidth="xl" sx={{pt: 12, position:'relative'}}>
        <Grid container sx={{background: '#fff', borderRadius: '8px', pt: 4, pb: '10.3rem'}}>
          <Grid item xs={6.5} sx={{ pl: 4, pr: 5, mr: 1, borderRight: '1px solid #F2F2F2'}}>
          <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor', mb: 3}}>Ürün DetayIarı</Typography>
          <Formik 
          initialValues={{
            name: '',
            description: '',
            price: '',
            isOfferable: false,
          }}
          validationSchema={
            Yup.object({
              name: Yup.string().max(100, 'Maksimum 100 karakter giriniz.').required(requiredText),
              description: Yup.string().max(500, 'Maksimum 500 karakter giriniz').required(requiredText),
              category: Yup.string().required(),
              color: Yup.string(),
              brand: Yup.string(),
              status: Yup.string().required(),
              price: Yup.number('0-9 Arasında Bir Rakam Girin').required(),
              isOfferable: Yup.boolean()
            })
          }
          onSubmit={(values, {resetForm}) => {
            // check if user selected image
            if(selectedFile.path){
                postProduct(values);
                resetForm();
                values.category = 'Kategori seç';
                setSelectedFile({})
              }
          }}
          >
            {({values, errors, handleSubmit, dirty, handleChange}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                  
                  {renderInput(values.name, errors.name, handleChange, 'name')}
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
                      <input className={'price-input'} type="text" value={values.price} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}
                      style={{marginBottom: 0}}/>
                      {errors.price && <Typography sx={{fontSize: '15px', color: '#f77474', pb: 2}}>0-9 Arasında Bir Rakam Girin</Typography>}
                    </div>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
                      <label style={{color: '#B1B1B1', fontSize: '1rem', alignSelf: 'center', marginBottom: '0.2rem'}} htmlFor="isOfferable">Teklif Opsiyonu</label>
                      <Switch handleChange={handleChange} id='isOfferable'/>
                    </Box>
                  </Box>

                  <Button type='submit' variant='contained' 
                      sx={{
                        color: '#fff',
                        fontSize: '18px',
                        borderRadius: '8px',
                        position: 'absolute', 
                        bottom: '35px',  
                        right: '70px',
                        px: 16,
                        '&:hover': {
                          cursor: 'pointer'
                        }
                        }}>Kaydet</Button>
                  
                </Box>
              </form>
            )}
          </Formik>
          </Grid>

          <Grid item xs={5} sx={{mx: 'auto', position: 'relative'}}>
            <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor'}}>Ürün GörseIi</Typography>
            <DropzoneComp selectedFile={selectedFile}  setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError}/>
            {renderSelectedFileError()}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
