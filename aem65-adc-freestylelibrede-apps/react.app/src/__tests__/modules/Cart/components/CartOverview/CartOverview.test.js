import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartOverview from '../../../../../modules/Cart/components/CartOverview/CartOverview';
import {Card} from '../../../../../modules/Generic/components/Card/Card';
import {mockReducerCartDetailsEmpty, mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import { act } from 'react-dom/test-utils';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<CartOverview store= {mockStore} {...props}/>);
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = mount(<Provider store={mockReducerCartDetailsEmpty}><CartOverview {...props} /></Provider>);
	return wrapper;
};

describe('CartOverview Component Props check, render when isReimbursement : false', () => {
	let wrapper,props;
	beforeEach(() => {
		props={
			overviewHeading: 'overviewHeading',
			editLink: 'editLink',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement : false,
			isRedirectToShoppingCart: true,
			cartDetails:{
				items:[{}],
				shipping_address :{
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.dive().type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper.dive()).toBeDefined();
	});
	test ('Card component rendering', () => {
		const wrapper = setup(props);
		expect(wrapper.containsMatchingElement(<Card />)).toBeDefined();
		expect(wrapper.dive().dive().props().title).toBe('overviewHeading');
		expect(wrapper.dive().dive().props().editLink).toBe('editLink');
	});
	test ('CardContent component rendering', () => {
		const wrapper = setup(props);
		expect(wrapper.dive().dive().props().children.type.name).toBe('CardContent');
	});
	test ('div in CardContent component rendering', () => {
		const wrapper = setup(props);
		expect(wrapper.dive().dive().props().children.props.children.type).toBe('div');
	});
	test('CartItemsDisplay,CartOverviewPricing component renders if isReimbursement is false',() => {
		const wrapper = setup(props);
		const entireElse = wrapper.dive().dive().props().children.props.children.props.children;
		expect(entireElse[0].type).toBe('div');
		expect(entireElse[1].type).toBe('div');
	});
	test('edit link div render',()=> {
		const wrapper = setup(props);
		expect(wrapper.dive().dive().props().children.props.children.props.children[1].type).toBe('div');
	});
});

describe('CartOverview Component isReimbursement : true', () => {
	let wrapper,props;
	beforeEach(() => {
		props={
			overviewHeading: 'overviewHeading',
			editLink: 'editLink',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement : true,
			isRedirectToShoppingCart: false,
			cartDetails:{
				items:[],
				shipping_address :{
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test ('Card component rendering', () => {
		const wrapper = setup(props);
		expect(wrapper.containsMatchingElement(<Card />)).toBeDefined();
		expect(wrapper.dive().dive().props().title).toBe('overviewHeading');
		expect(wrapper.dive().dive().props().editLink).toBe(null);
	});
	test ('CardContent component rendering', () => {
		const wrapper = setup(props);
		expect(wrapper.dive().dive().props().children.type.name).toBe('CardContent');
	});
	test ('div in CardContent component rendering', () => {
		const wrapper = setup(props);
		expect(wrapper.dive().dive().props().children.props.children.type).toBe('div');
	});

	test('CartOverviewRx component renders if isReimbursement is true',() => {
		const wrapper = setup(props);
		const entireIf = wrapper.dive().dive().props().children.props.children.props.children;
		expect(entireIf.type.name).toBe('CartOverviewRx');
	});

});

describe('CartOverview Component -method calls', () => {
	let wrapper,props;
	beforeEach(() => {
		props={
			overviewHeading: 'overviewHeading',
			editLink: 'editLink',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement : true,
			shippingOptions: ['option1', 'option2', 'flatrate'],
			isRedirectToShoppingCart: true,
			cartDetails:{
				items:[{}],
				shipping_address :{
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}

		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('CartOverview Component without cart details items', () => {
	let wrapperTwo,props;
	beforeEach(() => {
		props={
			overviewHeading: 'overviewHeading',
			editLink: 'editLink',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement : true,
			shippingOptions: ['option1', 'option2', 'flatrate'],
			isRedirectToShoppingCart: true,
			cartDetails:{
				id: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
				items:[],
				shipping_address :{
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}
		};

		wrapperTwo = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapperTwo).toBeDefined();
	});
});

describe('CartOverview Component without cart details items and shopping page path', () => {
	let wrapperTwo,props;
	beforeEach(() => {
		props={
			overviewHeading: 'overviewHeading',
			editLink: 'editLink',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement : true,
			shippingOptions: ['option1', 'option2', 'flatrate'],
			isRedirectToShoppingCart: true,
			cartDetails:{
				id: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
				items:[],
				shipping_address :{
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}
		};
		
		wrapperTwo = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapperTwo).toBeDefined();
	});
});


describe('CartOverview Component Props check, render when isReimbursement : false & when editLink is not defined', () => {
	let wrapper,props;
	beforeEach(() => {
		props={
			overviewHeading: 'overviewHeading',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement : false,
			isRedirectToShoppingCart: true,
			cartDetails:{
				items:[{}],
				shipping_address :{
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.dive().type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper.dive()).toBeDefined();
	});

	test ('Card component rendering without editLink', () => {
		const wrapper = setup(props);
		expect(wrapper.containsMatchingElement(<Card />)).toBeDefined();
		expect(wrapper.dive().dive().props().title).toBe('overviewHeading');
		expect(wrapper.dive().dive().props().editLink).toBe('#');
	});
});

describe('CartOverview Component redirected when editlink is defined', () => {
	let wrapperTwo, props;
	beforeEach(() => {
		props = {
			overviewHeading: 'overviewHeading',
			editLink: 'editLink',
			informationMessage: 'informationMessage',
			informationMessageHeading: 'informationMessageHeading',
			productHeading: 'productHeading',
			isReimbursement: true,
			shippingOptions: ['option1', 'option2', 'flatrate'],
			isRedirectToShoppingCart: true,
			cartDetails: {
				id: 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
				items: [],
				shipping_address: {
					id: 4,
					prefix: 'Mr',
					firstname: 'Firstname',
					lastname: 'Lastname',
					postcode: 'postcode',
					country_id: 'DE',
					country_name: 'Germany',
					region_code: 'BER',
					region: 'Berlin',
					city: 'Berlin',
					street: [
						'Street 1',
						'Street 2'
					],
					telephone: '10111111112'
				},
			}
		};

		wrapperTwo = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapperTwo).toBeDefined();
	});
	
	test('renderCheckRedirect with edit link', () => {
		wrapperTwo = setupTwo(props)
		const div = wrapperTwo.find('.adc-cartoverview')
		act(() =>{
			div.simulate('load')
		})
		expect(wrapperTwo.props().children.props.cartDetails.id).toBeTruthy()
		expect(wrapperTwo.props().children.props.cartDetails.items.length).toBe(0)
	})
});


