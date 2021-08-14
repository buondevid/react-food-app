import classes from './modal.module.css';
import { createPortal } from 'react-dom';

const Backdrop = (props) => {
	return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
	return (
		<>
			{createPortal(<Backdrop />, portalElement)}
			{createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
		</>
	);
};

export default Modal;
