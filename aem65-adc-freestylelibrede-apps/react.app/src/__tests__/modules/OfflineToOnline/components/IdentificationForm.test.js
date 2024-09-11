import * as React from 'react';
import {mockStore} from '../../../../__mocks__/storeMock';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import IdentificationForm from '../../../../modules/OfflineToOnline/components/IdentificationForm';
import LastNameField from '../../../../modules/Form/components/FormFields/LastNameField';
jest.mock('../../../../utils/endpointUrl');
jest.mock('../../../../utils/adobeAnalyticsUtils', () => ({
    OfflineToOnlineIdentificationFormStart: jest.fn(),
}));
import { act } from 'react-dom/test-utils';

global.grecaptcha = {
    enterprise: {
        execute: jest.fn().mockResolvedValue('mock-token'),
    },
};
 
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    const onSubmitIdentityMock = jest.fn();
    const preSubmitMock = jest.fn();
    const stateSetter = jest.fn();
    beforeEach(() => {
        props = {
            onSubmitIdentity: onSubmitIdentityMock, 
            preSubmit: preSubmitMock,
            formFields : [
                {
                    component: LastNameField
                }
            ],
            informationText: "testString",

		};
        wrapper = mount(<Provider store={mockStore}><IdentificationForm  {...props} /></Provider>);
    });

    test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    test('test methods', () => {
        const formData = {lastName: "MgArXnRglE", dob: "1980-01-20", customerId: "4950005392"}
        preSubmitMock(formData);
    });
    
    test('handleEvent function check', () => {
        const { OfflineToOnlineIdentificationFormStart } = require('../../../../utils/adobeAnalyticsUtils');
        const form = wrapper.find('form');
        act(() => {
            form.props().onClick();
        });
        expect(OfflineToOnlineIdentificationFormStart).toHaveBeenCalled();
    });

    test('handleEvent function check else', () => {
        const { OfflineToOnlineIdentificationFormStart } = require('../../../../utils/adobeAnalyticsUtils');
        const form = wrapper.find('form');
        jest.spyOn(React, 'useState').mockImplementation(formStart => [formStart=true, stateSetter])
        act(() => {
            form.props().onClick();
        });
        expect(OfflineToOnlineIdentificationFormStart).toHaveBeenCalled();
    });

});