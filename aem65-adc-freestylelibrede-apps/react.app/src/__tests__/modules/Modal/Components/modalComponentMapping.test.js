
import '@testing-library/jest-dom/extend-expect';
import {getComponentByTitle} from '../../../../modules/Modal/components/modalComponentMapping';


describe('test getComponentByTitle method', () => {

	test('addressVerification as input', async () => {
		const result = getComponentByTitle('addressVerification');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('AddressVerification');
	});

	test('deleteOrderAddressConfirmationModal as input', async () => {
		const result = getComponentByTitle('deleteOrderAddressConfirmationModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeleteOrderAddressConfirmationModal');
	});

	test('deleteAccountAddressConfirmationModal as input', async () => {
		const result = getComponentByTitle('deleteAccountAddressConfirmationModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeleteOrderAddressConfirmationModal');
	});

	test('CouponCodeModal as input', async () => {
		const result = getComponentByTitle('CouponCodeModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CouponCodeModal');
	});

	test('changeDeliveryDateModal as input', async () => {
		const result = getComponentByTitle('changeDeliveryDateModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ChangeDeliveryDateModal');
	});

	test('confirmationPageErrorModal as input', async () => {
		const result = getComponentByTitle('confirmationPageErrorModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ConfirmationPageErrorModal');
	});

	test('confirmationPageLoadingModal as input', async () => {
		const result = getComponentByTitle('confirmationPageLoadingModal');
		expect(result).toBeDefined();
		expect(result.name).toBe('ConfirmationPageLoadingModal');
	});

	test('registrationErrorModal as input', async () => {
		const result = getComponentByTitle('registrationErrorModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('RegistrationErrorModal');
	});

	test('sickFundSearchModal as input', async () => {
		const result = getComponentByTitle('sickFundSearchModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.defaultProps.form).toBe('sickFundSearchModal');
	});

	test('registrationInProgressModal as input', async () => {
		const result = getComponentByTitle('registrationInProgressModal');
		expect(result).toBeDefined();
		expect(result.name).toBe('RegistrationInProgressModal');
	});

	test('returnModal as input', async () => {
		const result = getComponentByTitle('returnModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ReturnModal');
	});

	test('addToCartErrorModal as input', async () => {
		const result = getComponentByTitle('addToCartErrorModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('AddToCartErrorModal');
	});

	test('generalErrorModal as input', async () => {
		const result = getComponentByTitle('generalErrorModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('RegistrationErrorModal');
	});

	test('downloadInvoiceErrorModal as input', async () => {
		const result = getComponentByTitle('downloadInvoiceErrorModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DownloadInvoiceErrorModal');
	});

	test('changePaymentMethodModal as input', async () => {
		const result = getComponentByTitle('changePaymentMethodModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ChangePaymentMethodModal');
	});

	test('deactivatePlusServiceModal as input', async () => {
		const result = getComponentByTitle('deactivatePlusServiceModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeactivatePlusServiceModal');
	});

	test('deletePlusServiceModal as input', async () => {
		const result = getComponentByTitle('deletePlusServiceModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeletePlusServiceModal');
	});

	test('plusServiceUpdatedConfirmationModal as input', async () => {
		const result = getComponentByTitle('plusServiceUpdatedConfirmationModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PlusServiceUpdatedConfirmationModal');
	});

	test('plusServiceSubscriptionFailed as input', async () => {
		const result = getComponentByTitle('plusServiceSubscriptionFailed');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PlusServiceSubscriptionFailed');
	});
	test('deeplinkDownloadFailed as input', async () => {
		const result = getComponentByTitle('deeplinkDownloadFailed');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeeplinkDownloadFailed');
	});

	test('removePaymentMethodModal as input', async () => {
		const result = getComponentByTitle('removePaymentMethodModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('RemovePaymentMethodModal');
	});

	test('removePaymentMethodConfirmationModal as input', async () => {
		const result = getComponentByTitle('removePaymentMethodConfirmationModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('RemovePaymentMethodConfirmationModal');
	});

	test('socialShareModal as input', async () => {
		const result = getComponentByTitle('socialShareModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SocialShareModal');
	});

	test('deactivateGhostOrder as input', async () => {
		const result = getComponentByTitle('deactivateGhostOrder');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeactivateGhostOrder');
	});

	test('deactivateGhostOrderFailureModal as input', async () => {
		const result = getComponentByTitle('deactivateGhostOrderFailureModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DeactivateGhostOrderFailureModal');
	});

	test('uploadConfirmationMoadal as input', async () => {
		const result = getComponentByTitle('uploadConfirmationMoadal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('UploadConfirmationMoadal');
	});

	test('otpResponseModal as input', async () => {
		const result = getComponentByTitle('otpResponseModal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.defaultProps.form).toBe('otpResponseForm');
	});
});
