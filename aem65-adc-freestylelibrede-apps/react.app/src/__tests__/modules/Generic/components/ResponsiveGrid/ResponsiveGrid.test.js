import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import ResponsiveGrid from '../../../../../modules/Generic/components/ResponsiveGrid/ResponsiveGrid';
import {getComponentByTitle} from '../../../../../modules/Modal/components/modalComponentMapping';
jest.mock('../../../../../utils/endpointUrl');
jest.mock('../../../../../utils/siteData');
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<ResponsiveGrid store={mockStore} {...props} />);
	return wrapper;
};

describe('ResponsiveGrid Test Case Suite when isEditor is false', () => {

	let props, wrapper;
	const getEditContextRequestMock = jest.fn();
	const getComponentHTMLRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			getEditContextRequest: getEditContextRequestMock,
			getComponentHTMLRequest: getComponentHTMLRequestMock,
			path: 'path',
			responsiveGridName: 'responsiveGridName'
		};
		wrapper= setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('path is a prop of type string', () => {
			const pathProp = wrapper.dive().dive().instance().props.path;
			expect(typeof pathProp).toBe('string');
		});

		test('responsiveGridName is a prop of type string', () => {
			const responsiveGridNameProp = wrapper.dive().dive().instance().props.responsiveGridName;
			expect(typeof responsiveGridNameProp).toBe('string');
		});

		test('getEditContextRequest is a prop of type function', () => {
			const getEditContextRequestProp = wrapper.dive().dive().instance().props.getEditContextRequest;
			expect(typeof getEditContextRequestProp).toBe('function');
		});

		test('getComponentHTMLRequest is a prop of type function', () => {
			const getComponentHTMLRequestProp = wrapper.dive().dive().instance().props.getComponentHTMLRequest;
			expect(typeof getComponentHTMLRequestProp).toBe('function');
		});

		test('editContext is a prop of type object', () => {
			const editContextProp = wrapper.dive().dive().instance().props.editContext;
			expect(editContextProp).toBeInstanceOf(Object);
		});

		test('html is a prop of type object', () => {
			const htmlProp = wrapper.dive().dive().instance().props.html;
			expect(htmlProp).toBeInstanceOf(Object);
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.dive().dive().instance().state;
			expect(stateCheck).toBeInstanceOf(Object);
			expect(stateCheck.isEditor).toBeFalsy();
		});

	});

	describe('Function check', () => {

		test('fetchEditContext function call', () => {
			const fetchEditContextMock = wrapper.dive().dive().instance().fetchEditContext;
			expect(typeof fetchEditContextMock).toBe('function');

			const isEditorProp = wrapper.dive().dive().instance().state.isEditor;
			fetchEditContextMock(isEditorProp);

			expect(getEditContextRequestMock).not.toBeCalled();

			const getEditContextRequestMockCallCount = getEditContextRequestMock.mock.calls.count;
			expect(getEditContextRequestMockCallCount).toBeUndefined();
		});
		test('fetchEditContext function call', () => {
			const fetchEditContextMock = wrapper.dive().dive().instance().fetchEditContext;
			expect(typeof fetchEditContextMock).toBe('function');
			fetchEditContextMock(true);
		});

		test('fetchComponents function call', () => {
			const fetchComponentsMock = wrapper.dive().dive().instance().fetchComponents;
			expect(typeof fetchComponentsMock).toBe('function');

			const isEditorProp = wrapper.dive().dive().instance().state.isEditor;
			fetchComponentsMock(isEditorProp);

			expect(getComponentHTMLRequestMock).not.toBeCalled();

			const getComponentHTMLRequestMockCallCount = getComponentHTMLRequestMock.mock.calls.count;
			expect(getComponentHTMLRequestMockCallCount).toBeUndefined();
		});
		test('fetchComponents function call', () => {
			const fetchComponentsMock = wrapper.dive().dive().instance().fetchComponents;
			expect(typeof fetchComponentsMock).toBe('function');
			fetchComponentsMock(true);
		});

		test('renderReact function call', () => {
			const renderReactMock = wrapper.dive().dive().instance().renderReact;
			expect(typeof renderReactMock).toBe('function');

			expect(renderReactMock()).toBeUndefined();
			const result = getComponentByTitle('addressVerification');
			expect(result.WrappedComponent.name).toBe('AddressVerification');
		});

		test('componentDidMount function call', () => {
			const componentDidMountMock = wrapper.dive().dive().instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			expect(wrapper.dive().dive().instance().componentDidMount()).toBeUndefined();
		});
	});

	describe('Components rendering', () => {

		test('ExistingResponsiveGrid check', () => {
			const compCheck = wrapper.dive().dive().props().children;

			expect(compCheck.type.name).toBe('ExistingResponsiveGrid');
			expect(compCheck.props).toBeDefined();

			expect(typeof compCheck.props.renderReact).toBe('function');
			expect(typeof compCheck.props.html).toBe('string');
			expect(compCheck.props.html).toBe('html1');
		});

	});
});

describe('ResponsiveGrid Test Case Suite', () => {

	let props, wrapper;
	const getEditContextRequestMock = jest.fn();
	const getComponentHTMLRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			getEditContextRequest: getEditContextRequestMock,
			getComponentHTMLRequest: getComponentHTMLRequestMock,
			path: 'path',
			responsiveGridName: 'responsiveGridName'
		};
		wrapper= mount(<Provider store={mockStore}><ResponsiveGrid {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

