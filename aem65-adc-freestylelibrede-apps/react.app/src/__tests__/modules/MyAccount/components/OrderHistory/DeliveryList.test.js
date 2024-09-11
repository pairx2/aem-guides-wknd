import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import DeliveryList from '../../../../../modules/MyAccount/components/OrderHistory/DeliveryList';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('DeliveryList component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			orderId: 'orderId',
			deliveries: [{'deliveries1':'q'}, {'deliveries2':'q'}],
			getFormattedDate: () => {},
			returnArticle: () => {},
			orderDate: 123,
			getInvoice: () => {},
		};

		wrapper = shallow(<DeliveryList {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
