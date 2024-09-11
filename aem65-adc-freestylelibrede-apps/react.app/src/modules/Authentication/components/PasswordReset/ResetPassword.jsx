import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetPasswordRequest} from '../../redux/actions/login.action';
import ResetPasswordForm from './ResetPasswordForm';
import PropTypes from 'prop-types';
import {logOutRequest} from '../../redux/actions/login.action';
import {getCookie} from '../../../../utils/cookieUtils';

const mapStateToProps = state => {
	const {user, error, resetPasswordSuccess} = state.authenticationModuleReducer;
	return {user, error, hasResetPasswordSuccess: resetPasswordSuccess};
};

const mapDispatchToProps = {
	resetPassword: resetPasswordRequest,
	signOut: logOutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class ResetPassword extends Component {
	static propTypes = {
		resetPassword: PropTypes.func,
		error: PropTypes.object,
		resetPasswordHeading: PropTypes.string,
		resetPasswordSubheading: PropTypes.string,
		backToLogin: PropTypes.string,
		backToLoginUrl: PropTypes.string,
		submitCtaText: PropTypes.string,
		hasResetPasswordSuccess: PropTypes.bool
	};
	state = {
		hasServerSideError: false
	};

	submit = (values) => {
		if (values.password === values.retypepassword) {
			const resetPasswordSumbit = {
				code: values.confirmCode,
				newPassword: values.password,
				customerID: values.cid
			};
			this.props.resetPassword(resetPasswordSumbit);
		}
	};

	serverSideErrorHandler = (flag) => {
		this.setState({
			hasServerSideError: flag
		});
	};

	propsDidChange(prevProps) {
		//check if the necessary props have actually updated
		return this.props.error !== prevProps.error;
	}

	componentDidUpdate(prevProps) {
		const {error, hasResetPasswordSuccess, backToLoginUrl, signOut} = this.props;
		const isLoggedIn = getCookie('isLoggedIn');
		if(isLoggedIn) signOut();
		if (this.propsDidChange(prevProps)) {
			if (error) {
				this.serverSideErrorHandler(true);
			}
		}
		if (hasResetPasswordSuccess) {
			window.location = (`${backToLoginUrl}?resetPasswordSuccess=true`);
		}
	}

	render() {
		const {
			resetPasswordHeading,
			resetPasswordSubheading,
			backToLogin,
			backToLoginUrl,
			submitCtaText,
		} = this.props;
		const {hasServerSideError} = this.state;

		return (
			<ResetPasswordForm
				resetPasswordHeading={resetPasswordHeading}
				resetPasswordSubheading={resetPasswordSubheading}
				backToLogin={backToLogin}
				submitCtaText={submitCtaText}
				backToLoginUrl={backToLoginUrl}
				onSubmit={this.submit}
				hasServerSideError={hasServerSideError}
				serverSideErrorHandler={this.serverSideErrorHandler}
			/>
		);
	}
});