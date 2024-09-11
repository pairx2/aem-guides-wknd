import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Col from '../../../../../../modules/Generic/components/Container/Col';
import Row from '../../../../../../modules/Generic/components/Container/Row';
import I18n from '../../../../../../modules/Translation/components/I18n';

import HelpdeskBanner from '../../../../../../modules/MyAccount/components/OrderHistory/Return/HelpdeskBanner';
import ReturnStatus from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnStatus';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('ReturnStatus component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			className: '',
            returnDetails :[{
                'returnId': 'a5K9E0000005sD5UAI',
                'returnItemDetails': [],
                'returnStatus': 'Pending',
                'returnType': 'Commercial Return',
                'rmaLabel': null
            }]
		};

		wrapper = shallow(<ReturnStatus {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('className check', () => {
		expect(wrapper.props().className).toBeDefined();
	});
	
});