import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PanelList from '../../../../../modules/Generic/components/Panel/PanelList';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Panel List Component Test Suite -- panelType: horizontal', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			panelList : [
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'}
			],
			title: 'String',
			panelType: 'horizontal',
			subHeading: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			bgColor: 'String'
		};
		wrapper = shallow(<PanelList {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('Panel Component Test Suite - panelType: vertical', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			panelList : [
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'}
			],
			title: 'String',
			panelType: 'vertical',
			subHeading: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			bgColor: 'String'
		};
		wrapper = shallow(<PanelList {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('Panel List Component Test Suite -- panelType: horizontal,panelList.length === 4', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			panelList : [
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'}
			],
			title: 'String',
			panelType: 'horizontal',
			subHeading: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			bgColor: 'String'
		};
		wrapper = shallow(<PanelList {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('Panel List Component Test Suite -- panelType: horizontal,panelList.length === 4', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			panelList : [
				{'text':'text'},
				{'text':'text'},
				{'text':'text'},
				{'text':'text'}
			],
			title: 'String',
			panelType: 'horizontal',
			subHeading: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			bgColor: 'String'
		};
		wrapper = shallow(<PanelList {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('Panel List Component Test Suite -- panelType: horizontal,panelList.length === 3', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			panelList : [
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
				{'ctaLabel':'ctaLabel','text':'text','phoneNumber':'phoneNumber','ctaAction':'_self'},
			],
			title: 'String',
			panelType: 'horizontal',
			subHeading: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			bgColor: 'String'
		};
		wrapper = shallow(<PanelList {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('Panel List Component Test Suite -- panelType: horizontal,panelList.length === 3', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			panelList : [
				{'text':'text'},
				{'text':'text'},
				{'text':'text'},
			],
			title: 'String',
			panelType: 'horizontal',
			subHeading: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			bgColor: 'String'
		};
		wrapper = shallow(<PanelList {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

