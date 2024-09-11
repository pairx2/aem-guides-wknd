import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import UploadPrescription from '../../../../../modules/RXWizard/components/WizardInsuranceDisplay/UploadPrescription';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<UploadPrescription store={mockStore} {...props} />).dive();
	return wrapper;
};
describe('WizardHeader Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			uploadStyle:'uploadStyle'
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('form renders section,p',() => {
		expect(wrapper.props().children[0].type).toBe('section');
		expect(wrapper.props().children[0].type).toBe('section');
	});
	test('acceptFile call',() => {

		const fileContents = 'file contents';
		const file = new Blob([fileContents], {type: 'text/plain'});
		const data = [
			file
		];
		wrapper.instance().acceptFile(data);
		expect(wrapper.instance().state.fileName).toBe(data.name);
		expect(wrapper.instance().state.uploadStatus).toBe('uploading');
		expect(wrapper.instance().state.validationError).toBe(null);
	});
	test('rejectFile call',() => {
		wrapper.instance().rejectFile([{name:'filename'}]);
	});
	test('rejectFile call',() => {
		wrapper.instance().rejectFile([]);
		expect(wrapper.instance().state.validationError).toBe('General error');
	});
	test('when UPLOAD_STATUS is uploading',() => {
		//set uploadStatus to uploading
		wrapper.instance().setState({uploadStatus:'uploading'});
	});
	test('when UPLOAD_STATUS is initial,dropzone',() => {
		//set uploadStatus to initial
		wrapper.instance().setState({uploadStatus:'initial'},() => {
			const fileContents = 'file contents';
			const file = new Blob([fileContents], {type: 'text/plain'});
			wrapper.find('Dropzone').simulate('drop', {dataTransfer: {files: [file]}});

		});
	});
});
