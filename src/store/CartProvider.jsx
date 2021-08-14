import { createContext } from 'react';
import { useReducer } from 'react';

export const CartContext = createContext({
	items: [],
	totalAmount: 0,
	addItem(item) {},
	removeItem(id) {},
});

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

function cartReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const updatedItems = state.items.concat(action.item);
			const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};
		case 'REMOVE':
			break;

		default:
			break;
	}
	return defaultCartState;
}

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	function addItemToCartHandler(item) {
		dispatchCartAction({ type: 'ADD', item });
	}

	function removeItemFromCartHandler(id) {
		dispatchCartAction({ type: 'REMOVE', item });
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
