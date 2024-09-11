import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { mockStore } from '../../../../../__mocks__/storeMock';
import ConfirmTechnicalTraining from '../../../../../modules/MyAccount/components/ConfirmTechnicalTraining/ConfirmTechnicalTraining';
import { customer } from '../../../../../modules/MyAccount/schemas/customer_structure_variables';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('ConfirmTechnicalTraining component Test Suite', () => {
    let props;
    let wrapper;

    const checkTraining = jest.fn()

    beforeEach(() => {
        document.body.innerHTML = `<li class="adc-sidebar__list-item" role="tab" data-tab-type="technische_einweisung" id="myaccount_tab_technische_einweisung" data-cmp-hook-tabs="tab" aria-selected="false" tabindex="-1" style="display: none;">
        <a href="#technische_einweisung" class="sidebar__link" onclick="sideNavEventTrigger(this.innerText)">
            
<i class="adc-icon adc-icon-- adc-icon--technical-training-completed-icon" aria-hidden="true"></i>

            Technische Einweisung</a>
        </li>
        <i class="adc-icon adc-icon-- adc-icon--technical-training-completed-icon false" aria-hidden="true"></i>

            Technische Einweisung test</a>
        </li>`;
        Object.defineProperty(window, 'checkTraining', {
            writable: true,
            value: jest.fn()
        })

        const data = [
            {
                "product_version": "FreeStyleLibre v.1",
                "status": "NEW"
            },
            {
                "product_version": "FreeStyleLibre v.2",
                "status": "completed"
            },
        ]
        props = {
            productTrainings: [{
                productVersion: "FreeStyleLibre v.2",
                heading: "String",
                technicalTrainingDoneMessage: "String",
                technicalTrainingNotDoneMessage: "String",
                cta: {},
            }], banner: "String",
            customer: data
        };
        wrapper = shallow(<ConfirmTechnicalTraining store={mockStore} {...props} />).dive().dive();
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });
    test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('has productTrainings as prop and is of type string', () => {
        const productTrainingsProp = wrapper.instance().props.productTrainings;
        expect(typeof productTrainingsProp).toBe('object');
    });
    test('has banner as prop and is of type string', () => {
        const bannerProp = wrapper.instance().props.banner;
        expect(typeof bannerProp).toBe('string');
    });

    test('componentDidUpdate function call', () => {
        wrapper.instance().componentDidUpdate();
    });

    test('componentDidMount function call', () => {
        wrapper.instance().componentDidMount();
    });

    test('showPendingTrainingCount function call no customer', () => {
        wrapper.instance().showPendingTrainingCount();
    });

    test('showHideTechnischeEinweisungNav function call', () => {
        wrapper.instance().showHideTechnischeEinweisungNav();
    });

    test('componentDidUpdate function call no customer', () => {
        wrapper.setProps({ customer: { technical_instructions: null } });
        wrapper.instance().componentDidUpdate();
    });
    test('componentDidUpdate function call no customer', () => {
        const datacomplete = [
            {
                "product_version": "FreeStyleLibre v.1",
                "status": "completed"
            },
            {
                "product_version": "FreeStyleLibre v.2",
                "status": "completed"
            },
        ]
        wrapper.setProps({ customer: datacomplete });
        wrapper.instance().componentDidUpdate();
    });
});
