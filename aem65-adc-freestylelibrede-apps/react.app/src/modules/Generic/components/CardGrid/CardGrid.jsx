import React from 'react';
import PropTypes from 'prop-types';

const CardGrid = ({children, columns}) => {
	const _children = (Array.isArray(children) ? children : [children])?.filter(child => child !== null);

	return (
		<div className={'cmp-card-grid'}>
			{_children && React.Children.map(_children, child => (
				React.cloneElement(child, {
					style: {
						width: `calc(${((child?.props?.width || columns) / columns) * 100}%)`
					}
				})
			))}
		</div>
	);
};

CardGrid.propTypes = {
	columns: PropTypes.number
};

CardGrid.defaultProps = {
	columns: 12
};

export default CardGrid;