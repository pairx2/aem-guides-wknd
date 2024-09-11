import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchForm from '../../../../../modules/Search/components/SearchForm/SearchForm';
import SearchBar from '../../../../../modules/Search/components/SearchBar/SearchBar';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('Search Form Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			heading: 'heading',
			description: 'description',
			image: 'image'
		};
		wrapper = shallow(<SearchForm {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});
	test('div tag render check', () => {
		expect(wrapper.props().children.type).toBe('div');
	});
	test('div tag render check', () => {
		expect(wrapper.props().children.props.children.props.children.type).toBe('div');
	});
	test('div tag render check', () => {
		expect(wrapper.props().children.props.children.props.children.props.children.type).toBe('div');
	});
	test('div and h2 tag render check', () => {
		expect(wrapper.props().children.props.children.props.children.props.children.props.children[0].type).toBe('h1');
		expect(wrapper.props().children.props.children.props.children.props.children.props.children[1].type).toBe('div');
	});
	test('search bar check', () => {
		expect(wrapper.containsMatchingElement(<SearchBar />)).toBeDefined();
	});
	test('h5 tag render check', () => {
		expect(wrapper.props().children.props.children.props.children.props.children.props.children[1].props.children.type).toBe('h5');
	});
	test('has heading as prop', () => {
		const headingProp = wrapper.props().children.props.children.props.children.props.children.props.children[0].props.children;
		expect(headingProp).toEqual('heading');
		expect(typeof headingProp).toBe('string');
	});
	test('has description as prop', () => {
		const descriptionProp = wrapper.props().children.props.children.props.children.props.children.props.children[1].props.children.props.children;
		expect(descriptionProp).toEqual('description');
		expect(typeof descriptionProp).toBe('string');
	});
	test('has image as prop', () => {
		const imageProp = wrapper.props().style.backgroundImage;
		expect(imageProp).toEqual('url(image)');
		expect(typeof imageProp).toBe('string');
	});
});