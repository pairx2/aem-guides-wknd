import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NoActivePlusService from '../../../../../modules/MyAccount/components/PlusService/NoActivePlusService';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<NoActivePlusService {...props} />);
	return wrapper;
};

describe('NoActivePlusService component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			subscriptionHeading: 'subscriptionHeading',
			subscriptionImage: 'subscriptionImage',
			informationalHeading: 'informationalHeading',
			informationalDesc: 'informationalDesc',
			informationalMessage: 'informationalMessage',
			moreInfoPath: 'moreInfoPath',
			moreInfoStyle: 'primary',
			bookServicePath: 'bookServicePath',
			frequency: 'frequency',
			price: 'price',
			informationalPriceSuperscript: 'informationalPriceSuperscript'
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('children type check', () =>{
					expect(wrapper.props().children.props.children.type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[0].type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[0].props.children[0].type).toBe('h2');
					expect(wrapper.props().children.props.children.props.children[0].props.children[1].type).toBe('p');
					expect(wrapper.props().children.props.children.props.children[0].props.children[2].type).toBe('p');
					expect(wrapper.props().children.props.children.props.children[0].props.children[3].type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[0].props.children[3].props.children[0].type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[0].props.children[3].props.children[1].type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[0].props.children[4].type).toBe('p');
					expect(wrapper.props().children.props.children.props.children[1].props.children.type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[1].type).toBe('div');
					expect(wrapper.props().children.props.children.props.children[1].props.children.type).toBe('div');
		});
	});
});

describe('NoActivePlusService component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			subscriptionHeading: 'subscriptionHeading',
			subscriptionImage: 'subscriptionImage',
			informationalHeading: 'informationalHeading',
			informationalDesc: 'informationalDesc',
			informationalMessage: 'informationalMessage',
			moreInfoPath: 'moreInfoPath',
			moreInfoStyle: null,
			bookServicePath: 'bookServicePath',
			frequency: null,
			price: 'price',
			informationalPriceSuperscript: 'informationalPriceSuperscript'
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});