import React from 'react'
import ProductContext from 'context/ProductContext'
import {ProductsGrid} from '../ProductsGrid'

export function FeaturedProducts() {

	const {collections} = React.useContext(ProductContext)

	const featuredCollection = collections.find(collection => collection.title === 'Featured hats')

	return (
		<section>
			<h1>Featured Products</h1>
			<ProductsGrid products={featuredCollection.products}/>
		</section>
	)
}
