import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import ChangePaymentMethodModal from '../../../../../modules/MyAccount/components/PlusService/ChangePaymentMethodModal';

jest.mock('../../../../../modules/Generic/components/Card/Card.jsx');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	//const wrapper = shallow(<ChangePaymentMethodModal store={mockStore} {...props} />).dive().dive();
	const wrapper = mount(<Provider store={mockStore}><ChangePaymentMethodModal {...props} /></Provider>);

	return wrapper;
};


describe('ChangePaymentMethodModal component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {

		props = {
			order: {
				'billingAddress':{
					'salutation':null,
					'firstName':'britania',
					'lastName':'marie',
					'city':'Emsdetten',
					'zipCode':'48282',
					'street':'Weststr. 62',
					'addressInfo':null,
					'country':null,
					'countryCode':'DE',
					'stateProvince':null,
					'phoneNumber':'+49 1514215786'
				},
				'deliveryAddress':{
					'salutation':null,
					'firstName':'britania',
					'lastName':'marie',
					'city':'Emsdetten',
					'zipCode':'48282',
					'street':'Weststr. 62',
					'addressInfo':null,
					'country':null,
					'countryCode':'DE',
					'stateProvince':null,
					'phoneNumber':'+49 1514215786'
				},
				'priceBreakdown':{
					'totalPrice':'185.65',
					'price':179.70,
					'coPay':'',
					'deliveryCost':5.95
				}
			},
			customer: {}
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
	});
});
