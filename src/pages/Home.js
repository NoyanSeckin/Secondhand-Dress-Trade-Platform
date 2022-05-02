import {Container, Box, Typography} from '@mui/material'
import axios from 'axios'

import {React, useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import CardComp from '../components/CardComp'
import dummyData from '../constants/dummyData.json'
import InfiniteScroll from 'react-infinite-scroll-component';
export default function Home() {
  const [activeNav, setActiveNav] = useState('Hepsi')
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [categoryStartCounter, setCategoryStartCounter] = useState(0);
  const lastCategory = 'Etek';

  async function getCategories(){

    // Fetch new items with different start points in api
    const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${categoryStartCounter}`);
    // hepsi 0 olsun
    if(selectedCategory === 0){
      setAllCategories(allCategories?.concat(response.data))
      setCategoryStartCounter(categoryStartCounter + 1);
      // console.log(categoryStartCounter)
    }
    // others 
    else if(selectedCategory > 12){
      // const existingData = allCategories?.filter(category => category.id > 12);
      
    } else{
      setCategoryStartCounter(selectedCategory);
      const existingData = allCategories.filter(category => category.id === selectedCategory);
      console.log(existingData)
    }
  }
  useEffect(() => {
    getCategories();
  }, [selectedCategory]);
  useEffect(() => {
    getCategories();
  }, []);

  function setNavbar(link, index){
    setActiveNav(link);
    if(index > 12){
      // get
    }
  }

  function renderMiddleNavbar(){
    const navbarItems = ['Hepsi', 'Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];
    return navbarItems.map((link, index) => {
      return(
        <Box sx={{ flexGrow: 1}}>
           <Box sx={{display: 'flex'}}>
           <Typography className={`${activeNav === link && 'active-nav'}`} sx={{
             fontWeight: 600, color: '#525252','&:hover':{cursor: 'pointer'}}} 
           onClick={()=> {setActiveNav(link); setSelectedCategory(index)}}>{link}</Typography>
           </Box>
        </Box>
      )
    }) 
  }
  function renderCards(category){
    return allCategories.map((category) => {
      // console.log(category.name,category.id)
      return(
        category.products.map((product, index) => {
          // console.log('card map calisti')
          // console.log(product)
          if(product.image !== null){
            return(
              <CardComp key={index} brand={product.brand} color={product.color} price={product.price} image={`https://bootcamp.akbolat.net${product.image?.url}`}/>
            )
          }
        })
      )
    })
  }



  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth='xl' sx={{pt: 12}}>
        <img className='main-header' src={require('../images/main-header.png')} alt="" />
        <Box sx={{position: 'relative'}}>
          <Box sx={{display: 'flex',  width: '103.5%', mt: 2.5}}>
            {renderMiddleNavbar()}
          </Box>
        <hr className='home-hr'/>
        </Box>
     
      <InfiniteScroll
        className="infinite-scroll"
        dataLength={allCategories.length} 
        next={getCategories}
        hasMore={true}
        // loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // scrollThreshold={0.90}
      >
       {renderCards()}
      </InfiniteScroll>
      </Container>
    </Box>
  )
}
