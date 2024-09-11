export const uomMapping = {
	99: 'mg/dl',
	101: 'mmol/dl'
};

export const getUomByKey = key => key ? uomMapping[key] : '';