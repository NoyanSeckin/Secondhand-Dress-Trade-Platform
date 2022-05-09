import {Container, Box, Typography} from '@mui/material'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from 'react-router-dom'
import { useWindowSize } from "@react-hook/window-size/throttled";

import {React, useState, useEffect, useCallback, useContext} from 'react'
import Navbar from '../components/Navbar'
import CardComp from '../components/CardComp'
import ProductContext from '../contexts/ProductContext'
import MobileContext from "../contexts/MobileContext";
import VirtualSlide from '../components/VirtualSlide'

export default function Home() {
  const {setProduct} = useContext(ProductContext)
  const mobileScreen = useContext(MobileContext)
  
  const navigate = useNavigate();
  const [width] = useWindowSize({ fps: 60 });

  const active_nav = sessionStorage.getItem('active-nav');
  const selected_category = JSON.parse(sessionStorage.getItem('selected-category'));

  const [activeNav, setActiveNav] = useState(active_nav || 'Hepsi')
  const [selectedCategory, setSelectedCategory] = useState(selected_category || -1);
  const [displayedCategory, setDisplayedCategory] = useState([]);
  const [categoryStartCounter, setCategoryStartCounter] = useState(0);
  const [displayAllProducts, setDisplayAllProducts] = useState([]);

  useEffect(() => {
    getCategories();
  }, [selectedCategory]);

  async function getAllProducts(){
    const response = await axios.get(`https://bootcamp.akbolat.net/products?_limit=30&_start=${categoryStartCounter}`);

    // avoid setting duplicate products
    let existingProductIds = displayAllProducts?.map(product => product.id)
    let uniqueItems = [];
    response.data.forEach(product => {
      if(!existingProductIds.includes(product.id)){
        uniqueItems.push(product)
      }
    })
    setDisplayAllProducts(displayAllProducts?.concat(uniqueItems))
    setCategoryStartCounter(categoryStartCounter + 1);
  }

  const getCategories =  useCallback(async (count) => {
    // save users displayed category for refresh
    sessionStorage.setItem('active-nav', (activeNav));
    sessionStorage.setItem('selected-category', JSON.stringify(selectedCategory))

    // -1 equals to all categories
    if(selectedCategory === -1){
      getAllProducts()
      }
      // these are other categories 'digerleri'
     else if(selectedCategory > 12){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?&_start=13`);
      setDisplayedCategory(response.data);
      // from pants to others
    } else if(selectedCategory <= 12){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${selectedCategory}`);
      setDisplayedCategory(response.data)
    }
    
  }, [selectedCategory, categoryStartCounter, displayedCategory] )
  
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
    // set product context
    setProduct(product);
    navigate('/detail')
  }

  function renderCards(displayedCategory){
    return displayedCategory?.map((category) => (
        category.products.map((product, index) => (
          <div onClick={()=> directToDetailPage(product)}>
            <CardComp key={index} brand={product.brand} color={product.color} price={product.price} image={`https://bootcamp.akbolat.net${product?.image?.url}`}/>
          </div>
        )
      )
    ))
  }

  function renderAllProducts(){
    return displayAllProducts?.map((product, index) => (
     <div onClick={()=> directToDetailPage(product)}>
      <CardComp key={index} brand={product.brand} color={product.color} price={product.price} image={`https://bootcamp.akbolat.net${product.image?.url}`}/>
    </div>
    ))
  }

  return (
    <Box sx={{
      background: '#F2F2F2', 
      minHeight: {xs: 'auto', lg: '120vh'}
      }}>
      <Navbar/>
      <Container maxWidth='xl' 
      sx={{
        pt: {xs: 10, lg: 12}, 
        px: {xs: 1, xl: 3}
        }}>
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
        dataLength={selectedCategory === -1 ? displayAllProducts?.length : displayedCategory?.length} 
        next={getCategories}
        hasMore={true}
        // loader={<h4>Loading...</h4>}
        scrollThreshold={0.5}
      >
        {selectedCategory === -1 ? 
        renderAllProducts()
        : renderCards(displayedCategory)
      }
      </InfiniteScroll>
      </Container>
    </Box>
  )
}
