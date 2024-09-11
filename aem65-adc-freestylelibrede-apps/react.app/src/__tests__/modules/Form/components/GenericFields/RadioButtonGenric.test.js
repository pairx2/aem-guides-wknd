import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import RadioButtonGenric from '../../../../../modules/Form/components/GenericFields/RadioButtonGenric';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
})

const setup = ( props = {}) => {
    const wrapper = shallow(<RadioButtonGenric store={mockStore} {...props}/>);
    return wrapper;
}

describe('Refund reship component redition test ', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
           
        };
        wrapper = setup(props)
        });
        test('render check',() => {
            expect(wrapper.type()).not.toEqual(null);
        });
        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
    
});



