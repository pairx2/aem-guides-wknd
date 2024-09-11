import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DisplayField from '../../../Form/components/DisplayFields/DisplayField';
import {i18nLabels, useTranslation} from '../../../../utils/translationUtils';


const PasswordDisplay = ({email, isSocial}) => {
	const passwordMask = useTranslation(i18nLabels.PASSWORD_MASK);
	return (
		<>
			<DisplayField label={i18nLabels.EMAIL_LABEL} value={email}/>
			<if condition={!isSocial}>
				<DisplayField label={i18nLabels.PASSWORD_LABEL} value={passwordMask}/>
			</if>
		</>

	);
};
PasswordDisplay.propTypes = {
	email: PropTypes.string,
	isSocial: PropTypes.bool
};

PasswordDisplay.defaultProps = {};

const mapStateToProps = state => {
	const {is_social: isSocial} = state.myAccountModuleReducer.GetCustomerReducer.customer;
	return {isSocial};
};

export default connect(mapStateToProps, null)(PasswordDisplay);