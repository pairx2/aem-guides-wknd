import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DeactivatePlusServiceModal from '../../../../../modules/MyAccount/components/PlusService/DeactivatePlusServiceModal';
import {mockStore} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props = {}) => {
	const wrapper = shallow(<DeactivatePlusServiceModal store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('DeactivatePlusServiceModal component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			closeModalAction: jest.fn(),
			deactivatePlusServiceRequest: jest.fn(),
			orderId: 'qewrr233'
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('children type check', () =>{
			expect(wrapper.props().children[1].props.children[0].type).toBe('p');
			expect(wrapper.props().children[1].props.children[1].type).toBe('ul');
			expect(wrapper.props().children[1].props.children[1].props.children[0].type).toBe('li');
			expect(wrapper.props().children[1].props.children[1].props.children[1].type).toBe('li');
			expect(wrapper.props().children[1].props.children[1].props.children[2].type).toBe('li');
		});
	});
});