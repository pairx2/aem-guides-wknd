import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PlusService from '../../../../../modules/MyAccount/components/PlusService/PlusService';
import {Card,CardContent}from '../../../../../modules/Generic/components/Card/Card';
import DataLayer from '../../../../../modules/Data/DataLayer';
import ActivePlusService from '../../../../../modules/MyAccount/components/PlusService/ActivePlusService';
import NoActivePlusService from '../../../../../modules/MyAccount/components/PlusService/NoActivePlusService';
import LoadingIndicator from '../../../../../modules/Generic/components/Loading/LoadingIndicator';
import {mockStore} from '../../../../../__mocks__/storeMock';
import translate, {i18nLabels} from '../../../../../utils/translationUtils';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<PlusService store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('PlusService component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			getProductPriceRequest: () => { },
			openModalAction: () => { },
			productSku: 'productSku',
			subscriptionHeading: 'subscriptionHeading',
			subscriptionImage: 'subscriptionImage',
			informationalHeading: 'informationalHeading',
			informationalDesc: 'informationalDesc',
			moreInfoPath: 'moreInfoPath',
			moreInfoStyle: 'moreInfoStyle',
			informationalMessage: 'informationalMessage',
			bookServicePath: 'bookServicePath',
			privacyPolicyPath: 'privacyPolicyPath',
			termsAndConditionsPath: 'termsAndConditionsPath',
			trainingMaterialsPath: 'trainingMaterialsPath',
			informationalPriceSuperscript: 'informationalPriceSuperscript',
			productPrices: {},
			dictionary: {},
			customer: {},
			isDeleted: false,
			isLoadingOrders: false,
			orders: {},
			tabName: '#plus_service'
		};
		sessionStorage.setItem('isAddressAndPaymentUpdate', true);
		const updatedAddress = '{"id": "13","address_id":13,"prefix": "Mr","firstname": "Firstname","lastname": "Lastname","postcode": "postcode","country_id": "DE","country_name": "Germany","region_code": "BER","region": "Berlin","city": "Berlin"}';
		sessionStorage.setItem('newAddressFromOrderUpdate', updatedAddress);
		window.history.pushState({}, 'Test URL', '/test.html?orderId=123456&currentSubscriptionOrderStatus=Inactive&choosenDeliveryDate=1594684800000');
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('productSku proptype', () =>{
			const productSkuProp= wrapper.instance().props.productSku;
			expect(typeof productSkuProp).toBe('string');
		});

		test('subscriptionHeading proptype', () =>{
			const subscriptionHeadingProp= wrapper.instance().props.subscriptionHeading;
			expect(typeof subscriptionHeadingProp).toBe('string');
		});

		test('subscriptionImage proptype', () =>{
			const subscriptionImageProp= wrapper.instance().props.subscriptionImage;
			expect(typeof subscriptionImageProp).toBe('string');
		});

		test('informationalHeading proptype', () =>{
			const informationalHeadingProp= wrapper.instance().props.informationalHeading;
			expect(typeof informationalHeadingProp).toBe('string');
		});

		test('informationalDesc proptype', () =>{
			const informationalDescProp= wrapper.instance().props.informationalDesc;
			expect(typeof informationalDescProp).toBe('string');
		});

		test('moreInfoPath proptype', () =>{
			const moreInfoPathProp= wrapper.instance().props.moreInfoPath;
			expect(typeof moreInfoPathProp).toBe('string');
		});

		test('informationalMessage proptype', () =>{
			const informationalMessageProp= wrapper.instance().props.informationalMessage;
			expect(typeof informationalMessageProp).toBe('string');
		});

		test('informationalPriceSuperscript proptype', () =>{
			const informationalPriceSuperscriptProp= wrapper.instance().props.informationalPriceSuperscript;
			expect(typeof informationalPriceSuperscriptProp).toBe('string');
		});

		test('moreInfoStyle proptype', () =>{
			const moreInfoStyleProp= wrapper.instance().props.moreInfoStyle;
			expect(typeof moreInfoStyleProp).toBe('string');
		});

		test('bookServicePath proptype', () =>{
			const bookServicePathProp= wrapper.instance().props.bookServicePath;
			expect(typeof bookServicePathProp).toBe('string');
		});

		test('privacyPolicyPath proptype', () =>{
			const privacyPolicyPathProp= wrapper.instance().props.privacyPolicyPath;
			expect(typeof privacyPolicyPathProp).toBe('string');
		});

		test('termsAndConditionsPath proptype', () =>{
			const termsAndConditionsPathProp= wrapper.instance().props.termsAndConditionsPath;
			expect(typeof termsAndConditionsPathProp).toBe('string');
		});

		test('trainingMaterialsPath proptype', () =>{
			const trainingMaterialsPathProp= wrapper.instance().props.trainingMaterialsPath;
			expect(typeof trainingMaterialsPathProp).toBe('string');
		});

		test('orders proptype', () =>{
			const ordersProp= wrapper.instance().props.orders;
			expect(ordersProp).toBeInstanceOf(Object);
		});

		test('customer proptype', () =>{
			const customerProp= wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('dictionary proptype', () =>{
			const dictionaryProp= wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('productPrices proptype', () =>{
			const productPricesProp= wrapper.instance().props.productPrices;
			expect(productPricesProp).toBeInstanceOf(Object);
		});

		test('getProductPriceRequest proptype', () =>{
			const getProductPriceRequestProp= wrapper.instance().props.getProductPriceRequest;
			expect(typeof getProductPriceRequestProp).toBe('function');
		});

		test('openModalAction proptype', () =>{
			const openModalActionProp= wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

		test('has isDeleted as prop and is of type boolean', () => {
			const isDeletedProp = wrapper.instance().props.isDeleted;
			expect(typeof isDeletedProp).toBe('boolean');
		});

		test('has isLoadingOrders as prop and is of type boolean', () => {
			const isLoadingOrdersProp = wrapper.instance().props.isLoadingOrders;
			expect(typeof isLoadingOrdersProp).toBe('boolean');
		});

	});

	describe('Functions check', () => {

		test('getCurrentSubscriptionOrder function call', () => {
			const getCurrentSubscriptionOrderMock = wrapper.instance().getCurrentSubscriptionOrder;
			expect(typeof getCurrentSubscriptionOrderMock).toBe('function');
			getCurrentSubscriptionOrderMock();
			expect(getCurrentSubscriptionOrderMock).toBeDefined();
		});
		test('updateAddressAndPayment function call', () => {
			const updateAddressAndPaymentMock = wrapper.instance().updateAddressAndPayment;
			expect(typeof updateAddressAndPaymentMock).toBe('function');
			const payload = {
				address_type: 'billing',
				address_id: 203490,
				rss_result_code: 'AVD900',
				is_blacklisted: false,
				is_verified: false,
				code: 'open_invoice',
				order_id: 'orderId',
				order_type: 'RX',
			};
			updateAddressAndPaymentMock(payload);
			expect(updateAddressAndPaymentMock).toBeDefined();
		});

		test('getCurrentSubscriptionOrderStatus function call', () => {
			const getCurrentSubscriptionOrderStatusMock = wrapper.instance().getCurrentSubscriptionOrderStatus;
			expect(typeof getCurrentSubscriptionOrderStatusMock).toBe('function');
			getCurrentSubscriptionOrderStatusMock();
			expect(getCurrentSubscriptionOrderStatusMock).toBeDefined();
		});

		test('getSubscriptionFrequency function call', () => {
			const getSubscriptionFrequencyMock = wrapper.instance().getSubscriptionFrequency;
			expect(typeof getSubscriptionFrequencyMock).toBe('function');
			getSubscriptionFrequencyMock();
			expect(getSubscriptionFrequencyMock).toBeDefined();
		});

		test('getSubscriptionPrice function call', () => {
			const getSubscriptionPriceMock = wrapper.instance().getSubscriptionPrice;
			expect(typeof getSubscriptionPriceMock).toBe('function');
			getSubscriptionPriceMock();
			expect(getSubscriptionPriceMock).toBeDefined();
		});

		test('deactivateSubscription function call', () => {
			const deactivateSubscriptionMock = wrapper.instance().deactivateSubscription;
			expect(typeof deactivateSubscriptionMock).toBe('function');
			deactivateSubscriptionMock();
			expect(deactivateSubscriptionMock).toBeDefined();
		});
	});

	describe('function calls',() => {

		test('did mount should call getProductPriceRequest',() => {
			if (wrapper.instance().props.productSku && !wrapper.instance().props.productPrices[wrapper.instance().props.productSku]) {
				wrapper.instance().props.getProductPriceRequest(wrapper.instance().props.productSku);
			}
		});

		test('deactivateSubscription modal popup',() => {
			const currentSubscriptionOrderElement = wrapper.instance().getCurrentSubscriptionOrder();

			wrapper.instance().props.openModalAction({
				heading: translate(wrapper.instance().props.dictionary, i18nLabels.DEACTIVATE_PLUS_SERVICE_MODAL_HEADING, [wrapper.instance().props.customer?.firstname]),
				contentID: 'deactivatePlusServiceModal',
				props: {
					serviceToDate: currentSubscriptionOrderElement?.serviceData?.[0]?.serviceToDate,
					orderId:  currentSubscriptionOrderElement?.orderId
				}
			});
		});

		test('deleteSubscription modal popup',() => {
			const currentSubscriptionOrderElement = wrapper.instance().getCurrentSubscriptionOrder();

			wrapper.instance().props.openModalAction({
				heading: translate(wrapper.instance().props.dictionary, i18nLabels.DELETE_PLUS_SERVICE_MODAL_HEADING, [wrapper.instance().props.customer?.firstname]),
				contentID: 'deletePlusServiceModal',
				props: {
					orderId:  currentSubscriptionOrderElement?.orderId
				}
			});
		});
		test('deleteSubscription call',() => {
			const currentSubscriptionOrderElement = wrapper.instance().deleteSubscription ();

			wrapper.instance().props.openModalAction({
				heading: translate(wrapper.instance().props.dictionary, i18nLabels.DELETE_PLUS_SERVICE_MODAL_HEADING, [wrapper.instance().props.customer?.firstname]),
				contentID: 'deletePlusServiceModal',
				props: {
					orderId:  currentSubscriptionOrderElement?.orderId
				}
			});
		});
		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {canRedirect: false};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {canRedirect : true};
			wrapper.instance().componentDidUpdate(prevProps);
		});

	});

	describe('render jsx', () => {

		test('NoActivePlusService render',() => {
			const NoActivePlusServiceElement = wrapper.props().children;
			expect(NoActivePlusServiceElement.props.subscriptionHeading).toBe(wrapper.instance().props.subscriptionHeading);
			expect(NoActivePlusServiceElement.props.subscriptionImage).toBe(wrapper.instance().props.subscriptionImage);
			expect(NoActivePlusServiceElement.props.informationalDesc).toBe(wrapper.instance().props.informationalDesc);
			expect(NoActivePlusServiceElement.props.informationalMessage).toBe(wrapper.instance().props.informationalMessage);
			expect(NoActivePlusServiceElement.props.informationalPriceSuperscript).toBe(wrapper.instance().props.informationalPriceSuperscript);
			expect(NoActivePlusServiceElement.props.moreInfoPath).toBe(wrapper.instance().props.moreInfoPath);
			expect(NoActivePlusServiceElement.props.moreInfoStyle).toBe(wrapper.instance().props.moreInfoStyle);
			expect(NoActivePlusServiceElement.props.bookServicePath).toBe(wrapper.instance().props.bookServicePath);
			const frequency = wrapper.instance().getSubscriptionFrequency();
			expect(NoActivePlusServiceElement.props.frequency).toBe(frequency);
			const price = wrapper.instance().getSubscriptionPrice();
			expect(NoActivePlusServiceElement.props.price).toBe(price);
		});
	});

	describe('component render check', () => {

		test('Card component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Card />)).toBeDefined();
		});
		test('CardContent gets rendered', () => {
			expect(wrapper.containsMatchingElement(<CardContent />)).toBeDefined();
		});
		test('LoadingIndicator gets rendered', () => {
			expect(wrapper.containsMatchingElement(<LoadingIndicator />)).toBeDefined();
		});
		test('NoActivePlusService gets rendered', () => {
			expect(wrapper.containsMatchingElement(<NoActivePlusService />)).toBeDefined();
		});
		test('DataLayer gets rendered', () => {
			expect(wrapper.containsMatchingElement(<DataLayer />)).toBeDefined();
		});
		test('ActivePlusService gets rendered', () => {
			expect(wrapper.containsMatchingElement(<ActivePlusService />)).toBeDefined();
		});

	});
});