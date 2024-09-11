import React from 'react';
import MiniCart from '../../../../../modules/Cart/components/MiniCart/MiniCart';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import { isCheckoutPageType } from '../../../../../utils/pageTypeUtils';
jest.mock('../../../../../utils/pageTypeUtils.js');
jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<MiniCart store= {mockStore} {...props}/>).dive().dive().dive();
	return wrapper;
};

const setup1 = (props) => {
	const wrapper = shallow(<MiniCart store= {mockStoreOrder} {...props}/>).dive().dive().dive();
	return wrapper;
};

describe('MiniCart Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		props={
			icon: 'icon',
			label: 'label',
			cartDetails: {'items': []},
			breakpoints: {'mobile': 'mobile'},
			currentBreakpoint: 'n/a',
			isLoggedIn : false
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
describe('MiniCart Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		let bodyAttr = {'serviceMap':{'graphql.backend.endpoint' : 'https://api.nonprod.services.abbott/api/proxy/graphql-proxy-api-qa'}};
		document.body.setAttribute("data-app-url",JSON.stringify(bodyAttr));
		document.body.setAttribute("data-react-component","modal");
		document.body.setAttribute("id","dataProcessingConsentModal");
		document.body.setAttribute("jsonString",bodyAttr);
		props={
			icon: 'icon',
			label: 'label',
			cartDetails: {'items': []},
			breakpoints: {'mobile': 'mobile'},
			currentBreakpoint: 'n/a',
		};
		wrapper = setup(props);
	});

	describe('redux props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
		test('componentDidMount function call', () => {
			const componentDidMountMock = wrapper.dive().instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
			wrapper.dive().instance().componentDidMount();
			expect(wrapper.dive().instance().state.isLoaded).toBe(false);
		});
	});
});
describe('MiniCart Component Test Suite', () => {

	let props, wrapper;

	beforeEach(() => {
		let bodyAttr = {'pageType':'account'};
		document.body.setAttribute("data-app-url",JSON.stringify(bodyAttr));
		document.body.setAttribute("data-react-component","modal");
		document.body.setAttribute("id","dataProcessingConsentModal");
		document.body.setAttribute("jsonString",bodyAttr);		
		isCheckoutPageType.mockImplementation(() => true);
		props={
			icon: 'icon',
			label: 'label',
			cartDetails: {'items': []},
			breakpoints: {'mobile': 'mobile'},
			currentBreakpoint: 'n/a',
			isLoggedIn : false
		};
		wrapper = setup(props);
	});

	describe('redux props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
		test('componentDidMount function call', () => {
			console.log(wrapper.dive().instance().props)
			const componentDidMountMock = wrapper.dive().instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
			wrapper.dive().instance().componentDidMount();
			expect(wrapper.dive().instance().state.isLoaded).toBe(true);
		});
	});
});

describe('MiniCart Component Test Suite', () => {

	let props, wrapper;
	jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
	beforeEach(() => {
		let bodyAttr = {'pageType':'account'};
		document.body.setAttribute("data-app-url",JSON.stringify(bodyAttr));
		document.body.setAttribute("data-react-component","modal");
		document.body.setAttribute("id","dataProcessingConsentModal");
		document.body.setAttribute("jsonString",JSON.stringify(bodyAttr));		
		isCheckoutPageType.mockImplementation(() => true);
		props={
			icon: 'icon',
			label: 'label',
			cartDetails: {'items': []},
			breakpoints: {'mobile': 'mobile'},
			currentBreakpoint: 'n/a',
			isLoggedIn : false
		};
		wrapper = setup1(props);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('componentDidMount function call', () => {
		const componentDidMountMock = wrapper.dive().instance().componentDidMount;
		expect(typeof componentDidMountMock).toBe('function');
		wrapper.dive().instance().componentDidMount();
		
		expect(setTimeout).toHaveBeenCalledTimes(3);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
		expect(wrapper.dive().instance().state.isLoaded).toBe(true);
	});
	it('settimeout function call', () => {
		props={
			icon: 'icon',
			label: 'label',
			cartDetails: {'items': []},
			breakpoints: {'mobile': 'mobile'},
			currentBreakpoint: 'n/a',
			isLoggedIn : false
		};
        const wrapper1 = mount(<Provider store={mockStore}><MiniCart {...props}/></Provider>);
        wrapper1.update()
		
		jest.runAllTimers();
    });
	
});