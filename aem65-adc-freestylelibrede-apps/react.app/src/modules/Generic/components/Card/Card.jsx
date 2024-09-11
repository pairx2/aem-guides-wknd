import React from 'react';
import PropTypes from 'prop-types';
import {Title} from '../Title/Title';
import {withBreakpoints} from 'react-breakpoints';
import { i18nLabels } from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

const CardRender = (props) => {
	const {title, infoText, editText, editLink, children, className, cardSize, style, hasTitleBorder, hasTitleCentered, isCardSize, borderCheck, size, isLastOrderCarrierReturn, customerId} = props;
	const _children = Array.isArray(children) ? [...children] : [children];
	return (
		<div style={style} className={`adc-card bg-white adc-card__card-spacing px-4 px-md-${cardSize ? cardSize : '5'} rounded ${className}`}>
			<Title text={title} infoText={infoText} editText={editText} editLink={editLink} size ={size ? size: Title.SIZE.CARD}
				   hasBorder={hasTitleBorder} isCentered={hasTitleCentered} className={isCardSize ? 'card-h4' : ''}/>
			<if condition={isLastOrderCarrierReturn}>
				<p className={'adc-login__error-text mb-4 infoError-grey-login'}>
					<I18n text={i18nLabels.LAST_ORDER_CARRIER_RETURN_MSG} />
				</p>
			</if>
			<if condition={customerId}>
				<p className={'mb-4 customer-id'}>
				<span><I18n text={i18nLabels.CUSTOMER_ID_LABEL} /></span>{customerId}
				</p>
			</if>
			{_children.filter(child => child?.type?.name === CHILDREN_TYPE.CARD_CONTENT)}
			{_children.find(child => child?.type?.name === CHILDREN_TYPE.CARD_ACTION) &&
				<div className={`adc-card__action mt-3 pt-2 text-right ${borderCheck}`}>
					{_children.filter(child => child?.type?.name === 'CardAction')}
				</div>
			}
		</div>
	);
};

CardRender.propTypes = {
	title: PropTypes.string,
	infoText: PropTypes.string,
	editText: PropTypes.string,
	editLink: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	hasTitleBorder: PropTypes.bool,
	hasTitleCentered: PropTypes.bool,
	isCardSize: PropTypes.bool,
	borderCheck: PropTypes.string,
	cardSize: PropTypes.string,
	size: PropTypes.string,
	isLastOrderCarrierReturn: PropTypes.bool,
	customerId: PropTypes.number
};

CardRender.defaultProps = {
	className: '',
	style: {},
	hasTitleBorder: true
};

const CHILDREN_TYPE = {
	CARD_CONTENT:'CardContent',
	CARD_ACTION: 'CardAction'
};

export const Card = withBreakpoints(CardRender);

export const CardContent = ({children}) => children;
export const CardAction = ({children}) => children;