import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import DeactivateAccount from '../../../../../modules/MyAccount/components/CustomerInfo/DeactivateAccount';
import {Provider} from 'react-redux';

jest.mock('../../../../../utils/formUtils');
jest.mock('../../../../../utils/endpointUrl');
jest.mock('../../../../../utils/siteData');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<DeactivateAccount store={mockStore} {...props} />);
	return wrapper;
};

describe('CustomerInfoEdit component Test Suite ', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			cancelDeactivateAccount: jest.fn(),
			deactivateDescription: 'deactivateDescription',
			recaptchaValue: 'recaptchaValue',
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
describe('CustomerInfoEdit component Test Suite ', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			cancelDeactivateAccount: jest.fn(),
			deactivateDescription: 'deactivateDescription',
			recaptchaValue: 'recaptchaValue',
		};
		wrapper = mount(<Provider store={mockStore}><DeactivateAccount  {...props} /></Provider>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});