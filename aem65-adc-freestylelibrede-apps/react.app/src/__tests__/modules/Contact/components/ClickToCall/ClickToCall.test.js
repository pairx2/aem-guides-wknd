import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import ClickToCall from '../../../../../modules/Contact/components/ClickToCall/ClickToCall';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ClickToCall Component Test Suite', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			icon: 'icon',
			label: 'label',
			offlineIcon: 'offlineIcon',
			serviceNumber: 'serviceNumber',
			openingHour: {'openingHour': 'dummy'},
			closingHour: {'closingHour': 'dummy'},
			onlineIcon: 'onlineIcon',
			hasClickToCallHeader: false,
			ctaStyling: 'primary',
			helpText: 'helpText',
			ctaText: 'ctaText',
			ctaEmail: 'ctaEmail',
			serviceText: 'serviceText'
		};
		wrapper = mount(<Provider store={mockStore}><ClickToCall {...props}/></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});

describe('ClickToCall Component Test Suite', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			icon: 'icon',
			label: 'label',
			offlineIcon: 'offlineIcon',
			serviceNumber: 'serviceNumber',
			openingHour: {'openingHour': 'dummy'},
			closingHour: {'closingHour': 'dummy'},
			onlineIcon: 'onlineIcon',
			hasClickToCallHeader: true,
			ctaStyling: 'primary',
			helpText: 'helpText',
			ctaText: 'ctaText',
			ctaEmail: 'ctaEmail',
			serviceText: 'serviceText'
		};
		wrapper = shallow(<ClickToCall {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});
