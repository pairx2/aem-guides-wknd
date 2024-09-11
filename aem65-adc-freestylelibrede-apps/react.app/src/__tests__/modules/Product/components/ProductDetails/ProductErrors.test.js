import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductErrors from '../../../../../modules/Product/components/ProductDetails/ProductErrors';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('ProductErrors component Test Suite', () => {
	let props, wrapper;
    beforeEach(() => {
		props = {
			IsErrorCodeGeneric: true,
            error: 'nothisng',
            errorCodes: 3445,
            undeterminedUomError: 'fgsfJHSFKJA'
		};
	wrapper = shallow(<ProductErrors {...props} />);
	});
    test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('ProductErrors component Test Suite', () => {
	let props, wrapper;
    beforeEach(() => {
		props = {
			IsErrorCodeGeneric: false,
            error: 'nothisng',
            errorCodes: 3445,
            undeterminedUomError: 'fgsfJHSFKJA'
		};
	wrapper = shallow(<ProductErrors {...props} />);
	});
    test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});