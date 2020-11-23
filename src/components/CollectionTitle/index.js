import React from 'react'
import {CollectionTitleWrapper, CollectionTitleContent, Title, Description} from './styles'
import BackgroundImage from 'gatsby-background-image';
import {StyledLink} from '../StyledLink'

export function CollectionTitle({title, description, backgroundImage, sale, destination}) {
	return (
		<CollectionTitleWrapper>
			<BackgroundImage fluid={backgroundImage} />
			<CollectionTitleContent>
			<div>
				<Title sale={sale}>{title}</Title>
				<Description sale={sale}>{description}</Description>
				<StyledLink to={destination}>Shop now</StyledLink>
			</div>
			</CollectionTitleContent>
			
		</CollectionTitleWrapper>
	)
}