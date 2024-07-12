import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { styles } from './StylesAddProduct';
import SelectInput from '../../components/SelectInput';
import Switch from '../../components/Switch';
import DropzoneComp from '../../components/Dropzone/Dropzone';

export default function AddProduct() {
  const { userAuth } = useContext(UserContext);

  const [apiColors, setApiColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [usingStatuses, setUsingStatuses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedFile, setSelectedFile] = useState({});
  const [selectedFileError, setSelectedFileError] = useState('');

  async function fetchApiValue(extension, setState) {
    const response = await axios.get(`api/product/${extension}`);

    setState(response.data);
  }

  useEffect(() => {
    fetchApiValue('colors', setApiColors);
    fetchApiValue('brands', setBrands);
    fetchApiValue('conditions', setUsingStatuses);
    fetchApiValue('categories', setCategories);
  }, []);

  const inputInfos = {
    name: {
      label: 'Ürün Adı',
      placeholder: 'Örnek: Iphone 12 Pro Max',
    },
    description: {
      label: 'Açıklama',
      placeholder: 'Ürün açıkIaması girin',
    },
    category: {
      label: 'Kategori',
      placeholder: 'Kategori seç',
    },
    brand: {
      label: 'Marka',
      placeholder: 'Marka seç',
    },
    color: {
      label: 'Renk',
      placeholder: 'Renk seç',
    },
    status: {
      label: 'Kullanım Durumu',
      placeholder: 'Kullanım durumu seç',
    },
    price: {
      label: 'Fiyat',
      placeholder: 'Bir fiyat girin',
    },
  };

  // input func to render inputs
  function renderInput(value, error, handleChange, valueName) {
    const rowsCount = valueName === 'description' ? '3' : '1';
    const errorClass = error && 'form-error';

    return (
      <Box sx={styles.inputContainer}>
        <label htmlFor={valueName}>{inputInfos[valueName].label}</label>
        <textarea
          className={errorClass}
          id={valueName}
          type="text"
          value={value}
          onChange={handleChange}
          rows={rowsCount}
        />
        <Typography sx={styles.errorText}>{error}</Typography>
      </Box>
    );
  }

  function renderSelectOption(values, placeholder, id, label, handleChange, error) {
    return (
      <Box sx={styles.selectContainer}>
        <SelectInput
          error={error}
          values={values}
          placeholder={placeholder}
          handleChange={handleChange}
          id={id}
          label={label}
        />
      </Box>
    );
  }

  // function categoryToNumber(category) {
  //   return categories.indexOf(category) + 1;
  // }

  const postProduct = async (userData) => {
    // const form = new FormData();

    // const postObject = { ...userData, category: categoryToNumber(userData.category), isSold: false, users_permissions_user: userAuth.id }

    // form.append('data', JSON.stringify(postObject));
    // form.append('files.image', selectedFile)

    try {
      await axios.post(
        '/api/product/create',
        {
          ...userData,
          price: Number(userData.price),
        },
        {
          headers: {
            Authorization: userAuth.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  function renderSelectedFileError() {
    if (selectedFileError) {
      return <Typography sx={{ color: 'danger' }}>{selectedFileError}</Typography>;
    }
  }

  const initialFormValues = {
    name: '',
    description: '',
    price: '',
    isOfferable: false,
  };

  const requiredText = 'Bu alan zorunludur.';

  const validationSchema = {
    name: Yup.string().max(100, 'Maksimum 100 karakter giriniz.').required(requiredText),
    description: Yup.string().max(500, 'Maksimum 500 karakter giriniz').required(requiredText),
    category: Yup.string().required(requiredText),
    color: Yup.string(),
    brand: Yup.string(),
    condition: Yup.string().required(requiredText),
    price: Yup.number('0-9 Arasında Bir Rakam Girin').required(),
    isOfferable: Yup.boolean(),
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialFormValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values, { resetForm }) => {
          // check if user selected image
          // if (selectedFile.path) {
          postProduct(values);
          // resetForm();
          // setSelectedFile({})
          // }
        }}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={styles.formContainer}>
              {renderInput(values.name, errors.name, handleChange, 'name')}

              {renderInput(values.description, errors.description, handleChange, 'description')}

              <Box sx={styles.selectOptionsContainer}>
                {renderSelectOption(
                  categories,
                  inputInfos.category.placeholder,
                  'category',
                  'Kategori',
                  handleChange,
                  errors.category
                )}

                {renderSelectOption(brands, inputInfos.brand.placeholder, 'brand', 'Marka', handleChange, errors.brand)}

                {renderSelectOption(
                  apiColors,
                  inputInfos.color.placeholder,
                  'color',
                  'Renk',
                  handleChange,
                  errors.color
                )}

                {renderSelectOption(
                  usingStatuses,
                  inputInfos.status.placeholder,
                  'condition',
                  'Kullanım Durumu',
                  handleChange,
                  errors.status
                )}
              </Box>

              <Box sx={styles.priceAndOfferContainer}>
                <div className="price-wrapper">
                  <label htmlFor="price" style={{ marginBottom: '10px' }}>
                    {inputInfos.price.label}
                  </label>

                  <input
                    className={'price-input'}
                    type="text"
                    value={values.price}
                    id="price"
                    onChange={handleChange}
                    placeholder={inputInfos.price.placeholder}
                    style={{ marginBottom: 0 }}
                  />

                  {errors.price && <Typography sx={styles.priceError}>0-9 Arasında Bir Rakam Girin</Typography>}
                </div>

                <Box sx={styles.switchContainer}>
                  <label style={styles.switchLabel} htmlFor="isOfferable">
                    Teklif Opsiyonu
                  </label>

                  <Switch handleChange={handleChange} id="isOfferable" />
                </Box>
              </Box>

              <Button type="submit" variant="contained" sx={styles.submitButton}>
                Kaydet
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  };

  const renderFormGrid = () => {
    const formView = renderForm();

    return (
      <Grid item xs={12} lg={6.5} sx={styles.detailsGridItem}>
        <Typography variant="h5" sx={styles.detailsHeader}>
          Ürün DetayIarı
        </Typography>

        {formView}
      </Grid>
    );
  };

  const renderDropzoneGrid = () => {
    return (
      <Grid item xs={12} lg={5} sx={styles.dropzoneGridItem}>
        <Typography variant="h5" sx={styles.dropzoneTitle}>
          Ürün GörseIi
        </Typography>

        <DropzoneComp
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setSelectedFileError={setSelectedFileError}
        />

        {renderSelectedFileError()}
      </Grid>
    );
  };

  const formView = renderFormGrid();
  const dropzoneView = renderDropzoneGrid();

  return (
    <Box sx={styles.boxContainer}>
      <Container maxWidth="xl" sx={styles.container}>
        <Grid container sx={styles.gridContainer}>
          {formView}
          {dropzoneView}
        </Grid>
      </Container>
    </Box>
  );
}
