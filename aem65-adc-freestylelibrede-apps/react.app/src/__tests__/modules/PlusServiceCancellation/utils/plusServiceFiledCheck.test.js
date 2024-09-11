import {structureValue} from '../../../../modules/PlusServiceCancellation/utils/plusServiceFiledCheck';

import { formateDateWithDotSeprator } from "../../../../utils/dateUtils";
describe('test structureValue method', () => {
    const fields = [
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
        
    ];
    const fieldsPlusValues = {
        "E-Mail-Adresse": "aaaa@aaa.com", "Geburtsdatum": "12.12.1992", "Nachname": "aaaaaaaa", "Vorname": "aaaaaaa",
        "Zeitpunkt der Vertragsbeendigung": { label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt' }, "undefined": new Date()
    };
    const fieldsPlusValues2 = {
        "E-Mail-Adresse": "aaaa@aaa.com", "Geburtsdatum": "12.12.1992", "Nachname": "aaaaaaaa", "Vorname": "aaaaaaa",
        "Zeitpunkt der Vertragsbeendigung": { label: 'nächstmöglicher Zeitpunkt', value: 'nächstmöglicher Zeitpunkt' }
    };
    const key = "email";
    const key1 = "requiredDate";
    const key2 = "terminationTime";
    const key3 = "undefined";
	test('empty input', async () => {
		const result = structureValue();
		expect(result).not.toBeUndefined();
	});

	test('valid input', async () => {
		const result = structureValue(key,fields,fieldsPlusValues);
		expect(result).toBe("aaaa@aaa.com");
	});
    test('valid input', async () => {
		const result = structureValue(key1,fields,fieldsPlusValues);
		expect(result).toBe("nächstmöglicher Zeitpunkt");
	});
    test('valid input', async () => {
		const result = structureValue(key2,fields,fieldsPlusValues);
		expect(result).toBe("");
	});
    test('valid input', async () => {
		const result = structureValue(key3,fields,fieldsPlusValues);
		expect(result).toBeDefined();
	});
    test('valid input', async () => {
		const result = structureValue(key3,fields,fieldsPlusValues2);
		expect(result).toBe("");
	});

});
describe('test date formate method', () => {
   
	test('empty input', async () => {
		const result = formateDateWithDotSeprator();
		expect(result).not.toBeUndefined();
	});

	test('valid input', async () => {
		const result = formateDateWithDotSeprator(new Date());
		expect(result).toBeDefined();
	});
    test('valid input', async () => {
		const result = formateDateWithDotSeprator(new Date("2022-03-09"));
		expect(result).toBeDefined();
	});

});