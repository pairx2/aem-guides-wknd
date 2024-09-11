import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SoftwareDownload from '../../../../../modules/MyAccount/components/SoftwareDownload/SoftwareDownload';
import MessageBanner from '../../../../../modules/Generic/components/MessageBanner/MessageBanner';
import Button, {BUTTON_OPTIONS} from '../../../../../modules/Generic/components/Button/Button';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import {isMobile} from '../../../../../utils/regexUtils';
import {i18nLabels} from '../../../../../utils/translationUtils';
import Icon from '../../../../../modules/Generic/components/Icon/Icon';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<SoftwareDownload store= {mockStore} {...props}/>).dive();
	return wrapper;
};


describe('SoftwareDownload Component Test Suite', () => {
	let props,wrapper;
	const mobile = isMobile;
	beforeEach(() => {
		props={
			softwareInfo: 'softwareInfo',
			windowsUrl: 'windowsUrl',
			windowsStyle: 'primary',
			macUrl: 'macUrl',
			macStyle: 'primary',
			noDownloadError: 'noDownloadError'
		};
		wrapper=setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('has isFirstShipmentShipped as prop and is of boolean type', () => {
		const customerProp = wrapper.props().isFirstShipmentShipped;
		expect(typeof customerProp).toBe('boolean');
	});
	test('has softwareInfo as prop and is of type string', () => {
		const softwareInfoProp = wrapper.props().softwareInfo;
		expect(typeof softwareInfoProp).toBe('string');
	});
	test('has windowsUrl as prop and is of type string', () => {
		const windowsUrlProp = wrapper.props().windowsUrl;
		expect(typeof windowsUrlProp).toBe('string');
	});
	test('has windowsStyle as prop and is of type string', () => {
		const windowsStyleProp = wrapper.props().windowsStyle;
		expect(typeof windowsStyleProp).toBe('string');
	});
	test('has macUrl as prop and is of type string', () => {
		const macUrlProp = wrapper.props().macUrl;
		expect(typeof macUrlProp).toBe('string');
	});
	test('has macStyle as prop and is of type string', () => {
		const macStyleProp = wrapper.props().macStyle;
		expect(typeof macStyleProp).toBe('string');
	});
	test('has noDownloadError as prop and is of type string', () => {
		const noDownloadErrorProp = wrapper.props().noDownloadError;
		expect(typeof noDownloadErrorProp).toBe('string');
	});

	test('MessageBanner component gets rendered', () => {
		expect(wrapper.containsMatchingElement(<MessageBanner />)).toBeDefined();

	});
	test('Button component gets rendered', () => {
		expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();

	});
	describe('jsx render',() => {
		test('p tag with softwareInfo', () => {
			expect(wrapper.dive().props().children[1].type).toBe('p');
			expect(wrapper.dive().props().children[1].props.children).toBe('softwareInfo');
		});
		test('Row', () => {
			expect(wrapper.dive().props().children[2].type.name).toBe('Row');
		});
		test('Download windows btn', () => {
			const rowTagChildren = wrapper.dive().props().children[2].props.children;
			const rowChildrenProps = rowTagChildren[0].props.children.props;
			expect(rowTagChildren[0].props.children.type.name).toBe('Button');
			expect(rowChildrenProps.href).toBe(!mobile && wrapper.props().windowsUrl);
			expect(rowChildrenProps.type).toBe(BUTTON_OPTIONS.TYPE.BUTTON);
			expect(rowChildrenProps.ctaStyle).toBe(wrapper.props().windowsStyle||BUTTON_OPTIONS.STYLE.PRIMARY);
			expect(rowChildrenProps.isDownload).toBe(true);
			expect(rowChildrenProps.isFullWidth).toBe(true);
			expect(rowChildrenProps.label).toBe(i18nLabels.DOWNLOAD_WINDOWS);
			expect(rowChildrenProps.icon).toBe('download-white');
			expect(rowChildrenProps.iconPosition).toBe(Icon.POSITION.LEFT);

		});
		test('Download mac btn', () => {
			const rowTagChildren = wrapper.dive().props().children[2].props.children;
			expect(rowTagChildren[1].props.children.type.name).toBe('Button');
			const rowChildrenProps = rowTagChildren[1].props.children.props;
			expect(rowChildrenProps.href).toBe(!mobile && wrapper.props().macUrl);
			expect(rowChildrenProps.type).toBe(BUTTON_OPTIONS.TYPE.BUTTON);
			expect(rowChildrenProps.ctaStyle).toBe(wrapper.props().macStyle||BUTTON_OPTIONS.STYLE.SECONDARY);
			expect(rowChildrenProps.isDownload).toBe(true);
			expect(rowChildrenProps.isFullWidth).toBe(true);
			expect(rowChildrenProps.label).toBe(i18nLabels.DOWNLOAD_MAC);
			expect(rowChildrenProps.icon).toBe('download-white');
			expect(rowChildrenProps.iconPosition).toBe(Icon.POSITION.LEFT);
		});
	});
});
describe('SoftwareDownload Component Test Suite', () => {
	let props,wrapper;
	const mobile = isMobile;
	beforeEach(() => {
		props={
			softwareInfo: 'softwareInfo',
			windowsUrl: 'windowsUrl',
			macUrl: 'macUrl',
			noDownloadError: 'noDownloadError'
		};
		wrapper=setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('has isFirstShipmentShipped as prop and is of boolean type', () => {
		const customerProp = wrapper.props().isFirstShipmentShipped;
		expect(typeof customerProp).toBe('boolean');
	});
	test('has softwareInfo as prop and is of type string', () => {
		const softwareInfoProp = wrapper.props().softwareInfo;
		expect(typeof softwareInfoProp).toBe('string');
	});
	test('has windowsUrl as prop and is of type string', () => {
		const windowsUrlProp = wrapper.props().windowsUrl;
		expect(typeof windowsUrlProp).toBe('string');
	});
	test('has macUrl as prop and is of type string', () => {
		const macUrlProp = wrapper.props().macUrl;
		expect(typeof macUrlProp).toBe('string');
	});
	test('has noDownloadError as prop and is of type string', () => {
		const noDownloadErrorProp = wrapper.props().noDownloadError;
		expect(typeof noDownloadErrorProp).toBe('string');
	});

	test('MessageBanner component gets rendered', () => {
		expect(wrapper.containsMatchingElement(<MessageBanner />)).toBeDefined();

	});
	test('Button component gets rendered', () => {
		expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();

	});
	describe('jsx render',() => {
		test('p tag with softwareInfo', () => {
			expect(wrapper.dive().props().children[1].type).toBe('p');
			expect(wrapper.dive().props().children[1].props.children).toBe('softwareInfo');
		});
		test('Row', () => {
			expect(wrapper.dive().props().children[2].type.name).toBe('Row');
		});
		test('Download windows btn', () => {
			const rowTagChildren = wrapper.dive().props().children[2].props.children;
			const rowChildrenProps = rowTagChildren[0].props.children.props;
			expect(rowTagChildren[0].props.children.type.name).toBe('Button');
			expect(rowChildrenProps.href).toBe(!mobile && wrapper.props().windowsUrl);
			expect(rowChildrenProps.type).toBe(BUTTON_OPTIONS.TYPE.BUTTON);
			expect(rowChildrenProps.ctaStyle).toBe(wrapper.props().windowsStyle||BUTTON_OPTIONS.STYLE.PRIMARY);
			expect(rowChildrenProps.isDownload).toBe(true);
			expect(rowChildrenProps.isFullWidth).toBe(true);
			expect(rowChildrenProps.label).toBe(i18nLabels.DOWNLOAD_WINDOWS);
			expect(rowChildrenProps.icon).toBe('download-white');
			expect(rowChildrenProps.iconPosition).toBe(Icon.POSITION.LEFT);

		});
		test('Download mac btn', () => {
			const rowTagChildren = wrapper.dive().props().children[2].props.children;
			expect(rowTagChildren[1].props.children.type.name).toBe('Button');
			const rowChildrenProps = rowTagChildren[1].props.children.props;
			expect(rowChildrenProps.href).toBe(!mobile && wrapper.props().macUrl);
			expect(rowChildrenProps.type).toBe(BUTTON_OPTIONS.TYPE.BUTTON);
			expect(rowChildrenProps.ctaStyle).toBe(wrapper.props().macStyle||BUTTON_OPTIONS.STYLE.SECONDARY);
			expect(rowChildrenProps.isDownload).toBe(true);
			expect(rowChildrenProps.isFullWidth).toBe(true);
			expect(rowChildrenProps.label).toBe(i18nLabels.DOWNLOAD_MAC);
			expect(rowChildrenProps.icon).toBe('download-white');
			expect(rowChildrenProps.iconPosition).toBe(Icon.POSITION.LEFT);
		});
	});
});

describe('SoftwareDownload Component Test Suite', () => {
	let props,wrapper;
	beforeEach(() => {
		props={
			softwareInfo: 'softwareInfo',
			windowsUrl: 'windowsUrl',
			windowsStyle: 'primary',
			macUrl: 'macUrl',
			macStyle: 'primary',
			noDownloadError: 'noDownloadError'
		};
		wrapper = mount(<Provider store= {mockStoreOrder}><SoftwareDownload {...props}/></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});