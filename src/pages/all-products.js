import React from 'react'
import {Layout, Filters, ProductsGrid, SEO} from 'components'
import ProductContext from 'context/ProductContext'
import styled from 'styled-components'
import queryString from 'query-string'
import {useLocation} from '@reach/router'


const Content = styled.div`
	display: grid;
	grid-gap: 20px;
	margin-top: 20px;
	grid-template-columns: 1fr 3fr;	
`

const AllProducts = () => {
	const {products, collections} = React.useContext(ProductContext)

	const collectionProductMap = {}
	const {search}  = useLocation()
	const qs = queryString.parse(search)

	const selectedCollectionIds = qs.c?.split(',').filter(c => !!c) || []
	const selectedCollectionIdsMap = {}
	const searchTerm = qs?.s

	selectedCollectionIds.forEach(collectionId => {
		selectedCollectionIdsMap[collectionId] = true
	})

	if(collections){
		collections.forEach(collection => {
			collectionProductMap[collection.shopifyId] = {}
			collection.products.forEach(product => {
				collectionProductMap[collection.shopifyId][product.shopifyId] = true
			})
		})
	}

	const filterByCategory = product => {
		if( Object.keys(selectedCollectionIdsMap).length ) {
			for(let key in selectedCollectionIdsMap){
				if(collectionProductMap[key]?.[product.shopifyId]){
					return true
				}
				return false
			}
			return false
		}

		return true
	}

	const filterBySearchTerm = product => {
		if(searchTerm){
			return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
		}

		return true
	}
	
	const filteredProducts = products.filter(filterByCategory).filter(filterBySearchTerm)

	return (
		<Layout>
			<SEO title="Homepage" description="blablablablablablablablablablablablablabl" />
			{!!searchTerm && !!filteredProducts &&
				<h3>Search term: <strong>'{searchTerm}'</strong></h3>
			}
			{!!filteredProducts.length && <h4>{filteredProducts.length} Products</h4> }
			<Content>
				<Filters />
				{!filteredProducts.length &&
					<div>
						<h3>
							<span>
								Oh no! Nothing matches 
							</span>
							&nbsp;
							<strong>
								{searchTerm}
							</strong>
						</h3>
						<div>
							To help with your search why not try
							<br/>
							<br/>
							<ul>
								<li>Check your spelling</li>
								<li>Use less words</li>
								<li>Try an another search term</li>
							</ul>
						</div>
					</div>
				}
				{!!filteredProducts.length && 
					<div>
						<ProductsGrid products={filteredProducts} />
					</div> 
				}
			</Content>
		</Layout>
			
	)
}

export default AllProducts