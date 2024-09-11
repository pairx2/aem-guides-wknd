import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SelectFieldWithSearch from '../../../../../modules/Form/components/GenericFields/SelectFieldWithSearch';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('SelectFieldWithSearch Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			showBorder:true,
			searchIcon: 'string',
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			isDisabled: false
		};
		wrapper = shallow(<Provider store={mockStore} ><SelectFieldWithSearch {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});