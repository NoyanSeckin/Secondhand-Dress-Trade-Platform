import { React, useState, useEffect, useCallback, useContext } from 'react'

import { Container, Box, Typography } from '@mui/material'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from "@react-hook/window-size/throttled";

import { styles } from './StylesHome'
import {ProductCard} from '../../components/product-card/ProductCard'
import ProductContext from '../../contexts/ProductContext'
import MobileContext from "../../contexts/MobileContext";
import VirtualSlide from '../../components/VirtualSlide'
import Skeleton from '../../components/Skeleton'

export default function Home() {

    const { setProduct } = useContext(ProductContext)
    const mobileScreen = useContext(MobileContext)

    const navigate = useNavigate();
    const [width] = useWindowSize({ fps: 60 });

    //   use session storage to display the same page after refresh
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

    async function getAllProducts() {
        // const response = await axios.get(`https://bootcamp.akbolat.net/products?_limit=30&_start=${categoryStartCounter}`);
        try {
          const response = await axios.get('/api/product/all');

          setDisplayAllProducts(response.data)
        } catch (error) {
          console.log(error.message)
        }
    }

    const getCategories = useCallback(async (count) => {
        // save users displayed category for refresh
        sessionStorage.setItem('active-nav', (activeNav));
        sessionStorage.setItem('selected-category', JSON.stringify(selectedCategory))

        // -1 equals to all categories
        if (selectedCategory === -1) {
            getAllProducts()
        }
        // these are other categories 'digerleri'
        else if (selectedCategory > 12) {

            const response = await axios.get(`https://bootcamp.akbolat.net/categories?&_start=13`);
            setDisplayedCategory(response.data);
            
            // from pants to others
        } else if (selectedCategory <= 12) {
            const response = await axios.get(`https://bootcamp.akbolat.net/categories?_limit=1&_start=${selectedCategory}`);
            setDisplayedCategory(response.data)
        }

    }, [selectedCategory, categoryStartCounter, displayedCategory])

    const navLinks = ['Hepsi', 'Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];

    function renderNavs() {
        return navLinks.map((link, index) => {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography className={`${activeNav === link && 'active-nav'}`} sx={styles.desktopNav}
                            onClick={() => { setActiveNav(link); setSelectedCategory(index - 1) }}>{link}</Typography>
                    </Box>
                </Box>
            )
        })
    }

    function directToDetailPage(product) {
        // set product context
        setProduct(product);
        navigate('/detail')
    }

    function renderSingleCategory(displayedCategory) {

        const category = displayedCategory?.map((category) => (
            
            category.products.map((product, index) => (
                
                <div onClick={() => directToDetailPage(product)}>
                    <ProductCard key={index} brand={product.brand} color={product.color} price={product.price} image={`https://bootcamp.akbolat.net${product?.image?.url}`} />
                </div>
            )
            )
        ))

        return category;
    }

    function renderAllProducts() {

        return displayAllProducts?.map((product, index) => (
            <div onClick={() => directToDetailPage(product)}>
                <ProductCard key={index} brand={product.brand} color={product.color} price={product.price} image={`https://bootcamp.akbolat.net${product.image?.url}`} />
            </div>
        ))
    }

    const renderMainImage = () => {

        return (
            <img className='home-main-image' src='/images/main-header.png' alt="woman-with-blue-dress" />
        )
    }

    const renderNavsView = () => {

        let navsView;

        // desktop navs
        if(width > mobileScreen){
            navsView = renderNavs()
        }
        // mobile navs
        else{
            navsView = <VirtualSlide display={navLinks} activeNav={activeNav} setActiveNav={setActiveNav} setSelectedCategory={setSelectedCategory} />
        }
        
        return(
            <Box sx={styles.navsContainer}>
                {navsView}
            </Box>
        )
    }

    const renderInfiniteScroll = () => {

        let renderView;

        if(selectedCategory === -1){
            renderView = renderAllProducts();
        }
        else{
            renderView = renderSingleCategory(displayedCategory);
        }
        
        return(
            <InfiniteScroll
            className='infinite-scroll' 
            dataLength={selectedCategory === -1 ? displayAllProducts?.length : displayedCategory?.length}
            next={getCategories}
            hasMore={true}
            loader={<Skeleton />}
            scrollThreshold={0.5}
        >
            {renderView}
        </InfiniteScroll>
        )
    }

    const mainImageView = renderMainImage();
    const navsView = renderNavsView();
    const infiniteScrollView = renderInfiniteScroll();

    return (
        <Box sx={styles.boxContainer}>
            <Container maxWidth='xl'
                sx={styles.container}>

                {mainImageView}

                <Box sx={{ position: 'relative' }}>
                    {navsView}
                    <hr className='home-hr' />
                </Box>

                {infiniteScrollView}
               
            </Container>
        </Box>
    )
}
