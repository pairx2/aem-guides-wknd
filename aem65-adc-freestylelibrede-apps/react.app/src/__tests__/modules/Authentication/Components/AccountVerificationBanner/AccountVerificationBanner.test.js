import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { mockStoreOrder, mockStoreConfirmationPage } from '../../../../../__mocks__/storeMock';
import AccountVerificationBanner from "../../../../../modules/Authentication/components/AccountVerificationBanner/AccountVerificationBanner";
jest.mock('../../../../../utils/endpointUrl');
jest.mock('../../../../../utils/siteData');
Enzyme.configure({
    adapter: new EnzymeAdapter()
});
const setup = (props = {}) => {
    const wrapper = shallow(<AccountVerificationBanner store={mockStoreOrder} {...props} />).dive().dive();
    return wrapper;
};
describe('AccountVerificationBanner Component Test Suite', () => {
    let props, wrapper;
    const confirmAccount = jest.fn();
    beforeEach(() => {
        props = {
            "bannerButtons":
                [
                    {
                        "ctaSection": "yes-section",
                        "ctaTargetSectiontId": "yes-section",
                        "cta":
                        {
                            "action": null,
                            "text": "Ja",
                            "link": null,
                            "disclaimer": null,
                            "assetPath": null,
                            "type": "primary"
                        }
                    },
                    {
                        "ctaSection": "yes-section",
                        "ctaTargetSectiontId": "yes-section",
                        "cta":
                        {
                            "action": null,
                            "text": "Ja",
                            "link": null,
                            "disclaimer": null,
                            "assetPath": null,
                            "type": "primary"
                        }
                    }
                ],
            "bannerDescription": "Vielen Dank für die Bestätigung Ihrer E-Mail-Adresse.</br>  Sie können sich nun in Ihrem Benutzerkonto anmelden.",
            "bannerSubHeadingInfoText": "",
            "heading": "hello",
            "subDescription": "hello",
            "subHeading": "Hello",
            "hmmUrl": "Hello",
            "loginPageUrl": "Hello",
            "disableTraining": false,
            confirmationStatus: false,
            customer: {
                user_id: '4900123456'
            },
            cutomerId: '4900123456',
            confirmAccount: confirmAccount,
           tech_training_required: true
        };
        wrapper = setup(props);
    });
    describe('Redux Props', () => {
        test('render check', () => {
            expect(wrapper.type()).not.toEqual(null);
        });
        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
        test('has heading as prop and is of type string', () => {
            const headingProp = wrapper.instance().props.heading;
            expect(typeof headingProp).toBe('string');
        });
        test('has bannerButtons as prop and is of type object', () => {
            const bannerButtons = wrapper.instance().props.bannerButtons;
            expect(typeof bannerButtons).toBe('object');
        });
        test('has bannerDescription as prop and is of type string', () => {
            const bannerDescriptionProp = wrapper.instance().props.bannerDescription;
            expect(typeof bannerDescriptionProp).toBe('string');
        });
        test('has bannerSubHeadingInfoText as prop and is of type string', () => {
            const bannerSubHeadingInfoTextProp = wrapper.instance().props.bannerSubHeadingInfoText;
            expect(typeof bannerSubHeadingInfoTextProp).toBe('string');
        });
        test('has confirmAccount as prop and is of type function', () => {
            const confirmAccountProp = wrapper.instance().props.confirmAccount;
            expect(typeof confirmAccountProp).toBe('function');
        });
        test('has subDescription as prop and is of type string', () => {
            const subDescriptionProp = wrapper.instance().props.subDescription;
            expect(typeof subDescriptionProp).toBe('string');
        });
        test('has subHeading as prop and is of type string', () => {
            const subHeadingProp = wrapper.instance().props.subHeading;
            expect(typeof subHeadingProp).toBe('string');
        });
        test('has loginPageUrl as prop and is of type string', () => {
            const loginPageUrlProp = wrapper.instance().props.loginPageUrl;
            expect(typeof loginPageUrlProp).toBe('string');
        });
        test('has hmmUrl as prop and is of type string', () => {
            const hmmUrlProp = wrapper.instance().props.hmmUrl;
            expect(typeof hmmUrlProp).toBe('string');
        });
        test('has disableTraining as prop and is of type boolean', () => {
            const disableTrainingProp = wrapper.instance().props.disableTraining;
            expect(typeof disableTrainingProp).toBe('boolean');
        });
    });
    describe('state check', () => {
        test('state value check', () => {
            const stateCheck = wrapper.instance().state;
            expect(stateCheck).toBeInstanceOf(Object);
            expect(typeof stateCheck.showing).toBe('string');
            expect(stateCheck.showing).toBeDefined();
            expect(typeof stateCheck.isHmmURL).toBe('boolean');
            expect(stateCheck.isHmmURL).toBeFalsy();
        });
    });
    describe('functions check', () => {
        test('componentDidMount function call check', () => {
            const componentDidMountMock = wrapper.instance().componentDidMount;
            expect(typeof componentDidMountMock).toBe('function');
        });
        test('handleLink function call', () => {
            wrapper.instance().handleLink();
            wrapper.setProps({ tech_training_required: true});
            wrapper.find('.adc-tech-training-button-align').at(1).simulate("click");    
        });
        test('getConfirmationDetails function call', () => {
            wrapper.instance().getConfirmationDetails("4900100000");
        });

        test('isHmmURL setstate call', () => {
            wrapper.setProps({ tech_training_required: true});
           wrapper.instance().setState({isHmmURL: true});
        });

        test('componentDidMount function call check', () => {
            const confirmAccountProp = wrapper.instance().props.confirmAccount;
            confirmAccountProp.fetched = null;
           wrapper.setProps({ confirmAccount: confirmAccountProp });
            wrapper.instance().componentDidMount();
        });
    });
    describe('false condition check', () => {
        let props, wrapper;
        const confirmAccount = jest.fn();
        beforeEach(() => {
            props = {
                "bannerButtons":
                    [
                        {
                            "ctaSection": "yes-section",
                            "ctaTargetSectiontId": "yes-section",
                            "cta":
                            {
                                "action": null,
                                "text": "Ja",
                                "link": null,
                                "disclaimer": null,
                                "assetPath": null,
                                "type": "primary"
                            }
                        },
                        {
                            "ctaSection": "yes-section",
                            "ctaTargetSectiontId": "yes-section",
                            "cta":
                            {
                                "action": null,
                                "text": "Ja",
                                "link": null,
                                "disclaimer": null,
                                "assetPath": null,
                                "type": "primary"
                            }
                        }
                    ],
                "bannerDescription": "Vielen Dank für die Bestätigung Ihrer E-Mail-Adresse.</br>  Sie können sich nun in Ihrem Benutzerkonto anmelden.",
                "bannerSubHeadingInfoText": "",
                "heading": "hello",
                "subDescription": "hello",
                "subHeading": "Hello",
                "loginPageUrl": "",
                "disableTraining": true,
                confirmationStatus: null,
                customer: null,
                cutomerId: '4900123456',
                confirmAccount: confirmAccount,
                tech_training_required: undefined,
                confirmationDetails: ""
            };
            wrapper = setup(props);
        });
        test('render check', () => {
            expect(wrapper.type()).not.toEqual(null);
        });
        test('renders without crashing', () => {
            expect(wrapper).toBeDefined();
        });
        test('isHmmURL setstate call', () => {
            wrapper.setProps({ tech_training_required: true});
            wrapper.instance().setState({isHmmURL: false});
         });
        test('componentDidUpdate function call check', () => {
            wrapper.setProps({ confirmationStatus: false, tech_training_required: false });
            wrapper.instance().componentDidUpdate(); 
        });
    });
});