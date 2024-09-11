import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import {Field} from 'redux-form';
import {isRequired, required} from '../../utils/validationRules';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';

const mapStateToProps = state => {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	return {dictionary};
};

const renderField = ({input, name, dictionary, label, type, placeholder, isRequired, toggleShow, isPasswordVisible, autocomplete, meta: {touched, error,active},isDisabled}) => (
	<div className="adc-form-group mb-3">
		<label
			htmlFor={name}
			className="adc-form-group__label">
			<I18n text={label} suffix={isRequired? '*' : undefined}/>
		</label>
		<div className="position-relative">
			<div className="adc-tooltipleft w-100">
				<input
					{...input}
					placeholder={translate(dictionary, placeholder)}
					type={isPasswordVisible ? 'text' : type}
					className={`form-control adc-form-group__input ${touched && error ? 'adc-form-group__input--error' : ''}`}
					autoComplete={autocomplete}
					disabled={isDisabled}
				/>
				{active && <ReactIsCapsLockActive>
					{active => active && <CapsLockToolTip/>}
				</ReactIsCapsLockActive>}
				<span
					className="adc-form-group__password-eye"
					onClick={toggleShow}
				>
					<Icon image={isPasswordVisible ? 'eye-grey' : 'eye-blue'} size={Icon.SIZE.MEDIUM}/>
				</span>
				{touched && (error && <span className="adc-error adc-form-group--error">{error}</span>)}
			</div>
		</div>
	</div>
);

renderField.propTypes = {
	name: PropTypes.string,
	dictionary: PropTypes.object,
	label: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	autocomplete: PropTypes.string,
	isRequired: PropTypes.bool,
	toggleShow: PropTypes.func,
	isPasswordVisible: PropTypes.bool,
	isDisabled:PropTypes.bool
};

const CapsLockToolTip = () => {
	return (
		<div className="adc-tooltipleft__content text-left align-items-center">
			<span className="adc-tooltipleft__text ml-2">
				<I18n text={'password_caps_alert'}/>
			</span>
			<i className="adc-tooltipleft__icon"/>
		</div>
	);
};

export default connect(mapStateToProps, null)(class PasswordField extends Component {

	static propTypes = {
		dictionary: PropTypes.object,
		name: PropTypes.string,
		label: PropTypes.string,
		placeholder: PropTypes.string,
		type: PropTypes.string,
		autocomplete: PropTypes.string,
		onChange: PropTypes.func,
		validationRules: PropTypes.array,
		isDisabled: PropTypes.bool
	};

	static defaultProps = {
		validationRules: [required],
		type: 'password',
		name: 'password',
		label: i18nLabels.PASSWORD_LABEL,
		placeholder: i18nLabels.PASSWORD_HINT,
		autocomplete: 'off',
		isDisabled: false
	};

	state = {
		isPasswordVisible: false,
	};

	toggleShow = () => {
		this.setState({
			isPasswordVisible: !this.state.isPasswordVisible,
		});
	};

	render() {
		const {dictionary, name, label, placeholder, type, onChange, validationRules, autocomplete,isDisabled} = this.props;
		const {isPasswordVisible} = this.state;
		return (
			<Field
				name={name}
				label={label}
				type={type}
				placeholder={placeholder}
				isRequired={isRequired(validationRules)}
				isPasswordVisible={isPasswordVisible}
				toggleShow={this.toggleShow}
				dictionary={dictionary}
				validate={validationRules}
				component={renderField}
				onChange={onChange}
				autocomplete={autocomplete}
				isDisabled={isDisabled}
			/>
		);
	}
});