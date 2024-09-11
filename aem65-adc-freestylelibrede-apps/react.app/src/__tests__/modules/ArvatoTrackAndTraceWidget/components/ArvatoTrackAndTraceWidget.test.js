import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ArvatoTrackAndTraceWidget from '../../../../modules/ArvatoTrackAndTraceWidget/components/ArvatoTrackAndTraceWidget';
import { getUrlParameter } from '../../../../utils/getParams';
jest.mock('../../../../utils/getParams.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<ArvatoTrackAndTraceWidget store={props} />);
	return wrapper;
};
describe('ArvatoTrackAndTraceWidget component Test Suite', () => {
	let props;
	let wrapper;
    const confirmAccountMock = jest.fn();
	
	beforeEach(() => {
		getUrlParameter.mockImplementation(() => true);
		props = {
			heading: 'String',
            subHeading: 'String',
			orderIDText: 'String',
			orderIdPlaceHolderText: 'String',
			orderIDValidationRegex: 'String',
			zipCodeText: 'String',
			zipCodePlaceHolderText: 'String',
			zipCodeValidationRegex: 'String',
			submitButtonText: 'String',
			orderIDLength: 4,
        zipCodeLength: 4		
		};
		wrapper = setup(props);
	});

	describe('render check', () => {
		test('renders without crashing', () => {
            wrapper.setState({
                urlOrderId: "orderId",
                urlZipCode: "zipCode"
            });
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

        test('render check for onSubmitTrack method', () => {
			const  formData= {
                zipCode: "2345",
                orderId: "DE098765432"
            }
            wrapper.instance().onSubmitTrack(formData);
		});
	});
});


describe('ArvatoTrackAndTraceWidget component Test Suite', () => {
	let props;
	let wrapper;
    const confirmAccountMock = jest.fn();
	
	beforeEach(() => {
		getUrlParameter.mockImplementation(() => false);
		props = {
			heading: 'String',
            subHeading: 'String',
			orderIDText: 'String',
			orderIdPlaceHolderText: 'String',
			orderIDValidationRegex: 'String',
			zipCodeText: 'String',
			zipCodePlaceHolderText: 'String',
			zipCodeValidationRegex: 'String',
			submitButtonText: 'String',			
			orderIDLength: 4,
        zipCodeLength: 4				
		};
		wrapper = setup(props);
	});

	describe('render check', () => {
		test('renders without crashing with url parammeter false', () => {
            wrapper.setState({
                urlOrderId: "orderID",
                urlZipCode: "zipCode"
            });
			expect(wrapper).toBeDefined();
		});
		test('render check for onSubmitTrack method', () => {
			const  formData= {
                zipCode: "",
                orderId: ""
            }
            wrapper.instance().onSubmitTrack(formData);
		});
	});
});