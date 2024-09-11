import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../__mocks__/storeMock';

import RegistrationErrorModal from '../../../../modules/Modal/components/GeneralErrorModal';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<RegistrationErrorModal store={mockStoreConfirmationPage} {...props} />);
	return wrapper;
};

describe('RegistrationErrorModal component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			modalProps: {errorMessage: 'errorMessage', errorTitle: 'errorTitle'},
			closeModalAction: () => {}
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('modalProps is a prop and type of Object', () => {
		const modalPropsProp= wrapper.dive().props().modalProps;
		expect(modalPropsProp).toBeInstanceOf(Object);
	});

	test('closeModalAction is a prop and type of function', () => {
		const closeModalActionProp= wrapper.dive().props().closeModalAction;
		expect(typeof closeModalActionProp).toBe('function');
	});

});

describe('RegistrationErrorModal component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			modalProps: {errorMessage: 'errorMessage', errorTitle: 'errorTitle'},
			closeModalAction: () => {}
		};
		wrapper = mount(<Provider store={mockStoreConfirmationPage} ><RegistrationErrorModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
