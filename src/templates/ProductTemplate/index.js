/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { graphql} from 'gatsby'
import { Layout, ImageGallery, ProductQuantityAdder, Button, SEO } from 'components'
import { Grid, SelectWrapper, Price } from './styles'
import CartContext from 'context/CartContext'
import { navigate, useLocation } from '@reach/router'
import queryString from 'query-string'

 export const query = graphql`
 query getSingleProduct($shopifyId: String) {
     product: shopifyProduct(shopifyId: { eq: $shopifyId }) {
       ...ShopifyProductFields
     }
   }
 `

export default function ProductTemplate({data}){
	
	const {title, description, images, shopifyId} = data.product
	const {getProductById} = React.useContext(CartContext)
	const [product, setProduct] = React.useState(null)
	const [selectedVariant, setSelectedVariant] = React.useState(null)
	const {search, origin, pathname} = useLocation()
	const variantId = queryString.parse(search).variant;

	React.useEffect(() => {
		getProductById(shopifyId).then( result => {
			setProduct(result)
			setSelectedVariant(result?.variants.find( ({id})=>id ===variantId) || result?.variants[0] )
		})
	},[getProductById, setProduct, shopifyId, variantId])

	const handleVariantChange = e => {
		const newVariant = product?.variants.find(v=> v.id === e.target.value)
		setSelectedVariant(newVariant)
		navigate(`${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
			replace: true
		})
	}

	return (
		<Layout>
		<SEO title={title} description={description} />
		<Button onClick={()=>navigate(-1)}>
			Back to Products
		</Button>
		<Grid>
			<div>
				<h1>{ title }</h1>
				<p>{ description }</p>
				{  product?.availableForSale && !!selectedVariant && (
					<>	
						{ product?.variants.length > 1 && (
							<SelectWrapper>
							<strong>Variant</strong>
								<select value={selectedVariant.id} onChange={handleVariantChange}>
									{ product?.variants.map(v=>(
										<option key={v.id} value={v.id}>
											{v.title}
											</option>
										) )}
								</select>
							</SelectWrapper>
						)}
						{!!selectedVariant && (
							<>
							<Price>
							{selectedVariant.priceV2.currencyCode} {selectedVariant.priceV2.amount}
						</Price>
						<ProductQuantityAdder available={selectedVariant.available} variantId={selectedVariant.id}/>
						</>
						)}
						
					</>
				)}

			</div>
			<ImageGallery selectedVariantImageId={selectedVariant?.image.id} images={ images } />

		</Grid>
		
		</Layout>
	)
}
