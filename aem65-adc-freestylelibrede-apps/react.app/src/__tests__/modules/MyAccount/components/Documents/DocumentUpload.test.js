import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DocumentUpload from '../../../../../modules/MyAccount/components/Documents/DocumentUpload';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<DocumentUpload store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<DocumentUpload store= {mockStoreOrder} {...props}/>).dive().dive();
	return wrapper;
};

describe('DocumentUpload component Test Suite ', () => {
	let props, wrapper;
	const uploadCecFileRequestMock = jest.fn();
	const cancelUploadMock = jest.fn();
	const openModalActionMock = jest.fn();
	const getCustomerMock = jest.fn();

	beforeEach(() => {
		props = {
			heading: 'heading',
			uploadStyle: 'primary',
			transactionId: 'qwee332',
			uploadLabel: 'uploadLabel',
			uploadCecFileRequest: uploadCecFileRequestMock,
			readerInformation: 'readerInformation',
			healthHelpText : 'healthHelpText',
			cancelUpload: cancelUploadMock,
			submitStyle: 'submitStyle',
			openModalAction: openModalActionMock,
			getCustomer: getCustomerMock
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('prop type check', () => {
			expect(typeof wrapper.instance().props.heading).toBe('string');
			expect(typeof wrapper.instance().props.uploadStyle).toBe('string');
			expect(typeof wrapper.instance().props.transactionId).toBe('string');
			expect(typeof wrapper.instance().props.uploadLabel).toBe('string');
			expect(typeof wrapper.instance().props.uploadCecFileRequest).toBe('function');
			expect(typeof wrapper.instance().props.readerInformation).toBe('string');
			expect(typeof wrapper.instance().props.healthHelpText).toBe('string');
			expect(typeof wrapper.instance().props.cancelUpload).toBe('function');
			expect(typeof wrapper.instance().props.submitStyle).toBe('string');
			expect(typeof wrapper.instance().props.openModalAction).toBe('function');
			expect(typeof wrapper.instance().props.uploadPercentage).toBe('number');
			expect(wrapper.instance().props.data).toBeNull();
			expect(wrapper.instance().props.error).toBeNull();
		});
	});

	describe('state check', () => {

		test('state value and type check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);
			expect(typeof stateMock.uploadStatus).toBe('string');
			expect(stateMock.uploadStatus).toBe('uploaded');
			expect(stateMock.fileName).toBeNull();
			expect(stateMock.validationError).toBeNull();
			expect(typeof stateMock.isDragging).toBe('boolean');
			expect(stateMock.isDragging).toBe(false);
			expect(typeof stateMock.isShowUpload).toBe('boolean');
			expect(stateMock.isShowUpload).toBe(true);
			expect(typeof stateMock.isCheckTimeStamp).toBe('boolean');
			expect(stateMock.isCheckTimeStamp).toBe(true);
		});
	});

	describe('Functions check', () => {


		test('acceptFile call',() => {
			const fileContents = 'file contents';
		    const file = new Blob([fileContents], {type: 'text/plain'});
			const data = [
				file
			];
			wrapper.instance().acceptFile(data);
			// expect(wrapper.instance().state.uploadStatus).toBe('uploading');
			expect(wrapper.instance().state.uploadStatus).toBe('uploaded');
			wrapper.instance().setState({fileName:'fileName'});
			expect(wrapper.instance().state.validationError).toBeNull();
			const readFileSpy = jest.spyOn(FileReader.prototype, 'readAsBinaryString');
			const reader = new FileReader();
			expect(reader).toBeInstanceOf(FileReader);
			if (reader.onload) {
				reader.onload();
				expect(readFileSpy).toBeCalledWith(file);
				const uploadCecFileRequestMockCount = uploadCecFileRequestMock.mock.calls.length;
				expect(uploadCecFileRequestMockCount).not.toBe(0);
			}
		});

		test('componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			wrapper.instance().componentDidUpdate();
			const isCheckTimeStampMock = wrapper.instance().state.isCheckTimeStamp;
			if(isCheckTimeStampMock && wrapper.instance().props.isUploadAllowed) {
				expect(wrapper.instance().state.isCheckTimeStamp).toBe(true);
				expect(wrapper.instance().state.isShowUpload).toBe(true);
			}

			const uploadStatus = 'uploading';
			const uploadPercentage = 50;
			const error = {
				error: 'error'
			};

			if(wrapper.instance().state.uploadStatus == uploadStatus  && wrapper.instance().state.uploadPercentage == uploadPercentage && !error){
				expect(getCustomerMock.mock.calls.length).not.toB(0);
				wrapper.instance().props.openModalAction({
					contentID: 'uploadConfirmationMoadal'
				});
				expect(wrapper.instance().state.uploadStatus).toBe('initial');
				expect(wrapper.instance().state.validationError).toBeNull();
				expect(wrapper.instance().state.isShowUpload).toBe(false);
				expect(wrapper.instance().state.isfileSizeError).toBe(false);
			}
		});

		test('rejectFile call',() => {
			const file = new File(['abc'], 'abc.pdf');
			wrapper.instance().rejectFile([file]);
			expect(wrapper.instance().state.validationError).toBe('abc.pdf');
			expect(wrapper.instance().state.isfileSizeError).toBeFalsy();
		});

		test('cancelUpload call',() => {
			wrapper.instance().cancelUpload();
			expect(wrapper.instance().state.uploadStatus).toBe('initial');
		});

		test('uploadDocument call',() => {
			wrapper.instance().uploadDocument();
			expect(wrapper.instance().state.uploadStatus).toBe('initial');
			expect(wrapper.instance().state.validationError).toBeNull();
		});

		test('clearValidationError call',() => {
			const clearValidationErrorMock = wrapper.instance().clearValidationError;
			expect(typeof clearValidationErrorMock).toBe('function');

			wrapper.instance().clearValidationError();
			expect(wrapper.instance().state.validationError).toBe(null);
			expect(wrapper.instance().state.isfileSizeError).toBeFalsy();
		});

		test('other componentDidUpdate check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			wrapper.instance().componentDidUpdate();
			expect(wrapper.instance().state.uploadStatus).toBe('initial');
			expect(wrapper.instance().state.validationError).toBe(null);
			expect(wrapper.instance().state.isShowUpload).toBeTruthy();
			expect(wrapper.instance().state.isfileSizeError).toBeFalsy();
		});

		test('other rejectFile call',() => {
			const data = [{size: 5242881, name: 'abc'}, 'data2'];
			wrapper.instance().rejectFile(data);

			expect(wrapper.instance().state.validationError).toBe('abc');
			expect(wrapper.instance().state.isfileSizeError).toBeTruthy();
		});
		test('other rejectFile call',() => {
			const data = [];
			wrapper.instance().rejectFile(data);
		});

		test('didupdate call check with other condition', () => {
			wrapper.instance().setState({uploadStatus: 'uploading'});
			wrapper.instance().componentDidUpdate();

			const openModalActionMockCount= openModalActionMock.mock.calls.length;
			expect(openModalActionMockCount).toBeDefined();

			expect(wrapper.instance().state.uploadStatus).toBe('uploaded');
			expect(wrapper.instance().state.validationError).toBe(null);
			expect(wrapper.instance().state.isShowUpload).toBeFalsy();
			expect(wrapper.instance().state.isfileSizeError).toBeFalsy();

			const getCustomerMockCount= getCustomerMock.mock.calls.length;
			expect(getCustomerMockCount).toBeDefined();
		});
	});

	describe('state condition basis tag check', () => {
		test('when uploading status condition check', () => {
			if (wrapper.instance().state.uploadStatus === 'uploading') {
				expect(wrapper.props().children.props.children[0].props.children.type).toBe('div');
				expect(wrapper.props().children.props.children[2].props.children.type).toBe('div');
			}
		});
	});

	describe('dropzone check', () => {

		test('when UPLOAD_STATUS is initial,dropzone',() => {
			wrapper.instance().setState({uploadStatus:'uploaded'},() => {
				const fileContents = 'file contents';
				const file = new Blob([fileContents], {type: 'text/plain'});
				wrapper.find('Dropzone').hostNodes('onDropAccepted', {dataTransfer: {files: [file]}});
				wrapper.find('Dropzone').hostNodes('onDropRejected', {dataTransfer: {files: [file]}});
			});
		});
	});
});

describe('DocumentUpload component Test Suite with other condition', () => {
	let props, wrapper;
	const uploadCecFileRequestMock = jest.fn();
	const cancelUploadMock = jest.fn();
	const openModalActionMock = jest.fn();
	const getCustomerMock = jest.fn();

	beforeEach(() => {
		props = {
			heading: 'heading',
			uploadStyle: 'primary',
			transactionId: 'qwee332',
			uploadLabel: 'uploadLabel',
			uploadCecFileRequest: uploadCecFileRequestMock,
			readerInformation: 'readerInformation',
			healthHelpText : 'healthHelpText',
			cancelUpload: cancelUploadMock,
			submitStyle: 'submitStyle',
			openModalAction: openModalActionMock,
			getCustomer: getCustomerMock,
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate check', () => {
		wrapper.setState({isCheckTimeStamp: true});
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		wrapper.instance().componentDidUpdate();

		expect(wrapper.instance().state.uploadStatus).toBe('uploaded');
		expect(wrapper.instance().state.validationError).toBe(null);
		expect(wrapper.instance().state.isShowUpload).toBeFalsy();
		expect(wrapper.instance().state.isfileSizeError).toBeFalsy();

		const getCustomerMockCount= getCustomerMock.mock.calls.length;
		expect(getCustomerMockCount).toBeDefined();
	});

});
