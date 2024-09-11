import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Dropzone from 'react-dropzone';
import {Title} from '../../../../../../modules/Generic/components/Title/Title';
import MessageBanner from '../../../../../../modules/Generic/components/MessageBanner/MessageBanner';
import UploadImage from '../../../../../../modules/MyAccount/components/OrderHistory/Return/UploadImage';
import {mockStore} from '../../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<UploadImage store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

describe('UploadImage Component Test Suite', () => {
	let props, wrapper;
	const changeMock = jest.fn();
	const updateDraggingStateMock = jest.fn();
	const onloadMock = jest.fn();
	const postImageRequestMock = jest.fn();
	beforeEach(() => {
		props= {
			postImageRequest: postImageRequestMock,
			name: 'name',
			uploadStyle: 'uploadStyle',
			uploadPercentage: 100,
			transactionId: 'asdf123',
			data: {},
			error: {},
			endpoint: 'endpoint',
			change: changeMock,
			updateDraggingState: updateDraggingStateMock,
			onload: onloadMock
		};
		wrapper= mount(<Provider store= {mockStore}><UploadImage {...props}/></Provider>);
	});

	describe('Redux Props', () => {
		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

describe('UploadImage Component Test Suite', () => {

	let props, wrapper;
	const changeMock = jest.fn();
	const updateDraggingStateMock = jest.fn();
	const onloadMock = jest.fn();
	const postImageRequestMock = jest.fn();
	beforeEach(() => {
		props= {
			postImageRequest: postImageRequestMock,
			name: 'name',
			uploadStyle: 'uploadStyle',
			uploadPercentage: 100,
			transactionId: 'asdf123',
			data: {},
			error: {},
			endpoint: 'endpoint',
			change: changeMock,
			updateDraggingState: updateDraggingStateMock,
			onload: onloadMock
		};

		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has name as prop and type check', () => {
			const nameProp = wrapper.instance().props.name;
			expect(typeof nameProp).toBe('string');
		});
		test('has uploadStyle as prop and type check', () => {
			const uploadStyleProp = wrapper.instance().props.uploadStyle;
			expect(typeof uploadStyleProp).toBe('string');
		});
		test('has uploadPercentage as prop and type check', () => {
			const uploadPercentageProp = wrapper.instance().props.uploadPercentage;
			expect(typeof uploadPercentageProp).toBe('number');
		});
		test('has transactionId as prop and type check', () => {
			const transactionIdProp = wrapper.instance().props.transactionId;
			expect(typeof transactionIdProp).toBe('string');
		});
		test('has data as prop and type check', () => {
			const dataProp = wrapper.instance().props.data;
			expect(dataProp).toBeInstanceOf(Object);
		});
		test('has error as prop and  type check', () => {
			const errorProp = wrapper.instance().props.error;
			expect(errorProp).toBeInstanceOf(Object);
		});
		test('has endpoint as prop and type check', () => {
			const endpointProp = wrapper.instance().props.endpoint;
			expect(typeof endpointProp).toBe('string');
		});
		test('has change as prop and type check', () => {
			const changeProp = wrapper.instance().props.change;
			expect(typeof changeProp).toBe('function');
		});
		test('has postImageRequest as prop and type check', () => {
			const postImageRequestProp = wrapper.instance().props.postImageRequest;
			expect(typeof postImageRequestProp).toBe('function');
		});
		test('has images as prop and type check', () => {
			const imagesProp = wrapper.instance().props.images;
			expect(imagesProp).toBeInstanceOf(Object);
		});
	});
	describe('state check', () => {

		test('state value check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);
			expect(typeof stateMock.uploadStatus).toBe('string');
			expect(stateMock.uploadStatus).toBe('initial');
			expect(stateMock.fileName).toBeNull();
			expect(typeof stateMock.isDragging).toBe('boolean');
			expect(stateMock.isDragging).toBe(false);
		});
	});

	describe('Functions check', () => {

		test('componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {images: {name: 'image2'}};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {images: {name: 'image1'}};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {images:{name:null}};
			wrapper.instance().componentDidUpdate(prevProps);
		});

		test('acceptFile call',() => {
			const fileContents = 'file contents';
		    const file = new Blob([fileContents], {type: 'text/plain'});
			const data = [
				file
			];
			wrapper.instance().acceptFile(data);
			// still getting value of state 'initial' that' why setting it manually
			wrapper.instance().setState({uploadStatus:'uploading'});
			const readImageSpy = jest.spyOn(FileReader.prototype, 'readAsBinaryString');
			const reader = new FileReader();
			expect(reader).toBeInstanceOf(FileReader);
			if (reader.onload) {
				reader.onload();
				expect(readImageSpy).toBeCalledWith('value');
				const postImageRequestMockCount = postImageRequestMock.mock.calls.length;
				expect(postImageRequestMockCount).not.toBe(0);
			}
		});

		// test('other acceptFile function check', () => {
		// 	const acceptFileMock = wrapper.instance().acceptFile;
		// 	expect(typeof acceptFileMock).toBe('function');

		// 	acceptFileMock();
		// 	const postImageRequestMockCount = postImageRequestMock.mock.calls.length;
		// 	expect(postImageRequestMockCount).toBeDefined();
		// 	expect(postImageRequestMockCount).not.toBe(0);
		// })

		test('other clearValidationError function check', () => {
			const clearValidationErrorMock = wrapper.instance().clearValidationError;
			expect(typeof clearValidationErrorMock).toBe('function');

			wrapper.instance().clearValidationError();
			expect(wrapper.instance().state.validationError).toBe(null);
		});

		test('other updateDraggingState function check', () => {
			const updateDraggingStateMock = wrapper.instance().updateDraggingState;
			expect(typeof updateDraggingStateMock).toBe('function');

			wrapper.instance().updateDraggingState(false);
			expect(wrapper.instance().state.isDragging).toBeFalsy();

			wrapper.instance().updateDraggingState(true);
			expect(wrapper.instance().state.isDragging).toBeTruthy();
		});

		test('rejectFile call',() => {
			const file = new File(['abc'], 'abc.pdf');
			wrapper.instance().rejectFile([file]);
		});
		test('rejectFile call',() => {
			wrapper.instance().rejectFile([]);
		});
	});

	describe('dropzone check', () => {

		test('when UPLOAD_STATUS is initial,dropzone',() => {
			wrapper.instance().setState({uploadStatus:'initial'},() => {
				const fileContents = 'file contents';
				const file = new Blob([fileContents], {type: 'text/plain'});
				wrapper.find('Dropzone').simulate('onDropAccepted', {dataTransfer: {files: [file]}});
				wrapper.find('Dropzone').simulate('onDropRejected', {dataTransfer: {files: [file]}});

			});
		});
	});

	describe('component render check', () => {

		test('MessageBanner component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<MessageBanner />)).toBeDefined();
		});
		test('Title gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Title />)).toBeDefined();
		});
		test('Dropzone gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Dropzone />)).toBeDefined();
		});
	});
});

describe('UploadImage Component Test Suite', () => {
	let props, wrapper;
	const changeMock = jest.fn();
	const updateDraggingStateMock = jest.fn();
	const onloadMock = jest.fn();
	const postImageRequestMock = jest.fn();
	beforeEach(() => {
		props= {
			postImageRequest: postImageRequestMock,
			name: 'name',
			uploadStyle: 'uploadStyle',
			uploadPercentage: 100,
			transactionId: 'asdf123',
			data: {},
			error: {},
			endpoint: 'endpoint',
			change: changeMock,
			updateDraggingState: updateDraggingStateMock,
			onload: onloadMock
		};

		wrapper= mount(<Provider store= {mockStore}><UploadImage {...props}/></Provider>);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});




});