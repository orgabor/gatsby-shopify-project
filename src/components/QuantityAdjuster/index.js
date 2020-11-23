import React from 'react'
import {QuantityAdjusterWrapper, AdjusterButton} from './styles'

export function QuantityAdjuster({lineItem, onAdjust}){
	
	const {quantity} = lineItem;

	const handleDecrementQunatity =() =>{
		onAdjust({variantId: lineItem.variant.id, quantity: -1})
	}

	const handleIncrementQunatity =() =>{
		onAdjust({variantId: lineItem.variant.id, quantity: +1})
	}
	return (
		<QuantityAdjusterWrapper>
			<AdjusterButton onClick={handleDecrementQunatity}>-</AdjusterButton>
			<div>{quantity}</div>
			<AdjusterButton onClick={handleIncrementQunatity}>+</AdjusterButton>
		</QuantityAdjusterWrapper>
	)
}