import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
import Results from '../../../../../modules/Search/components/SearchResults/Results';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('Results Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			hits: [
				{categorytagfacets: ["Apps", "Sensor", "Software"], tagtitle: 'tagtitle1' ,  location: "/mocklocation" , syssourcetype: "Zendesk"},
				{categorytagfacets: ["Sensor", "Software"], tagtitle: 'tagtitle2', location: "/mocklocation"}
			],
			rendition: 'v1-rendition'
		};
		wrapper = mount(<Provider store= {mockStore}><Results {...props} /></Provider>);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

});

describe('Results Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			hits: [
				{categorytagfacets: ["Apps", "Software"], tagtitle: 'tagtitle1'},
				{categorytagfacets: ["Apps", "Sensor"], tagtitle: 'tagtitle2'}
			],
			rendition: 'v2-rendition'
		};
		wrapper = mount(<Provider store= {mockStore}><Results {...props} /></Provider>);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});
});