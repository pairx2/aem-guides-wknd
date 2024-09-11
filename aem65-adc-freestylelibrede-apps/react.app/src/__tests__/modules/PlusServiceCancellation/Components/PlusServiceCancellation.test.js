import React from 'react';
import {mockStore} from '../../../../__mocks__/storeMock';
import PlusServiceCancellation from '../../../../modules/PlusServiceCancellation/components/PlusServiceCancellation';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
jest.mock('../../../../utils/endpointUrl');

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

describe('DisplayField Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
        document.body.innerHTML = `<div id="noPrint" class="container pt-4"> 
        <div class="row align-items-center px-3 px-md-0 px-sm-0">
        <div class="col-8 plus-cancellation-row-position">
        <div class="plus-cancellation-tittle-headding">PlusService-Abo kündigen</div>
        <br>
        <br>
        
      <div class="plus-cancellation-heading">Aktives PlusService-Abo über Ihr Kundenkonto verwalten</div>
      <br>
      <div class="plus-cancellation-content">In Ihrem Kundenkonto sehen Sie alle Details zu Ihrem aktiven PlusService-Abo. Von dort aus können Sie Ihre Daten verwalten, Lieferungen einsehen, das Abo deaktivieren sowie kündigen.</div>
      <br>
      <a href="#" target="_self" class="adc-button adc-button-primary text-center d-flex">
                                       zum Kundenkonto
                                    </a>
                                    <br>
                                    <br>
      <div class="plus-cancellation-heading">Aktives PlusService-Abo über Ihr Kundenkonto verwalten</div>
      <br>
      <div class="plus-cancellation-content">In Ihrem Kundenkonto sehen Sie alle Details zu Ihrem aktiven PlusService-Abo. Von dort aus können Sie Ihre Daten verwalten, Lieferungen einsehen, das Abo deaktivieren sowie kündigen.</div>
      </div>
      <br>
      </div></div>`;
       const cancelRequestMock = jest.fn();
        props = {
            "fields": [
                {
                    "fieldId": "firstname",
                    "fieldName": "Vorname",
                    "fieldplaceholder": "Vorname",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "text-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": "lastname",
                    "fieldName": "Nachname",
                    "fieldplaceholder": "Nachname",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "text-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": "email",
                    "fieldName": "E-Mail-Adresse",
                    "fieldplaceholder": "E-Mail-Adresse: [Input]",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "email-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": "dob",
                    "fieldName": "Geburtsdatum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.1980",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": "requiredDate",
                    "fieldName": "Zeitpunkt der Vertragsbeendigung",
                    "fieldplaceholder": "Bitte wählen Sie den Zeitpunkt der Vertragsbeendigung",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "dropdown-field",
                    "options": [
                        {
                            "option": "nächstmöglicher Zeitpunkt",
                            "value": "nächstmöglicher Zeitpunkt"
                        },
                        {
                            "option": "ausgewähltes Datum",
                            "value": "ausgewähltes Datum"
                        }
                    ],
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": "terminationTime",
                    "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.2026",
                    "required": false,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": null,
                    "fieldName": "Art der Kündigung",
                    "fieldplaceholder": "Bitte wählen Sie die Art der Kündigung",
                    "required": false,
                    "validationmessage": null,
                    "fieldType": "dropdown-field",
                    "options": [
                        {
                            "option": "ordentlich",
                            "value": "ordentlich"
                        },
                        {
                            "option": "außerordentlich",
                            "value": "außerordentlich"
                        }
                    ],
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
                {
                    "fieldId": null,
                    "fieldName": "Kündigungsgrund",
                    "fieldplaceholder": "Bitte geben Sie einen Kündigungsgrund an",
                    "required": false,
                    "validationmessage": null,
                    "fieldType": "text-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                }
            ],
            fieldsPlusValues: {
                "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
                "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}, "terminationTime": new Date()
            },
            "enablecaptcha": false,
            "serviceEndpoint": "samplke",
            "endpointpath": "sample",
            "cta": {
                "type": "primary",
                "text": "jetzt Kündigen",
                "action": null,
                "assetPath": null,
                "link": null,
                "disclaimer": null
            },
            "disclaimerText": "sample",
            "confirmationPageTitle": " PropTypes.string",
            "confirmationPageDescription": "PropTypes.string",
            "confirmationPageCta": {
                "type": "primary",
                "text": "speichern / Drucken",
                "action": null,
                "assetPath": null,
                "link": null,
                "disclaimer": null
            },
            "plusCancellationErrorMessage": "PropTypes.string",
            "plusServiceCancellationErrorMessage": "PropTypes.string",
            "confirmationPageCancellationDateLabel": "PropTypes.string",
            plusServiceCancellationResponce: "success",
            cancelRequest:cancelRequestMock
            
        };
        wrapper = shallow(<PlusServiceCancellation {...props} store={mockStore} />).dive().dive();
    });

    test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        wrapper.setProps({fieldsPlusValues: {
            "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
            "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}, "terminationTime": new Date()
        }})
        expect(wrapper).toBeDefined();
    });


    test('has fieldsProp as prop and is of type string', () => {
        const fieldsProp = wrapper.instance().props.fields;
        expect(typeof fieldsProp).toBe('object');
    });
  

    test('has enablecaptchaProps as prop and is of type boolean', () => {
        const enablecaptchaPropsProp = wrapper.instance().props.enablecaptcha;
        expect(typeof enablecaptchaPropsProp).toBe('boolean');
    });

    test('has serviceEndpoint as prop and is of type string', () => {
        const serviceEndpointProp = wrapper.instance().props.serviceEndpoint;
        expect(typeof serviceEndpointProp).toBe('string');
    });

    test('has endpointpath as prop and is of type string', () => {
        const endpointpathProp = wrapper.instance().props.endpointpath;
        expect(typeof endpointpathProp).toBe('string');
    });

    test('has cta as prop and is of type object', () => {
        const ctaProp = wrapper.instance().props.cta;
        expect(typeof ctaProp).toBe('object');
    });


    test('has disclaimerText as prop and is of type string', () => {
        const disclaimerTextProp = wrapper.instance().props.disclaimerText;
        expect(typeof disclaimerTextProp).toBe('string');
    });

    test('has confirmationPageTitle as prop and is of type string', () => {
        const confirmationPageTitleProp = wrapper.instance().props.confirmationPageTitle;
        expect(typeof confirmationPageTitleProp).toBe('string');
    });

    test('has confirmationPageDescription as prop and is of type string', () => {
        const confirmationPageDescriptionProp = wrapper.instance().props.confirmationPageDescription;
        expect(typeof confirmationPageDescriptionProp).toBe('string');
    });

    test('has confirmationPageCta as prop and is of type object', () => {
        const confirmationPageCtaProp = wrapper.instance().props.confirmationPageCta;
        expect(typeof confirmationPageCtaProp).toBe('object');
    });

    test('has plusCancellationErrorMessage as prop and is of type string', () => {
        const plusCancellationErrorMessageProp = wrapper.instance().props.plusCancellationErrorMessage;
        expect(typeof plusCancellationErrorMessageProp).toBe('string');
    });

    test('has plusServiceCancellationErrorMessage as prop and is of type string', () => {
        const plusServiceCancellationErrorMessageProp = wrapper.instance().props.plusServiceCancellationErrorMessage;
        expect(typeof plusServiceCancellationErrorMessageProp).toBe('string');
    });

    test('has confirmationPageCancellationDateLabel as prop and is of type string', () => {
        const confirmationPageCancellationDateLabelProp = wrapper.instance().props.confirmationPageCancellationDateLabel;
        expect(typeof confirmationPageCancellationDateLabelProp).toBe('string');
    });

   


    test('has cancelRequest as prop and is of type function', () => {
        const cancelRequestProp = wrapper.instance().props.cancelRequest;
        expect(typeof cancelRequestProp).toBe('function');
    });





    test('state value check', () => {
        const stateCheck = wrapper.instance().state;
        expect(stateCheck).toBeInstanceOf(Object);

        expect(typeof stateCheck.isSubmited).toBe('boolean');
        expect(stateCheck.isSubmited).toBeFalsy();

        expect(typeof stateCheck.currentDate).toBe('string');
        expect(stateCheck.currentDate).toBe("");

        expect(typeof stateCheck.finalValueArray).toBe('object');
        expect(stateCheck.finalValueArray).toStrictEqual([]);

    });

    test('componentDidUpdate function call', () => {
        const prevProps = { plusServiceCancellationResponce : "fails", fieldsPlusValues : "X"}
        wrapper.setProps({"fields": [
            {
                "fieldId": "firstname",
                "fieldName": "Vorname",
                "fieldplaceholder": "Vorname",
                "required": true,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "lastname",
                "fieldName": "Nachname",
                "fieldplaceholder": "Nachname",
                "required": true,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "email",
                "fieldName": "E-Mail-Adresse",
                "fieldplaceholder": "E-Mail-Adresse: [Input]",
                "required": true,
                "validationmessage": null,
                "fieldType": "email-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "dob",
                "fieldName": "Geburtsdatum (TT.MM.JJJJ)",
                "fieldplaceholder": "z.B. 13.07.1980",
                "required": true,
                "validationmessage": null,
                "fieldType": "date-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "requiredDate",
                "fieldName": "Zeitpunkt der Vertragsbeendigung",
                "fieldplaceholder": "Bitte wählen Sie den Zeitpunkt der Vertragsbeendigung",
                "required": true,
                "validationmessage": null,
                "fieldType": "dropdown-field",
                "options": [
                    {
                        "option": "nächstmöglicher Zeitpunkt",
                        "value": "nächstmöglicher Zeitpunkt"
                    },
                    {
                        "option": "ausgewähltes Datum",
                        "value": "ausgewähltes Datum"
                    }
                ],
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "terminationTime",
                "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                "fieldplaceholder": "z.B. 13.07.2026",
                "required": false,
                "validationmessage": null,
                "fieldType": "date-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": null,
                "fieldName": "Art der Kündigung",
                "fieldplaceholder": "Bitte wählen Sie die Art der Kündigung",
                "required": false,
                "validationmessage": null,
                "fieldType": "dropdown-field",
                "options": [
                    {
                        "option": "ordentlich",
                        "value": "ordentlich"
                    },
                    {
                        "option": "außerordentlich",
                        "value": "außerordentlich"
                    }
                ],
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": null,
                "fieldName": "Kündigungsgrund",
                "fieldplaceholder": "Bitte geben Sie einen Kündigungsgrund an",
                "required": false,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            }
        ],plusServiceCancellationResponce: "success", fieldsPlusValues : "Y" })
        wrapper.setState({reset: true})
        wrapper.instance().componentDidUpdate(prevProps);
    });
    test('componentDidUpdate function call error', () => {
        const prevProps = { plusServiceCancellationResponce : "success" , fieldsPlusValues : "X" }
        wrapper.setProps({"fields": [
            {
                "fieldId": "firstname",
                "fieldName": "Vorname",
                "fieldplaceholder": "Vorname",
                "required": true,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "lastname",
                "fieldName": "Nachname",
                "fieldplaceholder": "Nachname",
                "required": true,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "email",
                "fieldName": "E-Mail-Adresse",
                "fieldplaceholder": "E-Mail-Adresse: [Input]",
                "required": true,
                "validationmessage": null,
                "fieldType": "email-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "dob",
                "fieldName": "Geburtsdatum (TT.MM.JJJJ)",
                "fieldplaceholder": "z.B. 13.07.1980",
                "required": true,
                "validationmessage": null,
                "fieldType": "date-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "requiredDate",
                "fieldName": "Zeitpunkt der Vertragsbeendigung",
                "fieldplaceholder": "Bitte wählen Sie den Zeitpunkt der Vertragsbeendigung",
                "required": true,
                "validationmessage": null,
                "fieldType": "dropdown-field",
                "options": [
                    {
                        "option": "nächstmöglicher Zeitpunkt",
                        "value": "nächstmöglicher Zeitpunkt"
                    },
                    {
                        "option": "ausgewähltes Datum",
                        "value": "ausgewähltes Datum"
                    }
                ],
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "terminationTime",
                "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                "fieldplaceholder": "z.B. 13.07.2026",
                "required": false,
                "validationmessage": null,
                "fieldType": "date-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": null,
                "fieldName": "Art der Kündigung",
                "fieldplaceholder": "Bitte wählen Sie die Art der Kündigung",
                "required": false,
                "validationmessage": null,
                "fieldType": "dropdown-field",
                "options": [
                    {
                        "option": "ordentlich",
                        "value": "ordentlich"
                    },
                    {
                        "option": "außerordentlich",
                        "value": "außerordentlich"
                    }
                ],
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": null,
                "fieldName": "Kündigungsgrund",
                "fieldplaceholder": "Bitte geben Sie einen Kündigungsgrund an",
                "required": false,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            }
        ],plusServiceCancellationResponce: "fails", fieldsPlusValues : "Y" })
        wrapper.setState({reset: true})
        wrapper.instance().componentDidUpdate(prevProps);
    });
    test('getValues  function call', () => {
        wrapper.setProps({fieldsPlusValues: {
            "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
            "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}, "terminationTime": new Date()
        }})
        wrapper.instance().getValues();
    });
  
    test('handlePrint  function call', () => {
        wrapper.instance().handlePrint();
    });
	
    test('handleSubmit   function call', () => {
        wrapper.setProps({fieldsPlusValues: {
            "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
            "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}, "terminationTime": new Date()
        }})
       
       
        wrapper.instance().handleSubmit();
    });
    test('handleSubmit   function call', () => {
        wrapper.setProps({fieldsPlusValues: {
            "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
            "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}
        }})
        wrapper.setProps({"fields": [
            {
                "fieldId": "firstname",
                "fieldName": "Vorname",
                "fieldplaceholder": "Vorname",
                "required": true,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "lastname",
                "fieldName": "Nachname",
                "fieldplaceholder": "Nachname",
                "required": true,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "email",
                "fieldName": "E-Mail-Adresse",
                "fieldplaceholder": "E-Mail-Adresse: [Input]",
                "required": true,
                "validationmessage": null,
                "fieldType": "email-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "dob",
                "fieldName": "Geburtsdatum (TT.MM.JJJJ)",
                "fieldplaceholder": "z.B. 13.07.1980",
                "required": true,
                "validationmessage": null,
                "fieldType": "date-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "requiredDate",
                "fieldName": "Zeitpunkt der Vertragsbeendigung",
                "fieldplaceholder": "Bitte wählen Sie den Zeitpunkt der Vertragsbeendigung",
                "required": true,
                "validationmessage": null,
                "fieldType": "dropdown-field",
                "options": [
                    {
                        "option": "nächstmöglicher Zeitpunkt",
                        "value": "nächstmöglicher Zeitpunkt"
                    },
                    {
                        "option": "ausgewähltes Datum",
                        "value": "ausgewähltes Datum"
                    }
                ],
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": "terminationTime",
                "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                "fieldplaceholder": "z.B. 13.07.2026",
                "required": false,
                "validationmessage": null,
                "fieldType": "date-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": null,
                "fieldName": "Art der Kündigung",
                "fieldplaceholder": "Bitte wählen Sie die Art der Kündigung",
                "required": false,
                "validationmessage": null,
                "fieldType": "dropdown-field",
                "options": [
                    {
                        "option": "ordentlich",
                        "value": "ordentlich"
                    },
                    {
                        "option": "außerordentlich",
                        "value": "außerordentlich"
                    }
                ],
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            },
            {
                "fieldId": null,
                "fieldName": "Kündigungsgrund",
                "fieldplaceholder": "Bitte geben Sie einen Kündigungsgrund an",
                "required": false,
                "validationmessage": null,
                "fieldType": "text-field",
                "options": null,
                "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
            }
        ] })
        wrapper.instance().setState({isSubmited:true , finalValueArray: [
            {
              "id": "Vorname",
              "value": "",
              "fieldId": "firstname"
            },
            {
              "id": "E-Mail-Adresse",
              "value": "",
              "fieldId": "email"
            },
            {
              "id": "Geburtsdatum",
              "value": "",
              "fieldId": "dob"
            },
            {
              "id": "Zeitpunkt der Vertragsbeendigung",
              "value": "",
              "fieldId": "requiredDate"
            },
            {
              "id": "Ausgewähltes Datum",
              "value": "",
              "fieldId": "terminationTime"
            },
            {
              "id": "Art der Kündigung",
              "value": "",
              "fieldId": "terminationType"
            },
            {
              "id": "Kündigungsgrund",
              "value": "",
              "fieldId": "terminationReason"
            }
          ]});
       
        wrapper.instance().handleSubmit();
    });
    test('constructPayload    function call', () => {
        wrapper.setProps({fieldsPlusValues: {
            "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
            "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}, "terminationTime": new Date()
        }})
       
        wrapper.instance().constructPayload();
    });
    test('constructPayload  datum  function call', () => {
        wrapper.setProps({fieldsPlusValues: {
            "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
            "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher datum'}, "terminationTime": new Date()
        }})
       
        wrapper.instance().constructPayload();
    });

});