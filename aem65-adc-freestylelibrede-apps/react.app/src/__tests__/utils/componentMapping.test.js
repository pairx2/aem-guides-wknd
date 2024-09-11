import '@testing-library/jest-dom/extend-expect';
import {getComponentByTitle, getComponentData} from '../../utils/componentMapping';
jest.mock('../../utils/endpointUrl');


describe('test getComponentByTitle method', () => {

	test('empty input', async () => {
		const result = getComponentByTitle();
		expect(result).toBeUndefined();
	});

	test('greeting as input', async () => {
		const result = getComponentByTitle('greeting');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('Greeting');
	});

	test('miniCartHeader as input', async () => {
		const result = getComponentByTitle('miniCartHeader');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.displayName).toBe('withBreakpoints(MiniCartHeader)');
	});

	test('miniCartPopup as input', async () => {
		const result = getComponentByTitle('miniCartPopup');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.displayName).toBe('withBreakpoints(MinicartPopup)');
	});

	test('cartList as input', async () => {
		const result = getComponentByTitle('cartList');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CartListPage');
	});

	test('login as input', async () => {
		const result = getComponentByTitle('login');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('LoginForm');
	});

	test('productDetails as input', async () => {
		const result = getComponentByTitle('productDetails');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.displayName).toBe('withBreakpoints(ProductDetails)');
	});

	test('loginHeader as input', async () => {
		const result = getComponentByTitle('loginHeader');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.displayName).toBe('withBreakpoints(LoginHeader)');
	});

	test('clickToCall as input', async () => {
		const result = getComponentByTitle('clickToCall');
		expect(result).toBeDefined();
		expect(result.name).toBe('ClickToCall');
	});

	test('loginHeaderMobile as input', async () => {
		const result = getComponentByTitle('loginHeaderMobile');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('LoginHeaderMobile');
	});

	test('loginListMobile as input', async () => {
		const result = getComponentByTitle('loginListMobile');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('LoginListMobile');
	});

	test('stickyAddtocart as input', async () => {
		const result = getComponentByTitle('stickyAddtocart');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('StickyAddToCart');
	});

	test('cartOverview as input', async () => {
		const result = getComponentByTitle('cartOverview');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CartOverview');
	});

	test('shippingOptions as input', async () => {
		const result = getComponentByTitle('shippingOptions');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ShippingOptions');
	});

	test('registration as input', async () => {
		const result = getComponentByTitle('registration');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('RegistrationForm');
	});

	test('confirmation as input', async () => {
		const result = getComponentByTitle('confirmation');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ConfirmationPage');
	});

	test('couponCode as input', async () => {
		const result = getComponentByTitle('couponCode');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CouponCodeForm');
	});

	test('modal as input', async () => {
		const result = getComponentByTitle('modal');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.displayName).toBe('withBreakpoints(Modal)');
	});

	test('addressCheckout as input', async () => {
		const result = getComponentByTitle('addressCheckout');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('AddressCheckout');
	});

	test('accountContactDetails as input', async () => {
		const result = getComponentByTitle('accountContactDetails');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ContactBoxes');
	});

	test('prescriptionCheckout as input', async () => {
		const result = getComponentByTitle('prescriptionCheckout');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PrescriptionCheckout');
	});

	test('accountAddress as input', async () => {
		const result = getComponentByTitle('accountAddress');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('AccountAddress');
	});

	test('prescriptionAccount as input', async () => {
		const result = getComponentByTitle('prescriptionAccount');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PrescriptionAccount');
	});

	test('orderHistory as input', async () => {
		const result = getComponentByTitle('orderHistory');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('OrderHistory');
	});

	test('plusService as input', async () => {
		const result = getComponentByTitle('plusService');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PlusService');
	});

	test('forgotPassword as input', async () => {
		const result = getComponentByTitle('forgotPassword');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ForgotPassword');
	});

	test('resetPassword as input', async () => {
		const result = getComponentByTitle('resetPassword');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('ResetPassword');
	});

	test('currentOrder as input', async () => {
		const result = getComponentByTitle('currentOrder');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CurrentOrderOverview');
	});

	test('messageBanner as input', async () => {
		const result = getComponentByTitle('messageBanner');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('MessageBannerComponent');
	});

	test('webToCase as input', async () => {
		const result = getComponentByTitle('webToCase');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('WebToCase');
	});

	test('callBack as input', async () => {
		const result = getComponentByTitle('callBack');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CallBack');
	});

	test('accountInsuranceDisplayEdit as input', async () => {
		const result = getComponentByTitle('accountInsuranceDisplayEdit');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('InsuranceDisplayEdit');
	});

	test('faqSearchForm as input', async () => {
		const result = getComponentByTitle('faqSearchForm');
		expect(result).toBeDefined();
		expect(result.name).toBe('SearchForm');
	});

	test('wizardSelector as input', async () => {
		const result = getComponentByTitle('wizardSelector');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('WizardSelector');
	});

	test('wizardInsuranceDisplay as input', async () => {
		const result = getComponentByTitle('wizardInsuranceDisplay');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('WizardInsuranceDisplay');
	});

	test('customerInfo as input', async () => {
		const result = getComponentByTitle('customerInfo');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('CustomerInfo');
	});

	test('banner as input', async () => {
		const result = getComponentByTitle('banner');
		expect(result).toBeDefined();
		expect(result.displayName).toBe('withBreakpoints(Banner)');
	});

	test('productPrice as input', async () => {
		const result = getComponentByTitle('productPrice');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SimpleProductPrice');
	});

	test('progressBar as input', async () => {
		const result = getComponentByTitle('progressBar');
		expect(result).toBeDefined();
		expect(result.name).toBe('ProgressBar');
	});

	test('sickFundSearch as input', async () => {
		const result = getComponentByTitle('sickFundSearch');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SickFundSearch');
	});

	test('testimonial as input', async () => {
		const result = getComponentByTitle('testimonial');
		expect(result).toBeDefined();
		expect(result.name).toBe('Testimonial');
	});

	test('testimonialCarousel as input', async () => {
		const result = getComponentByTitle('testimonialCarousel');
		expect(result).toBeDefined();
		expect(result.name).toBe('TestimonialCarousel');
	});

	test('imageCarousel as input', async () => {
		const result = getComponentByTitle('imageCarousel');
		expect(result).toBeDefined();
		expect(result.name).toBe('ImageCarousel');
	});

	test('videoCarousel as input', async () => {
		const result = getComponentByTitle('videoCarousel');
		expect(result).toBeDefined();
		expect(result.name).toBe('VideoCarousel');
	});

	test('panel as input', async () => {
		const result = getComponentByTitle('panel');
		expect(result).toBeDefined();
		expect(result.name).toBe('Panel');
	});

	test('searchResult as input', async () => {
		const result = getComponentByTitle('searchResult');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SearchResult');
	});

	test('searchBar as input', async () => {
		const result = getComponentByTitle('searchBar');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SearchBar');
	});

	test('softwareDownload as input', async () => {
		const result = getComponentByTitle('softwareDownload');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SoftwareDownload');
	});

	test('success as input', async () => {
		const result = getComponentByTitle('success');
		expect(result).toBeDefined();
		expect(result.name).toBe('Success');
	});

	test('payment as input', async () => {
		const result = getComponentByTitle('payment');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('Payment');
	});
	test('passwordDisplayEdit as input', async () => {
		const result = getComponentByTitle('passwordDisplayEdit');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PasswordDisplayEdit');
	});

	test('newsletterSignup as input', async () => {
		const result = getComponentByTitle('newsletterSignup');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('NewsletterSignup');
	});

	test('paymentDisplayEdit as input', async () => {
		const result = getComponentByTitle('paymentDisplayEdit');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('PaymentDisplayEdit');
	});

	test('productCard as input', async () => {
		const result = getComponentByTitle('productCard');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.displayName).toBe('withBreakpoints(ProductCard)');
	});

	test('socialshare as input', async () => {
		const result = getComponentByTitle('socialshare');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('SocialShare');
	});

	test('panelList as input', async () => {
		const result = getComponentByTitle('panelList');
		expect(result).toBeDefined();
		expect(result.name).toBe('PanelList');
	});

	test('bluedoorLogin as input', async () => {
		const result = getComponentByTitle('bluedoorLogin');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('BluedoorLogin');
	});

	test('documentUpload as input', async () => {
		const result = getComponentByTitle('documentUpload');
		expect(result).toBeDefined();
		expect(result.WrappedComponent.name).toBe('DocumentUpload');
	});

});

describe('test getComponentData method', () => {

	test('empty input', async () => {
		const result = getComponentData();
		expect(result).toEqual({});
	});

	test('jsonString input', async () => {
		const data = '{ "jsonString":"dummy data added"}';
		const result = getComponentData(data);
		expect(result).toEqual({'jsonString':'dummy data added'});
	});

});
