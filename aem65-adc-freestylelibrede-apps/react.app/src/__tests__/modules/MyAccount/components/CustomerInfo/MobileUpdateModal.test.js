import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import MobileUpdateModal from '../../../../../modules/MyAccount/components/CustomerInfo/MobileUpdateModal';
import {Provider} from 'react-redux';
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('MobileUpdateModal component Test Suite ', () => {
	let props, wrapper,instance;
	const closeModalMock = jest.fn();
	const openModalActionMock = jest.fn();
	const updateCustomerMock = jest.fn();
	const isModalOpenMock = jest.fn();
	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			openModalAction: openModalActionMock,
			errorCode: 1,
			updateCustomer: updateCustomerMock,
			isModalOpen: isModalOpenMock

		};
		wrapper = shallow(<MobileUpdateModal store={mockStore} {...props} />);
		instance = wrapper.dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().instance();
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('submit call',() => {
			const values = {
				mobile_phone:[
					true,
					'1713364779',
					{name: 'Germany (Deutschland)', iso2: 'de', dialCode: '49', priority: 0, areaCodes: null},
					null
				]
			};
			expect(instance.submit(values)).not.toEqual(null);
		});
		test('submit call with non german number',() => {
			const values = {
				mobile_phone:[
					true,
					'1713364779',
					{name: 'Germany (Deutschland)', iso2: 'de', dialCode: '33', priority: 0, areaCodes: null},
					null
				]
			};
			expect(instance.submit(values)).not.toEqual(null);
		});
		test('submit call with empty number',() => {
			const values = {
				mobile_phone:[
					true,
					'',
					{name: 'Germany (Deutschland)', iso2: 'de', dialCode: '0', priority: 0, areaCodes: null},
					null
				]
			};
			expect(instance.submit(values)).not.toEqual(null);
		});

		test('componentDidMount check', () => {
			const componentDidMountMock = instance.componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
			instance.componentDidMount();
		})

		test('componentWillUnmount check', () => {
			const componentWillUnmountMock = instance.componentWillUnmount;
			expect(typeof componentWillUnmountMock).toBe('function');
			instance.componentWillUnmount();
		})

		test('modalCloseHandler check', ()=> {
			expect(instance.modalCloseHandler()).not.toEqual(null);
		})

		test('handleClickOutside check', ()=> {
			expect(instance.handleClickOutside()).not.toEqual(null);
		})
	});

});
describe('MobileUpdateModal component Test Suite ', () => {
	let props, wrapper;
	const closeModalMock = jest.fn();
	const openModalActionMock = jest.fn();
	const updateCustomerMock = jest.fn();
	const isModalOpenMock = jest.fn();
	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			openModalAction: openModalActionMock,
			errorCode: 1,
			updateCustomer: updateCustomerMock,
			isModalOpen: isModalOpenMock
		};

		wrapper = shallow(<MobileUpdateModal store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();

	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});

	test('componentDidMount check', () => {
		const componentDidMountMock = wrapper.instance().componentDidMount;
		expect(typeof componentDidMountMock).toBe('function');
		wrapper.instance().componentDidMount();
	})

	test('componentWillUnmount check', () => {
		const componentWillUnmountMock = wrapper.instance().componentWillUnmount;
		expect(typeof componentWillUnmountMock).toBe('function');
		wrapper.instance().componentWillUnmount();
	})
});
