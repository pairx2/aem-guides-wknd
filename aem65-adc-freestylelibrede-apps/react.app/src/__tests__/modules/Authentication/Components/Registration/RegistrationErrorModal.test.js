import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import RegistrationErrorModal from '../../../../../modules/Authentication/components/Registration/RegistrationErrorModal';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('RegistrationErrorModal Component Test Suite', () => {
	let props, wrapper;
	const closeModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			modalProps: {errorMessage: 'errorMessage'},
			closeModalAction: closeModalActionMock
		};
		wrapper = mount(<Provider store={mockStoreConfirmationPage}><RegistrationErrorModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});





