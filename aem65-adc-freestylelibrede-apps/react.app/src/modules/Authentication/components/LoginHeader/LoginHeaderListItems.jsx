import React from 'react';
import Signout from './Signout';
import PropTypes from 'prop-types';

const LoginHeaderListItems = (props) => {
	const { headerList, pagePath, logoutIcon, logoutLabel, logoutPageRedirect, rendition ,closeNaveRight, handleLogout } = props;
	const refreshPage = () => {
		closeNaveRight()
	}
	const headerItems = headerList.map((item) =>
		item.title && <li key={item.title} className={"myaccount_tab_" + item.createdId}><a href={`${pagePath}#${item.createdId}`}>{item.title}</a></li>
	);

	const headerItemsV2 = headerList.map((item) =>
		item.title && <><div class={"adc-list panel-heading active myaccount_tab_" + item.createdId} role="tab" id="headingOne">
			<p class="panel-title">
				<a href={`${pagePath}#${item.createdId}`} onClick={() => {refreshPage()}}>
					<span class="my-2 heading-text">{item.title}</span>
				</a>
			</p>
		</div>
			<div class={"panel-border myaccount_tab_" + item.createdId}></div></>
	)

	return (
		<>
			<if condition={rendition === 'v2-rendition'}>
				<div className='new-Account-Flyout-Menu text-left-flyout' role='tablist'>
					{headerItemsV2}
				</div>
				<div className='adc-button adc-button-secondary flyout-menu-signout-button' onClick={handleLogout}>
					<Signout logoutLabel={logoutLabel} logoutPageRedirect={logoutPageRedirect} />
				</div>
			</if>
			<else>
				<ul className="user-header-dropdown__list">
					{headerItems}
					<li className='border-top user-header-dropdown__list--sign-out' onClick={handleLogout}><Signout logoutIcon={logoutIcon} logoutLabel={logoutLabel} logoutPageRedirect={logoutPageRedirect} />
					</li>
				</ul>
			</else>

		</>
	);
};

LoginHeaderListItems.propTypes = {
	headerList: PropTypes.array,
	pagePath: PropTypes.string,
	logoutIcon: PropTypes.string,
	logoutLabel: PropTypes.string,
	logoutPageRedirect: PropTypes.string
};

export default LoginHeaderListItems;