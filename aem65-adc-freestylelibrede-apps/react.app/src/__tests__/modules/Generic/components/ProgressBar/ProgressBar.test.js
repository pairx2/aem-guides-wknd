import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import ProgressBar from '../../../../../modules/Generic/components/ProgressBar/ProgressBar';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('ProgressBar Component Test Suite when currentStep is equal to step', () => {

	let props;
	let wrapper;
	// let currentStep, steps;

	describe('props check ', () => {
		beforeEach(() => {
			props = {
				currentStep: 1,
	                steps: ['1', '2']
			};
			wrapper = shallow(<ProgressBar {...props} />);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('checking in return', () => {
			const child1 = wrapper.props().children[0];
			expect(child1.type).toBe('li');

			const child2 = wrapper.props().children[1];
			expect(child2.type).toBe('li');
		});
	});
});

describe('ProgressBar Component Test Suite when currentStep is greater than step', () => {

	let props;
	let wrapper;
	// let currentStep, steps;

	describe('props check ', () => {
		beforeEach(() => {
			props = {
				currentStep: 3,
	            steps: ['1', '2']
			};
			wrapper = shallow(<ProgressBar {...props} />);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});


	});
});