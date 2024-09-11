import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CardEmptyContent from '../../../../../modules/Generic/components/CardEmptyContent/CardEmptyContent';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CardEmptyContent Component Test Suite - isOverlay: true', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'String',
			heading: 'String',
			subHeading: 'String',
			message: 'String',
			icon: 'String',
			iconClasses: 'String'
		};
		wrapper = shallow(<CardEmptyContent {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});