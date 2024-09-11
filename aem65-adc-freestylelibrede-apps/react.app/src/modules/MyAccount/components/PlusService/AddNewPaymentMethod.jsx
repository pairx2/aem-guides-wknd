import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Carousel from '../../../Carousel/components/Carousel';
import PaymentOption from '../../../Payment/components/PaymentOption';
import PaymentRedirect from '../../../Payment/components/PaymentRedirect';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import PayonForm from '../../../Payment/components/PaymentDisplayEdit/PayonForm.jsx';
import SavedPaymentMethod from '../../../Payment/components/SavedPaymentMethod';
import Icon from '../../../Generic/components/Icon/Icon';
import PaymentCheckboxes from '../../../Payment/components/PaymentCheckboxes';
import {PAYMENT_TYPES, MAGENTO_PAYMENT_TYPES} from '../../../../utils/enums';

const AddNewPaymentMethod = ({width, expandedIndex, methodUpdate, isSubmitDisabled, isPaymentMismatch, loadingIndex, showPayonWidget, headingText, updateAddress, checkboxes, isPayon, confirmationPage, isOpenInvoiceClicked, paymentMethod, paymentTokens, paymentMethodToken, setSavedPaymentMethod, style, toggleOption, paymentMapping, order, error, markFormAsDirty, isSavedPaymentClicked, markSavedFormAsDirty}) => {
	let paymentTokenList = paymentTokens?.map((pt, index) => pt.id = index + 1);
	return (
		<Card style={style} width={width} title={showPayonWidget?'':'Zahlungsmethode hinzufügen'} hasTitleBorder={!showPayonWidget} cardSize={'4'} className={'adc-payment'}>
			<CardContent>
				<div className={'adc-payment__payment-options'}>
					<h6 className={'text-break'}><I18n text={headingText ? headingText : i18nLabels.PLEASE_ENTER_ALTERNATIVE_PAYMENT_METHOD}/></h6>
					<Carousel itemsToShowDesktop={3} itemsToShowMobile={3} itemsToShowTablet={3} hasArrows scrollByDesktop={1}>
						{
							paymentMapping.map((value, index) => <PaymentOption
								title={value.title}
								icon={value.icon}
								isExpanded={index === expandedIndex}
								isLoading={index === loadingIndex}
								index={index}
								key={value.id}
								error={error}
								toggleOption={toggleOption}
								isLimitHeight
							/>)
						}
					</Carousel>
					<if condition={paymentMethod === MAGENTO_PAYMENT_TYPES.PAYON_SAVED_TOKEN}>
						<if condition={paymentTokenList?.length > 0}>
							<form className={`${isSavedPaymentClicked ? 'dirty' : ''} ${showPayonWidget?'adc-payment__paypal-wrapper mx-auto':''}`} action={confirmationPage} id={'adc-payment__saved-payments'}>
								<div className={'adc-payment__saved-payments mt-4 mb-5'}>
									{paymentTokenList.map((pt, index) =>
										<if condition={pt.method !== PAYMENT_TYPES.OPEN_INVOICE} key={pt.id}>
											<SavedPaymentMethod key={pt.id} {...pt}
																isSelected={pt.token === paymentMethodToken}
																select={setSavedPaymentMethod}/>
										</if>)}
								</div>
								<if condition={methodUpdate === MAGENTO_PAYMENT_TYPES.PAYPAL}>
									<PaymentCheckboxes
										checkboxes={checkboxes}
										isPayon={isPayon}
										order={order}
										paymentMethodToken={paymentMethodToken}
										paymentMethod={paymentTokenList.find(item => item.token === paymentMethodToken)?.method}
										isSavedPaymentUsed
									/>
								<Button
									label={showPayonWidget? i18nLabels.UPDATE_ADDRESS_AND_PAYMENT :i18nLabels.SAVE_CTA}
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}									
									isFullWidth
									action={markSavedFormAsDirty}
									isDisabled={!paymentMethodToken && isSubmitDisabled}
									hasNoMargin
									iconPosition={Icon.POSITION.LEFT}
								/>
								</if>
							</form>
						</if>
						<else>
							<h6 className={'mt-4'}><I18n text={i18nLabels.NO_SAVED_PAYMENT_METHODS_YET} /></h6>
						</else>
					</if>
					<if condition={isPayon}>
						<div className={'adc-payment__payon'}>
							<PaymentCheckboxes checkboxes={checkboxes} isPayon={isPayon} />
							<if condition={paymentMapping[expandedIndex].showRedirectNotice}>
								<PaymentRedirect title={paymentMapping[expandedIndex].title}/>
							</if>
							<PayonForm paymentMethod={paymentMethod} confirmationPage={confirmationPage} expandedIndex={expandedIndex} paymentMapping={paymentMapping} order={order}/>
							<if condition={paymentMethod === MAGENTO_PAYMENT_TYPES.PAYPAL}>
								<div className={'row justify-content-center'}>
									<div className={'adc-payment__paypal-wrapper'}>
										<p className="pl-3"><I18n text={i18nLabels.DONT_HAVE_PAYPAL_ACCOUNT_YET} /></p>
										<Button
											label={i18nLabels.SIGN_UP_NOW}
											ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
											type={BUTTON_OPTIONS.TYPE.BUTTON}
											isFullWidth
											hasNoMargin
											href={'https://www.paypal.com/de/home'}
										/>
									</div>
								</div>
							</if>
						</div>
					</if>
					<if condition={paymentMethod === PAYMENT_TYPES.OPEN_INVOICE}>
						<form id="adc-payment__openinvoice"
							className={`adc-payment__form ${expandedIndex === null ? 'closed ' : ''}${isOpenInvoiceClicked ? 'dirty' : ''}${showPayonWidget?'adc-payment__paypal-wrapper mx-auto':''}`}
							action={confirmationPage}>
							<PaymentCheckboxes checkboxes={checkboxes} isPayon={isPayon} order={order} />
							<Button
								label={showPayonWidget? i18nLabels.UPDATE_ADDRESS_AND_PAYMENT :i18nLabels.SAVE_CTA}
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}								
								action={markFormAsDirty}
								isFullWidth
								hasNoMargin
								className={'wpwl-button'}/>
						</form>
					</if>
					<if condition={showPayonWidget && !isPaymentMismatch}>
						<div className={'adc-payment__paypal-wrapper mt-3 mx-auto'}>
							<div>
								<Button
									label={i18nLabels.UPDATE_ADDRESS}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									action={updateAddress}
									isFullWidth
									className={'px-5'}
								/>
							</div>
						</div>
					</if>
				</div>
			</CardContent>
		</Card>
	);
};

AddNewPaymentMethod.propTypes = {
	toggleOption: PropTypes.func,
	markFormAsDirty: PropTypes.func,
	width: PropTypes.number,
	updateAddress: PropTypes.func,
	showPayonWidget: PropTypes.bool,
	headingText:PropTypes.string,
	expandedIndex: PropTypes.number,
	loadingIndex: PropTypes.number,
	isPayon: PropTypes.bool,
	isPaymentMismatch:PropTypes.bool,
	confirmationPage: PropTypes.string,
	paymentMethod: PropTypes.string,
	isOpenInvoiceClicked: PropTypes.bool,
	style: PropTypes.object,
	paymentMapping: PropTypes.array,
	paymentTokens: PropTypes.array,
	paymentMethodToken: PropTypes.object,
	setSavedPaymentMethod: PropTypes.func,
	checkboxes: PropTypes.array,
	canBeSaved: PropTypes.bool,
	order: PropTypes.object,
	error: PropTypes.number,
	isSavedPaymentClicked: PropTypes.bool,
	markSavedFormAsDirty: PropTypes.func,
	isSubmitDisabled:PropTypes.bool
};

export default AddNewPaymentMethod;