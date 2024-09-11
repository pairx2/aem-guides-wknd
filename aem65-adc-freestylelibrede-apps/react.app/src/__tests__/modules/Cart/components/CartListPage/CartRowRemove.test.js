import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CartRowRemove from '../../../../../modules/Cart/components/CartListPage/CartRowRemove';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('CartRowRemove component Test Suite', () => {
	let props, wrapper;
	const productRemoveWarningHandlerMock = jest.fn();

	beforeEach(() => {

		props = {
			sku: 'sku',
	        productRemoveWarningHandler: productRemoveWarningHandlerMock
		};
		wrapper = shallow(<CartRowRemove {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('productRemoveWarningHandler function call check in onClick property of Icon', () => {
			const onClickProp= wrapper.props().children[1].props.onClick;
			expect(typeof onClickProp).toBe('function');
			onClickProp('sku');

			const productRemoveWarningHandlerMockCallCount= productRemoveWarningHandlerMock.mock.calls.length;
			expect(productRemoveWarningHandlerMockCallCount).toBeDefined();
			expect(productRemoveWarningHandlerMockCallCount).not.toBe(0);
		});

	});
});
