import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {required, otpText} from '../../../../../modules/Form/utils/validationRules';
import OtpTextField from '../../../../../modules/Form/components/FormFields/OtpTextField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('OtpTextField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			hasValidateIcon: true,
			validationRules: [required, otpText],
			name: 'String',
			label: 'String',
			placeholder: 'String',
			defaultMaxLength: 'String'
		};
		wrapper = shallow(<OtpTextField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});


