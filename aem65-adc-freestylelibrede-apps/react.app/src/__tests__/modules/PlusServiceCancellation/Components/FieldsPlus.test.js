import React from 'react';
import {mockStore} from '../../../../__mocks__/storeMock';
import FieldsPlus from '../../../../modules/PlusServiceCancellation/components/FieldsPlus';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
Enzyme.configure({
    adapter: new EnzymeAdapter()
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
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
                    "fieldId": "terminationTime",
                    "fieldName": "Kündigungsgrund",
                    "fieldplaceholder": "Bitte geben Sie einen Kündigungsgrund an",
                    "required": false,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                }
            ],
            fieldProp: {
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
            errorCode: 5000
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

    test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });
    
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
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
                },{
                    "fieldId": "terminationTime2",
                    "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.2026",
                    "required": false,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },
            ],
            "fieldsPlusValues": {
                "E-Mail-Adresse": "aaaa@aaa.com","Geburtsdatum":"12.12.1992","Nachname": "aaaaaaaa","Vorname": "aaaaaaa",
                "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt'}
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
            "plusServiceCancellationResponce": "fails",
            errorCode: 5000
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

    test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });
    
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
        props = {
            "fields": [
                {
                    "fieldId": "terminationTime",
                    "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.2026",
                    "required": false,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                },{
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
            ],
            fieldProp: {
                
                "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher datum'}, 
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
            plusServiceCancellationResponce: "fails",
            errorCode: 5000
          
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

     test('render check', () => {
    //     console.log(wrapper.props().children.props);
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });
    
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
        props = {
            "fields": [
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
            ],
            fieldProp: {
                
                "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher datum'}, 
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
            plusServiceCancellationResponce: "fails",
            errorCode: 4000
          
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

     test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
        props = {
            "fields": [
                {
                    "fieldId": "terminationTime",
                    "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.2026",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                }
            ],
            "fieldsPlusValues": {
                
                "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher datum'}, 
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
            plusServiceCancellationResponce: "fails",
            errorCode: 4000
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

     test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

   
 
    
});

describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
        props = {
            "fields": [
                {
                    "fieldId": "terminationTime",
                    "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.2026",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "dates-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                }
            ],
            "fieldProp": {
                
                "Zeitpunkt der Vertragsbeendigung": {label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher datum'}, 
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
            plusServiceCancellationResponce: "fails",
            errorCode: 4000
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

     test('render check', () => {
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

   
 
    
});


describe('FieldsPlus Component Test Suite', () => {
    let props;
    let wrapper;
    beforeEach(() => {
        props = {
            "fields": [
                {
                    "fieldId": "terminationTime",
                    "fieldName": "Ausgewähltes Datum (TT.MM.JJJJ)",
                    "fieldplaceholder": "z.B. 13.07.2026",
                    "required": true,
                    "validationmessage": null,
                    "fieldType": "date-field",
                    "options": null,
                    "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                }
            ],
            "fieldsPlusValues": {

             
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
            plusServiceCancellationResponce: "fails",
            errorCode: 4000
            
        };
        wrapper = mount(<Provider store={mockStore}><FieldsPlus  {...props} /></Provider>);
    });

     test('render check', () => {
        console.log(wrapper.props())
        expect(wrapper.type()).not.toEqual(null);
    });

    test('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

   
 
    
});