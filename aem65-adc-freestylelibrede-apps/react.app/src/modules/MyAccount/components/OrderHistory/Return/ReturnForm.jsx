import React from 'react';
import { connect } from 'react-redux';
import Row from '../../../../Generic/components/Container/Row';
import Col from '../../../../Generic/components/Container/Col';
import PropTypes from 'prop-types';
import { getFormattedDate } from '../../../../../utils/dateUtils';
import I18n from '../../../../Translation/components/I18n';
import { i18nLabels } from '../../../../../utils/translationUtils';
import { For } from '../../../../Generic/components/Logic/LogicalComponents';
import Button, { BUTTON_OPTIONS } from '../../../../Generic/components/Button/Button';
import { reduxForm } from 'redux-form';
import { required, isQuantityRequired } from '../../../../Form/utils/validationRules';
import { returnReasons, orcReturnReasons, getOrderImagesPath } from '../../../../../utils/orderUtils';
import HelpdeskBanner from './HelpdeskBanner';
import SelectField from '../../../../Form/components/GenericFields/SelectField';
import RadioButtonReduxField, { RADIO_BUTTON_TYPES } from '../../../../Form/components/GenericFields/RadioButtonReduxField';
import ArvatoReturnWidget from './ArvatoReturnWidget';
import { isImpersonateSession } from '../../../../../api/esl.auth.service';

const mapStateToProps = state => {
	const { values } = state.form.returnForm || {};
	const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
	return { values, customer };
};

const ReturnForm = ({ close, handleSubmit, delivery, orderDetails: { estimatedDeliveryDate, deliveryOrderId }, products, productData, returnText, isLargeEnough, values, showOrcWidget, orcEnable, customer, deliveryAddressDetails, countryCode, languageCode, goBackFromArvto }) => {
	const getProductDetailsBySku = (sku) => {
		const productDetails = products && products[sku];
		if (productDetails)
			return {
				...productDetails,
				productName: productData.find(product => product.productSKU === sku)?.productName
			};
	};
	const returnReasonList = orcEnable ? orcReturnReasons : returnReasons;
	const getProductQuantity = (quantity) => {
		const totalQuantity = [];
		let quantityObj = {};
		for (let key = 1; key <= quantity; key++) {
			quantityObj = { label: key.toString(), value: key.toString() };
			totalQuantity.push(quantityObj);
		}
		return totalQuantity;
	};

	return (
		<form onSubmit={handleSubmit} className="row pb-3">
			<div className={'col-12' + (isLargeEnough ? ' col-lg' : '') + (showOrcWidget ? ' d-none' : '')}>
				<div className={'adc-title--border-bottom mb-3'}>
					<h5 className={'mb-3'}><I18n text={i18nLabels.YOUR_ORDER} suffix={':'} /></h5>
					<p className={'mb-0'}><I18n text={i18nLabels.ORDER_DATE_LABEL} /> {getFormattedDate(estimatedDeliveryDate)}</p>
					<p><I18n text={i18nLabels.ORDER_ID_LABEL} /> {deliveryOrderId}</p>
				</div>
				{
					!orcEnable && <div className={'adc-title--border-bottom'}>
						<For array={delivery?.products}>
							{(product, index) => {
								const productDetails = getProductDetailsBySku(product.productSKU);
								const productQuantity = getProductQuantity(product.productQuantity);
								return (<Row className={'align-items-center ' + (index > 0 && 'mt-3')}>
									<Col width={3} lg={4} xl={3} className={'pr-0'}>
										<img className="adc-order-hist__image img-fluid"
											src={getOrderImagesPath(productDetails?.productSKU)}
											alt={productDetails?.productSKU} 
										/>
									</Col>
									<Col width={9} lg={8} xl={9} className={'pl-0'}>
										<h6 className={'mb-0'}>{productDetails?.productName}</h6>
										<SelectField
											options={productQuantity}
											name={product.shipmentId}
											validationRules={[isQuantityRequired]}
											placeholder={i18nLabels.PLEASE_SELECT_QUANTITY}
										/>
									</Col>
								</Row>);
							}}
						</For>
					</div>
				}

				<HelpdeskBanner />
			</div>
			{!showOrcWidget && <div className={'col-12 mt-lg-0 mt-4' + (isLargeEnough ? ' offset-lg-1 col-lg' : '')}>
				<h5><I18n text={i18nLabels.RETURN_REASON} suffix={':'} /></h5>
				<p className={'text-small'}>
					<I18n text={i18nLabels.DECLARE_REASON_FOR_RETURN} />
				</p>
				<RadioButtonReduxField
					name={'returnReason'}
					options={returnReasonList}
					validationRules={[required]}
					type={RADIO_BUTTON_TYPES.VERTICAL}
				/>
				<p className={'text-small mt-3 mb-4'} dangerouslySetInnerHTML={{ __html: returnText }} />
				<if condition={values && values.returnReason}>
					<if condition={returnReasonList.find(rr => rr.value === values.returnReason).allowed}>
						<Button
							type={BUTTON_OPTIONS.TYPE.SUBMIT}
							label={i18nLabels.CONTINUE_CTA_TEXT}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							hasNoMargin
							isFullWidth
						/>
					</if>
					<else>
						<p className="text-danger pl-2"><I18n text={`return_error_${values.returnReason}`} /></p>
						<Button
							type={BUTTON_OPTIONS.TYPE.SUBMIT}
							label={i18nLabels.CONTINUE_CTA_TEXT}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							hasNoMargin
							isFullWidth
							isDisabled
						/>
					</else>
				</if>
				<Button
					action={close}
					ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
					isFullWidth
					hasNoMargin
					label={i18nLabels.BACK_CTA_TEXT}
					className={'mt-2'}
				/>
			</div>}
			{showOrcWidget && !isImpersonateSession() && <div className={'col-12 mt-lg-0 mt-4 ml-0' + (isLargeEnough ? ' offset-lg-1 col-lg' : '')}>
				<ArvatoReturnWidget
					lang={languageCode}
					country={countryCode}
					city={deliveryAddressDetails?.city}
					orderid={deliveryOrderId}
					zipCode={deliveryAddressDetails?.zipCode}
					email={customer?.email} />
				<div className="row mt-4" >
					<div className="col-lg-4 offset-md-8">
						<Button
							action={goBackFromArvto}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							isFullWidth
							hasNoMargin
							label={i18nLabels.BACK_CTA_TEXT}
							className={'mt-2'}
						/>
					</div>
				</div>
			</div>}
			{showOrcWidget && isImpersonateSession() && <div className="mt-1">
				<span className="adc-form-group--error mt-4">
					<I18n text={'magento_error_code_504'} />
				</span>
			</div>}
		</form>
	);
};

ReturnForm.propTypes = {
	close: PropTypes.func,
	delivery: PropTypes.object,
	orderDetails: PropTypes.shape({
		deliveryOrderId: PropTypes.string,
		estimatedDeliveryDate: PropTypes.number
	}),
	products: PropTypes.object,
	productData: PropTypes.array,
	returnText: PropTypes.string,
	isLargeEnough: PropTypes.bool,
	values: PropTypes.array,
	orcEnable: PropTypes.bool,
	showOrcWidget: PropTypes.bool,
	deliveryAddressDetails: PropTypes.object,
	customer: PropTypes.object,
	countryCode: PropTypes.string,
	languageCode: PropTypes.string,
	goBackFromArvto: PropTypes.func
};

export default reduxForm({
	form: 'returnForm',
	destroyOnUnmount: true
})(connect(mapStateToProps, null)(ReturnForm));