import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Carousel from '../../../Carousel/components/Carousel';
import PaymentOption from '../PaymentOption';
import AccountPaymentCheckboxes from './AccountPaymentCheckboxes';
import PaymentRedirect from '../PaymentRedirect';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import PayonForm from './PayonForm';
import {PAYMENT_TYPES, MAGENTO_PAYMENT_TYPES} from '../../../../utils/enums';

const AddPaymentMethod = ({width, expandedIndex, loadingIndex, isPayon, confirmationPage, paymentMethod, isOpenInvoiceClicked, style, toggleOption, markFormAsDirty, paymentMapping, error}) => {
	return (<Card style={style} width={width} title={'Zahlungsmethode hinzufügen'}>
		<CardContent>
			<div className={'adc-payment__payment-options pb-3'}>
				<h6 className={'text-center'}><I18n text={i18nLabels.PLEASE_ENTER_ALTERNATIVE_PAYMENT_METHOD}/></h6>
				<Carousel itemsToShowDesktop={3} itemsToShowMobile={3} itemsToShowTablet={4}
						  hasArrows scrollByDesktop={1}>
					{paymentMapping.map((value, index) => <PaymentOption
						title={value.title} icon={value.icon}
						isExpanded={index === expandedIndex}
						isLoading={index === loadingIndex}
						error={error}
						index={index} key={value.rsId} toggleOption={toggleOption} isLimitHeight/>
					)}
				</Carousel>
				<if condition={isPayon}>
					<div className={'adc-payment__payon'}>
						<AccountPaymentCheckboxes checkboxes={[]} isPayon={isPayon}/>
						<if condition={paymentMapping[expandedIndex].showRedirectNotice}>
							<PaymentRedirect title={paymentMapping[expandedIndex].title}/>
						</if>
						<PayonForm paymentMethod={paymentMethod} confirmationPage={confirmationPage} expandedIndex={expandedIndex} paymentMapping={paymentMapping}/>
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
						  className={`adc-payment__form ${expandedIndex === null ? 'closed ' : ''}${isOpenInvoiceClicked ? 'dirty' : ''}`}
						  action={confirmationPage + `?paymentMethod=${paymentMethod}`}>
						<AccountPaymentCheckboxes checkboxes={[]} isPayon={isPayon}/>
						<Button
							label={i18nLabels.SAVE_CTA}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							type={BUTTON_OPTIONS.TYPE.SUBMIT}
							action={markFormAsDirty}
							isFullWidth
							hasNoMargin
							className={'wpwl-button'}/>
					</form>
				</if>
			</div>
			<if condition={error}>
				<p className={'adc-form-group--error mt-4'}>
					<I18n text={`magento_error_code_${error}`} />
				</p>
			</if>
		</CardContent>
	</Card>);
};

AddPaymentMethod.propTypes = {
	toggleOption: PropTypes.func,
	markFormAsDirty: PropTypes.func,
	width: PropTypes.number,
	expandedIndex: PropTypes.number,
	loadingIndex: PropTypes.number,
	isPayon: PropTypes.bool,
	confirmationPage: PropTypes.string,
	paymentMethod: PropTypes.string,
	isOpenInvoiceClicked: PropTypes.bool,
	style: PropTypes.object,
	paymentMapping: PropTypes.array,
	error: PropTypes.number
};

export default AddPaymentMethod;