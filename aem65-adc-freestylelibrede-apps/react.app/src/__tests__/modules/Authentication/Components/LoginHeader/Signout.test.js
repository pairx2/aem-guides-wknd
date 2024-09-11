import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Signout from '../../../../../modules/Authentication/components/LoginHeader/Signout';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<Signout store={mockStore} {...props} />).dive();
	return wrapper;
};

describe('Signout Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			logoutLabel: 'logoutLabelString',
			logoutIcon: 'logoutIconString',
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('renders Link',() => {
		expect(wrapper.type().name).toBeUndefined();
	});

});


