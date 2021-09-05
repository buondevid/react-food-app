import classes from './mealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import { CartContext } from '../../../store/CartProvider';

const MealItem = (props) => {
	const cartCtx = useContext(CartContext);

	const price = `$${props.price.toFixed(2)}`;

	function addToCartHandler(amount) {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount,
			price: props.price,
		});
	}

	return (
		<li className={classes.meal}>
			<div>
				<div>
					<h3>{props.name}</h3>
				</div>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
