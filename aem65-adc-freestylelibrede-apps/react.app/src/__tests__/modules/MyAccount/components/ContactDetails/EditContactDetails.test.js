import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import EditContactDetails from '../../../../../modules/MyAccount/components/ContactDetails/EditContactDetails';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('DisplayContactDetails Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			isMobileVerified : true,
		};
		wrapper = shallow(<EditContactDetails {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

