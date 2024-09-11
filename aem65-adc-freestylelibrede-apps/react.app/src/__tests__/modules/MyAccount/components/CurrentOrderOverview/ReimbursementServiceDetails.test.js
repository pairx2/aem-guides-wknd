import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import ReimbursementServiceDetails from '../../../../../modules/MyAccount/components/CurrentOrderOverview/ReimbursementServiceDetails';


Enzyme.configure({
    adapter: new EnzymeAdapter(),
});

describe('ReimbursementServiceDetails component Test Suite with service data', () => {
    let props, wrapper;

    beforeEach(() => {

        props = {
            serviceData: [{
                'serviceSKU': '1-71538-01',
                'serviceName': 'FreeStyle Libre Sensor Subscription',
                'serviceFromDate': 1587945600000,
                'serviceToDate': null,
                'serviceFrequency': '3',
                'serviceDuration': 12,
                'serviceProductQuantity': 1,
                'serviceStatus': 'Active'
            }],
            ghostOrders: [{
                'status_code': 50
            }],
            productData: [{
                'deliverableStatus': 'Scheduled'
            }],
            isPaymentDetails: true
        },
            wrapper = shallow(<ReimbursementServiceDetails {...props} />);
    });

    describe('props check', () => {

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });

    });
});

describe('ReimbursementServiceDetails component Test Suite without service data', () => {
    let props, wrapper;

    beforeEach(() => {

        props = {
            serviceData: [],
            ghostOrders: [{
                'status_code': 50
            }],
            productData: [{
                deliverableStatus: 'Scheduled',
                deliverableDuration: 12
            }],
            isPaymentDetails: true
        },
            wrapper = shallow(<ReimbursementServiceDetails {...props} />);
    });

    describe('props check', () => {

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
    });
});

describe('ReimbursementServiceDetails component Test Suite with isPyamentDetails false', () => {
    let props, wrapper;
    beforeEach(() => {
        props = {
            serviceData: [],
            ghostOrders: [{
                'status_code': 50
            }],
            productData: [{
                deliverableStatus: 'Scheduled',
                deliverableDuration: 12
            }],
            isPaymentDetails: false
        },
            wrapper = shallow(<ReimbursementServiceDetails {...props} />);
    });

    describe('props check', () => {

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });

    });
});

describe('ReimbursementServiceDetails component Test Suite with deliverableDuration null', () => {
    let props, wrapper;

    beforeEach(() => {

        props = {
            serviceData: [],
            ghostOrders: [{
                'status_code': null
            }],
            productData: [{
                deliverableStatus: null,
                deliverableDuration: null
            }],
            isPaymentDetails: false
        },
            wrapper = shallow(<ReimbursementServiceDetails {...props} />);
    });

    describe('props check', () => {

        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });

    });
});
