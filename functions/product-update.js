const faunadb = require('faunadb');
const verifyWebhookIntegrity = require('shopify-verify-webhook')

const q = faunadb.query;

const client = new faunadb.Client({
	secret: process.env.FAUNADB_CLIENT,
})

exports.handler = function(event, context, callback){

	const isValid = verifyWebhookIntegrity(process.env.SHOPIFYWEBHOOK_KEY,
		event.headers['x-shopify-hmac-sha256'],
		event.body);
	if(isValid){
		callback(null,{
			statusCode: 200,
			body: 'Hello World!',
		});
	}else{
		callback(null,{
			statusCode: 403,
			body: 'Errore Cazzo',
		});
	}
	
};