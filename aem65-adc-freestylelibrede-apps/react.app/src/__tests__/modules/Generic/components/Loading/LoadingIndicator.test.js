import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import LoadingIndicator from '../../../../../modules/Generic/components/Loading/LoadingIndicator';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('LoadingIndicator Component Test Suite - isOverlay: true', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			size: 'small',
			label: 'label',
			isOverlay: true,
			pageLoader: true
		};
		wrapper = shallow(<LoadingIndicator {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('LoadingIndicator Component Test Suite - isOverlay: false', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			size: 'small',
			label: 'label',
			isOverlay: false,
			pageLoader: false
		};
		wrapper = shallow(<LoadingIndicator {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});


