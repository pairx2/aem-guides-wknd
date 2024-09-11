import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SimpleDateField from '../../../../../modules/Form/components/GenericFields/SimpleDateField';

jest.mock('../../../../../utils/siteData');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('SimpleDateField Component Test Suite', () => {
	let props;
	let wrapper;
	const setSelectedValueMock = jest.fn();
	beforeEach(() => {
		props = {
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			name: 'string',
			selectedValue: 'value',
			setSelectedValue: setSelectedValueMock,
			isUndetermined: true,
			isDisabled: false
		};
		wrapper = shallow(<SimpleDateField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('normalize function call in Field', () => {
		const normalizeProp = wrapper.props().children.props.normalize;
		expect(typeof normalizeProp).toBe('function');

		expect(normalizeProp('val', 'prevVal')).toBe('va');

		expect(normalizeProp([1,2], [6,7,8,9])).toEqual([1,2]);

		expect(normalizeProp([1,2], [6])).toBe('1,2.');
		expect(normalizeProp([1,2,3,4,5], [6])).toBe('1,2,3,4,5.');

		expect(normalizeProp('value')).toBe('valu');
		expect(normalizeProp('longValueName', 'prevVal')).toBe('longValueNam');

		expect(normalizeProp([1,2,3,4,5,6,7,8,9,10,11,12,13], [6])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


	});
});
