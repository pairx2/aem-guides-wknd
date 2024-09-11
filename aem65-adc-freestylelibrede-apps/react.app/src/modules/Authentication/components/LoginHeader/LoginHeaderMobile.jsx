import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import {logInRequest} from '../../redux/actions/login.action';

const mapStateToProps = state => {
	const {loading: isLoading, loggedIn: isLoggedIn} = state.authenticationModuleReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	return {isLoading, isLoggedIn, customer};
};

const mapDispatchToProps = {
	login: logInRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(class LoginHeaderMobile extends Component {

	static propTypes = {
		offlineIcon: PropTypes.string,
		label: PropTypes.string,
		labelLogin: PropTypes.string,
		loginPagePath: PropTypes.string,
		isLoggedIn: PropTypes.bool,
		isLoading: PropTypes.bool,
		login: PropTypes.func,
		rendition: PropTypes.string
	};

	componentDidMount() {
		const {isLoggedIn, isLoading, login} = this.props;
		!isLoading && !isLoggedIn && login({});
	}

	render() {
		const {isLoggedIn, offlineIcon, label, labelLogin, loginPagePath} = this.props;
		const loginActive = () => {
			window.location = loginPagePath;
		};
		return (
			<>
				<if condition={isLoggedIn}>
					<li data-tab="panel-10" className="nav-item cmp-tabs__tab loginHeaderLiActive d-lg-none">
						{label}
						<span className="nav-item-icon-up-blue">
							<Icon image={'arrowRightMobile'}/>
						</span>
					</li>
				</if>
				<else>
					<li data-tab="panel-10" onClick={loginActive}
						className="nav-item cmp-tabs__tab loginHeaderLi d-lg-none">
						{labelLogin}
						<span className="top-nav-item-link-icon">
							{offlineIcon && <Icon image={offlineIcon}/>}
						</span>
					</li>
				</else>
				
				
			</>
		);
	}
});