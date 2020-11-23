import React from 'react';
import { Layout, SEO, HomepageCollectionsGrid, FeaturedProducts } from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  	const {collections} = React.useContext(ProductContext)
  	console.log(collections)
	return (
		<Layout>
      <SEO title="Homepage" description="blablablablablablablablablablablablablabl" />
    		<HomepageCollectionsGrid collections = {collections.filter(collection => collection.title !== 'Featured hats')} />
    		{!!collections.find(collection => collection.title === 'Featured hats') &&(
    			<FeaturedProducts />
    			)}
  		</Layout>
	)
  
};

export default IndexPage;
