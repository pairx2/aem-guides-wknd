import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartOverviewSubHeading from '../../../../../modules/Cart/components/CartOverview/CartOverviewSubHeading';
import {i18nLabels} from '../../../../../utils/translationUtils';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CartOverviewSubHeading Component Test Suite with productHeading prop', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			productHeading: 'productHeadingString',
		};
		wrapper = shallow(<CartOverviewSubHeading {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders another div',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(4);
	});
	test('div tag renders 4 child divs',() => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[2].type).toBe('div');
		expect(wrapper.props().children[3].type).toBe('div');

	});
	test('1st div tag renders h6',() => {
		expect(wrapper.props().children[0].props.children.type).toBe('h6');
		expect(wrapper.props().children[0].props.children.props.children).toBe('productHeadingString');
	});
	test('2nd div tag renders h6',() => {
		expect(wrapper.props().children[1].props.children.type).toBe('h6');
		expect(wrapper.props().children[1].props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[1].props.children.props.children.props.text).toBe(i18nLabels.PRICE);

	});
	test('3rd div tag renders h6',() => {
		expect(wrapper.props().children[2].props.children.type).toBe('h6');
		expect(wrapper.props().children[2].props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[2].props.children.props.children.props.text).toBe(i18nLabels.QUANTITY);
	});
	test('4th div tag renders h6',() => {
		expect(wrapper.props().children[3].props.children.type).toBe('h6');
		expect(wrapper.props().children[3].props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[3].props.children.props.children.props.text).toBe(i18nLabels.TOTAL_PRICE);
	});
});
describe('CartOverviewSubHeading Component Test Suite without productHeading prop', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			productHeading: null,
		};
		wrapper = shallow(<CartOverviewSubHeading {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders another div',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(4);
	});
	test('div tag renders 4 child divs',() => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[2].type).toBe('div');
		expect(wrapper.props().children[3].type).toBe('div');

	});
	test('1st div tag renders h6',() => {
		expect(wrapper.props().children[0].props.children.type).toBe('h6');
		expect(wrapper.props().children[0].props.children.props.children.type.name).toBe('I18n');
	});
	test('2nd div tag renders h6',() => {
		expect(wrapper.props().children[1].props.children.type).toBe('h6');
		expect(wrapper.props().children[1].props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[1].props.children.props.children.props.text).toBe(i18nLabels.PRICE);

	});
	test('3rd div tag renders h6',() => {
		expect(wrapper.props().children[2].props.children.type).toBe('h6');
		expect(wrapper.props().children[2].props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[2].props.children.props.children.props.text).toBe(i18nLabels.QUANTITY);
	});
	test('4th div tag renders h6',() => {
		expect(wrapper.props().children[3].props.children.type).toBe('h6');
		expect(wrapper.props().children[3].props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[3].props.children.props.children.props.text).toBe(i18nLabels.TOTAL_PRICE);
	});
});

