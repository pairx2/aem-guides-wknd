import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NoResults from '../../../../../modules/Search/components/SearchResults/NoResults';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('NoResults Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			query: 'query',
		};
		wrapper = shallow(<NoResults {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});

	test('i and h4 tag render and prop check', () => {
		expect(wrapper.props().children[0].type).toBe('i');
		expect(wrapper.props().children[1].type).toBe('h4');
		expect(wrapper.props().children[1].props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[1].props.children.props.params).toBeInstanceOf(Array);
	});
});

describe('NoResults Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			query: null,
		};
		wrapper = shallow(<NoResults {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});

	test('i and h4 tag render and prop check', () => {
		expect(wrapper.props().children[0].type).toBe('i');
		expect(wrapper.props().children[1].type).toBe('h4');
		expect(wrapper.props().children[1].props.children.type.name).toBe('I18n');
		expect(wrapper.props().children[1].props.children.props.params).toBeInstanceOf(Array);
	});
});