import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import SocialLoginButtons from '../../../../../modules/Authentication/components/Login/SocialLoginButtons';

jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../api/authentication.service.js');


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('SocialLoginButtons Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
		};
		wrapper = shallow(<SocialLoginButtons {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getSocialResponse function call', () => {
		const actionProp= wrapper.props().children[0].props.action;
		actionProp('FaceBook');
	});

	test('getSocialResponse function call', () => {
		const actionProp= wrapper.props().children[1].props.action;
		actionProp('Google');
	});
});
describe('SocialLoginButtons Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {};
		wrapper = mount(<Provider store= {mockStore}><SocialLoginButtons {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

