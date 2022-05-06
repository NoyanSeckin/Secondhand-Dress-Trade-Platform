import {Container, Box, Typography} from '@mui/material'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from 'react-router-dom'

import {React, useState, useEffect, useCallback, useContext} from 'react'
import Navbar from '../components/Navbar'
import CardComp from '../components/CardComp'
import ProductContext from '../contexts/ProductContext'
export default function Home() {
  const {setProduct} = useContext(ProductContext)
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Hepsi')
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [displayedCategory, setDisplayedCategory] = useState([]);
  const [categoryStartCounter, setCategoryStartCounter] = useState(0);

  const getCategories =  useCallback(async (count) => {
    // -1 equals to all categories
    if(selectedCategory === -1){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${categoryStartCounter}`);
     
      setDisplayedCategory(displayedCategory?.concat(response.data));
      setCategoryStartCounter(categoryStartCounter + 1);
      setCategoryStartCounter(categoryStartCounter + 1);
      }
      // these are other categories 'digerleri'
     else if(selectedCategory > 12){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?&_start=13`);
      setDisplayedCategory(response.data);
      
    } else if(selectedCategory <= 12){
      const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${selectedCategory}`);

      setDisplayedCategory(response.data)
      setCategoryStartCounter(0);
    }
  }, [selectedCategory, categoryStartCounter, displayedCategory] )
  
  useEffect(() => {
    if(selectedCategory === -1){
      setDisplayedCategory([]);
    }
    getCategories();
  }, [selectedCategory]);

  function renderMiddleNavbar(){
    const navbarItems = ['Hepsi', 'Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];
    return navbarItems.map((link, index) => {
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
          if(product.image !== null && !product.isSold){
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
