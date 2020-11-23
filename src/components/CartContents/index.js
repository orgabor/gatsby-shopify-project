import React from 'react'
import CartContext from 'context/CartContext'
import {CartItem, CartHeader, CartFooter, Footer} from './styles'
import {QuantityAdjuster} from '../QuantityAdjuster'
import {RemoveLineItem} from '../RemoveLineItem'
import {Button} from '../Button'
import { navigate } from '@reach/router'

export function CartContents(){
	const {checkout, updateLineItem} = React.useContext(CartContext)

	const handleAdjustQunatity = ({quantity, variantId}) => {
		updateLineItem({quantity, variantId})
	}

	return (
			<section>
				<h1>Your Cart</h1>
				{!!checkout?.lineItems && (
					<CartHeader>
						<div>Product</div>
						<div>Unit Price</div>
						<div>Quantity</div>
						<div>Amount</div>

					</CartHeader>	
				)}
				
				{ checkout?.lineItems?.map(lineItem=>(
					<CartItem key={lineItem.variant.id}>
						<div>
							<div>
								{lineItem.title}
							</div>
							<div>
								{lineItem.variant.title === 'Default Title' ? '' : lineItem.variant.title}
							</div>
						</div>
						<div>
							€ {lineItem.variant.price}
						</div>
						<div>
							<QuantityAdjuster lineItem={lineItem} onAdjust={handleAdjustQunatity} />

						</div>
						<div>
							€ {(lineItem.quantity * lineItem.variant.price).toFixed(2)}
						</div>
						<div>
							<RemoveLineItem lineItemId={lineItem.id} />
						</div>
					</CartItem>
					))

					}
				{!!checkout?.lineItems && (
				<CartFooter>
					<div>
						<strong>Total: </strong>
					</div>
					<div>
						<span>€ {checkout?.totalPrice}</span>
					</div>
					<div />
				</CartFooter>
				)}
				{!!checkout?.lineItems && <h4>Your cart is empty</h4>}
				<Footer>
					<div>
						<Button onClick={()=>navigate(-1)}>Continue Shopping</Button>
					</div>

					<div>
						{!!checkout?.webUrl && (
							<Button 
							onClick={()=>{window.location.href = checkout.webUrl}}>
							Ceckout
						</Button>
						)}
					</div>
				</Footer>
			</section>
		)
}