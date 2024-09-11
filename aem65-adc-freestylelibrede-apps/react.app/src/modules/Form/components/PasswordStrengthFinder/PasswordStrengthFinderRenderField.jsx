import React, {Component} from 'react';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';
import PropTypes from 'prop-types';

class PasswordStrengthFinderRenderField extends Component {
	static propTypes = {
		placeholder: PropTypes.string
	};

	state = {
		passwordVisible: false
	};

	toggleShow = () => {
		this.setState({
			passwordVisible: !this.state.passwordVisible,
		});
	};

	render() {
		const {input, placeholder, meta: {touched, error,active}} = this.props;
		const {passwordVisible} = this.state;
		return (
			<div>
				<input {...input} placeholder={placeholder} maxLength="25"
					   className={'form-control adc-form-group__input ' + (touched && (error && ' adc-form-group__input--error'))}
					   type={passwordVisible ? 'text' : 'password'} autoComplete={'off'}/>
				{touched && (error && <span className="adc-passwordfinder__error">{error}</span>)}
				<span
					className="adc-passwordfinder__input-viewicon"
					onClick={this.toggleShow}
				>
					<Icon image={passwordVisible ? 'eye-grey' : 'eye-blue'} size={Icon.SIZE.MEDIUM}/>
				</span>
				{active && <ReactIsCapsLockActive>
					{active => active && <div className="adc-tooltipleft__content text-left align-items-center"><span
						className="adc-tooltipleft__text ml-2"><I18n text={'password_caps_alert'}/></span><i
						className="adc-tooltipleft__icon"/></div>}
				</ReactIsCapsLockActive>}
			</div>
		);
	}
}

export default PasswordStrengthFinderRenderField;
