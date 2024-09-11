import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
import UploadConfirmationMoadal from '../../../../../modules/MyAccount/components/Documents/UploadConfirmationMoadal';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('UploadConfirmationMoadal component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
		};
		wrapper = shallow(<Provider store= {mockStore}><UploadConfirmationMoadal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('UploadConfirmationMoadal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {}
		};
		wrapper = mount(<Provider store= {mockStore}><UploadConfirmationMoadal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});