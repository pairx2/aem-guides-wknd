import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import ForgetPasswordModal from "../../../../../modules/Authentication/components/Login/ForgetPasswordModal";

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

const setup = (props) => {
    const wrapper = shallow(<ForgetPasswordModal store= {mockStore} {...props}/>).dive().dive();
    return wrapper;
};
describe('ForgetPasswordModal component Test Suite', () => {
    let props, wrapper;
    const onConfirmActionMock = jest.fn();

    beforeEach(() => {
        props = {
                forgetPasswordLink: 'String'
            }
        wrapper = setup(props);
    });
    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });
    test('render check',() => {
        expect(wrapper.type()).not.toEqual(null);
    });
});