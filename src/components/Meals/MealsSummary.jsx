import styles from './MealsSummary.module.css';

const MealsSummary = () => {
	return (
		<section className={styles.summary}>
			<h2>Delicious food, delivered to you</h2>
			<p>
				CHoose your favorite meal from our broad seletion of available meals and enjoy a delicious
				lunch or dinner at home.
			</p>
			<p>
				All our meals are cooked with high-quality ingredients, just-in-time and of course by
				experienced chefs!
			</p>
		</section>
	);
};

export default MealsSummary;
