import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DocumentCountSection from '../../../../../modules/MyAccount/components/OrderDocumentList/DocumentCountSection';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('DocumentCountSection component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			isButtonClicked: true,
            query: ''
		};
	wrapper = shallow(<DocumentCountSection {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('DocumentCountSection component Test Suite isButtonClicked: false, query length>0', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			isButtonClicked: false,
            query:'test'
		};
	wrapper = shallow(<DocumentCountSection {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('DocumentCountSection component Test Suite isButtonClicked: false, query length=0', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			isButtonClicked: false,
            query:''
		};
	wrapper = shallow(<DocumentCountSection {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});