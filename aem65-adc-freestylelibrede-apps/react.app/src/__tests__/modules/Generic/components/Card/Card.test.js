import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Card, CardContent, CardAction} from '../../../../../modules/Generic/components/Card/Card';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Card Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'String',
			infoText: 'String',
			editText: 'String',
			editLink: 'String',
			className: 'String',
			size:'h1',
			style:{'a':'b'},
			hasTitleBorder: true,
			hasTitleCentered: true,
			borderCheck: 'borderCheck',
			children:[
				{
					props:{
						content:'CardContent'
					}
				},
				{
					props:{
						action:'CardAction'
					}
				}
			],
			isCardSize: true,
			isLastOrderCarrierReturn: true
		};
		wrapper = shallow(<Card {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('Card Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'String',
			infoText: 'String',
			editText: 'String',
			editLink: 'String',
			className: 'String',
			style:{'a':'b'},
			hasTitleBorder: true,
			hasTitleCentered: true,
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			children:[],
			isCardSize: false,
			borderCheck: 'borderCheck',
			isLastOrderCarrierReturn: false
		};
		wrapper = mount(<Provider store={mockStore}><Card {...props} /></Provider>);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('Card Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			children:[
				{
					type:{
						name:'CardContent'
					}
				},
				{
					type:{
						name:'CardAction'
					}
				}
			],
			borderCheck: "bordercheck"
		};
		wrapper = shallow(<CardAction {...props.children} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
		expect(wrapper.find('.adc-card__action')).toHaveLength(0);
	});
});
describe('Card Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			children:[
				{
					type:{
						name:'CardContent'
					}
				},
				{
					type:{
						name:'CardAction'
					}
				}
			]
		};
		wrapper = shallow(<CardContent {...props.children} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('Card Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'String',
			infoText: 'String',
			editText: 'String',
			editLink: 'String',
			className: 'String',
			style:{'a':'b'},
			hasTitleBorder: true,
			hasTitleCentered: true,
			children: 'children',
			isCardSize: false,
			cardSize: '1',
			size: 'h1'
		};
		wrapper = mount(<Provider store={mockStore}><Card {...props} /></Provider>);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('Card Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'String',
			infoText: 'String',
			editText: 'String',
			editLink: 'String',
			className: 'String',
			style:{'a':'b'},
			hasTitleBorder: true,
			hasTitleCentered: true,
			children: 'children',
			isCardSize: true,
			cardSize: '1',
			size: 'h2'
		};
		wrapper = mount(<Provider store={mockStore}><Card {...props} /></Provider>);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
