import React from 'react';


const Container = ({children, className}) => {
	return (
		<div className={`adc-container ${className || ''}`}>
			{children}
		</div>

	);
};
Container.propTypes = {};

Container.defaultProps = {};

export default Container;