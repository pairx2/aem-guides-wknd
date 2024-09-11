import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStoreConfirmationPage} from '../../../../__mocks__/storeMock';
import ConfirmationPageErrorModal from '../../../../modules/Confirmation/components/ConfirmationPageErrorModal';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<ConfirmationPageErrorModal store={mockStoreConfirmationPage} {...props} />);
	return wrapper;
};

describe('ConfirmationPageErrorModal component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			modalProps: {
				readerInformation: 'readerInformation',
				callCTAStyle: 'primary',
				buttonAction: '/content/adc/freestylelibrede/test',
			}
		};

		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('ConfirmationPageErrorModal component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			modalProps: {
				readerInformation: 'readerInformation',
				callCTAStyle: 'primary',
				buttonAction: '/content/adc/freestylelibrede/test',
			}
		};

		wrapper = mount(<Provider store={mockStoreConfirmationPage} ><ConfirmationPageErrorModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

