import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ArvatoReturnWidget from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ArvatoReturnWidget';
jest.mock('../../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ArvatoReturnWidget Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			lang: 'de',
			country: 'DE',
			city: 'city',
			orderid: 'DE000987677',
			zipCode: '12345',
			email: 'test@email.com',
			scriptUrl: 'https://script.url'
		};
		wrapper = shallow(<ArvatoReturnWidget {...props} />);
	});
	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});