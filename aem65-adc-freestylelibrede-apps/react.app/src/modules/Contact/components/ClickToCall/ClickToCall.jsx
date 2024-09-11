import React from 'react';
import Icon from '../../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';

const ClickToCall = (props) => {
	const {icon, label, offlineIcon, onlineIcon, serviceNumber, serviceText, openingHour, closingHour, hasClickToCallHeader, ctaStyling, helpText, ctaText, ctaEmail} = props;

	const getActiveTime = (time, baseTime) => {
		const workingTime = new Date(baseTime.getTime());
		workingTime.setUTCHours(time.hours - 2);
		workingTime.setUTCMinutes(time.minutes);
		return workingTime;
	};

	const getOpeningTime = () => {
		const currentTime = new Date();
		return currentTime >= getActiveTime(openingHour, currentTime) && currentTime <= getActiveTime(closingHour, currentTime);
	};
	return (
		<div>
			{hasClickToCallHeader ?
				<>
					<a href={serviceNumber} className="click-to-call">
						<div className="click-to-call__inner">
							<div className="call-icon">
								<span className="call-icon__inner">
									<Icon image={'hotline-black'} size={Icon.SIZE.LARGE}/>
								</span>
							</div>
							<div className="call-content">
								<small className="call-content__small">{helpText}</small>
								<h5 className="adc-title adc-title--black">
									{label}
									{getOpeningTime() ?
										<Icon image={onlineIcon}/>
										:
										<Icon image={offlineIcon}/>
									}
								</h5>
							</div>
						</div>
					</a>
					<div className="click-to-call__button">
						{ctaEmail &&
							<Button
								label={ctaText}
								ctaStyle={ctaStyling}
								href={'mailto:' + ctaEmail}
								isFullWidth
								hasNoMargin
							/>
						}
					</div>
				</>
				:
				<a href={serviceNumber} className="top-nav-item-link click-to-call-mobile">
					<span className="top-nav-item-link-icon">
						<Icon image={icon}/>
					</span>
					<div className="top-nav-item-link-service">{serviceText}</div>
					{label}
					{getOpeningTime() ?
						<span className="top-nav-item-link-icon">
							<Icon image={onlineIcon}/>
						</span>
						:
						<span className="top-nav-item-link-icon">
							<Icon image={offlineIcon}/>
						</span>
					}
				</a>
			}
		</div>
	);
};

ClickToCall.propTypes = {
	icon: PropTypes.string,
	label: PropTypes.string,
	offlineIcon: PropTypes.string,
	serviceNumber: PropTypes.string,
	openingHour: PropTypes.object,
	closingHour: PropTypes.object,
	onlineIcon: PropTypes.string,
	hasClickToCallHeader: PropTypes.bool,
	ctaStyling: PropTypes.string,
	helpText: PropTypes.string,
	ctaText: PropTypes.string,
	ctaEmail: PropTypes.string,
	serviceText: PropTypes.string
};

export default ClickToCall;
