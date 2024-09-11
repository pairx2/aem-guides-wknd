import React from 'react';
import Banner from '../../../../modules/Banner/components/Banner';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<Banner store={mockStore} {...props} />).dive().dive();
	return wrapper;
};
describe('Banner Component Test Suite', () => {

	let props;
	let wrapper;

	describe('fullBleed renders banner image', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'image',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				deepLinkId: 'deepLinkId',
				videoImage: 'videoImage',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	describe('fullBleed renders banner image', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'image',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				deepLinkId: 'deepLinkId',
				videoImage: 'videoImage',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'tablet',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	describe('fullBleed renders banner image', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'image',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				deepLinkId: 'deepLinkId',
				videoImage: 'videoImage',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'desktop',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	describe('fullBleed renders banner image with image icons', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'image',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				disclaimer:'disclaimer',
				ctaLayout:'ctaLayout',
				deepLinkId: 'deepLinkId',
				videoImage: 'videoImage',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};

			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
	describe('fullBleed renders banner video', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'video',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'fullBleed',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				deepLinkId: 'deepLinkId',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	describe('HalfWidth renders if banner type is image and textAlignmentHalfWidth right', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'image',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'imageAlignment',
				textAlignmentHalfWidth: 'right',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				textAlignmentImageBanner : 'right',
				deepLinkId: 'deepLinkId',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};

			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	describe('HalfWidth renders if banner type is image and textAlignmentHalfWidth right', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'image',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'imageAlignment',
				textAlignmentHalfWidth: 'right',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				textAlignmentImageBanner : 'left',
				deepLinkId: 'deepLinkId',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};

			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	describe('HalfWidth renders if banner type is not video', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'bannerType',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'imageAlignment',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'videoAlignment',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				deepLinkId: 'deepLinkId',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('Product renders when textAlignmentProduct is not right', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'product',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'textAlignmentProduct',
				productSku: 'productSku',
				videoAlignment: 'fullBleed',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				deepLinkId: 'deepLinkId',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'tablet',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
	describe('Product renders when textAlignmentProduct is right', () => {
		beforeEach(() => {
			props = {
				heading: 'heading',
				subHeading: 'subHeading',
				cta1: {'cta1':'dummy'},
				cta2: {'cta2':'dummy'},
				description: 'description',
				image: 'image',
				productImage: 'productImage',
				video: 'video',
				bannerType: 'product',
				textAlignmentFullBleed: 'textAlignmentFullBleed',
				videoTextAlignmentFullBleed: 'videoTextAlignmentFullBleed',
				imageAlignment: 'fullBleed',
				textAlignmentHalfWidth: 'textAlignmentHalfWidth',
				textAlignmentProduct: 'right',
				productSku: 'productSku',
				videoAlignment: 'fullBleed',
				subHeadingTextColor: 'subHeadingTextColor',
				headingTextColor: 'headingTextColor',
				headingType: 'headingType',
				subHeadingType: 'subHeadingType',
				productImageAlignment : 'fullBleed',
				deepLinkId: 'deepLinkId',
				videoPlayOption:'videoPlayOption',
				videoImageMobile: 'videoImageMobile',
				videoImageTab: 'videoImageTab',
				breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
				currentBreakpoint: 'mobile',
				textPositionImageBanner: 'text-left',
				productImageTab:'productImageTab',
				productImageMobile:'productImageTab'
			};
			wrapper= setup(props);
		});
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

});

