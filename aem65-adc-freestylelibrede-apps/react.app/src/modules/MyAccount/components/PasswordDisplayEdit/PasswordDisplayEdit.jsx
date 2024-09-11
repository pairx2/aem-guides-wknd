import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, CardAction, CardContent} from '../../../Generic/components/Card/Card';
import {i18nLabels} from '../../../../utils/translationUtils';
import Link from '../../../Generic/components/Link/Link';
import PasswordDisplay from './PasswordDisplay';
import PasswordEdit from './PasswordEdit';
import EmailEdit from './EmailEdit';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import {dashedToDotted} from '../../../../utils/dateUtils';
import {logOutRequest} from '../../../Authentication/redux/actions/login.action';
import {getServiceEndPoint} from '../../../../utils/endpointUrl';

const mapStateToProps = state => {
	const {attributes: user} = state.authenticationModuleReducer.user || {};
	const {isLoading, error: passwordError, isPasswordUpdated} = state.myAccountModuleReducer.PasswordReducer;
	const {emailUpdated, isLoading: isEmailLoading, error: emailError} = state.myAccountModuleReducer.EmailUpdateReducer;
	const {is_social: isSocial} = state.myAccountModuleReducer.GetCustomerReducer.customer;
	return {user, isLoading, passwordError, emailUpdated, emailError, isEmailLoading, isPasswordUpdated, isSocial};
};

const mapDispatchToProps = {
	signOut: logOutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class PasswordDisplayEdit extends Component {
	state = {
		isEditing: false,
		isEmailEditing: false
	};

	static propTypes = {
		user: PropTypes.shape({
			email: PropTypes.string,
			birthdate: PropTypes.string
		}),
		displayHeader: PropTypes.string,
		editHeader: PropTypes.string,
		isLoading: PropTypes.bool,
		passwordError: PropTypes.string,
		emailError: PropTypes.string,
		emailUpdated: PropTypes.any,
		isEmailLoading: PropTypes.bool,
		isPasswordUpdated: PropTypes.bool,
		isSocial: PropTypes.bool,
		signOut : PropTypes.func
	};

	static defaultProps = {};

	componentDidUpdate(prevProps) {
		const {isLoading, passwordError, isEmailLoading, emailError,isPasswordUpdated,signOut,emailUpdated} = this.props;
		if (emailUpdated) {
			const loginPageUrl = getServiceEndPoint('login.page.path');
			if (loginPageUrl?.length > 0) {
				signOut(loginPageUrl+"?resetEmailLinkSuccess=true");
			}
		}
		
		if((!isLoading && prevProps.isLoading) || (!isEmailLoading && prevProps.isEmailLoading) && (!passwordError || !emailError)) {
			if(!passwordError) this.passwordEditState(false);
			if(!emailError) this.emailEditState(false);
			this.resetPassword(passwordError, isPasswordUpdated, signOut)
		}
	}

	resetPassword = (passwordError, isPasswordUpdated, signOut) => {
		if(!passwordError && isPasswordUpdated){
			const loginPageUrl = getServiceEndPoint('login.page.path');
			if (loginPageUrl?.length > 0) {
				signOut(loginPageUrl+"?resetPasswordSuccess=true");
			}
		}
	}

	passwordEditState = flag => {
		this.setState({
			isEditing: flag
		});
	};
	emailEditState = flag => {
		this.setState({
			isEmailEditing: flag
		});
	};

	render() {
		const {user, displayHeader, editHeader, emailUpdated, isPasswordUpdated, passwordError, isSocial, emailError} = this.props;
		const {isEditing, isEmailEditing} = this.state;
		let initialValues = {};
		initialValues = {repeatDob: dashedToDotted(user?.birthdate)}
		return (
			<Card title={isEditing ? editHeader : displayHeader}>
				<if condition={user}>
					<CardContent>
						<if condition={isEditing}>
							<div className="Password-info-block pb-3">
								<PasswordEdit
									passwordEditState={this.passwordEditState}
									passwordError={passwordError}
								/>
							</div>
						</if>
						<elseif condition={isEmailEditing}>
							<div className="pb-3">
								<EmailEdit
									cancelEmailEditState={this.emailEditState}
									currentUserEmail={user.email}
									emailError={emailError}
									initialValues = {initialValues}
								/>
							</div>
						</elseif>
						<else>
							<if condition={emailUpdated === true}>
								<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.EMAIL_CONFIRMATION_SENT}/>
							</if>
							<if condition={isPasswordUpdated === true}>
								<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.NEW_PASSWORD_UPDATED}/>
							</if>
							<PasswordDisplay email={user.email}/>
						</else>
					</CardContent>
					<if condition={!isSocial && !isEditing && !isEmailEditing}>
						<CardAction>
							<Link label={i18nLabels.EMAIL_EDIT} icon={'edit-icon'} action={() => this.emailEditState(true)}/>
							<Link label={i18nLabels.EDIT_PASSWORD} icon={'edit-icon'} action={() => this.passwordEditState(true)}/>
						</CardAction>
					</if>
				</if>
			</Card>
		);
	}
});