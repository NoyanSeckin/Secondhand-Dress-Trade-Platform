import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import { styles } from './StylesHome';
import { ProductCard } from 'components/product-card/ProductCard';
// import VirtualSlide from 'components/VirtualSlide'
import Skeleton from 'components/Skeleton';

export default function Home() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const initialCategory = categories.find((category) => category.type === categoryId) || categories[0];

  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [displayAllProducts, setDisplayAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const response = await axios.get('/api/product/all');

      setDisplayAllProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const onCategoryClick = (category: Category) => {
    setActiveCategory(category);
    navigate(`/category/${category.type}`);
  };

  function directToDetailPage() {
    navigate('/detail');
  }

  //TODO : Implement mobile navs
  //   const renderNavsView = () => {

  //     <VirtualSlide display={navLinks} activeNav={activeNav} setActiveNav={setActiveNav} setSelectedCategory={setSelectedCategory} />
  //   }

  //   return (

  //     { navsView }
  //   )
  // }

  return (
    <Box sx={styles.boxContainer}>
      <Container maxWidth="xl" sx={styles.container}>
        <img className="home-main-image" src="/images/main-header.png" alt="woman-with-blue-dress" />

        <Box sx={{ position: 'relative' }}>
          <Box sx={styles.navsContainer}>
            {categories.map((category, index) => (
              <Box key={index} sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={styles.desktopNav}
                    className={`${activeCategory.type === category.type ? 'active-nav' : ''}`}
                    onClick={() => onCategoryClick(category)}
                  >
                    {category.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <hr className="home-hr" />
        </Box>

        <InfiniteScroll
          className="infinite-scroll"
          dataLength={displayAllProducts.length}
          // next={getCategories}
          // TODO: handle next
          next={() => {}}
          hasMore={true}
          loader={<Skeleton />}
          scrollThreshold={0.5}
        >
          {displayAllProducts?.map((product, index) => (
            <div onClick={() => directToDetailPage()}>
              <ProductCard
                key={index}
                brand={product.brand}
                color={product.color}
                price={product.price}
                imageUrl={product.image}
              />
            </div>
          ))}
        </InfiniteScroll>
      </Container>
    </Box>
  );
}

type Category = {
  type: string;
  label: string;
};

const categories: Array<Category> = [
  {
    type: 'all',
    label: 'Hepsi',
  },
  {
    type: 'pants',
    label: 'Pantolon',
  },
  {
    type: 'shirt',
    label: 'Gömlek',
  },
  {
    type: 'tshirt',
    label: 'Tişört',
  },
  {
    type: 'shorts',
    label: 'Şort',
  },
  {
    type: 'sweatshirt',
    label: 'Sweatshirt',
  },
  {
    type: 'sweater',
    label: 'Kazak',
  },
  {
    type: 'polar',
    label: 'Polar',
  },
  {
    type: 'coat',
    label: 'Mont',
  },
  {
    type: 'dress',
    label: 'Abiye',
  },
  {
    type: 'shoes',
    label: 'Ayakkabı',
  },
  {
    type: 'accessories',
    label: 'Aksesuar',
  },
  {
    type: 'bag',
    label: 'Çanta',
  },
  {
    type: 'knitwear',
    label: 'Triko',
  },
  {
    type: 'other',
    label: 'Diğer',
  },
];
