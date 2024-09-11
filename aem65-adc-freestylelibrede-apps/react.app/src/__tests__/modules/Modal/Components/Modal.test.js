import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

import Modal from '../../../../modules/Modal/components/modal';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<Modal store={mockStore} {...props} />).dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props = {}) => {
	const wrapper = shallow(<Modal store={mockStoreOrder} {...props} />).dive().dive().dive().dive();
	return wrapper;
};

describe('Modal component Test Suite when currentBreakpoint is desktop', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			modalSize: {desktop: 'large', tablet: 'medium', mobile: 'small'},
			modalContentID:'addressVerification',
			modalHeading:'modalHeading',
			closeModalAction: () => { },
			modalProps: {'modalProps': 'modalProps1'},
			currentBreakpoint: 'mobile',
			modalClassName: 'className',
			showModalCloseIcon: true
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has modalContentID as prop and is of type string', () => {
			const modalContentIDProp = wrapper.instance().props.modalContentID;
			expect(typeof modalContentIDProp).toBe('string');
		});

		test('has currentBreakpoint as prop and is of type string', () => {
			const currentBreakpointProp = wrapper.instance().props.currentBreakpoint;
			expect(typeof currentBreakpointProp).toBe('string');
		});

		test('has modalHeading as prop and is of type string', () => {
			const modalHeadingProp = wrapper.instance().props.modalHeading;
			expect(typeof modalHeadingProp).toBe('string');
		});

		test('has isModalOpen as prop and is of type boolean', () => {
			const isModalOpenProp = wrapper.instance().props.isModalOpen;
			expect(typeof isModalOpenProp).toBe('boolean');
		});

		test('has modalProps as prop and is of type object', () => {
			const modalPropsProp = wrapper.instance().props.modalProps;
			expect(modalPropsProp).toBeInstanceOf(Object);
		});

		test('has modalSize as prop and is of type object', () => {
			const modalSizeProp = wrapper.instance().props.modalSize;
			expect(modalSizeProp).toBeInstanceOf(Object);
		});

		test('has closeModalAction as prop and is of type function', () => {
			const closeModalActionProp = wrapper.instance().props.closeModalAction;
			expect(typeof closeModalActionProp).toBe('function');
		});

		test('has modalClassName as prop and is of type string', () => {
			const modalClassNameProp = wrapper.instance().props.modalClassName;
			expect(typeof modalClassNameProp).toBe('string');
		});

		test('has showModalCloseIcon as prop and is of type boolean', () => {
			const showModalCloseIconProp = wrapper.instance().props.showModalCloseIcon;
			expect(typeof showModalCloseIconProp).toBe('boolean');
		});

	});

	describe('Function calls check', () => {

		test('getSize function call when currentBreakpoint is desktop', () => {
			const getSizeMock = wrapper.instance().getSize;
			expect(typeof getSizeMock).toBe('function');

			expect(getSizeMock()).toBe(wrapper.instance().props.modalSize.mobile);
		});
		test('modalClose function call when currentBreakpoint is desktop', () => {
			const e = {
				key : 'Escape'
			};
			const modalCloseMock = wrapper.instance().modalClose;
			expect(typeof modalCloseMock).toBe('function');

			expect(modalCloseMock(e)).toBeUndefined()
		});
		test('modalClose function call when currentBreakpoint is desktop', () => {
			const e = {
				key : 'Ctrl'
			};
			const modalCloseMock = wrapper.instance().modalClose;
			expect(typeof modalCloseMock).toBe('function');

			expect(modalCloseMock(e)).toBeUndefined()
		});

		test('propsDidChange function call', () => {
			const propsDidChangeMock = wrapper.instance().propsDidChange;
			expect(typeof propsDidChangeMock).toBe('function');
			const prevProps = {'isModalOpen': false};
			wrapper.instance().propsDidChange(prevProps);
		});

		test('componentDidUpdate function call', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {'isModalOpen': false};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentDidUpdate function call', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {...wrapper.instance().props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentWillUnmount function call', () => {
			const componentWillUnmountMock = wrapper.instance().componentWillUnmount;
			expect(typeof componentWillUnmountMock).toBe('function');
			wrapper.instance().componentWillUnmount();
		});
	});

});

describe('Modal component Test Suite with mount', () => {
	let props, wrapper;


	beforeEach(() => {
		props = {
			modalSize: {desktop: 'large', tablet: 'medium', mobile: 'small'},
			isModalOpen: true,
			modalContentID:'addressVerification',
			modalHeading:'modalHeading',
			closeModalAction: () => { },
			modalProps: {'modalProps': 'modalProps1'},
			currentBreakpoint: 'desktop',
			modalClassName: 'className',
			showModalCloseIcon: false
		};
		wrapper = mount(<Provider store={mockStore} ><Modal {...props} /></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('Modal component Test Suite when currentBreakpoint is tablet', () => {
	let props, wrapper;


	beforeEach(() => {
		props = {
			modalSize: {desktop: 'large', tablet: 'medium', mobile: 'small'},
			isModalOpen: true,
			modalContentID:'addressVerification',
			modalHeading:'modalHeading',
			closeModalAction: () => { },
			modalProps: {'modalProps': 'modalProps1'},
			currentBreakpoint: 'tablet',
			modalClassName: 'className',
			showModalCloseIcon:true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getSize function call when currentBreakpoint is desktop', () => {
		const getSizeMock = wrapper.instance().getSize;
		expect(typeof getSizeMock).toBe('function');

		expect(getSizeMock()).toBe(wrapper.instance().props.modalSize.tablet);
	});
});

describe('Modal component Test Suite when currentBreakpoint is desktop', () => {
	let props, wrapper;


	beforeEach(() => {
		props = {
			modalSize: {desktop: 'large', tablet: 'medium', mobile: 'small'},
			isModalOpen: true,
			modalContentID:'addressVerification',
			modalHeading:'modalHeading',
			closeModalAction: () => { },
			modalProps: {'modalProps': 'modalProps1'},
			currentBreakpoint: 'desktop',
			modalClassName: 'className',
			showModalCloseIconProp:true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getSize function call when currentBreakpoint is desktop', () => {
		const getSizeMock = wrapper.instance().getSize;
		expect(typeof getSizeMock).toBe('function');

		expect(getSizeMock()).toBe(wrapper.instance().props.modalSize.desktop);
	});

});

describe('Modal component Test Suite when currentBreakpoint is desktop', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			modalContentID:'addressVerification',
			modalHeading:'modalHeading',
			closeModalAction: () => { },
			modalProps: {'modalProps': 'modalProps1'},
			currentBreakpoint: 'mobile',
			modalClassName: 'className',
			showModalCloseIcon:false
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate function call', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		const prevProps = {'isModalOpen': true};
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('componentDidUpdate function call', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		const prevProps = {...wrapper.instance().props};
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('modalClose function call when currentBreakpoint is desktop', () => {
		const e = {
			key : 'Escape'
		};
		const modalCloseMock = wrapper.instance().modalClose;
		expect(typeof modalCloseMock).toBe('function');

		expect(modalCloseMock(e)).toBeUndefined()
	});
});