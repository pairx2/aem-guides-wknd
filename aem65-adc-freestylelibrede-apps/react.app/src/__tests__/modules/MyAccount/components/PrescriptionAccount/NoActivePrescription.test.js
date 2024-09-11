import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import NoActivePrescription  from '../../../../../modules/MyAccount/components/PrescriptionAccount/NoActivePrescription';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('NoActivePrescription component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			title: 'title',
			description: 'description',
			image: 'image',
			noprescriptionlink: 'noprescriptionlink'
		};
		wrapper = shallow(<NoActivePrescription {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
