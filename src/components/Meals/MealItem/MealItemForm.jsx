import classes from './mealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
	return (
		<form className={classes.form}>
			<Input
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
		</form>
	);
};

export default MealItemForm;
