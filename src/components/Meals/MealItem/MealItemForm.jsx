import classes from './mealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();

	function sumbitHandler(e) {
		e.preventDefault();

		const enteredAmountNumber = +amountInputRef.current.value;

		if (
			String(enteredAmountNumber).trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(enteredAmountNumber);
	}

	return (
		<form className={classes.form} onSubmit={sumbitHandler}>
			<Input
				ref={amountInputRef}
				label='Amount'
				input={{
					id: 'amount',
					type: 'number',
					min: 1,
					max: 5,
					step: 1,
					defaultValue: 1,
				}}
			/>
			<button>Add to Cart</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
