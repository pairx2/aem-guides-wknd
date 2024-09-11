import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';

import PrescriptionAccount from '../../../../../modules/MyAccount/components/PrescriptionAccount/PrescriptionAccount';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props = {}) => {
	const wrapper = shallow(<PrescriptionAccount store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('PrescriptionAccount component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			title: 'title',
			statusLabel: 'statusLabel',
			downloadLabel: 'downloadLabel',
			getGhostOrdersRequest: () => { },
			getInvoice: () => { },
			noPrescriptionDescription: 'noPrescriptionDescription',
			noPrescriptionTitle: 'noPrescriptionTitle',
			image: 'image'
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

		test('title proptype', () =>{
			const titleProp= wrapper.instance().props.title;
			expect(typeof titleProp).toBe('string');
		});

		test('statusLabel proptype', () =>{
			const statusLabelProp= wrapper.instance().props.statusLabel;
			expect(typeof statusLabelProp).toBe('string');
		});

		test('downloadLabel proptype', () =>{
			const downloadLabelProp= wrapper.instance().props.downloadLabel;
			expect(typeof downloadLabelProp).toBe('string');
		});

		test('noPrescriptionDescription proptype', () =>{
			const noPrescriptionDescriptionProp= wrapper.instance().props.noPrescriptionDescription;
			expect(typeof noPrescriptionDescriptionProp).toBe('string');
		});

		test('noPrescriptionTitle proptype', () =>{
			const noPrescriptionTitleProp= wrapper.instance().props.noPrescriptionTitle;
			expect(typeof noPrescriptionTitleProp).toBe('string');
		});

		test('image proptype', () =>{
			const imageProp= wrapper.instance().props.image;
			expect(typeof imageProp).toBe('string');
		});

		test('ghostOrders proptype', () =>{
			const ghostOrdersProp= wrapper.instance().props.ghostOrders;
			expect(ghostOrdersProp).toBeInstanceOf(Array);
		});

		test('customer proptype', () =>{
			const customerProp= wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});

		test('getGhostOrdersRequest proptype', () =>{
			const getGhostOrdersRequestProp= wrapper.instance().props.getGhostOrdersRequest;
			expect(typeof getGhostOrdersRequestProp).toBe('function');
		});

		test('getInvoice proptype', () =>{
			const getInvoiceProp= wrapper.instance().props.getInvoice;
			expect(typeof getInvoiceProp).toBe('function');
		});

	});

	describe('lifecycle methods check', () => {

		test('propsDidChange',() => {
			const prevProps = {
				ghostOrders: ['a']
			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentdidUpdate when propsDidChange true',() => {
			const prevProps = {
				ghostOrders: ['a', 'b']
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate when propsDidChange false',() => {
			const prevProps = {...wrapper.instance().props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});

	describe('Functions check', () => {

		test('getPrescriptionStatus function call', () => {
			const getPrescriptionStatusMock = wrapper.instance().getPrescriptionStatus;
			expect(typeof getPrescriptionStatusMock).toBe('function');
			getPrescriptionStatusMock();
			expect(getPrescriptionStatusMock).toBeDefined();
		});
		test('componentDidUpdate function call', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			const prevProps = {ghostOrders: []};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
});



describe('PrescriptionAccount component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			statusLabel: 'statusLabel',
			downloadLabel: 'downloadLabel',
			getGhostOrdersRequest: () => { },
			getInvoice: () => { },
			noPrescriptionDescription: 'noPrescriptionDescription',
			noPrescriptionTitle: 'noPrescriptionTitle',
			image: 'image'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
