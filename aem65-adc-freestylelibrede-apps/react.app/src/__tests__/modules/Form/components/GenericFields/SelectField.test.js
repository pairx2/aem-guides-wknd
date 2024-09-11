import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SelectField from '../../../../../modules/Form/components/GenericFields/SelectField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('SelectField Component Test Suite - isUndetermined: true', () => {
	let props;
	let wrapper;
	const onChangeMock = jest.fn();
	const onFocusMock = jest.fn();

	beforeEach(() => {
		props = {
			isDisabled: false,
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			onChange: onChangeMock,
			onFocus: onFocusMock,
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
		};
		wrapper = shallow(<SelectField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});