import React, {Component} from 'react';
import {connect} from 'react-redux';
import ForgotPasswordForm from './ForgotPasswordForm';
import ForgotPasswordConfirmation from './ForgotPasswordConfirmation';
import {forgotPasswordRequest, resetServerSideError} from '../../redux/actions/login.action';
import PropTypes from 'prop-types';
import {getCookie} from '../../../../utils/cookieUtils';

const mapStateToProps = state => {
	const {forgotPasswordSuccess: isForgotPasswordSuccess, error} = state.authenticationModuleReducer;
	return {isForgotPasswordSuccess, error};
};

const mapDispatchToProps = {
	forgotPassword: forgotPasswordRequest,
	resetServerSideError,
};

export default connect(mapStateToProps, mapDispatchToProps)(class ForgotPassword extends Component {
	static propTypes = {
		isForgotPasswordSuccess: PropTypes.bool,
		error: PropTypes.string,
		forgotPasswordHeading: PropTypes.string,
		forgotPasswordSubheading: PropTypes.string,
		backToLogin: PropTypes.string,
		backToLoginUrl: PropTypes.string,
		submitCtaText: PropTypes.string,
		confirmationPageHeading: PropTypes.string,
		confirmationPageSubheading: PropTypes.string,
		forgotPasswordConfirmationImage: PropTypes.string,
		readerInformationalText: PropTypes.string,
		forgotPassword: PropTypes.func,
		resetServerSideError: PropTypes.func,
		accountLink: PropTypes.string
	};
	state = {
		forgotPwdConfirm: false,
		hasServerSideErrorCode: false
	};

	submit = (values) => {
		this.props.forgotPassword(values);
	};

	componentDidMount() {
		const {accountLink} = this.props;
		const isLoggedIn = getCookie('isLoggedIn');
		if(isLoggedIn) window.setTimeout(() => (window.location.href = accountLink), 2000);
	}

	componentDidUpdate(prevProps) {
		const {isForgotPasswordSuccess, error} = this.props;
		if (this.propsDidChange(prevProps)) {
			if (isForgotPasswordSuccess) {
				this.setForgotPasswordSuccessHandler(true);
			}
			if (error) {
				this.serverSideErrorHandler(true);
			}
		}
	}

	propsDidChange(prevProps) {
		//check if the necessary props have actually updated
		const {isForgotPasswordSuccess, error} = this.props;
		return isForgotPasswordSuccess !== prevProps.isForgotPasswordSuccess || error !== prevProps.error;
	}

	setForgotPasswordSuccessHandler = (flag) => {
		this.setState({
			forgotPwdConfirm: flag
		});
	};

	serverSideErrorHandler = (flag) => {
		const {resetServerSideError, error} = this.props;
		this.setState({
			hasServerSideErrorCode: flag
		});
		if (error) {
			resetServerSideError();
		}
	};

	render() {
		const {
			forgotPasswordHeading,
			forgotPasswordSubheading,
			backToLogin,
			backToLoginUrl,
			submitCtaText,
			confirmationPageHeading,
			confirmationPageSubheading,
			forgotPasswordConfirmationImage,
			readerInformationalText,
		} = this.props;

		const {forgotPwdConfirm, hasServerSideErrorCode} = this.state;
		return <div>
			{forgotPwdConfirm ? <ForgotPasswordConfirmation
				confirmationPageHeading={confirmationPageHeading}
				confirmationPageSubheading={confirmationPageSubheading}
				forgotPasswordConfirmationImage={forgotPasswordConfirmationImage}
				readerInformationalText={readerInformationalText}
				backToLogin={backToLogin}
				backToLoginUrl={backToLoginUrl}
			/> : <ForgotPasswordForm
				forgotPasswordHeading={forgotPasswordHeading}
				forgotPasswordSubheading={forgotPasswordSubheading}
				backToLogin={backToLogin}
				backToLoginUrl={backToLoginUrl}
				submitCtaText={submitCtaText}
				onSubmit={this.submit}
				hasServerSideErrorCode={hasServerSideErrorCode}
				serverSideErrorHandler={this.serverSideErrorHandler}
			/>}
		</div>;
	}
});