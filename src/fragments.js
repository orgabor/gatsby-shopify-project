import { graphql } from 'gatsby'

export const peoductFields = graphql`
	fragment ShopifyProductFields on ShopifyProduct{
		shopifyId
       title
       description
       images{
       	id
	    localFile{
	        childImageSharp{
	          fluid(maxWidth: 300){
	            ...GatsbyImageSharpFluid_withWebp
	          }
	        }
	      }
	    }
	}
`