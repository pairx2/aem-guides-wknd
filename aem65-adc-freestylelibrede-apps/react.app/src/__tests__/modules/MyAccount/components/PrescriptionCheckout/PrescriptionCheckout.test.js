import React from 'react';
import PrescriptionCheckout from '../../../../../modules/MyAccount/components/PrescriptionCheckout/PrescriptionCheckout';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props = {}) => {
	const wrapper = shallow(<PrescriptionCheckout store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('PrescriptionCheckout component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			prescriptionHeading: '',
			publicPrescriptionImage: '',
			privatePrescriptionImage: '',
			measurementInstructions: '',
			measurementHints: 'hint',
			measurement: '101',
			setMeasurmentRequest: () => { }
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has hint as prop', () => {
		const measurementHints = wrapper.instance().props.measurementHints;
		expect(measurementHints).toEqual('hint');
	});

	test('setMeasurmentRequest proptype', () =>{
		const setMeasurmentRequestProp= wrapper.instance().props.setMeasurmentRequest;
		expect(typeof setMeasurmentRequestProp).toBe('function');
	});

	test('card is getting rendered', () => {
		expect(wrapper.find('prescriptionHeading')).toBeDefined();
	});

	test('I18n is getting rendered', () => {
		expect(wrapper.find('unit_of_measurement_label')).toBeDefined();
	});

	test('radio buton is getting rendered', () => {
		expect(wrapper.find('measurement')).toBeDefined();
	});

	test('testing  state function', () => {
		const component = wrapper.instance();
		component.setSelectedValue('hlo');
		expect(component.state.selectedUom).toBe('hlo');
	});

	describe('Functions check', () => {

		test('has componentDidUpdate as prop and is of type function', () => {
			const componentDidUpdateProp = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateProp).toBe('function');
			const prevProps= {'measurement': undefined, cartId: 'newcartId'};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(typeof wrapper.instance().state.selectedUom).toBe('string');
		});

		test('other componentDidUpdate function call check', () => {
			const componentDidUpdateProp = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateProp).toBe('function');

			const prevProps= {'measurement': '', cartId: 'CPMVw92p4LRqr5RPjMcCdWchSv5ONg9y'};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.selectedUom).toBe('101');
		});

		test('checking state var condition', () => {
			wrapper.instance().setState({insuranceType: 'private'});
		});
	});
});
