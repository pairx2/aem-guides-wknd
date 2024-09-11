import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DisplayContactDetails from '../../../../../modules/MyAccount/components/ContactDetails/DisplayContactDetails';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('DisplayContactDetails Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			permissions : [{'communication_channel':'communication_channel','communication_type':'communication_type'},{'communication_channel':'communication_channel','communication_type':'communication_type'}],
		};
		wrapper = shallow(<DisplayContactDetails {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

