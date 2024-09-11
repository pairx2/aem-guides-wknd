import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import OrderOverview from "../../../../../modules/MyAccount/components/OrderOverview/OrderOverview";
import { getUrlParameter } from '../../../../../utils/getParams';

jest.mock('../../../../../utils/endpointUrl');
jest.mock('../../../../../utils/getParams');

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    // disableLifecycleMethods: true
});

const setup = (props = {}) => {
    const wrapper = shallow(<OrderOverview store={mockStore} {...props}/>).dive().dive();
    return wrapper;
};

const setupTwo = (props = {}) => {
    const wrapper = shallow(<OrderOverview store={mockStoreOrder} {...props}/>).dive().dive();
    return wrapper;
};

describe('OrderOverview Component Test Suite with isReturnFlow as false', () => {
    let props, wrapper;
    const getCurrentOrdersMock = jest.fn();
    const getProductsRequestMock = jest.fn();
    const fetchDictionaryRequestMock = jest.fn();

    beforeEach(() => {
        props = {
            getCurrentOrders: getCurrentOrdersMock,
            getProductsRequest: getProductsRequestMock,
            fetchDictionaryRequest: fetchDictionaryRequestMock,
            currentOrderHeading: 'currentOrderHeading',
            emptyHeading: 'emptyHeading',
            emptyInfoText: 'emptyInfoText',
            orderRecipeStyle: 'orderRecipeStyle',
            orderRecipeLink: 'orderRecipeLink',
            orderShopStyle: 'orderShopStyle',
            checkoutPage: 'checkoutPage',
            orderShopLink: 'orderShopLink',
            returnText: 'returnText',
            responsiveness: {'default': 11},
            isAccountOverviewTab: false,
            accountPagePath: 'accountPagePath',
            accountPageTab: 'accountPageTab',
            tabName: 'tabName',
            orderType: 'CPS',
            title: null,
            statusLabel: 'statusLabel',
            downloadLabel: 'downloadLabel',
            getGhostOrdersRequest: () => {
            },
            getInvoice: () => {
            },
            noPrescriptionDescription: 'noPrescriptionDescription',
            noPrescriptionTitle: 'noPrescriptionTitle',
            image: 'image',
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
            productPrices: {},
            dictionary: {},
            customer: {},
            isDeleted: false,
            isLoadingOrders: false,
            orders: {},
            plusServiceTabName: '#plus_service'
        };
        wrapper = setup(props);
    });

    describe('propTypes check', () => {

        test('render check', () => {
            expect(wrapper.type()).not.toEqual(null);
        });

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });

        test('has currentOrderHeading as prop and is of type string', () => {
            const currentOrderHeadingProp = wrapper.instance().props.currentOrderHeading;
            expect(typeof currentOrderHeadingProp).toBe('string');
        });

        test('has emptyHeading as prop and is of type string', () => {
            const emptyHeadingProp = wrapper.instance().props.emptyHeading;
            expect(typeof emptyHeadingProp).toBe('string');
        });

        test('has emptyInfoText as prop and is of type string', () => {
            const emptyInfoTextProp = wrapper.instance().props.emptyInfoText;
            expect(typeof emptyInfoTextProp).toBe('string');
        });

        test('has orderRecipeStyle as prop and is of type string', () => {
            const orderRecipeStyleProp = wrapper.instance().props.orderRecipeStyle;
            expect(typeof orderRecipeStyleProp).toBe('string');
        });

        test('has orderRecipeLink as prop and is of type string', () => {
            const orderRecipeLinkProp = wrapper.instance().props.orderRecipeLink;
            expect(typeof orderRecipeLinkProp).toBe('string');
        });

        test('has orderShopStyle as prop and is of type string', () => {
            const orderShopStyleProp = wrapper.instance().props.orderShopStyle;
            expect(typeof orderShopStyleProp).toBe('string');
        });

        test('has checkoutPage as prop and is of type string', () => {
            const checkoutPageProp = wrapper.instance().props.checkoutPage;
            expect(typeof checkoutPageProp).toBe('string');
        });

        test('has orderShopLink as prop and is of type string', () => {
            const orderShopLinkProp = wrapper.instance().props.orderShopLink;
            expect(typeof orderShopLinkProp).toBe('string');
        });

        test('has returnText as prop and is of type string', () => {
            const returnTextProp = wrapper.instance().props.returnText;
            expect(typeof returnTextProp).toBe('string');
        });

        test('has accountPagePath as prop and is of type string', () => {
            const accountPagePathProp = wrapper.instance().props.accountPagePath;
            expect(typeof accountPagePathProp).toBe('string');
        });

        test('has accountPageTab as prop and is of type string', () => {
            const accountPageTabProp = wrapper.instance().props.accountPageTab;
            expect(typeof accountPageTabProp).toBe('string');
        });

        test('has isReturnFlow as prop and is of type boolean', () => {
            const isReturnFlowProp = wrapper.instance().props.isReturnFlow;
            expect(typeof isReturnFlowProp).toBe('boolean');
        });

        test('has isAccountOverviewTab as prop and is of type boolean', () => {
            const isAccountOverviewTabProp = wrapper.instance().props.isAccountOverviewTab;
            expect(typeof isAccountOverviewTabProp).toBe('boolean');
        });

        test('has currentOrders as prop and is of type array', () => {
            const currentOrdersProp = wrapper.instance().props.currentOrders;
            expect(currentOrdersProp).toBeInstanceOf(Object);
        });

        test('has products as prop and is of type object', () => {
            const productsProp = wrapper.instance().props.products;
            expect(productsProp).toBeInstanceOf(Object);
        });

        test('has orders as prop and is of type object', () => {
            const ordersProp = wrapper.instance().props.orders;
            expect(ordersProp).toBeInstanceOf(Object);
        });

        test('has customer as prop and is of type object', () => {
            const customerProp = wrapper.instance().props.customer;
            expect(customerProp).toBeInstanceOf(Object);
        });

        test('has dictionary as prop and is of type object', () => {
            const dictionaryProp = wrapper.instance().props.dictionary;
            expect(dictionaryProp).toBeInstanceOf(Object);
        });

        test('has productData as prop and is of type object', () => {
            const productDataProp = wrapper.instance().props.productData;
            expect(productDataProp).toBeInstanceOf(Object);
        });

        test('has delivery as prop and is of type object', () => {
            const deliveryProp = wrapper.instance().props.delivery;
            expect(deliveryProp).toBeInstanceOf(Object);
        });

        test('has orderDetails as prop and is of type object', () => {
            const orderDetailsProp = wrapper.instance().props.orderDetails;
            expect(orderDetailsProp).toBeInstanceOf(Object);
        });

        test('has responsiveness as prop and is of type object', () => {
            const responsivenessProp = wrapper.instance().props.responsiveness;
            expect(responsivenessProp).toBeInstanceOf(Object);
        });

        test('has getCurrentOrders as prop and is of type function', () => {
            const getCurrentOrdersProp = wrapper.instance().props.getCurrentOrders;
            expect(typeof getCurrentOrdersProp).toBe('function');
        });

        test('has getProductsRequest as prop and is of type function', () => {
            const getProductsRequestProp = wrapper.instance().props.getProductsRequest;
            expect(typeof getProductsRequestProp).toBe('function');
        });

        test('has fetchDictionaryRequest as prop and is of type function', () => {
            const fetchDictionaryRequestProp = wrapper.instance().props.fetchDictionaryRequest;
            expect(typeof fetchDictionaryRequestProp).toBe('function');
        });

        test('title proptype', () => {
            const titleProp = wrapper.instance().props.title;
            expect(typeof titleProp).toBe('object');
        });

        test('statusLabel proptype', () => {
            const statusLabelProp = wrapper.instance().props.statusLabel;
            expect(typeof statusLabelProp).toBe('string');
        });

        test('downloadLabel proptype', () => {
            const downloadLabelProp = wrapper.instance().props.downloadLabel;
            expect(typeof downloadLabelProp).toBe('string');
        });

        test('noPrescriptionDescription proptype', () => {
            const noPrescriptionDescriptionProp = wrapper.instance().props.noPrescriptionDescription;
            expect(typeof noPrescriptionDescriptionProp).toBe('string');
        });

        test('noPrescriptionTitle proptype', () => {
            const noPrescriptionTitleProp = wrapper.instance().props.noPrescriptionTitle;
            expect(typeof noPrescriptionTitleProp).toBe('string');
        });

        test('image proptype', () => {
            const imageProp = wrapper.instance().props.image;
            expect(typeof imageProp).toBe('string');
        });

        test('ghostOrders proptype', () => {
            const ghostOrdersProp = wrapper.instance().props.ghostOrders;
            expect(ghostOrdersProp).toBeInstanceOf(Array);
        });

        test('customer proptype', () => {
            const customerProp = wrapper.instance().props.customer;
            expect(customerProp).toBeInstanceOf(Object);
        });

        test('getGhostOrdersRequest proptype', () => {
            const getGhostOrdersRequestProp = wrapper.instance().props.getGhostOrdersRequest;
            expect(typeof getGhostOrdersRequestProp).toBe('function');
        });

        test('getInvoice proptype', () => {
            const getInvoiceProp = wrapper.instance().props.getInvoice;
            expect(typeof getInvoiceProp).toBe('function');
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
    describe('state check', () => {

        test('state value check', () => {
            const stateCheck = wrapper.instance().state;
            expect(stateCheck).toBeInstanceOf(Object);

            expect(typeof stateCheck.isEditing).toBe('boolean');
            expect(stateCheck.isEditing).toBeFalsy();

            expect(typeof stateCheck.addressType).toBe('string');
            expect(stateCheck.addressType).toBe('');

            expect(stateCheck.currentOrder).toBeInstanceOf(Object);
            expect(stateCheck.currentOrder).toEqual({});
        });
    });

    describe('functions check', () => {
        test('toggleEditing function call check', () => {
            const toggleEditingMock = wrapper.instance().toggleEditing;
            expect(typeof toggleEditingMock).toBe('function');

            wrapper.instance().ref = {current: {scrollIntoView: jest.fn()}};
            const type = 'type';
            const isEditing = true;
            const currentOrder = {currentOrderProp: 'currentOrderValue'};

            toggleEditingMock(type, isEditing, currentOrder);

            expect(wrapper.instance().state.addressType).toBe(type);
            expect(wrapper.instance().state.isEditing).toBeTruthy();
            expect(wrapper.instance().state.currentOrder).toEqual(currentOrder);
        });

        test('tabChanged function call check', () => {
            const tabChangedMock = wrapper.instance().tabChanged;
            expect(typeof tabChangedMock).toBe('function');
            tabChangedMock();
            expect(wrapper.instance().state.isEditing).toBeFalsy();
        });

        test('isLargeEnough function call check', () => {
            const isLargeEnoughMock = wrapper.instance().isLargeEnough;
            expect(typeof isLargeEnoughMock).toBe('function');

            expect(isLargeEnoughMock()).toBeTruthy();
        });

        test('componentDidMount function call check moking urlparameter orderId', () => {
    
            getUrlParameter.mockImplementation(() => ({orderId: 123456}))
            const componentDidMountMock = wrapper.instance().componentDidMount;
            expect(typeof componentDidMountMock).toBe('function');

            wrapper.instance().componentDidMount();

            const getProductsRequestMockCallCount = getProductsRequestMock.mock.calls.length;
            expect(getProductsRequestMockCallCount).toBeDefined();
        });

        test('componentDidUpdate function call check', () => {
            const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
            expect(typeof componentDidUpdateMock).toBe('function');

            const prevProps = {
                'customer': {'id': 5},
                'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
                ghostOrders: ['a']
            };
            wrapper.instance().componentDidUpdate(prevProps);

            const getCurrentOrdersMockCallCount = getCurrentOrdersMock.mock.calls.length;
            expect(getCurrentOrdersMockCallCount).toBeDefined();
        });
        test('componentDidUpdate function call with ghostordertypes open order check', () => {
             const prevProps = {
                'customer': {'id': 5},
                'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
                ghostOrders: [{}]
            };
             wrapper.setProps({
                'customer': {'id': 5},
                'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
                ghostOrders: [
                {id: 89966, hmm_order_id: "RSRR3313", rxmc: "00260D", status_code: 40, frontend_status: 40}
                ]
            })
            wrapper.instance().componentDidUpdate(prevProps);
        });
        test('componentDidUpdate function call with ghostordertypes open order check', () => {
            const prevProps = {
               'customer': {'id': 5},
               'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
               canRedirect : false
           };
            wrapper.setProps({
               'customer': {'id': 5},
               'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
               canRedirect : true
           })
           wrapper.instance().componentDidUpdate(prevProps);
       });

        test('componentDidUpdate function call with ghostordertypes completed order check', () => {
            const prevProps = {
               'customer': {'id': 5},
               'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
               ghostOrders: [{}]
           };
            wrapper.setProps({
               'customer': {'id': 5},
               'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
               ghostOrders: [
                {id: 86856, hmm_order_id: "32478", rxmc: "0023ZP", status_code: 49, frontend_status: null}
               ]
           })
           wrapper.instance().componentDidUpdate(prevProps);
       });
       test('componentDidUpdate function call with ghostordertypes rxorderStatuscheck else block', () => {
        const prevProps = {
           'customer': {'id': 5},
           'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
           ghostOrders: [{}]
       };
        wrapper.setProps({
           'customer': {'id': 5},
           'orders': {'CPS': {'ordersList': ['a1', 'a2']}},
           ghostOrders: [
            {id: 86856, hmm_order_id: "32478", rxmc: "0023ZP", status_code: null, frontend_status: null}
           ]
       })
       wrapper.instance().componentDidUpdate(prevProps);
   });

        test('toggleEditing function call in close property of AddressEditor', () => {
            wrapper.instance().setState({isEditing: true});
            const closeProp = wrapper.props().children.props.close;
            expect(typeof closeProp).toBe('function');

            wrapper.instance().ref = {current: {scrollIntoView: jest.fn()}};
            closeProp(false);
            expect(wrapper.instance().state.isEditing).toBeFalsy();
        });

        test('getPrescriptionStatus function call', () => {
            const getPrescriptionStatusMock = wrapper.instance().getPrescriptionStatus;
            expect(typeof getPrescriptionStatusMock).toBe('function');
            getPrescriptionStatusMock();
            expect(getPrescriptionStatusMock).toBeDefined();
        });

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

        test('updatePaymentMethod function call check', () => {
            const updatePaymentMethodMock = wrapper.instance().updatePaymentMethod ;
            expect(typeof updatePaymentMethodMock).toBe('function');
            updatePaymentMethodMock();
        });
        test('deleteSubscription  function call check', () => {
            const deleteSubscriptionMock = wrapper.instance().deleteSubscription  ;
            expect(typeof deleteSubscriptionMock).toBe('function');
            deleteSubscriptionMock();
        });
    });
});

describe('OrderOverview Component Test Suite with isReturnFlow as true & no responsiveness prop', () => {

    let props, wrapper;
    const getCurrentOrdersMock = jest.fn();
    const getProductsRequestMock = jest.fn();
    const fetchDictionaryRequestMock = jest.fn();

    beforeEach(() => {
        props = {
            getCurrentOrders: getCurrentOrdersMock,
            getProductsRequest: getProductsRequestMock,
            fetchDictionaryRequest: fetchDictionaryRequestMock,
            currentOrderHeading: 'currentOrderHeading',
            emptyHeading: 'emptyHeading',
            emptyInfoText: 'emptyInfoText',
            orderRecipeStyle: 'orderRecipeStyle',
            orderRecipeLink: 'orderRecipeLink',
            orderShopStyle: 'orderShopStyle',
            checkoutPage: 'checkoutPage',
            orderShopLink: 'orderShopLink',
            returnText: 'returnText',
            responsiveness: {'default': 7},
            isAccountOverviewTab: false,
            accountPagePath: 'accountPagePath',
            accountPageTab: 'accountPageTab',
            tabName: 'tabName',
            statusLabel: 'statusLabel',
            downloadLabel: 'downloadLabel',
            getGhostOrdersRequest: () => {
            },
            getInvoice: () => {
            },
            noPrescriptionDescription: 'noPrescriptionDescription',
            noPrescriptionTitle: 'noPrescriptionTitle',
            image: 'image'
        };
        wrapper = setupTwo(props);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

});
