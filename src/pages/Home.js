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
  const [selectedCategory, setSelectedCategory] = useState([]);

  async function getCategories(){
    const response = await axios.get('https://bootcamp.akbolat.net/categories?_limit=1');
    setAllCategories(allCategories?.concat(response.data) )
  }
  useEffect(() => {
    getCategories();

  
  }, []);

  function renderMiddleNavbar(){
    const navbarItems = ['Hepsi', 'Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];
    return navbarItems.map(link => {
      return(
        <Box sx={{ flexGrow: 1}}>
           <Box sx={{display: 'flex'}}>
           <Typography className={`${activeNav === link && 'active-nav'}`} sx={{
             fontWeight: 600, color: '#525252','&:hover':{cursor: 'pointer'}}} 
           onClick={()=> setActiveNav(link)}>{link}</Typography>
           </Box>
        </Box>
      )
    }) 
  }
  function renderCards(){
    return allCategories.map((category) => {
      return(
        category.products.map(product => {
          console.log('fetch calisti')
          return(
            <CardComp key={category.id} brand={product.brand} color={product.color} price={product.price} image={'/uploads/medium_pantolon_21df8b1db8.jpeg'}/>
          )
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
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3.5, mt: 4, width: '103.5%'}}>
      <InfiniteScroll
        dataLength={renderCards.length} //This is important field to render the next data
        next={getCategories}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={getCategories}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        {renderCards()}
      </InfiniteScroll>
         
      </Box>
      </Container>
    </Box>
  )
}
