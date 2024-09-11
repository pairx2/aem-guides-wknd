import React from 'react';
import {i18nLabels} from '../../../../utils/translationUtils';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';

const NoCurrentOrder = ({currentOrderHeading, emptyHeading, emptyInfoText, orderRecipeStyle, orderRecipeLink, orderShopStyle, orderShopLink, isAccountOverviewTab, customerId}) => {
	return (
		<Card title={currentOrderHeading} customerId={customerId} className={customerId ? 'customer-id-section' : ''}>
			<CardContent>
				<div className="order-block-inner pb-3">
					<div className="row align-items-center order-block-tab-mobile-view">
						<div className="col-12 col-lg-7 order-block-tab-mobile-view--reverse">
							<div className="order-block-inner-content">
								<h5 className="adc-title--black">{emptyHeading}</h5>
								<p className="order-block-inner-content__desc">{emptyInfoText}</p>
							</div>
						</div>
						<div className={'col-12 col-lg-3 offset-lg-1'}>
							<div className="adc-order-block__box">
								<div className={'square'}/>
								<div className="adc-order-block__box--icon">
									<i className="adc-icon adc-icon--lg adc-icon--box-blue"/>
								</div>
							</div>
						</div>
					</div>
					<div className={!isAccountOverviewTab ? 'row adc-order-block__cta orderCTA-block' : 'row adc-order-block__cta'}>
						<div className="col-lg-6 mb-3 mb-lg-0">
							<Button
								ctaStyle={orderRecipeStyle}
								href={orderRecipeLink}
								isFullWidth
								hasNoMargin
								icon={'edit-icon'}
								label={i18nLabels.ORDER_WITH_RECIPE}
							/>
						</div>
						<div className="col-lg-6">
							<Button
								ctaStyle={orderShopStyle}
								href={orderShopLink}
								isFullWidth
								hasNoMargin
								label={i18nLabels.ORDER_IN_SHOP}
							/>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

NoCurrentOrder.propTypes = {
	currentOrderHeading: PropTypes.string,
	emptyHeading: PropTypes.string,
	emptyInfoText: PropTypes.string,
	orderRecipeStyle: PropTypes.string,
	orderShopStyle: PropTypes.string,
	orderRecipeLink: PropTypes.string,
	orderShopLink: PropTypes.string,
	isAccountOverviewTab: PropTypes.bool,
	customerId: PropTypes.number
};

export default NoCurrentOrder;