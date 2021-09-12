import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(null);

	useEffect(() => {
		async function fetchMeals() {
			setIsLoading(true);
			const response = await fetch(
				'https://react-food-df3ce-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
			);
			if (!response.ok) throw new Error('Something went wrong!');
			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			console.log(loadedMeals);
			setMeals(loadedMeals);
			setIsLoading(false);
		}

		console.log(
			fetchMeals().catch((error) => setHasError(error.message), void setIsLoading(false))
		);
	}, []);

	if (isLoading) return <section className={classes.MealsLoading}>Loading...</section>;
	if (hasError) return <section className={classes.MealsError}>{hasError}</section>;

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
}

export default AvailableMeals;
