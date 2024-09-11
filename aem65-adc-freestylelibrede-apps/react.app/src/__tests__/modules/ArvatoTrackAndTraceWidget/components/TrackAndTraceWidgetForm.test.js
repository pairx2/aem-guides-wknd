import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TrackAndTraceWidgetForm from '../../../../modules/ArvatoTrackAndTraceWidget/components/TrackAndTraceWidgetForm';
import { Provider } from 'react-redux';
import {mockStore} from '../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<TrackAndTraceWidgetForm {...props} />).dive();
	return wrapper;
};
describe('LoginForm component Test Suite', () => {
	let props;
	let wrapper;
    const handleSubmittMock = jest.fn();

	beforeEach(() => {
		
		props = {
			handleSubmit: handleSubmittMock,
			heading: 'String',
			orderIDText: 'String',
			orderIdPlaceHolderText: 'String',
			orderIDValidationRegex: 'String',
			zipCodeText: 'String',
			zipCodePlaceHolderText: 'String',
			zipCodeValidationRegex: 'String',
			submitButtonText: 'String',
            formData: {
                zipCode: "2345",
                orderID: "DE098765432"
            }		
		};
		wrapper = setup(props);

	});

	describe('render check', () => {
		
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});

});

describe('LoginForm component Test Suite', () => {
	let props;
	let wrapper;
    const handleSubmittMock = jest.fn();
	

	beforeEach(() => {
		
		props = {
			handleSubmit: handleSubmittMock,
			heading: 'String',
			orderIDText: 'String',
			orderIdPlaceHolderText: 'String',
			orderIDValidationRegex: 'String',
			zipCodeText: 'String',
			zipCodePlaceHolderText: 'String',
			zipCodeValidationRegex: 'String',
			submitButtonText: 'String',
            formData: {
                zipCode: "2345",
                orderID: "DE098765432"
            }		
		};
        wrapper = mount(<Provider store= {mockStore}><TrackAndTraceWidgetForm {...props} /></Provider>);
		

	});

	describe('render check', () => {
		
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});

});