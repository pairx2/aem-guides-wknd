import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BannerButtons from '../../../../modules/Banner/components/BannerButtons';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('BannerButtons Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cta1: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			cta2: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			size: 'sm',
			disclaimer: 'disclaimerString',
			ctaLayout: 'vertical',
			downloadcta: {'assetPath':'dummy','text':'text','type':'primary','target':'_self'},
			hasImageDownloadButton: true
		};
		wrapper = shallow(<BannerButtons {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('BannerButtons Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cta1: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			cta2: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			size: 'sm',
			disclaimer: 'disclaimerString',
			ctaLayout: 'ctaLayout',
			downloadcta: {'assetPath':'dummy','text':'text','type':'primary','target':'_self'},
			hasImageDownloadButton: false
		};
		wrapper = shallow(<BannerButtons {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('BannerButtons Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cta1: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			cta2: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			size: 'sm',
			disclaimer: 'disclaimerString',
			ctaLayout: 'ctaLayout',
			downloadcta: {'assetPath':'dummy','text':'text','type':'secondary','target':'_self'},
			hasImageDownloadButton: false
		};
		wrapper = shallow(<BannerButtons {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('BannerButtons Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cta1: null,
			cta2: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			size: 'sm',
			disclaimer: 'disclaimerString',
			ctaLayout: 'ctaLayout',
			downloadcta: null,
			hasImageDownloadButton: false
		};
		wrapper = shallow(<BannerButtons {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('BannerButtons Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cta1: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			cta2: {'link':'dummy','text':'text','type':'primary','target':'_self'},
			size: 'sm',
			disclaimer: 'disclaimerString',
			ctaLayout: 'ctaLayout',
			downloadcta: null,
			hasImageDownloadButton: false
		};
		wrapper = shallow(<BannerButtons {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('BannerButtons Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cta1: null,
			cta2: null,
			size: 'sm',
			disclaimer: 'disclaimerString',
			ctaLayout: 'ctaLayout',
			downloadcta: null,
			hasImageDownloadButton: false
		};
		wrapper = shallow(<BannerButtons {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
