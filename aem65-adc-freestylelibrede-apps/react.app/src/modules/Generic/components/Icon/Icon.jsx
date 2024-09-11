import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({size, image, style, children, className, onClick}) => {
	const hasChildren = () => children !== undefined && children !== null;
	const iconStyle = style ? `adc-icon--${style}` : ''
	return (
		<i className={`adc-icon adc-icon--${size} adc-icon--${image} ${iconStyle} ${hasChildren() && 'adc-tooltipbottom'} ${className || ''}`}
		   aria-hidden onClick={onClick}>
			{hasChildren() && children}
		</i>
	);
};

Icon.SIZE = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	LARGER: 'larger',
	HUGE: 'huge',
	XXL: 'xxl',
	L52: 'large-52',
	SMALLER: 'smaller'
};

Icon.STYLE = {
	BLUE: 'blue-bg',
	COVER: 'bg'
};

Icon.POSITION = {
	LEFT: 'left',
	RIGHT: 'right'
};

Icon.propTypes = {
	size: PropTypes.oneOf([...Object.values(Icon.SIZE)]),
	style: PropTypes.oneOf([...Object.values(Icon.STYLE)]),
	image: PropTypes.string.isRequired,
	onClick: PropTypes.func
};

Icon.defaultProps = {
	size: Icon.SIZE.MEDIUM,
};


export default Icon;