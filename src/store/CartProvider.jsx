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
		case 'ADD': {
			const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

			const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
			const existingCartItem = state.items[existingCartItemIndex];
			let updatedItems;

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems = [...state.items, action.item];
			}

			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};
		}
		case 'REMOVE': {
			const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
			const existingItem = state.items[existingCartItemIndex];
			const updatedTotalAmount = state.totalAmount - existingItem.price;

			let updatedItems;
			if (existingItem.amount === 1) {
				updatedItems = state.items.filter((item) => item.id !== action.id);
			} else {
				const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			}
			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};
		}
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
		dispatchCartAction({ type: 'REMOVE', id });
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
