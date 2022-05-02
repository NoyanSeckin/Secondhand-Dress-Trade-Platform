import React from 'react'
import CardComp from './CardComp'
export default function DisplayCategory({category}) {
  function renderCards(displayedCategory){
    // const displayedCategory = selectedCategoryItems.length > 0 ? selectedCategoryItems : allCategories;
    return displayedCategory?.map((category) => {
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
    <div>{renderCards(category)}</div>
  )
}
