import React from 'react'
import {ProductQuantityAdderWrapper} from './styles'
import {Button} from '../Button'
import {Input} from '../Input'
import CartContext from 'context/CartContext'

export function ProductQuantityAdder({variantId, available}){

	const [quantity, setQuantity] = React.useState(1);
	const {updateLineItem} = React.useContext(CartContext)

	const handleQuantityChange = e => {
		setQuantity(e.currentTarget.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		updateLineItem({variantId, quantity: parseInt(quantity, 10)})
		
	}

	return (
		<ProductQuantityAdderWrapper>
			<strong>Quantity</strong>
			<form onSubmit={handleSubmit}>
				<Input 
					disabled = {!available} //disabled if not avialable
					type="number" 
					min="1" 
					step="1" 
					value={quantity} 
					onChange={handleQuantityChange}
				/>
				<Button 
				type="submit"
				disabled = {!available}
				fullWidth>
					Add to Cart
				</Button>
			</form>

		</ProductQuantityAdderWrapper>
	)
}
