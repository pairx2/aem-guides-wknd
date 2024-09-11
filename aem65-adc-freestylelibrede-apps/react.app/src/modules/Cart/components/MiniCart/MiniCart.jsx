import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import {withBreakpoints} from 'react-breakpoints';
import {isCheckoutPageType} from '../../../../utils/pageTypeUtils';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';

const mapDispatchToProps = {
};

const mapStateToProps = state => {
	const {loading: isLoading, loggedIn: isLoggedIn} = state.authenticationModuleReducer;
	const {cartDetails} = state.cartModuleReducer.GetCustomerCartReducer;
	return {cartDetails, isLoading, isLoggedIn};
};


export default connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class MiniCartHeader extends Component {
	static propTypes = {
		icon: PropTypes.string,
		label: PropTypes.string,
		loginPage: PropTypes.string,
		errorMessage: PropTypes.string,
		cartDetails: PropTypes.shape({
			items: PropTypes.array
		}),
		isLoading: PropTypes.bool,
		isLoggedIn: PropTypes.bool,
		miniCartEvent: PropTypes.string
	};

	state = {
		showModal: false,
		isLoaded: true
	};

	componentDidMount() {
		const {isLoggedIn} = this.props;
		const getPageProps = document.querySelector('body').dataset.appUrl;

		if(getPageProps && JSON.parse(getPageProps).pageType != 'account') {
			this.setState({
				isLoaded: false
			});
		} else if(!isLoggedIn){
			setTimeout(() => {
				this.setState({
					isLoaded: false
				});
			}, 5000);
		}
	}

	getCartCount = () => this.props.cartDetails.items.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0);

	handleAdobeAnalyticsEvent = () =>{
		window.s_objectID = this.props.miniCartEvent;
	}

	
	render() {
		const {icon, label, breakpoints, currentBreakpoint} = this.props;
		const {isLoaded} = this.state;

		return (
			<>
				<if condition={isLoaded || (this.props.isLoading && this.props.isLoggedIn)}>
					<LoadingIndicator isOverlay pageLoader/>
				</if>
				<else>
					<if condition={breakpoints[currentBreakpoint] === breakpoints.mobile}>
						<a className={isCheckoutPageType()?'mobile-cart-icon header-nav-mbl-icons-list-item-link on-checkout':'mobile-cart-icon header-nav-mbl-icons-list-item-link'} onClick={() => this.handleAdobeAnalyticsEvent()}>
							<Icon image={icon}/>
							<div className="header-nav-mbl-icons-list-item-cart-count header-nav-mbl-icons-list-item-cart-count-v2">{this.getCartCount()}</div>
						</a>
					</if>
					<else>
						<a className={isCheckoutPageType()?'top-nav-item-link nav-cart on-checkout':'top-nav-item-link nav-cart new-text-header'} title={label} onClick={() => this.handleAdobeAnalyticsEvent()}>
							<span className="nav-cart-img-container mr-1">
								<span className="top-nav-item-link-icon mr-1"><Icon image={icon}/></span>
								<span className="nav-cart-count nav-cart-count-v2 mr-1">{this.getCartCount()}</span>
							</span>
							{label}
						</a>
					</else>
				</else>
			</>
		);
	}
}));