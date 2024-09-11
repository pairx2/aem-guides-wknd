import React, { useState, useEffect } from 'react';
import LoginHeaderListItems from './LoginHeaderListItems';
import PropTypes from 'prop-types';



const AuthLoginHeader = (props) => { 

	const {customer, headerList, pagePath, logoutIcon, logoutLabel, logoutPageRedirect, closeNaveRight, messageMorning, messageAfternoon, messageEvening, rendition, handleLogout } = props;
	const [GreetingMsg, setGreetingMsg] = useState(messageMorning)

	const times = {
		noon : 12,
		evening: 18
	}

	const setMessage = () => {
		const currentHours = new Date().getHours();
		let message = '';
		if(currentHours < times.noon) 
			message = messageMorning;
		else 
			message = (currentHours < times.evening) ? messageAfternoon : messageEvening;
		setGreetingMsg(message);
	}

	useEffect(() => {
			setMessage();
	}, [])

	const roundedText = customer.firstname && customer.lastname && customer.firstname.toString().toUpperCase().split('').slice(0,1) + customer.lastname.toString().toUpperCase().split('').slice(0,1);
	
	return (
		<>
	
		
			  <if condition = {customer && customer !== undefined && rendition === 'v2-rendition'}>
					<div className='v2-rendition'>
						<div className='v2-Flyout-menu-top'>
							<div class="closebtn-box" onClick={closeNaveRight}>
								<em class="closebtn-box-logo"></em>
								<div class="closebtn closebtn-box-font" >Menü schließen</div>
							</div>
							<div className='flyout-upper-box' >
								<div className='flyout-heading-box'>
									<p className='flyout-menu-greeting-text'>{GreetingMsg},</p>
									<p className='flyout-menu-customer-name'>{`${customer.firstname} ${customer.lastname}`}</p>
								</div>
								<div className='flyout-menu-customer-rounded-position'>
									<p className='flyout-menu-customer-rounded'>{roundedText}</p>
								</div>
							</div>
						</div>
							<LoginHeaderListItems
							headerList={headerList}
							pagePath={pagePath}
							logoutIcon={logoutIcon}
							logoutLabel={logoutLabel}
							logoutPageRedirect={logoutPageRedirect} 
							rendition={rendition}
							closeNaveRight={closeNaveRight}
							handleLogout={handleLogout}
							/>	
					</div>
				</if> 
			 <else condition = {customer && customer !== undefined }>
				<label className="user-header-dropdown__label">{`${customer.firstname} ${customer.lastname}`}</label>
					<LoginHeaderListItems
						headerList={headerList}
						pagePath={pagePath}
						logoutIcon={logoutIcon}
						logoutLabel={logoutLabel}
						logoutPageRedirect={logoutPageRedirect}
						handleLogout={handleLogout}
					/>
			</else> 

		</>
	);
};

AuthLoginHeader.propTypes = {
	customer: PropTypes.shape({
		firstname: PropTypes.string,
		lastname: PropTypes.string
	}),
	headerList: PropTypes.array,
	pagePath: PropTypes.string,
	logoutIcon: PropTypes.string,
	logoutLabel: PropTypes.string,
	logoutPageRedirect: PropTypes.string
};

export default AuthLoginHeader;
