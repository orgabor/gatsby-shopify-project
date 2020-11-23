const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const { data } = await graphql(`
	{
	  products: allShopifyProduct {
	    nodes {
	      handle
	      shopifyId
	    }
	  }
	}
	`)

	data.products.nodes.forEach(product=>{
		 createPage({
		 	path: `products/${product.handle}`,
			context: {
				shopifyId: product.shopifyId,
			},
			component : path.resolve(`./src/templates/ProductTemplate/index.js`),
		 })	
	})

}