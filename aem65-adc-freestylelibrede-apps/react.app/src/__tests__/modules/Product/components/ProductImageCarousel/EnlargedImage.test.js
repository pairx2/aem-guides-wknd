import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import EnlargedImage from '../../../../../modules/Product/components/ProductImageCarousel/EnlargedImage';
import Square from '../../../../../modules/Generic/components/Square/Square';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('EnlargedImage Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			focus: 'autofocus',
			position: {
				x: 5,
		        y: 5,
			},
			image: {
				url: 'url'
			}
		};

		wrapper = shallow(<EnlargedImage {...props} />);

	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('style type check',() => {
		expect(wrapper.props().style).toBeInstanceOf(Object);
	});

	describe('component render check', () => {

		test('Square component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Square />)).toBeDefined();
		});
	});
});
