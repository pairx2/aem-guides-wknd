import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ParentContactDetails from '../../../../../modules/MyAccount/components/ContactDetails/ParentContactDetails';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<Provider store={mockStore} ><ParentContactDetails {...props} /></Provider>).dive();
	return wrapper;
};

describe('ParentContactDetails Component Test Suite -condition={errorCode} -mount', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	beforeEach(() => {
		props = {
			isMobileVerified : true,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: true,
			pristine:true,
			permissions : [{'communication_channel':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'},{'communication_channel':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'}],
			errorCode: 1
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('ParentContactDetails Component Test Suite -condition={errorCode}', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	beforeEach(() => {
		props = {
			isMobileVerified : true,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: true,
			pristine:true,
			permissions : [{'communication_channels':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'},{'communication_channels':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'}],
			errorCode: 1
		};
		wrapper = mount(<Provider store={mockStore} ><ParentContactDetails {...props} /></Provider>);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('ParentContactDetails Component Test Suite -condition={permissions.length === 0 && !isEditing}', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	beforeEach(() => {
		props = {
			isMobileVerified : true,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: false,
			pristine:true,
			permissions : [],
			errorCode: 0
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('ParentContactDetails Component Test Suite -condition={permissions.length === 0 && !isEditing} though mounting', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	beforeEach(() => {
		props = {
			isMobileVerified : true,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: false,
			pristine:true,
			permissions : [],
			errorCode: 1
		};
		wrapper = mount(<Provider store={mockStore} ><ParentContactDetails {...props} /></Provider>);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('ParentContactDetails Component Test Suite -condition={!isEditing}', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	beforeEach(() => {
		props = {
			isMobileVerified : true,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: false,
			pristine:true,
			permissions : [{'communication_channel':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'},{'communication_channel':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'}],
			errorCode: 0
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('ParentContactDetails Component Test Suite -else', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	beforeEach(() => {
		props = {
			isMobileVerified : true,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: true,
			pristine:true,
			permissions : [{'communication_channel':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'},{'communication_channel':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'}],
			errorCode: 0
		};
		wrapper = setup(props);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('ParentContactDetails Component Test Suite - rightRendition', () => {
	let props;
	let wrapper;
	const switchComponentHandlerMock = jest.fn();
	test('trigger input field change event', () =>{
		props = {
			isMobileVerified : false,
			switchComponentHandler: switchComponentHandlerMock,
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			isEditing: true,
			pristine:true,
			permissions : [{'communication_channels':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'},{'communication_channels':[{'communication_channel':'communication_channel','subscriber_status':1},{'communication_channel':'communication_channel','subscriber_status':3}],'communication_type':'communication_type'}],
			errorCode: 1
		};
		wrapper = mount(<Provider store={mockStore} ><ParentContactDetails {...props} /></Provider>);
		wrapper.find('input').forEach((element) => element.simulate('change', { target: { value: true } }));
		wrapper.find('input').forEach((element) => element.simulate('mouseup', { target: { value: true } }));
		expect(wrapper.find('input').get(0).props.checked).toEqual(true);
	})

});