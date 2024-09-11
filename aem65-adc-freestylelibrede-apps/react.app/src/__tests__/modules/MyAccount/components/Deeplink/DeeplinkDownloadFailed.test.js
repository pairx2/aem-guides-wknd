import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import DeeplinkDownloadFailed from '../../../../../modules/MyAccount/components/Deeplink/DeeplinkDownloadFailed';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<DeeplinkDownloadFailed store= {mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('DeeplinkDownloadFailed component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			modalProps: {
				paragraph_1: 'paragraph',
			},
			closeModalAction: jest.fn(),
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});
});