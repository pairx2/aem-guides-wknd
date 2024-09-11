import React, {Component} from 'react';
import {Field} from 'redux-form';
import {connect} from 'react-redux';
import {
	validatePasswordCharacter,
	validatePasswordLength,
	validatePasswordNumber,
	validatePasswordSymbol,
} from './PasswordStrengthFinderValidation';
import PasswordStrengthFinderMeter from './PasswordStrengthFinderMeter';
import PasswordStrengthFinderToolTip from './PasswordStrengthFinderToolTip';
import translate from '../../../../utils/translationUtils';
import PasswordStrengthFinderRenderField from './PasswordStrengthFinderRenderField';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	return {dictionary};
};

export default connect(mapStateToProps, null)(class PasswordStrengthFinder extends Component {

	static propTypes = {
		hasServerSideError: PropTypes.bool,
		serverSideErrorHandler: PropTypes.func,
		dictionary: PropTypes.object,
		isRegistration: PropTypes.bool,
		isAccountPasswordEdit: PropTypes.bool
	};

	static defaultProps = {
		isRegistration: false
	};
	state = {
		colorBar: {
			length: false,
			character: false,
			symbol: false,
			number: false
		},
	};

	handlePasswordChange = (event) => {
		const password = event.target.value;
		this.setState({
			colorBar: {
				length: validatePasswordLength(password),
				character: validatePasswordCharacter(password),
				symbol: validatePasswordSymbol(password),
				number: validatePasswordNumber(password)
			}
		});
		if (this.props.hasServerSideError) {
			this.props.serverSideErrorHandler(false);
		}
	};

	handleConfirmPasswordChange = () => this.props.hasServerSideError && this.props.serverSideErrorHandler(false)

	render() {
		const {colorBar} = this.state;
		const {dictionary, isRegistration, isAccountPasswordEdit} = this.props;
		return (
			<div className="bg-white adc-passwordfinder row justify-content-center align-items-center">
				<div className="col-12 ">
					<label className="adc-form-group__label"><I18n
						text={'password_strength_fieldlabel'} suffix={'*'}/></label>
					<div className="adc-passwordfinder__input adc-tooltipleft">
						<Field colorBar={colorBar} name="password"
							   placeholder={translate(dictionary, 'password_strength_hinttext')} type="password"
							   component={PasswordStrengthFinderRenderField}
							   onChange={this.handlePasswordChange}/>
					</div>
					<div className="row">
						<PasswordStrengthFinderMeter colorBar={colorBar}/>
						<div className="col-2 text-right pl-0">
							<PasswordStrengthFinderToolTip colorBar={colorBar}  isAccountPasswordEdit={isAccountPasswordEdit}/>
						</div>
					</div>
					<if condition={!isRegistration}>
						<label className="adc-form-group__label"><I18n
							text={'confirm_strength_password_fieldlabel'} suffix={'*'}/></label>
						<div className="adc-passwordfinder__input adc-tooltipleft">
							<Field name="retypepassword" type="password"
								placeholder={translate(dictionary, 'confirm_strength_password_hinttext')}
								component={PasswordStrengthFinderRenderField}
								onChange={this.handleConfirmPasswordChange}/>
						</div>
					</if>
				</div>
			</div>
		);
	}
});