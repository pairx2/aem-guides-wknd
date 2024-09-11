import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';

const HiddenField = ({name}) => {
	return (
		<Field
			name={name}
			component={({input:{name, value}}) => (
				<input name={name} type={'hidden'} value={value}/>
			)}
		/>
	);
};
HiddenField.propTypes = {
	name: PropTypes.string
};
export default HiddenField;
