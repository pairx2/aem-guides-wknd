import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PaymentRedirect from '../../../../modules/Payment/components/PaymentRedirect';

jest.mock('../../../../utils/translationUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('PaymentRedirect Component Test Suite -isLimitHeight:true,', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'title',
		};
		wrapper = shallow(<PaymentRedirect {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});



