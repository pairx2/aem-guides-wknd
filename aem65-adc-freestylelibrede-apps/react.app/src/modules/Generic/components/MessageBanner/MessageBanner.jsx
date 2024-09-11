import React, {useState} from 'react';
import Icon from '../Icon/Icon';
import Row from '../Container/Row';
import Col from '../Container/Col';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {empty} from '../../../../utils/default';

const MessageBanner = ({description, params, color, icon, canClose, className, onCloseAction}) => {
	const [visible, setVisibility] = useState(true);
	return (
		<if condition={visible}>
			<div className={'container ' + className}>
				<Row className={`adc-message-banner adc-message-banner--${color}`}>
					<Col width={3} md={2}>
						<div className="adc-message-banner__icon-wrapper">
							<Icon image={icon} size={Icon.SIZE.LARGE}/>
						</div>
					</Col>
					<Col width={8} md={canClose ? 9 : 10}>
						<div className="adc-message-banner__text">
							<p className="adc-message-banner__text__desc">
								<I18n text={description} params={params} />
							</p>
						</div>
					</Col>
					{canClose &&
					<Col width={1} className="pl-0">
						<div className="adc-message-banner__close" onClick={() => {setVisibility(false);onCloseAction();}}>
							<Icon image={'close-white'} size={Icon.SIZE.SMALL}/>
						</div>
					</Col>
					}
				</Row>
			</div>
		</if>
	);
};

MessageBanner.COLOR = {
	BLUE: 'blue',
	GREEN: 'green',
	RED: 'red',
	YELLOW: 'yellow'
};

MessageBanner.ICON = {
	SUCCESS: 'formcheck-success-white',
	FAILURE: 'danger-white',
	WARNING: 'warning-white',
	ALERT: 'alert-warning-yellow'
};

MessageBanner.propTypes = {
	description: PropTypes.string,
	color: PropTypes.string,
	icon: PropTypes.string,
	canClose: PropTypes.bool,
	className: PropTypes.string,
	params: PropTypes.array,
	onCloseAction: PropTypes.func
};

MessageBanner.defaultProps = {
	className: '',
	canClose: false,
	onCloseAction: empty.function
};

export default MessageBanner;