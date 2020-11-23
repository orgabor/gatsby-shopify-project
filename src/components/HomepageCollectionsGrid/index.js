import React from 'react'
import {CollectionTitle} from '../CollectionTitle'
import {RemainingCollections} from './styles'

export function HomepageCollectionsGrid({collections}) {

	const saleCollection = collections.find(collection => collection.title === 'SALE')
	const remainingCollections = collections.filter(collection => collection.title !== 'SALE')
	return (
		<div>
			{!!saleCollection && (
					<CollectionTitle 
					sale
					title={saleCollection.title}
					description={saleCollection.description}
					backgroundImage={saleCollection.image?.localFile.childImageSharp.fluid}
					destination={`/all-products?c=${encodeURIComponent(saleCollection.shopifyId)}`}
				/>
				)}

			<RemainingCollections>
				{remainingCollections.map(collection => (
				<CollectionTitle 
					key={collection.shopifyId} 
					title={collection.title}
					description={collection.description}
					backgroundImage={collection.image?.localFile.childImageSharp.fluid}
					destination={`/all-products?c=${encodeURIComponent(collection.shopifyId)}`}
				/>
			))}
			</RemainingCollections>
			
		</div>
	)
}