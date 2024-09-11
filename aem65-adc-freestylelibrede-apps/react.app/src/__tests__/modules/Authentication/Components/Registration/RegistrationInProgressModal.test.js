import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import RegistrationInProgressModal from '../../../../../modules/Authentication/components/Registration/RegistrationInProgressModal';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('RegistrationInProgressModal Component Test Suite', () => {
	let props, wrapper;
	const closeModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			modalProps: {errorMessage: 'errorMessage'},
			closeModalAction: closeModalActionMock
		};
		wrapper = shallow(<RegistrationInProgressModal {...props}/>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});





