import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import WizardHeader from '../../../../../modules/RXWizard/components/WizardInsuranceDisplay/WizardHeader';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('WizardHeader Component Test Suite', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			hasKvnr: true,
			sickfunds:[
				{
					a:'b'
				}
			]
		};
		wrapper = shallow(<WizardHeader {...props} />).dive();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('form renders section',() => {
		expect(wrapper.props().children().type.name).toBe('ReduxForm');
	});
});


describe('WizardHeader Component Test Suite', () => {
	let props;
	let wrapper;
	const handleSubmitMock = jest.fn();
	beforeEach(() => {
		props = {
			handleSubmit: handleSubmitMock,
			hasKvnr: true,
			sickfunds:[
				{
					a:'b'
				}
			]
		};
		wrapper = mount(<Provider store= {mockStore}><WizardHeader {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('form renders section',() => {
		expect(wrapper.props().children.type.displayName).toBe('ReduxForm');

	});
});