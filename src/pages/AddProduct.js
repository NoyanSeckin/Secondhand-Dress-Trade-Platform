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
  const submitBtn = useRef();
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

  const [selectedFile, setSelectedFile] = useState();

  const fileChangeHandler = (event)=>{
    setSelectedFile(event.target.files[0])
    console.log(selectedFile)
    console.log(event.target.value);
  }

  function categoryToNumber(category){
    return categories.indexOf(category) + 1;
  }
  const postProduct = async (userData) =>{
    const userImage = new FormData();
    userImage.append('File', selectedFile);
    console.log(userAuth.token)
    // upload file
    await axios.post('https://bootcamp.akbolat.net/upload/', userImage, {
      headers: {Authorization: `Bearer ${userAuth.token}`},
      'Content-Type': 'multipart/form-data'
    }).then(res => console.log(res)).catch(err=> console.log(err))

    // dene
  //   axios.post('upload_file', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  // })

  // users_permissions_user: {
  //   username: userAuth.email,
  //   email: userAuth.email,
  //   password: '12345678',
  //   confirmationToken: userAuth.token
  // }
    
    const postObject = { data: {...userData, category: 15, price: 120, isSold: false, users_permissions_user: 1, "files.image": 'abiye'} }
    const jsonData = JSON.stringify(postObject);


    const testObject = {
     data: { "name": "Gomlek",
      "description": "Lorem opsum",
      "category": "15",
      "brand": 'Mavi',
      "color": "Lacivert",
      "status": "Az kullanldi",
      "price": 45,
      "isOfferable": true,
      "isSold": false,
      "users_permissions_user": "1"
     },
    "files.image": userImage 
    }
    // console.log(testObject)

    // 
    // await axios.post('https://bootcamp.akbolat.net/products', testObject,  {
    //   headers: {
    //     Authorization: `Bearer ${userAuth.token}`
    //   }, 
    // }).then((response)=> console.log(response)).catch((err)=> console.log(err.message))
  }

  
  return (
    <Box sx={{background: '#F2F2F2', height: '120vh'}}>
      <Navbar/>
      <Container maxWidth="xl" sx={{pt: 12}}>
        <Grid container sx={{background: '#fff', borderRadius: '8px', pt: 4, pb: '11rem'}}>
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
              price: Yup.number().required(),
              isOfferable: Yup.boolean()
              // oneOf([true], false)
            })
          }
          onSubmit={(values) => {
            categoryToNumber('Triko')

            console.log(values)
            // postProduct(values);
            // if(selectedFile){
            // }
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
                      <input className={'price-input'} type="text" value={values.price} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}/>
                    </div>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <label style={{color: '#B1B1B1', fontSize: '1rem', alignSelf: 'center', marginBottom: '0.2rem'}} htmlFor="isOfferable">Teklif Opsiyonu</label>
                      <Switch handleChange={handleChange} id='isOfferable'/>
                    </Box>
                  </Box>
                  <button style={{display: 'none'}} onClick={()=> console.log('clicked')} type='submit' ref={submitBtn}></button>
                </Box>
              </form>
            )}
          </Formik>
          </Grid>

          <Grid item xs={5} sx={{mx: 'auto', position: 'relative'}}>
            <Typography variant='h5' sx={{fontWeight: '700', color: 'textColor'}}>Ürün GörseIi</Typography>
            <DropzoneComp  setSelectedFile={setSelectedFile}/>
            <Button variant='contained' 
            sx={{
              color: '#fff',
              fontSize: '18px',
              borderRadius: '8px',
              position: 'absolute', 
              bottom: '-140px',  
              right: 0,
              px: 17,
              '&:hover': {
                cursor: 'pointer'
              }
              }} onClick={()=> submitBtn.current.click()}>Kaydet</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
