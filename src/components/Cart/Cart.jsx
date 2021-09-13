import classes from './cart.module.css';
import Modal from '../UI/Modal';
import { useContext, useState } from 'react';
import { CartContext } from '../../store/CartProvider';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [isCheckout, setIsCheckout] = useState(false);

	const totalAmount = '$' + cartCtx.totalAmount.toFixed(2);
	const hasItems = cartCtx.items.length > 0;

	function cartItemRemoveHandler(id) {
		cartCtx.removeItem(id);
	}

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	function orderHandler() {
		setIsCheckout(true);
	}

	async function submitOrderHandler(userData) {
		setIsSubmitting(true);
		await fetch(
			'https://react-food-df3ce-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	}

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onAdd={cartItemAddHandler.bind(null, item)}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onHideCart}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = (
		<>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onHideCart}>
					Close
				</button>
			</div>
		</>
	);

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span> Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout ? (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
			) : (
				modalActions
			)}
		</>
	);

	return (
		<Modal onClose={props.onHideCart}>
			{isSubmitting
				? isSubmittingModalContent
				: didSubmit
				? didSubmitModalContent
				: cartModalContent}
		</Modal>
	);
};

export default Cart;
