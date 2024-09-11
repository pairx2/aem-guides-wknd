import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MiniCartRowInfo from '../../../../../modules/Cart/components/MiniCart/MiniCartRowInfo';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('MiniCartRowInfo Component Test Suite - isSubscription: false ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'nameString',
			quantity: 1,
			uom: 1,
			deliveryDate: '05/05/2020',
			isSubscription: false,
			bundle: {'label':'b'}
		};
		wrapper = shallow(<MiniCartRowInfo {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('h5 tag ',() => {
		expect(wrapper.props().children[0].type).toBe('h5');
		expect(wrapper.props().children[0].props.children).toBe('nameString');

	});
	test('p tag ',() => {
		expect(wrapper.props().children[1].props.children[0].type).toBe('p');
		expect(wrapper.props().children[1].props.children[0].props.children.type.name).toBe('I18n');

		expect(wrapper.props().children[1].props.children[1].type).toBe('p');

	});
});
describe('MiniCartRowInfo Component Test Suite - isSubscription: true ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'nameString',
			quantity: 1,
			uom: 1,
			deliveryDate: '05/05/2020',
			isSubscription: true,
			bundle: {'label':'b','values':[{'quantity':1}]}
		};
		wrapper = shallow(<MiniCartRowInfo {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('h5 tag ',() => {
		expect(wrapper.props().children[0].type).toBe('h5');
		expect(wrapper.props().children[0].props.children).toBe('nameString');

	});
	test('p tag ',() => {
		expect(wrapper.props().children[2].type).toBe('p');
		expect(wrapper.props().children[2].props.children[0].type.name).toBe('I18n');

	});
});

