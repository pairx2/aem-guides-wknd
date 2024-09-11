import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Image from '../../../../../modules/Generic/components/Image/Image';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Image Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			src: null,
			alt: 'alt',
			fit: 'contain',
			position: 'center',
			renditions: ['a','b']
		};
		wrapper = shallow(<Image {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('Image Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			src: 'src',
			alt: 'alt',
			fit: 'contain',
			position: 'center',
			renditions: ['a','b']
		};
		wrapper = mount(<Image {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});