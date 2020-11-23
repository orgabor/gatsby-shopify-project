import React from 'react';
import {graphql, useStaticQuery} from 'gatsby'

const query = graphql`
   fragment ProductTileFields on ShopifyProduct{
    handle
    priceRange {
            minVariantPrice {
              amount
              currencyCode
              }
          }
   }
  {
    allproduct: allShopifyProduct{
      nodes{
        ...ShopifyProductFields
        ...ProductTileFields
      }
    }
    collection: allShopifyCollection(sort: {fields: title, order: ASC} ) {
      nodes {
        title
        description
        shopifyId
        image{
          localFile{
          childImageSharp{
            fluid(maxWidth: 1200){
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        }
        products {
          ...ShopifyProductFields
          ...ProductTileFields
        }
      }
    }
  }
`


const defaultState = {
  products: [],
};

const ProductContext = React.createContext(defaultState);
export default ProductContext;

export function ProductContextProvider({ children }) {
  const {collection, allproduct} = useStaticQuery(query)

  return (
    <ProductContext.Provider
      value={{
        products: allproduct.nodes.map(node =>node),
        collections: collection.nodes.map(node=>node),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
