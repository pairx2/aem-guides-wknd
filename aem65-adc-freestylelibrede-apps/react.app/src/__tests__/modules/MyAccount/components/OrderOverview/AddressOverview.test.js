import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AddressOverview from '../../../../../modules/MyAccount/components/OrderOverview/AddressOverview';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
    adapter: new EnzymeAdapter(),
});
describe('AddressOverview Component Test Suite', () => {

    let props, wrapper;

    beforeEach(() => {
        props = {
            addressHeading: '',
            description: '',
            addressCards: [],
            cashPay: true,
            rxOrder: false,
            plusService: false
        };
        wrapper = shallow(<AddressOverview {...props} />);
    });
    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    test('render check',() => {
        expect(wrapper.type()).not.toEqual(null);
    });
});
