import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchField from '../../../../../modules/Search/components/SearchBar/SearchField';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('SearchField Component Test Suite, isInBanner true', () => {
	let props;
	let wrapper;
	const handleSearchMock = jest.fn();
	const onKeyDownMock = jest.fn();
	const onFocusMock = jest.fn();
	const onChangeMock = jest.fn();
	beforeEach(() => {
		props = {
			isInBanner: true,
			handleSearch: handleSearchMock,
			onKeyDown: onKeyDownMock,
			onFocus: onFocusMock,
			onChange: onChangeMock,
			topFaqLabel: 'something',
			faqPagePath: 'pathurl',
			rendition: 'v1-rendition'
		};
		wrapper = shallow(<SearchField {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});


describe('SearchField Component Test Suite, isInBanner false', () => {
	let props;
	let wrapper;
	const handleSearchMock = jest.fn();
	const onKeyDownMock = jest.fn();
	const onFocusMock = jest.fn();
	const onChangeMock = jest.fn();
	beforeEach(() => {
		props = {
			isInBanner: false,
			handleSearch: handleSearchMock,
			onKeyDown: onKeyDownMock,
			onFocus: onFocusMock,
			onChange: onChangeMock,
			topFaqLabel: 'something',
			faqPagePath: 'pathurl',
			rendition: 'v1-rendition'
		};
		wrapper = shallow(<SearchField {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});