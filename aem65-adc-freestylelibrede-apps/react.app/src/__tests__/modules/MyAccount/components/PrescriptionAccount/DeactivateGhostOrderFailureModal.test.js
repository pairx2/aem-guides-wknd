import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../../__mocks__/storeMock';

import DeactivateGhostOrderFailureModal from '../../../../../modules/MyAccount/components/PrescriptionAccount/DeactivateGhostOrderFailureModal';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('DeactivateGhostOrderFailureModal component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			modalProps: {paragraph_1: 'paragraph_1'},
			closeModalAction: () => {},
		};
		wrapper = mount(<Provider store={mockStoreConfirmationPage} ><DeactivateGhostOrderFailureModal {...props} /></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});
