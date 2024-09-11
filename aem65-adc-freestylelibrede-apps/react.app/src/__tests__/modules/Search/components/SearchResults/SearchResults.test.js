import React from 'react';
import SearchResults from '../../../../../modules/Search/components/SearchResults/SearchResults';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import PropTypes from "prop-types";

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<SearchResults store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('SearchResults Component Test Suite with v2-rendition', () => {
	let props, wrapper;
	const changeMock = jest.fn();
	const getSearchResultRequestMock = jest.fn();

	beforeEach(() => {
		props= {
			nrOfResults: 4,
			nrOfViewMore: 1,
			filters: ['filter1', 'filter2'],
			searchRootPath: 'searchRootPath',
			change: changeMock,
			getSearchResultRequest: getSearchResultRequestMock,
			searchDefaultList:[{"title":"titel1","description":"desc1","url":"/content/adc/freestylelibrede/de/de/v3/agb"},{"title":"title3","description":"decs2","url":"/content/adc/freestylelibrede/de/de/v3/agb"}],
			rendition:"v2-rendition",
			noResultDescription:"description",
			noResultBtnLink:"/content/search"
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has nrOfResults as prop and is of type number', () => {
			const nrOfResultsProp = wrapper.instance().props.nrOfResults;
			expect(typeof nrOfResultsProp).toBe('number');
		});

		test('has nrOfViewMore as prop and is of type number', () => {
			const nrOfViewMoreProp = wrapper.instance().props.nrOfViewMore;
			expect(typeof nrOfViewMoreProp).toBe('number');
		});

		test('has query as prop and is of type string', () => {
			const queryProp = wrapper.instance().props.query;
			expect(typeof queryProp).toBe('string');
		});

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
		test('has searchDefaultList as prop and is of type array', () => {
			const searchDefaultListProp = wrapper.instance().props.searchDefaultList;
			expect(searchDefaultListProp).toBeInstanceOf(Array);
		});

		test('has change as prop and is of type function', () => {
			const changeProp = wrapper.instance().props.change;
			expect(typeof changeProp).toBe('function');
		});

		test('has getSearchResultRequest as prop and is of type function', () => {
			const getSearchResultRequestProp = wrapper.instance().props.getSearchResultRequest;
			expect(typeof getSearchResultRequestProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(typeof stateCheck.amountToShow).toBe('number');
			expect(stateCheck.amountToShow).toBe(4);
		});
	});

	describe('Functions check', () => {

		test('addEventListeners function call check', () => {
			const addEventListenersMock = wrapper.instance().addEventListeners;
			expect(typeof addEventListenersMock).toBe('function');
		});

		test('search function call check', () => {
			const searchMock = wrapper.instance().search;
			expect(typeof searchMock).toBe('function');

			searchMock('query');
			const getSearchResultRequestMockCallCount = getSearchResultRequestMock.mock.calls.length;
			expect(getSearchResultRequestMockCallCount).toBeDefined();
		});

		test('loadMore function call check', () => {
			const loadMoreMock = wrapper.instance().loadMore;
			expect(typeof loadMoreMock).toBe('function');

			wrapper.instance().setState({amountToShow: 1});
			loadMoreMock();
			expect(wrapper.instance().state.amountToShow).toBe(2);
		});

		test('filterByPath function call check', () => {
			const filterByPathMock = wrapper.instance().filterByPath;
			expect(typeof filterByPathMock).toBe('function');

			const resultProp = wrapper.instance().props.result;
			expect(filterByPathMock(resultProp)).toBeUndefined();
		});

		test('filterByTag function call check', () => {
			const filterByTagMock = wrapper.instance().filterByTag;
			expect(typeof filterByTagMock).toBe('function');

			const resultProp = wrapper.instance().props.result;
			expect(filterByTagMock(resultProp)).toBeTruthy();
		});

		test('filterByPagination function call check', () => {
			const filterByPaginationMock = wrapper.instance().filterByPagination;
			expect(typeof filterByPaginationMock).toBe('function');

			wrapper.instance().setState({amountToShow: 1});
			const resultProp = wrapper.instance().props.result;

			expect(filterByPaginationMock(resultProp, 0)).toBeTruthy();
			expect(filterByPaginationMock(resultProp, 2)).toBeFalsy();
		});

		test('filteredHits function call check', () => {
			const filteredHitsMock = wrapper.instance().filteredHits;
			expect(typeof filteredHitsMock).toBe('function');

			expect(filteredHitsMock()).toEqual([]);
		});

		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();

			const changeMockCallCount = changeMock.mock.calls.length;
			expect(changeMockCallCount).toBeDefined();

			const getSearchResultRequestMockCallCount = getSearchResultRequestMock.mock.calls.length;
			expect(getSearchResultRequestMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {result: {}};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.amountToShow).toBe(4);
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {formValues: {filters:['function']}};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.amountToShow).toBe(4);
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			wrapper.setProps({formValues: {filters:['query123']}, searchRootPath: 'ab', result: [{location: 'ab', categorytagfacets: ['query123']}]}, () => {
				const prevProps= {formValues: {filters:['function']}};
				wrapper.instance().componentDidUpdate(prevProps);
				expect(wrapper.instance().state.amountToShow).toBe(4);
			});			
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			wrapper.setProps({formValues: {filters:['query456']}, searchRootPath: 'ab', result: [{location: 'ab', categorytagfacets: ['filqry']}]}, () => {
				const prevProps= {formValues: {filters:['function']}};
				wrapper.instance().componentDidUpdate(prevProps);
				expect(wrapper.instance().state.amountToShow).toBe(4);
			});			
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
			wrapper.setProps({result: null}, () => {
				const prevProps= {formValues: {filters:['function']}};
				wrapper.instance().componentDidUpdate(prevProps);
				expect(wrapper.instance().state.amountToShow).toBe(4);
			});			
		});

	});
	describe('SearchResults Component Test Suite with v1-rendition', () => {
		let props, wrapper;
		const changeMock = jest.fn();
		const getSearchResultRequestMock = jest.fn();

		beforeEach(() => {
			props = {
				nrOfResults: 4,
				nrOfViewMore: 1,
				filters: ['filter1', 'filter2'],
				searchRootPath: 'searchRootPath',
				change: changeMock,
				getSearchResultRequest: getSearchResultRequestMock,
				searchDefaultList: [],
				rendition: "v1-rendition"
			};
			wrapper = setup(props);
		});

		describe('propTypes check', () => {

			test('render check', () => {
				expect(wrapper.type()).not.toEqual(null);
			});

			test('renders without crashing', () => {
				expect(wrapper).toBeDefined();
			});
		});
	});

});

