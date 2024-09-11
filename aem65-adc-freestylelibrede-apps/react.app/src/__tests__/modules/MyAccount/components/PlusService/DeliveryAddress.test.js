import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DeliveryAddress from '../../../../../modules/MyAccount/components/PlusService/DeliveryAddress';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('DeliveryAddress component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			deliveryAddressInfo: [
				{deliveryAddress: {
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
				 }}
			]
		};
		wrapper = shallow(<DeliveryAddress {...props} />);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});

