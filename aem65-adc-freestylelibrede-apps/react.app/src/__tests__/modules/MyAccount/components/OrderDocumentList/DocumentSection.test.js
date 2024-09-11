import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DocumentSection from '../../../../../modules/MyAccount/components/OrderDocumentList/DocumentSection';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('DocumentSection component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			isButtonClicked: true,
		};
	wrapper = shallow(<DocumentSection {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('DocumentSection component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			isButtonClicked: false,
		};
	wrapper = shallow(<DocumentSection {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});