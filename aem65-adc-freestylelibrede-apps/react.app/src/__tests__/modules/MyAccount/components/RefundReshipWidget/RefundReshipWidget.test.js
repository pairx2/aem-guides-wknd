import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import RefundReshipWidget from '../../../../../modules/MyAccount/components/RefundReshipWeget/RefundReshipWidget';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
})

const setup = ( props = {}) => {
    const wrapper = shallow(<RefundReshipWidget store={mockStore} {...props}/>).dive().dive();
    return wrapper;
}

const setup2 = ( props = {}) => {
    const wrapper = shallow(<RefundReshipWidget store={mockStoreOrder} {...props}/>).dive().dive();
    return wrapper;
}

describe('Refund reship component redition test with order ', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            returnActionRequest: "PropTypes.func",
            title: "String",
            heading: "String",
            radioButtons: [{
                label: "Label1",
                key: "key1"
            },{
                label: "Label2",
                key: "key2"
            }],
            ctaText: "String",
            ctaType: "String",
            successTitle: "String",
            successMessage: "String",
            errorMessageCode : 123,
            returnStatusUpdated : true
        };
        wrapper = setup(props)
        });
        test('render check',() => {
            expect(wrapper.type()).not.toEqual(null);
        });
        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
        test('setSelectedValue with param', () => {
            const payload = {
                target: {value: "refund"}
            }
            wrapper.instance().setSelectedValue(payload);
        });
        test('handleWidgetRequest without param', () => {
            wrapper.instance().handleWidgetRequest();
        });
         
    
});

describe('Refund reship component redition test without order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            returnActionRequest: "PropTypes.func",
            title: "String",
            heading: "String",
            radioButtons: [{
                label: "Label1",
                key: "refund"
            },{
                label: "Label2",
                key: "reship"
            }],
            ctaText: "String",
            ctaType: "String",
            successTitle: "String",
            successMessage: "String",
            errorMessageCode: '123',
            returnStatusUpdated: true,
            isfetching: true, 
        };
        wrapper = setup(props)
        });
        test('render check',() => {
            wrapper.setProps({orders: {
                'accountId': '4900201099',
                'CPS': {
                    'orderList': [
                        {
                            'index': 2,
                            'orderId': 'DEAAAAAAIR',
                            'orderDate': 1587945600000,
                            'orderTitle': 'Cash Pay',
                            'orderType': 'Cash Pay',
                            'rxmc': null,
                            'isReimbursedOrder': false,
                            'deliveryDetails': [
                                {
                                    'index': 2,
                                    'deliveryId': 'SCH-0000089848',
                                    'deliveryType': 'Master',
                                    'deliveryStatus': 'Payment Completed',
                                    'deliveryNumber': null,
                                    'deliveryTrackingNr': null,
                                    'invoiceIdDetails': [
                                        {
                                            'invoiceId': 'a4Z4E0000002qCpUAI',
                                            'invoiceStatus': 'Payment Completed'
                                        }
                                    ],
                                    'wmsStatus': null,
                                    'estimatedDeliveryDate': null,
                                    'productSKU': '71969-01',
                                    'productQuantity': 1,
                                    'shipmentId': 'a4d4E0000000bOnQAI'
                                },{
                                    "index": 1,
                                    "deliveryId": "SCH-0000379839",
                                    "deliveryOrderId": "DE6500000104",
                                    "deliveryType": "Master",
                                    "deliveryStatus": "Order could not be delivered - Recipient not reached",
                                    "deliveryNumber": "4000063019",
                                    "deliveryTotal": 0,
                                    "deliveryTrackingNr": "00340434635500083101",
                                    "wmsStatus": "Carrier Return",
                                    "dueDate": 1694736000000,
                                    "returnDetails": [
                                        {
                                            "returnId": "4950005386",
                                            "rmaLabel": null,
                                            "rmaName": null,
                                            "returnType": "Non",
                                            "returnDate": 1694649600000,
                                            "returnRequestDate": 1694693723000,
                                            "returnStatus": "Consistent",
                                            "csStatus": "Refunded by System",
                                            "returnItemDetails": [
                                                {
                                                    "returnItem": {
                                                        "returnItemQuantity": 1,
                                                        "returnItemName": "FreeStyle Libre 3 Sensor",
                                                        "returnItemSku": "72114-01",
                                                        "returnItemStatus": "Created",
                                                        "returnItemId": "a5r5r000000DiY0AAK"
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                },
                            ],
                            'returnDetails': null
                        }                        
                    ]
                },
                'RX': null,
                'CP': null
            }});
            wrapper.setState({ validationError: false});
            wrapper.instance().getOldestReturnDetails();
            expect(wrapper.type()).not.toEqual(null);
        });
        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
        test('handleWidgetRequest without param', () => {
            wrapper.setState({selectedOption: 'refund', validationError: true})
            wrapper.instance().handleWidgetRequest();
        });

       

        test('componentDidUpdate without param', () => {
            const prevProps = {
                errorMessageCode : '',
            returnStatusUpdated : false
            }
            wrapper.setProps({ errorMessageCode: '123',
            returnStatusUpdated: true,
            isfetching: true});
            wrapper.instance().componentDidUpdate(prevProps);
        });
         
        test('componentDidUpdate without param', () => {
            const prevProps = {
                errorMessageCode : '123',
            returnStatusUpdated : true
            }
            wrapper.setProps({ errorMessageCode: '',
            returnStatusUpdated: false,
            isfetching: false})
            wrapper.instance().componentDidUpdate(prevProps);
        });
});