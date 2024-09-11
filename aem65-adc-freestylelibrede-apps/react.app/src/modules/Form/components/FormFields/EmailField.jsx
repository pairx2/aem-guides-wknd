import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchFraudDomainRequest} from '../../redux/actions/form.actions';
import TextField from '../GenericFields/TextField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {email, required} from '../../utils/validationRules';
import I18n from '../../../Translation/components/I18n';
const lower = value => value && value.toLowerCase().replace(/\s/g, '');

const mapDispatchToProps = {
	fraudCheck: fetchFraudDomainRequest
};

let fraudDomainList = [];

const mapStateToProps = state => {
	const {fraudDomain} = state?.formModuleReducer?.formReducer;
	fraudDomainList= fraudDomain;
	return {fraudDomain};
};

export const fraudDomains = (value)=>{
	const fraudDomain = fraudDomainList;
	if (fraudDomain) {
		const userdomain = value.split('@')[1];
		if (fraudDomain.length > 0 && fraudDomain.includes(userdomain)) {
			return <I18n text={i18nLabels.EMAIL_FRAUD_DOMAIN_MESSAGE} />;
		} 
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(class EmailField extends Component {

	static propTypes = {
		fraudCheck : PropTypes.func,
		hasValidateIcon: PropTypes.bool,
		validationRules: PropTypes.array,
		name: PropTypes.string,
		label: PropTypes.string,
		placeholder: PropTypes.string,
		autocomplete: PropTypes.string
	};

	componentDidMount() {
		this.props.fraudCheck();
	}

	static defaultProps = {
		hasValidateIcon: true,
		validationRules: [required, email],
		name: 'email',
		label: i18nLabels.EMAIL_LABEL,
		placeholder: i18nLabels.EMAIL_HINT,
		autocomplete: 'off'
	};

	render() {
		const {hasValidateIcon,validationRules, name, label, placeholder, autocomplete} = this.props;
		return (
			<TextField  {...this.props}
				hasValidateIcon = {hasValidateIcon}
				validationRules = {validationRules}
				name = {name}
				label = {label}
				placeholder = {placeholder}
				autocomplete = {autocomplete}
				format={lower} 
			/>
		);
		
	}
});
