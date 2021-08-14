import { createContext } from 'react';

const CartContext = createContext({
	items: [],
	totalAmount: 0,
	addItem(item) {},
	removeItem(id) {},
});

const CartProvider = (props) => {
	function addItemToCartHandler(item) {}

	function removeItemFromCartHandler(id) {}

	const cartContext = {
		items: [],
		totalAmount: 0,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
