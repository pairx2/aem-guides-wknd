import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchBar from '../../../../../modules/Search/components/SearchBar/SearchBar';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props= {}) => {
	const wrapper = shallow(<SearchBar store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<SearchBar store= {mockStoreOrder} {...props}/>);
	return wrapper;
};

describe('SearchBar Component Test Suite with isInBanner as true', () => {
	let props, wrapper;
	const fetchDictionaryMock= jest.fn();
	const getSearchBarResultRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			fetchDictionary: fetchDictionaryMock,
			getSearchBarResultRequest: getSearchBarResultRequestMock,
			nrOfResults: 1,
			nrOfViewMore: 1,
			resultPage: 'resultPage',
			isInBanner: true,
			showAllStyle: 'showAllStyle',
			searchRootPath: 'searchRootPath',
			topFaqLabel: 'Top 10 FAQ',
			faqPagePath: 'faqpath'
		};
		wrapper= setup( props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has resultPage is a prop of type string', () => {
			const resultPageProp = wrapper.instance().props.resultPage;
			expect(typeof resultPageProp).toBe('string');
		});

		test('has showAllStyle is a prop of type string', () => {
			const showAllStyleProp = wrapper.instance().props.showAllStyle;
			expect(typeof showAllStyleProp).toBe('string');
		});

		test('has searchRootPath is a prop of type string', () => {
			const searchRootPathProp = wrapper.instance().props.searchRootPath;
			expect(typeof searchRootPathProp).toBe('string');
		});

		test('has nrOfResults is a prop of type number', () => {
			const nrOfResultsProp = wrapper.instance().props.nrOfResults;
			expect(typeof nrOfResultsProp).toBe('number');
		});

		test('has nrOfViewMore is a prop of type number', () => {
			const nrOfViewMoreProp = wrapper.instance().props.nrOfViewMore;
			expect(typeof nrOfViewMoreProp).toBe('number');
		});

		test('has isSearchBarLoading is a prop of type boolean', () => {
			const isSearchBarLoadingProp = wrapper.instance().props.isSearchBarLoading;
			expect(typeof isSearchBarLoadingProp).toBe('boolean');
		});

		test('has isFaqSearchBarLoading is a prop of type boolean', () => {
			const isFaqSearchBarLoadingProp = wrapper.instance().props.isFaqSearchBarLoading;
			expect(typeof isFaqSearchBarLoadingProp).toBe('boolean');
		});

		test('has isInBanner is a prop of type boolean', () => {
			const isInBannerProp = wrapper.instance().props.isInBanner;
			expect(typeof isInBannerProp).toBe('boolean');
		});

		test('has result is a prop of type array', () => {
			const resultProp = wrapper.instance().props.result;
			expect(resultProp).toBeInstanceOf(Array);
		});

		test('has faqResult is a prop of type array', () => {
			const faqResultProp = wrapper.instance().props.faqResult;
			expect(faqResultProp).toBeInstanceOf(Array);
		});

		test('has dictionary is a prop of type object', () => {
			const dictionaryProp = wrapper.instance().props.dictionary;
			expect(dictionaryProp).toBeInstanceOf(Object);
		});

		test('has fetchDictionary is a prop of type function', () => {
			const fetchDictionaryProp = wrapper.instance().props.fetchDictionary;
			expect(typeof fetchDictionaryProp).toBe('function');
		});

		test('has getSearchBarResultRequest is a prop of type function', () => {
			const getSearchBarResultRequestProp = wrapper.instance().props.getSearchBarResultRequest;
			expect(typeof getSearchBarResultRequestProp).toBe('function');
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(stateCheck.dropdownOpen).toBeFalsy();
			expect(stateCheck.query).toBe('');
			expect(stateCheck.amountToShow).toBe(1);
		});
	});

	describe('Functions check', () => {

		test('toggleDropdown function call check', () => {
			const toggleDropdownMock = wrapper.instance().toggleDropdown;
			expect(typeof toggleDropdownMock).toBe('function');

			toggleDropdownMock(true);
			expect(wrapper.instance().state.dropdownOpen).toBeTruthy();
		});

		test('getSearchBarResults function call check', () => {
			const getSearchBarResultsMock = wrapper.instance().getSearchBarResults;
			expect(typeof getSearchBarResultsMock).toBe('function');

			getSearchBarResultsMock('query');
			const getSearchBarResultRequestMockCallCount = getSearchBarResultRequestMock.mock.calls.length;
			expect(getSearchBarResultRequestMockCallCount).toBeDefined();
			getSearchBarResultsMock(' ');
		});

		test('changeQuery function call check', () => {
			const changeQueryMock = wrapper.instance().changeQuery;
			expect(typeof changeQueryMock).toBe('function');

			const e = {target: {value: 'query'}};
			changeQueryMock(e);

			const getSearchBarResultRequestMockCallCount = getSearchBarResultRequestMock.mock.calls.length;
			expect(getSearchBarResultRequestMockCallCount).toBeDefined();
		});
		test('changeQuery function call check', () => {
			const changeQueryMock = wrapper.instance().changeQuery;
			expect(typeof changeQueryMock).toBe('function');
			wrapper.instance().setState({timeGap: true});

			const e = {target: {value: 'query'}};
			changeQueryMock(e);

			const getSearchBarResultRequestMockCallCount = getSearchBarResultRequestMock.mock.calls.length;
			expect(getSearchBarResultRequestMockCallCount).toBeDefined();
		});

		test('changeQuery function call check', () => {
			const changeQueryMock = wrapper.instance().changeQuery;
			expect(typeof changeQueryMock).toBe('function');
			wrapper.instance().setState({timeGap: false, delay: 1});

			const e = {target: {value: 'query'}};
			changeQueryMock(e);

			const getSearchBarResultRequestMockCallCount = getSearchBarResultRequestMock.mock.calls.length;
			expect(getSearchBarResultRequestMockCallCount).toBeDefined();
		});

		test('handleKeyDown function call check', () => {
			const handleKeyDownMock = wrapper.instance().handleKeyDown;
			expect(typeof handleKeyDownMock).toBe('function');

			const e = {key: 'Enter'};
			expect(handleKeyDownMock(e)).toBeUndefined();
		});
		test('handleKeyDown function call check', () => {
			const handleKeyDownMock = wrapper.instance().handleKeyDown;
			expect(typeof handleKeyDownMock).toBe('function');

			const e = {key: 'Shift'};
			expect(handleKeyDownMock(e)).toBeUndefined();
		});

		test('handleSearch function call check', () => {
			const handleSearchMock = wrapper.instance().handleSearch;
			expect(typeof handleSearchMock).toBe('function');

			expect(handleSearchMock()).toBeUndefined();
		});

		test('handleSearch function call check', () => {
			wrapper.setProps({resultPage : window.location.origin + window.location.pathname}, () => {
				const handleSearchMock = wrapper.instance().handleSearch;
				expect(typeof handleSearchMock).toBe('function');
	
				expect(handleSearchMock()).toBeUndefined();
			});			
		});

		test('handleSearch function call check', () => {
			wrapper.setProps({rendition : 'v2-rendition'}, () => {
				const handleSearchMock = wrapper.instance().handleSearch;
				expect(typeof handleSearchMock).toBe('function');
	
				expect(handleSearchMock()).toBeUndefined();
			});			
		});

		test('showMoreResults function call check', () => {
			const showMoreResultsMock = wrapper.instance().showMoreResults;
			expect(typeof showMoreResultsMock).toBe('function');

			showMoreResultsMock();
			expect(wrapper.instance().state.amountToShow).toBe(2);
		});

		test('filterByPagination function call check', () => {
			const filterByPaginationMock = wrapper.instance().filterByPagination;
			expect(typeof filterByPaginationMock).toBe('function');

			expect(filterByPaginationMock()).toBeFalsy();
		});

		test('filterByPath function call check', () => {
			const filterByPathMock = wrapper.instance().filterByPath;
			expect(typeof filterByPathMock).toBe('function');

			const result= {location: 'location'};
			expect(filterByPathMock(result)).toBeFalsy();
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
			const fetchDictionaryMockCallCount = fetchDictionaryMock.mock.calls.length;
			expect(fetchDictionaryMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {faqResult: {}, result: {}};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);

			const prevPropsTwo= {};
			wrapper.instance().componentDidUpdate(prevPropsTwo);
			expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);
		});
		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {faqResult: {...wrapper.instance().props.faqResult}, result: {}};
			wrapper.instance().componentDidUpdate(prevProps);

			const prevPropsTwo= {result:{...wrapper.instance().props.result}};
			wrapper.instance().componentDidUpdate(prevPropsTwo);
		});

		test('handleClickOutside function call check', () => {
			const handleClickOutsideMock = wrapper.props().handleClickOutside;
			expect(typeof handleClickOutsideMock).toBe('function');

			handleClickOutsideMock(false);
			expect(wrapper.instance().state.dropdownOpen).toBeFalsy();
		});

		test('onFocus function call check', () => {
			const onFocusMock = wrapper.props().children.props.children[0].props.onFocus;
			expect(typeof onFocusMock).toBe('function');

			onFocusMock(true);
			expect(wrapper.instance().state.dropdownOpen).toBeTruthy();
		});

	});
});

describe('SearchBar Component Test Suite with isInBanner as false', () => {
	let props, wrapper;
	const fetchDictionaryMock= jest.fn();
	const getSearchBarResultRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			fetchDictionary: fetchDictionaryMock,
			getSearchBarResultRequest: getSearchBarResultRequestMock,
			nrOfResults: 1,
			nrOfViewMore: 1,
			resultPage: 'resultPage',
			isInBanner: false,
			showAllStyle: 'showAllStyle',
			searchRootPath: 'searchRootPath',
			rendition:'v2-rendition'
		};
		wrapper= setup( props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		const prevProps= {result: {}};
		wrapper.instance().componentDidUpdate(prevProps);
		expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);

		const prevPropsTwo= {};
		wrapper.instance().componentDidUpdate(prevPropsTwo);
		expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);
	});

	test('filteredHits function call check', () => {
		const filteredHitsMock = wrapper.instance().filteredHits;
		expect(typeof filteredHitsMock).toBe('function');

		expect(filteredHitsMock()).toEqual([]);
	});

	test('componentDidUpdate function call check', () => {
		wrapper.setState({dropdownOpen: true, query: 'query'}, () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

		});
		
	});
	
	test('componentDidUpdate function call check', () => {
		wrapper.setState({dropdownOpen: true, query: 'query'}, () => {
			wrapper.setProps({isSearchBarLoading: true}, () => {
				const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
				expect(typeof componentDidUpdateMock).toBe('function');
			});
		});
		
	});

	test('componentDidUpdate function call check', () => {
		wrapper.setState({amountToShow: 3, dropdownOpen: true, query: 'query'}, () => {
			wrapper.setProps({isSearchBarLoading: true, result: [{}]}, () => {
				const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
				expect(typeof componentDidUpdateMock).toBe('function');
			});
		});
		
	});

	test('componentDidUpdate function call check', () => {
		wrapper.setState({amountToShow: 3, dropdownOpen: true, query: 'query'}, () => {
			wrapper.setProps({isSearchBarLoading: false, searchRootPath: 'query', result: [{location: 'query'}]}, () => {
				const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
				expect(typeof componentDidUpdateMock).toBe('function');
			});
		});
		
	});

});

describe('SearchBar Component Test Suite with isInBanner as true', () => {
	let props, wrapper;
	const fetchDictionaryMock= jest.fn();
	const getSearchBarResultRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			fetchDictionary: fetchDictionaryMock,
			getSearchBarResultRequest: getSearchBarResultRequestMock,
			nrOfResults: 1,
			nrOfViewMore: 1,
			resultPage: 'resultPage',
			isInBanner: true,
			showAllStyle: 'showAllStyle',
			searchRootPath: 'searchRootPath',
			topFaqLabel: 'Top 10 FAQ',
			faqPagePath: 'faqpath'
		};
		wrapper= setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	
	

});


describe('SearchBar Component Test Suite with isInBanner as false', () => {
	let props, wrapper;
	const fetchDictionaryMock= jest.fn();
	const getSearchBarResultRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			fetchDictionary: fetchDictionaryMock,
			getSearchBarResultRequest: getSearchBarResultRequestMock,
			nrOfResults: 0,
			nrOfViewMore: 0,
			resultPage: 'resultPage',
			isInBanner: false,
			showAllStyle: null,
			searchRootPath: 'searchRootPath',
			topFaqLabel: 'Top 10 FAQ',
			faqPagePath: 'faqpath',
			faqResult : null,
			result: null
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('handleSearch function call check', () => {
		const handleSearchMock = wrapper.instance().handleSearch;
		expect(typeof handleSearchMock).toBe('function');

		expect(handleSearchMock()).toBeUndefined();
	});

	test('handleSearch function call check', () => {
		wrapper.setProps({resultPage : window.location.origin + window.location.pathname}, () => {
			const handleSearchMock = wrapper.instance().handleSearch;
			expect(typeof handleSearchMock).toBe('function');

			expect(handleSearchMock()).toBeUndefined();
		});			
	});

	test('handleSearch function call check', () => {
		wrapper.setProps({rendition : 'v2-rendition'}, () => {
			const handleSearchMock = wrapper.instance().handleSearch;
			expect(typeof handleSearchMock).toBe('function');

			expect(handleSearchMock()).toBeUndefined();
		});			
	});

	test('filteredHits function call check', () => {
		const filteredHitsMock = wrapper.instance().filteredHits;
		expect(typeof filteredHitsMock).toBe('function');

		expect(filteredHitsMock()).toEqual([]);
	});

	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		wrapper.setProps({result: null}, () => {
			const prevProps= {faqResult: [], result:[{title: 'a', location: 'b'}]};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);

		});
		
	});

	

});

describe('SearchBar Component Test Suite with isInBanner as true 2', () => {
	let props, wrapper;
	const fetchDictionaryMock= jest.fn();
	const getSearchBarResultRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			fetchDictionary: fetchDictionaryMock,
			getSearchBarResultRequest: getSearchBarResultRequestMock,
			nrOfResults: 1,
			nrOfViewMore: 1,
			resultPage: 'resultPage',
			isInBanner: true,
			showAllStyle: 'showAllStyle',
			searchRootPath: 'searchRootPath',
			topFaqLabel: 'Top 10 FAQ',
			faqPagePath: 'faqpath',
			faqResult : null,
			result: null
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate function call check', () => {
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');
		wrapper.setProps({faqResult: null}, () => {
			const prevProps= {result: [], faqResult:[{title: 'a', location: 'b'}]};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);

			const prevPropsTwo= {};
			wrapper.instance().componentDidUpdate(prevPropsTwo);
			expect(wrapper.instance().state.amountToShow).toBe(wrapper.instance().props.nrOfResults);
		});
		
	});

});


describe('SearchBar Component Test Suite with isInBanner as true, setup1', () => {
	let props, wrapper;
	const fetchDictionaryMock= jest.fn();
	const getSearchBarResultRequestMock= jest.fn();

	beforeEach(() => {
		props= {
			fetchDictionary: fetchDictionaryMock,
			getSearchBarResultRequest: getSearchBarResultRequestMock,
			nrOfResults: 1,
			nrOfViewMore: 1,
			resultPage: 'resultPage',
			isInBanner: true,
			showAllStyle: null,
			searchRootPath: 'searchRootPath',
			topFaqLabel: 'Top 10 FAQ',
			faqPagePath: 'faqpath',
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate function call check', () => {
		wrapper.setState({dropdownOpen: true, query: 'query'}, () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

		});
		
	});

	test('componentDidUpdate function call check', () => {
		wrapper.setState({dropdownOpen: true, query: 'query'}, () => {
			wrapper.setProps({faqResult: [], result: []}, () => {
				const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
				expect(typeof componentDidUpdateMock).toBe('function');
			});
		});
		
	});

});