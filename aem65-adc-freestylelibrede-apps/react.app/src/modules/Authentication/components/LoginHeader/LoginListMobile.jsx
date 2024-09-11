import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import {connect} from 'react-redux';
import {logOutRequest} from '../../redux/actions/login.action';


const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	return {customer};
};

const mapDispatchToProps = {
	signOut: logOutRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(class LoginListMobile extends Component {
	static propTypes = {
		logoutIcon: PropTypes.string,
		logoutLabel: PropTypes.string,
		pagePath: PropTypes.string,
		accountOverviewList: PropTypes.array,
		logoutPageRedirect: PropTypes.string,
		signOut: PropTypes.func,
		rendition: PropTypes.string

	};

	renderMyAccountList = (accountOverviewList, pagePath) => {
		return accountOverviewList.filter(items => items.title !== null).map(items =>
			<div key={items.title} className={"navlinks myaccount_tab_"+items.createdId}>
				<section className="card-info">
					<a href={`${pagePath}#${items.createdId}`}
					   className="row align-items-center justify-content-center nav-dropdown-item-section">
						<div className="col-lg-9 col-md-8 order-md-1 order-2">
							<div className="sidenav-item-list-title">
								<h3 className={this.rendition === "v2-rendition"  ?  "v2-rendition-titles-mobile blue card-info-title" : "blue card-info-title" }>{items.title}</h3>
								<span  className={this.rendition === "v2-rendition"  ? "d-none" : "top-nav-item-link-icon"}>
									{items.iconClass && <Icon image={items.iconClass}/>}
								</span>
							</div>
						</div>
					</a>
				</section>
			</div>
		);
	};



	render() {
		const {accountOverviewList, pagePath, logoutIcon, logoutLabel, logoutPageRedirect, signOut, rendition} = this.props;
		
		return (
			<>
				
				{accountOverviewList && this.renderMyAccountList(accountOverviewList, pagePath)}
				<div className="navlinks">
					<section className="card-info">
						<a onClick={() => signOut(logoutPageRedirect)}
						   className="row align-items-center justify-content-center nav-dropdown-item-section">
							<div className="col-lg-9 col-md-8 order-md-1 order-2">
								<div className={rendition === "v2-rendition"  ? "sidenav-item-list-title v2-rendition-mobile-logout" : "sidenav-item-list-title" }>
								
									<h3 className={rendition === "v2-rendition"  ? "v2-rendition-titles-mobile blue card-info-title" : "blue card-info-title" }>{logoutLabel}</h3>
									<span className={rendition === "v2-rendition"  ? "d-none" : "top-nav-item-link-icon"}>
										{logoutIcon && <Icon image={logoutIcon}/>}
									</span>
								</div>
							</div>
						</a>
					</section>
				</div>
			</>
		);
	}
});