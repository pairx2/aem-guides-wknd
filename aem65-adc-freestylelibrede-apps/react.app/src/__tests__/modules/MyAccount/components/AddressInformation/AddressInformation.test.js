import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AddressInformation from '../../../../../modules/MyAccount/components/AddressInformation/AddressInformation';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('AddressInformation component Test Suite', () => {
	let props;
	let wrapper;

	const alternateAddressButtonActionMock = jest.fn();

	beforeEach(() => {
		props = {
			hasAlternateAddressButton: true,
			prefix: 'String',
			firstname: 'String',
			lastname: 'String',
			street: 'String',
			additionalAddress: 'String',
			postcode: 'String',
			city: 'String',
			maxAddressError:null,
			alternateAddressButtonAction: alternateAddressButtonActionMock,
		};
		wrapper = shallow(<AddressInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div with children',() => {
		expect(wrapper.type()).toBe('div');
	});
	test('p tags',() => {
		expect(wrapper.props().children[0].type).toBe('p');
		expect(wrapper.props().children[1].type).toBe('p');
		expect(wrapper.props().children[2].type).toBe('p');
		expect(wrapper.props().children[3].type).toBe('p');
	});
});

describe('AddressInformation component Test Suite', () => {
	let props;
	let wrapper;

	const alternateAddressButtonActionMock = jest.fn();

	beforeEach(() => {
		props = {
			hasAlternateAddressButton: false,
			prefix: 'String',
			firstname: 'String',
			lastname: 'String',
			street: null,
			additionalAddress: null,
			postcode: 'String',
			city: 'String',
			maxAddressError:null,
			alternateAddressButtonAction: alternateAddressButtonActionMock,
		};
		wrapper = shallow(<AddressInformation {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div with children',() => {
		expect(wrapper.type()).toBe('div');
	});
	test('p tags',() => {
		expect(wrapper.props().children[0].type).toBe('p');
		expect(wrapper.props().children[1].type).toBe('p');
		expect(wrapper.props().children[2].type).toBe('p');
		expect(wrapper.props().children[3].type).toBe('p');
	});


});
