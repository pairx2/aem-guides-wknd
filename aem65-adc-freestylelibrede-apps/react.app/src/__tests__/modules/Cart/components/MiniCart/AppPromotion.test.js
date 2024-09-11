import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AppPromotion from '../../../../../modules/Cart/components/MiniCart/AppPromotion';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('AppPromotion Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			downloadAppImage: 'downloadAppImageString',
			downloadAppText: 'downloadAppTextString',
			learnMoreLinkText: 'learnMoreLinkTextString',
			learnMoreLinkDestination: 'learnMoreLinkDestinationString',
			openTab: 'openTabString',
		};
		wrapper = shallow(<AppPromotion {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders another div',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.type).toBe('div');
	});
	test('div tag renders 2 child divs',() => {
		expect(wrapper.props().children.props.children.length).toBe(2);
		expect(wrapper.props().children.props.children[0].type).toBe('div');
		expect(wrapper.props().children.props.children[1].type).toBe('div');

	});
	test('1st div tag renders img',() => {
		expect(wrapper.props().children.props.children[0].props.children.type).toBe('img');
		expect(wrapper.props().children.props.children[0].props.children.props.src).toBeUndefined();

	});
	test('2nd div tag renders Link, p in div',() => {
		expect(wrapper.props().children.props.children[1].props.children.props.children[0].type).toBe('p');
		expect(wrapper.props().children.props.children[1].props.children.props.children[1].type.name).toBe('Link');

	});
});


