import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../__mocks__/storeMock';
import CreateOrderErrorModal from '../../../../modules/Payment/components/CreateOrderErrorModal';

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

const setup = (props = {}) => {
    const wrapper = shallow(<CreateOrderErrorModal store={mockStore} {...props}/>).dive().dive();
    return wrapper;
};

describe('CreateOrderErrorModal Component Test Suite', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            modalProps: {
                readerInformation: 'readerInformation',
                callCTAStyle: 'callCTAStyle',
                buttonAction: 'buttonAction',
                buttonLabel: 'buttonLabel'
            }
        };
        wrapper = setup(props);
    });

    describe('render type check', () => {
        test('render check', () => {
            expect(wrapper.type()).not.toEqual(null);
        });
        test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
    });
});