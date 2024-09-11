import React from 'react';
import PropTypes from 'prop-types';

const FieldList = ({options}) => {
	let optionList = options.map((option, index) => ({...option, id: index + 1}));
	return (
		optionList.map((option) => {
			const {component: Component, props} = option;
			return (<div className="adc-form-group" key={option.id}>
				<Component {...props} />
			</div>);
		})
	);
};

FieldList.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		component: PropTypes.elementType.isRequired,
		props: PropTypes.object
	}))
};

export default FieldList;