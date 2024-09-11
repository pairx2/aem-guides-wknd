import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../__mocks__/storeMock';

import ConfirmationPageLoadingModal from '../../../../modules/Confirmation/components/ConfirmationPageLoadingModal';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('ConfirmationPageLoadingModal component Test Suite', () => {
	const props= {};
	const wrapper = mount(<Provider store={mockStoreConfirmationPage} ><ConfirmationPageLoadingModal {...props} /></Provider>);

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});


