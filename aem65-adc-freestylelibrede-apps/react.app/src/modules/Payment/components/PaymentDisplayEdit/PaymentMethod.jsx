import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, CardAction, CardContent} from '../../../Generic/components/Card/Card';
import {i18nLabels} from '../../../../utils/translationUtils';
import Link from '../../../Generic/components/Link/Link';
import PaymentMethodInformation from './PaymentMethodInformation';
import {openModalAction} from '../../../Modal/redux/actions';

const mapDispatchToProps = {
	openModalAction
};

const PaymentMethod = ({isDefault, paymentMethod, width, title, style, openModalAction, paymentEditUrl, isEnableDesign, isDefaultView}) => {
	return (<if condition={paymentMethod}>
		<Card style={style} width={width} title={title}>
			<CardContent>
				<PaymentMethodInformation paymentMethod={paymentMethod} isEnableDesign={isEnableDesign} isDefaultView={isDefaultView} />
			</CardContent>
			<if condition={!isEnableDesign}>
				<if condition={!isDefault}>
					<CardAction>
						<Link label={i18nLabels.DELETE_PAYMENT_METHOD} icon={'trash_blue'}
							action={() => openModalAction({
								heading: i18nLabels.DELETE_PAYMENT_METHOD,
								contentID: 'removePaymentMethodModal',
								props: {
									paymentMethod: paymentMethod
								}
							})}
						/>
					</CardAction>
				</if>
			</if>
			<else>
				<CardAction>
					<Link label={i18nLabels.EDIT} href={paymentEditUrl} icon={'edit-icon'} />
				</CardAction>
			</else>
		</Card>
	</if>);
};

PaymentMethod.propTypes = {
	openModalAction: PropTypes.func,
	isDefault: PropTypes.bool,
	paymentMethod: PropTypes.object,
	width: PropTypes.number,
	title: PropTypes.string,
	style: PropTypes.object,
	paymentEditUrl: PropTypes.string,
	isEnableDesign: PropTypes.bool,
	isDefaultView: PropTypes.bool
};

export default connect(null, mapDispatchToProps)(PaymentMethod);