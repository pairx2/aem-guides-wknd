import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Deeplink from '../../../../../modules/MyAccount/components/Deeplink/Deeplink';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Deeplink Component Test Suite', () => {
	let wrapper;
	beforeEach(() => {

		wrapper = shallow(<Deeplink store={mockStore}/>).dive().dive();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('componentDidUpdate', () => {
		const prevProps = {
			ghostOrders:null
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('componentDidUpdate', () => {
		const prevProps = {
			ghostOrders:null,
			error:'error'
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});

});


