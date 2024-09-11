import React from 'react';
import PrescriptionNotice from '../../../../../modules/RXWizard/components/WizardInsuranceDisplay/PrescriptionNotice';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
})

const setup = ( props = {}) => {
    const wrapper = shallow(<PrescriptionNotice store={mockStore} {...props}/>).dive().dive();
    return wrapper;
}

describe('Prescription Notice component test Suite setup for rx free order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            prescriptionEndDate: 1669161600000,
            customer: {
                rx_free: true
            },
            allOrders:{
                loading: false,
                fetched: true,
                orders: [{
                    serviceData: [ {
                        serviceStatus: "Active",
                        serviceToDate: "1669161600000",
                        serviceFromDate: "1651161600000"                   
                    }]
                }]
            },

        };
        wrapper = setup(props)
        });

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
   
});

describe('Prescription Notice component test Suite setup for not rx free order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            prescriptionEndDate: 1669161600000,
            customer: {
                rx_free: false
            },
            allOrders:{
                loading: false,
                fetched: true,
                orders: [{
                    serviceData: [ {
                        serviceStatus: "Active",
                        serviceToDate: "1669161600000",
                        serviceFromDate: "1651161600000" 
                    }]
                }]
            },

        };
        wrapper = setup(props)
        });

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
   
});