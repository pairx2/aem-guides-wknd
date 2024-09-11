import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SalesforceForm from '../../../../../modules/Contact/components/SalesforceForm/SalesforceForm';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('SalesforceForm Component Test Suite - canSubmit: true', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			canSubmit: true,
			salesforceURL: 'salesforceURLString',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = shallow(<SalesforceForm {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('form with action, method gets rendered',() => {
		expect(wrapper.type()).toBe('form');
		expect(wrapper.props().action).toBeDefined();
		expect(wrapper.props().method).toBeDefined();

	});
});
describe('SalesforceForm Component Test Suite - canSubmit: false', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			canSubmit: false,
			salesforceURL: 'salesforceURLString',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = shallow(<SalesforceForm {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('form with onsubmit gets rendered',() => {
		expect(wrapper.type()).toBe('form');
	});
});

