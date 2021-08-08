import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
	return (
		<>
			<header className={classes.header}>
				<h1>Reactive Food</h1>
				<HeaderCartButton />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt='A table full of food' />
			</div>
		</>
	);
};

export default Header;
