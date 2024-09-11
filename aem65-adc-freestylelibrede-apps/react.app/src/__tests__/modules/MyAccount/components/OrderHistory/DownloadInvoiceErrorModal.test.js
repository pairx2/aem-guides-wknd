import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import DownloadInvoiceErrorModal from '../../../../../modules/MyAccount/components/OrderHistory/DownloadInvoiceErrorModal';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<DownloadInvoiceErrorModal store= {mockStore} {...props}/>);
	return wrapper;
};


describe('DownloadInvoiceErrorModal component Test Suite', () => {
	let props, wrapper;
	const closeModalActionMock = jest.fn();
	const closeInvoiceErrorModalMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModalAction: closeModalActionMock,
	        closeInvoiceErrorModal: closeInvoiceErrorModalMock
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('button component has action property', () => {
		const ButtonName = wrapper.dive().props().children[2].props.children.type.name;
		expect(ButtonName).toBe('Button');

		const actionProp = wrapper.dive().props().children[2].props.children.props.action;
		expect(typeof actionProp).toBe('function');

		actionProp();

		const closeModalActionMockCallCount = closeModalActionMock.mock.calls.length;
		expect(closeModalActionMockCallCount).toBeDefined();

		const closeInvoiceErrorModalMockCallCount = closeInvoiceErrorModalMock.mock.calls.length;
		expect(closeInvoiceErrorModalMockCallCount).toBeDefined();
	});

});

describe('DownloadInvoiceErrorModal component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			closeModalAction: () => {},
	        closeInvoiceErrorModal: () => {}
		};
		wrapper = mount(<Provider store= {mockStore}><DownloadInvoiceErrorModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

