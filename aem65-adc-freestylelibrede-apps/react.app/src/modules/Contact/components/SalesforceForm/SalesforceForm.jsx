import React from 'react';
import PropTypes from 'prop-types';
import {empty} from '../../../../utils/default';


const SalesforceForm = ({handleSubmit, canSubmit, salesforceURL, children}) => {
	return (
		canSubmit ?
			<form action={salesforceURL + '/servlet/servlet.WebToCase?encoding=UTF-8'}
				  method="POST">
				{children}
			</form>
			:
			<form onSubmit={handleSubmit(empty.function)}>
				{children}
			</form>
	);
};

SalesforceForm.propTypes = {
	handleSubmit: PropTypes.func,
	canSubmit: PropTypes.bool,
	salesforceURL: PropTypes.string
};

export default SalesforceForm;