import {Container, Box, Typography} from '@mui/material'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from 'react-router-dom'
import { useWindowSize } from "@react-hook/window-size/throttled";

import {React, useState, useEffect, useCallback, useContext} from 'react'
import Navbar from '../components/Navbar'
import CardComp from '../components/CardComp'
import ProductContext from '../contexts/ProductContext'
import VirtualSlide from '../components/VirtualSlide'

export default function Home() {
  const {setProduct} = useContext(ProductContext)
  const navigate = useNavigate();
  const [width] = useWindowSize({ fps: 60 });
  const mobileScreen = 400;

  const active_nav = sessionStorage.getItem('active-nav');
  const selected_category = JSON.parse(sessionStorage.getItem('selected-category'));

  const [activeNav, setActiveNav] = useState(active_nav || 'Hepsi')
  const [selectedCategory, setSelectedCategory] = useState(selected_category || -1);
  const [displayedCategory, setDisplayedCategory] = useState([]);
  const [categoryStartCounter, setCategoryStartCounter] = useState(0);

  const getCategories =  useCallback(async (count) => {
    // save users displayed category for refresh
    sessionStorage.setItem('active-nav', (activeNav));
    sessionStorage.setItem('selected-category', JSON.stringify(selectedCategory))

    // -1 equals to all categories
    if(selectedCategory === -1){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${categoryStartCounter}`);
     
      setDisplayedCategory(displayedCategory?.concat(response.data));
      setCategoryStartCounter(categoryStartCounter + 1);
      }
      // these are other categories 'digerleri'
     else if(selectedCategory > 12){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?&_start=13`);
      setDisplayedCategory(response.data);
      // from pants to others
    } else if(selectedCategory <= 12){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${selectedCategory}`);

      setDisplayedCategory(response.data)
      setCategoryStartCounter(0);
    }
    
  }, [selectedCategory, categoryStartCounter, displayedCategory] )
  


  useEffect(() => {
    if(selectedCategory === -1 ){
      setDisplayedCategory([]);
      setCategoryStartCounter(0);
      console.log(displayedCategory)
    }
    getCategories();
  }, [selectedCategory]);

  const navLinks = ['Hepsi', 'Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];
  function renderMiddleNavbar(){
    
    return navLinks.map((link, index) => {
      return(
        <Box sx={{ flexGrow: 1}}>
           <Box sx={{display: 'flex'}}>
           <Typography className={`${activeNav === link && 'active-nav'}`} sx={{
             fontWeight: 600, color: '#525252','&:hover':{cursor: 'pointer'}}} 
           onClick={()=> {setActiveNav(link); setSelectedCategory(index - 1)}}>{link}</Typography>
           </Box>
        </Box>
      )
    }) 
  }

  function directToDetailPage(product){
    setProduct(product);
    navigate('/detail')
  }

  function renderCards(displayedCategory){

    return displayedCategory?.map((category) => {
      return(
        category.products.map((product, index) => {
          if(product.image !== null ){
            return(
              <div onClick={()=> directToDetailPage(product)}>
                <CardComp key={index} brand={product.brand} color={product.color} price={product.price} image={`https://bootcamp.akbolat.net${product.image?.url}`}/>
              </div>
            )
          }
        })
      )
    })
  }

  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth='xl' sx={{pt: {xs: 10, lg: 12}, px: {xs: 1, xl: 3}}}>
        <img className={width > 400 ? 'main-header' : 'main-header-mobile'} src={require('../images/main-header.png')} alt="" />
        <Box sx={{position: 'relative'}}>
          <Box sx={{display: 'flex',  width: '103.5%', mt: 2.5}}>
            {width > mobileScreen ? 
            renderMiddleNavbar()
            : <VirtualSlide display={navLinks} activeNav={activeNav} setActiveNav={setActiveNav} setSelectedCategory={setSelectedCategory}/>
          }
            
          </Box>
        <hr className='home-hr'/>
        </Box>

      <InfiniteScroll
        className={`infinite-scroll ${width  < mobileScreen && 'infinite-scroll-mobile'}`}
        dataLength={displayedCategory?.length} 
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
       {renderCards(displayedCategory)}
      </InfiniteScroll>
      </Container>
    </Box>
  )
}
