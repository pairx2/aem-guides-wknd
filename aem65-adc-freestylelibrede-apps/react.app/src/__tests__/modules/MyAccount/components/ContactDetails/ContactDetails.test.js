import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ContactDetails from '../../../../../modules/MyAccount/components/ContactDetails/ContactDetails';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('ContactDetails Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			communicationType:'NEWS',
			communicationChannels : [{'communication_channel':'SMS','subscriber_status':1},{'communication_channel':'EMAIL','subscriber_status':1} , {'communication_channel':'POST'}],
		};
		wrapper = shallow(<ContactDetails {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

