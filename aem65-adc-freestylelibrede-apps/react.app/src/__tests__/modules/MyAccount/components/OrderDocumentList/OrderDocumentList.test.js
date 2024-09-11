import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import OrderDocumentList from '../../../../../modules/MyAccount/components/OrderDocumentList/OrderDocumentList';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = ( props = {}) => {
    const wrapper = shallow(<OrderDocumentList store={mockStore} {...props}/>).dive().dive();
    return wrapper;
}
const setupTwo = (props = {}) => {
	const wrapper = shallow(<OrderDocumentList store = {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
}

describe('OrderDocumentList component Test Suite', () => {
	let props, wrapper;
	
	beforeEach(() => {
		
		props = {
			heading: 'some',
			subHeading: 'Some sub heading',
			isVisible: false
		};
		wrapper = setup(props)
	});
	test('test for card rendering', () => {
		expect(wrapper.find('adc-order-document-list')).toBeDefined()
	})
	test('test for component rendering', () => {
		wrapper.instance().setState({ fetchedResults: [],
			isLoaded: false,
			resultsToShow: 3,
			query: "",
			isLoadMore: true,
			isButtonClicked: false,
			noSearchResults: false,
			isQueryLength: true });
			wrapper.instance().handleDocumentList();
	})
	test('pdf available with no orders', () => {
		wrapper.setProps({
			allOrders: {
				orders: []
			}
		})
		expect(wrapper.instance().getOnlyPdfAvailableOrders()).toBeDefined();
		const result = wrapper.instance().getOnlyPdfAvailableOrders();
		expect(Array.isArray(result)).toBeTruthy();
		expect(result).toHaveLength(0);
	});
	test('renders error message when all conditions are true', () => {
		wrapper.setProps({
			allOrders: { fetched: false, loading: false }
		})
		wrapper.instance().setState({
			noSearchResults: false,
			isQueryLength: true,
			isLoaded: true
		})
	});	

});

describe('OrderDocumentList component Test Suite', () => {
	let props, wrapper;
	
	beforeEach(() => {
		props = {
			heading: 'some',
			subHeading: 'Some sub heading',
			isVisible: true
		};
		wrapper = setupTwo(props)
	});
	test('test for card rendering', () => {
		expect(wrapper.find('adc-order-document-list')).toBeDefined()
	})
	test('test for component rendering', () => {
		wrapper.instance().setState({
			isLoaded: false,
			resultsToShow: 3,
			query: "freestyle",
			isLoadMore: true,
			isButtonClicked: true,
			noSearchResults: true,
			isQueryLength: true });
			wrapper.instance().handleDocumentList();
	});
	test('IsQueryLenth case true', () => {
		wrapper.instance().setState({
			isQueryLength: true
		})
	});
	test('fetchOrders fetched=false', () => {
		expect(typeof wrapper.instance().fetchOrders).toBe('function');
		wrapper.setProps({
			allOrders:{
				fetched: false,
				orders:{}
			}
		})
		wrapper.instance().fetchOrders();
		wrapper.instance().handleDocumentList();
	});
	test('fetchOrders fetched=true', () => {
		expect(typeof wrapper.instance().fetchOrders).toBe('function');
		wrapper.setProps({
			allOrders:{
				fetched: true,
				orders:[]
			}
		})
		wrapper.instance().fetchOrders();
		wrapper.instance().handleDocumentList();
	});
	test('getonlypdfavailableorders noOrders case', () => {
		expect(typeof wrapper.instance().getOnlyPdfAvailableOrders).toBe('function');
		wrapper.setProps({
			allOrders:{
				fetched: true
			}
		})
		wrapper.instance().getOnlyPdfAvailableOrders();
	});
	test('handleAllButton method', () => {
		expect(typeof wrapper.instance().handleAllButton).toBe('function');
		wrapper.setState({
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: '1234'
		})
		jest.spyOn(wrapper.instance(), 'getOnlyPdfAvailableOrders');
		wrapper.instance().handleAllButton();
		expect(wrapper.instance().getOnlyPdfAvailableOrders).toHaveBeenCalled();
	});

	test('handleAllButton method else case', () => {
		expect(typeof wrapper.instance().handleAllButton).toBe('function');
		wrapper.setState({
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: ''
		})
		jest.spyOn(wrapper.instance(), 'getOnlyPdfAvailableOrders');
		wrapper.instance().handleAllButton();
	});

	test('handleCreditButton method', () => {
		expect(typeof wrapper.instance().handleCreditButton).toBe('function');
		wrapper.setProps({
			allOrders:{
				orders:[{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEI0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					},
					{
						"index": 2,
						"orderType": "Cash Pay Subscription",
						"orderId": "DE15006789",
						"serviceData": [
							{
								"serviceStatus": "Active"
							}
						],
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEC0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					}]
			}
		})
		wrapper.setState({
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: '1234'
		})
		jest.spyOn(wrapper.instance(), 'getOnlyPdfAvailableOrders');
		wrapper.instance().handleCreditButton();
	});
	test('handleCreditButton method else', () => {
		expect(typeof wrapper.instance().handleCreditButton).toBe('function');
		wrapper.setProps({
			allOrders:{
				orders:[{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEI0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					},
					{
						"index": 2,
						"orderType": "Cash Pay Subscription",
						"orderId": "DE15006789",
						"serviceData": [
							{
								"serviceStatus": "Active"
							}
						],
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEC0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					}]
			}
		})
		wrapper.setState({
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: ''
		})
		jest.spyOn(wrapper.instance(), 'getOnlyPdfAvailableOrders');
		wrapper.instance().handleCreditButton();
	});
	test('resetAllFilters method', () => {
		expect(typeof wrapper.instance().resetAllFilters).toBe('function');
		wrapper.setState({
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: '123'
		})
		wrapper.instance().resetAllFilters();
		jest.spyOn(wrapper.instance(), 'getOnlyPdfAvailableOrders');
		wrapper.instance().resetAllFilters();
	});
	test('resetSearch method', () => {
		expect(typeof wrapper.instance().resetSearch).toBe('function');
		wrapper.instance().State = {
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: "free",
		}
		wrapper.instance().resetSearch();
	});
	test('handleSearchClick method', () => {
		expect(typeof wrapper.instance().handleSearchQuery).toBe('function');
		wrapper.instance().State = {
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: false,
			query: ""
		}
		const event = {
			target: {
				value: 'test query'
			}
		};
		wrapper.instance().handleSearchQuery(event);
		wrapper.instance().State = {
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: true,
			query: 'test query'
		}
	})
	test('handleLoadMore method', () => {
		wrapper.instance().State = {
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 10,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: true,
		}
			const props = { numberOfResults: 2 };
			wrapper.instance().handleLoadMore.apply({
			props,
			getOnlyPdfAvailableOrders: jest.fn(() => [{}, {}, {}])
			});
			wrapper.instance().State = {
				fetchedResults: [],
				isButtonClicked: true,
				resultsToShow: 3,
				isLoadMore: false,
				noSearchResults: true,
				isQueryLength: true,
			}
		expect(wrapper.instance().State.resultsToShow).toBe(3);
	})
	test('handleLoadMore method when length >= resultsToshow', () => {
		wrapper.instance().state = { resultsToShow: 5, query: 'test', fetchedResults: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] };
		wrapper.instance().props = { numberOfResults: 5 };
		wrapper.instance().handleLoadMore();
		expect(wrapper.instance().state.resultsToShow).toBe(10)
	})

	test('getonlyPdfAvailable Orders length > results to show', () => {
		wrapper.instance().setState({
			fetchedResults: [],
			isButtonClicked: true,
			resultsToShow: 2,
			isLoadMore: false,
			noSearchResults: true,
			isQueryLength: true,
		})
			const props = { numberOfResults: 2 };
			wrapper.instance().State = {
				fetchedResults: [],
				isButtonClicked: true,
				resultsToShow: 4,
				isLoadMore: false,
				noSearchResults: true,
				isQueryLength: true,
			}
			wrapper.instance().handleLoadMore.apply({
				props,
			getOnlyPdfAvailableOrders: jest.fn(() => [{}, {}, {}, {}, {}, {}, {}]) // Mock data for getOnlyPdfAvailableOrders
			});
	})
	test('pdf available with orders', () => {
		expect(wrapper.instance().getOnlyPdfAvailableOrders()).toBeDefined(); 
		const result = wrapper.instance().getOnlyPdfAvailableOrders();
		expect(result[0].orderType).toBeDefined();
		expect(result[1].orderType).toBeDefined();
		expect(result[2].orderType).toBeDefined();
	});
	
	test('Test for handleSearchClick function with length >3', () => {
		wrapper.instance().setState({
			query: 'DEI',
			numberOfResults: 10,
			noSearchResults: false,
			isQueryLength: true,
		})
		wrapper.setProps({
			allOrders:{
				orders:[{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEI0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					},
					{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEC0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					},
				]
			}
		})
		wrapper.instance().searchFiltered = jest.fn(() => ({ length: 10 }));
		wrapper.instance().handleSearchClick();
	});

	test('Test for handleSearchClick function with length >3, results not found', () => {
		wrapper.instance().setState({
			query: 'freestyle',
			numberOfResults: 10,
			noSearchResults: true,
			isQueryLength: true,
		})
		wrapper.setProps({
			allOrders:{
				orders:[{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEI0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					},
					{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEI0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
					},]
					
			}
		})
		wrapper.instance().handleSearchClick();
	});
	
	test('Test for handleSearchClick function with length < 3', () => {
		wrapper.instance().setState({
			query: 'Ca',
			numberOfResults: 10,
			noSearchResults: false,
			isQueryLength: true,
		})
		wrapper.instance().handleSearchClick();
	});
	test('Test for handleSearchClick function with length = 0', () => {
		wrapper.instance().setState({
			query: '',
			numberOfResults: 10,
			noSearchResults: false,
			isQueryLength: true,
		})
		wrapper.instance().handleSearchClick();
	});

	test('Test for handleSearchClick function with length < 3, searchFiltered.length > 0', () => {
		wrapper.instance().state = { resultsToShow: 5, query: 'test', isQueryLength: true };
		wrapper.setProps({
			allOrders:{
				orders:[{
						"index": 1,
						"orderType": "Cash Pay",
						"orderId": "DE15006789",
						"serviceData": null,
						"deliveryDetails": [
							{
								"index": 1,
								"deliveryStatus": "Created",
								"productSKU": "72114-01",
								"invoiceIdDetails": [
									{
									  "invoiceId": "DEI0000838122",
									  "invoiceStatus": "Payment Completed"
									}
								  ],
							}
						]
			},
			{
				"index": 1,
				"orderType": "Cash Pay",
				"orderId": "DE15006789",
				"serviceData": null,
				"deliveryDetails": [
					{
						"index": 1,
						"deliveryStatus": "Created",
						"productSKU": "72114-01",
						"invoiceIdDetails": [
							{
							  "invoiceId": "DEI0000838122",
							  "invoiceStatus": "Payment Completed"
							}
						  ],
					}
				]
			},
		]
		},
			numberOfResults: 5
		})
		wrapper.instance().handleLoadMore();
		wrapper.instance().searchFiltered = jest.fn(() => ({ length: 10 }));
		
		  wrapper.instance().handleSearchClick();
		  expect(wrapper.state('isQueryLength')).toBe(true);
	});

	test('Test for handlekeypress Enter', () => {
		const mockEvent = { key: 'Enter', preventDefault: jest.fn() };
		const handleSearchClickSpy = jest.spyOn(wrapper.instance(), 'handleSearchClick');
		wrapper.instance().handleKeyPress(mockEvent);
		expect(mockEvent.preventDefault).toHaveBeenCalled();
		expect(handleSearchClickSpy).toHaveBeenCalled();
	});
	test('Test for handlekeypress any other key', () => {
		const mockEvent = { key: 'Space', preventDefault: jest.fn() };
		const handleSearchClickSpy = jest.spyOn(wrapper.instance(), 'handleSearchClick');
		wrapper.instance().handleKeyPress(mockEvent);
		expect(mockEvent.preventDefault).not.toHaveBeenCalled();
		expect(handleSearchClickSpy).not.toHaveBeenCalled();
	});
	test('handleDocumentList function', () => {
		wrapper.setProps({
			isVisible: true,
			onVisible: false,
			allOrders: {
				loading: false,
				fetched: true
			}
		})
		wrapper.instance().setState({
			isLoaded: true,
			noSearchResults: false,
			isQueryLength: true 
		})
		wrapper.instance().handleDocumentList();
    });
	test('handleDocumentList function', () => {
		wrapper.setProps({
			isVisible: true,
			onVisible: false,
			allOrders: {
				loading: false,
				fetched: true
			}
		})
		wrapper.instance().setState({
			isLoaded: true,
			noSearchResults: false,
			isQueryLength: true 
		})
		wrapper.instance().handleDocumentList();
    });
});