import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchFilterField from '../../../../../modules/Form/components/FormFields/SearchFilterField';
import MockForm from '../../../../../__mocks__/mockForm';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('SearchFilterField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			searchFilters:[{name:'name1', label:'label1'},{name:'name2', label:'label2'}]

		};
		wrapper = shallow(<SearchFilterField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('SearchFilterField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			searchFilters:[{name:'name1', label:'label1'},{name:'name2', label:'label2'}]

		};
		wrapper = mount(<Provider store={mockStore}>
			<MockForm>
				<SearchFilterField {...props} />
			</MockForm>
		</Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('trigger input field change event', () => {
		wrapper.find('input').forEach((element) => element.simulate('change', { target: { value: true } }));
		wrapper.find('input').forEach((element) => element.simulate('mouseup', { target: { value: true } }));
		expect(wrapper.find('input').get(0).props.checked).toEqual(true);
	});

});


