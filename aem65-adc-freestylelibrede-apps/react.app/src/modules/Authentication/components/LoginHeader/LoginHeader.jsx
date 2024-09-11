import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUrlParameter } from '../../../../utils/getParams';
import Icon from '../../../Generic/components/Icon/Icon';
import AuthLoginHeader from './AuthLoginHeader';
import { logInRequest, logOutRequest } from '../../redux/actions/login.action';
import Link from '../../../Generic/components/Link/Link';
import { withBreakpoints } from 'react-breakpoints';
import { getWcmMode } from '../../../../utils/orderUtils';
import { identityExtendSession, intervalTime, isAutoIdentityExtendSessionAllowed, isEslAuthenticationEnable } from '../../../../api/esl.auth.service';

const mapDispatchToProps = {
	login: logInRequest,
	signOut: logOutRequest
};
const mapStateToProps = state => {
	const { loading: isLoading, loggedIn: isLoggedIn, user } = state.authenticationModuleReducer;
	const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
	return { customer, isLoading, isLoggedIn, isSocialLogin: user ? user.isSocialLogin : false };
};
export default connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class LoginHeader extends Component {
	constructor(props) {
		super(props);

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	state = {
        showTechTrainingContent: false,
		extendSession: true
    }
	static propTypes = {
		icon: PropTypes.string,
		label: PropTypes.string,
		rendition: PropTypes.string,
		labelLogin: PropTypes.string,
		loginPagePath: PropTypes.string,
		logoutIcon: PropTypes.string,
		logoutLabel: PropTypes.string,
		pagePath: PropTypes.string,
		logoutPageRedirect: PropTypes.string,
		accountOverviewList: PropTypes.array,
		isLoggedIn: PropTypes.bool,
		isLoading: PropTypes.bool,
		isSocialLogin: PropTypes.bool,
		login: PropTypes.func,
		signOut: PropTypes.func,
		customer: PropTypes.shape({}),
		messageMorning: PropTypes.string,
		messageAfternoon: PropTypes.string,
		messageEvening: PropTypes.string,
        technicalTrainingTabMapping: PropTypes.string,
		nonLoggedInUserEvent: PropTypes.string,
		loggedInUserEvent: PropTypes.string,
		enableAutoExtendSessionEsl: PropTypes.bool
	};

	static defaultProps = {
		accountOverviewList: []
	};

	showHideTechnischeEinweisungNav = (isTechTrainingAvailable, classId) => {
        if (!getWcmMode()) {
			if (document.getElementById('myTempStyle')) {
                document.getElementById('myTempStyle').remove();
            }
            const displayValue = isTechTrainingAvailable ? 'block' : 'none !important'
            let styleValue = document.createElement('style');
            styleValue.type = 'text/css';
            styleValue.id = 'myTempStyle';
            styleValue.innerHTML = '.' + classId + ' { display: ' + displayValue + '; }';
            document.getElementsByTagName('head')[0].appendChild(styleValue);
        }
    }

	openNaveRight = () => {
		this.handleAdobeAnalyticsEvent();
		document.getElementById("mySideNavRight").style.width = "320px";
		document.getElementById("mySidenavMainRight").style.width = "100%";
	}
	closeNaveRight = () => {
		document.getElementById("mySideNavRight").style.width = "0px";
		document.getElementById("mySidenavMainRight").style.width = "0%";
	}

	componentDidMount() {
		const { isLoggedIn, isLoading, login,technicalTrainingTabMapping } = this.props;
		this.showHideTechnischeEinweisungNav(false, technicalTrainingTabMapping);
		const activateEmail = getUrlParameter('activateEmail');
		!isLoading && !isLoggedIn && activateEmail !== '1' && login({});
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentDidUpdate(prevProps) {
        const { customer,technicalTrainingTabMapping , isLoggedIn , enableAutoExtendSessionEsl } = this.props;
        if (customer.technical_instructions && customer.technical_instructions.length > 0 && customer.payer_number && customer.payer_number !== null && customer.health_insurance_number && customer.health_insurance_number !== null && !this.state.showTechTrainingContent) {
            this.setState({ showTechTrainingContent: true })
			this.showHideTechnischeEinweisungNav(true, technicalTrainingTabMapping);
        }
		if (this.state.extendSession && enableAutoExtendSessionEsl && isLoggedIn) {
			this.setState({extendSession: false});
			setInterval(this.autoIdentityExtendSession, intervalTime); // 1 min in milliseconds
		}
		
    }

	autoIdentityExtendSession = () => {
		if (isEslAuthenticationEnable() && isAutoIdentityExtendSessionAllowed()) {
			identityExtendSession().then((e)=> {
				this.setState({extendSession: true});
			});
		}
	}
	
	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	/**
	 * Set the wrapper ref
	 */
	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	/**
	 * Alert if clicked on outside of element
	 */
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.closeNaveRight();
		}
	}

	handleAdobeAnalyticsEvent = () =>{
		window.s_objectID = this.props.isLoggedIn ? this.props.loggedInUserEvent : this.props.nonLoggedInUserEvent;
	}

	render() {

		const { isSocialLogin, signOut, isLoggedIn, customer, icon, label, rendition, labelLogin, loginPagePath, logoutIcon, logoutLabel, pagePath, accountOverviewList, logoutPageRedirect, breakpoints, currentBreakpoint, messageMorning, messageAfternoon, messageEvening } = this.props;
		const roundedText = customer.firstname && customer.lastname && customer.firstname.toString().toUpperCase().split('').slice(0, 1) + customer.lastname.toString().toUpperCase().split('').slice(0, 1);
		const userInactive = rendition == 'v2-rendition' ? 'user-loggedout' : 'user-inactive';
		return (
			<div>
				{isLoggedIn && !isSocialLogin ?
					<>
						{rendition == 'v2-rendition' ?
							<>
								<if condition={breakpoints[currentBreakpoint] === breakpoints.mobile}>
									<a id='loginHeader' className='login-icon-alignment' href='#' onClick={() => this.openNaveRight()}>
										<p className='customer-rounded-icon'>{roundedText}</p>
										{/* <span className='main-konto-label-changed new-text-header d-none d-md-block'>{label}</span> */}
									</a>
								</if>
								<else>
									<a id='loginHeader' className='new-text-header' href='#' onClick={() => this.openNaveRight()}>
										<p className='customer-rounded-icon'>{roundedText}</p>
										<span className='d-none d-md-block'>{label}</span>
									</a>
								</else>
							</> :
							<Link className="top-nav-item-link top-nav-active" label={label} hasNoLinkClass iconPosition={Icon.POSITION.LEFT} icon={icon} />
						}
						<if condition={rendition == 'v2-rendition'}>
							<div id="mySidenavMainRight" class="master-nav">
								<div ref={this.setWrapperRef} id="mySideNavRight" className="sidenav sidenav-right-side user-header-dropdown">


									<div className="user-header-dropdown-inner">
										<AuthLoginHeader
											customer={customer}
											logoutIcon={logoutIcon}
											logoutLabel={logoutLabel}
											pagePath={pagePath}
											headerList={accountOverviewList}
											logoutPageRedirect={logoutPageRedirect}
											closeNaveRight={this.closeNaveRight}
											rendition={rendition}
											messageMorning={messageMorning}
											messageAfternoon={messageAfternoon}
											messageEvening={messageEvening}
											handleLogout={() => signOut(logoutPageRedirect)}
										/>
									</div>
								</div>
							</div>
						</if>
						<else>
							<div className="user-header-dropdown header-dropdown">
								<div className="user-header-dropdown-inner">
									<AuthLoginHeader
										customer={customer}
										logoutIcon={logoutIcon}
										logoutLabel={logoutLabel}
										pagePath={pagePath}
										headerList={accountOverviewList}
										logoutPageRedirect={logoutPageRedirect}
										handleLogout={() => signOut(logoutPageRedirect)}
									/>
								</div>
							</div>
						</else>

					</>
					:
					<>

						<if condition={isSocialLogin}>
							<Link action={() => signOut(logoutPageRedirect)}
								className={"top-nav-item-link new-text-header"}
								label={labelLogin}
								hasNoLinkClass
								iconPosition={Icon.POSITION.LEFT}
								icon={userInactive}
								mobileBreak={breakpoints[currentBreakpoint] === breakpoints.mobile} />
						</if>
						<else>
							<Link action={() => this.handleAdobeAnalyticsEvent()}
							    href={loginPagePath}
								className={"top-nav-item-link new-text-header"}
								label={labelLogin}
								hasNoLinkClass
								hasOnClickHref
								iconPosition={Icon.POSITION.LEFT}
								icon={userInactive}
								mobileBreak={breakpoints[currentBreakpoint] === breakpoints.mobile} />
						</else>

					</>}
			</div>
		);
	}
}));