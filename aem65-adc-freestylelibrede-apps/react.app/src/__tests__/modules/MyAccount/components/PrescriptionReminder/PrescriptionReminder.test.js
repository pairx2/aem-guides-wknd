import React from 'react';
import PrescriptionReminder from '../../../../../modules/MyAccount/components/PrescriptionReminder/PrescriptionReminder';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
})

const setup = ( props = {}) => {
    const wrapper = shallow(<PrescriptionReminder store={mockStore} {...props}/>).dive().dive();
    return wrapper;
}

describe('Prescription Reminder component test Suite with rendition: "account-overview", for RX free order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            prescriptionEndDate: 1669161600000,
            cta: {},
            rendition: "account-overview",
            customer:{
                rx_free: true
            },
            orders: [{
                serviceData: [ {
                    serviceStatus: "Active",
                    serviceToDate: "1669161600000",
                    serviceFromDate: "1651161600000"                   
                }]
            }]
        };
        wrapper = setup(props)
        });

    test('Test for card component Rendering', () => {
		expect(wrapper.find('prescriptionReminderTitle')).toBeDefined();
	});
   
});
describe('Prescription Reminder component test Suite with rendition: "account-overview", for not RX free order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            prescriptionEndDate: 1669161600000,
            cta: {},
            rendition: "account-overview",
            customer:{
                rx_free: false
            },
            orders: [{
                serviceData: [ {
                    serviceStatus: "Active",
                    serviceToDate: "1669161600000",
                    serviceFromDate: "1651161600000"                   
                }]
            }]
        };
        wrapper = setup(props)
        });

    test('Test for card component Rendering', () => {
		expect(wrapper.find('prescriptionReminderTitle')).toBeDefined();
	});
   
});

describe('Prescription Reminder component test Suite with rendition==="rx-checkout", for RX free order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            prescriptionEndDate: 1669161600000,
            cta: {},
            rendition: "rx-checkout",
            customer:{
                rx_free: true
            },
            orders: [{
                serviceData: [ {
                    serviceStatus: "Active",
                    serviceToDate: "1669161600000",
                    serviceFromDate: "1651161600000"                   
                }]
            }]
        };
        wrapper = setup(props)
        });

    test('Test for card component Rendering', () => {
		expect(wrapper.find('prescriptionReminderTitle')).toBeDefined();
	});
   
});

describe('Prescription Reminder component test Suite with rendition==="rx-checkout", for not RX free order', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            prescriptionEndDate: 1669161600000,
            cta: {},
            rendition: "rx-checkout",
            customer:{
                rx_free: false
            },
            orders: [{
                serviceData: [ {
                    serviceStatus: "Active",
                    serviceToDate: "1669161600000",
                    serviceFromDate: "1651161600000"                   
                }]
            }]
        };
        wrapper = setup(props)
        });

    test('Test for card component Rendering', () => {
		expect(wrapper.find('prescriptionReminderTitle')).toBeDefined();
	});
   
});
