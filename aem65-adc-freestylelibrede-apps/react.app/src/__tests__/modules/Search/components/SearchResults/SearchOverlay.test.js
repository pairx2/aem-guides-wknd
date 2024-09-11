import React from 'react';
import SearchOverlay from '../../../../../modules/Search/components/SearchOverlay/SearchOverlay';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import PropTypes from "prop-types";
import NoResults from "../../../../../modules/Search/components/SearchResults/NoResults";

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('SearchOverlay Component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props= {
			nrOfResults: 4,
			nrOfViewMore: 1,
			filters: ['filter1', 'filter2'],
			searchRootPath: 'searchRootPath',
			showAllStyle: "test",
			topFaqLabel: "faqLabel",
			faqPagePath: "/content/search",
			searchNrOfResults: 5,
			searchNrOfViewMore: 5,
			resultPage: "/content/search",
			searchDefaultList:[{"title":"titel1","description":"desc1","url":"/content/adc/freestylelibrede/de/de/v3/agb"},{"title":"title3","description":"decs2","url":"/content/adc/freestylelibrede/de/de/v3/agb"}],
			rendition:"v2-rendition",
			noResultDescription:"description",
			noResultBtnLink:"/content/search"
		};
		wrapper = shallow(<SearchOverlay {...props} />);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	/*	test('has nrOfResults as prop and is of type number', () => {
			const nrOfResultsProp = wrapper.instance().props.nrOfResults;
			expect(typeof nrOfResultsProp).toBe('number');
		});

		test('has nrOfViewMore as prop and is of type number', () => {
			const nrOfViewMoreProp = wrapper.instance().props.nrOfViewMore;
			expect(typeof nrOfViewMoreProp).toBe('number');
		});

		test('has searchrOfResults as prop and is of type number', () => {
			const searchNrOfResultsProp = wrapper.instance().props.searchNrOfResults;
			expect(typeof searchNrOfResultsProp).toBe('number');
		});

		test('has searchNrOfViewMore as prop and is of type number', () => {
			const searchNrOfViewMoreProp = wrapper.instance().props.searchNrOfViewMore;
			expect(typeof searchNrOfViewMoreProp).toBe('number');
		});

		/!*test('has query as prop and is of type string', () => {
			const queryProp = wrapper.instance().props.query;
			expect(typeof queryProp).toBe('string');
		});
*!/
		test('has searchRootPath as prop and is of type string', () => {
			const searchRootPathProp = wrapper.instance().props.searchRootPath;
			expect(typeof searchRootPathProp).toBe('string');
		});

		test('has result as prop and is of type object', () => {
			const resultProp = wrapper.instance().props.result;
			expect(resultProp).toBeInstanceOf(Object);
		});

		test('has isLoading as prop and is of type boolean', () => {
			const isLoadingProp = wrapper.instance().props.isLoading;
			expect(typeof isLoadingProp).toBe('boolean');
		});

		test('has filters as prop and is of type array', () => {
			const filtersProp = wrapper.instance().props.filters;
			expect(filtersProp).toBeInstanceOf(Array);
		});

		test('has change as prop and is of type function', () => {
			const changeProp = wrapper.instance().props.change;
			expect(typeof changeProp).toBe('function');
		});

		test('has getSearchResultRequest as prop and is of type function', () => {
			const getSearchResultRequestProp = wrapper.instance().props.getSearchResultRequest;
			expect(typeof getSearchResultRequestProp).toBe('function');
		});
*/
	});

});

