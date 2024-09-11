import { parseDateDDMMYYYY } from "./validations";
import moment from 'moment';

const convertToISODate = function (value) {
    const date = parseDateDDMMYYYY(value.split("/").map(item => String(item).trim()).join("/"));
    if (date) {
        let _date = moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
        return _date;
    }
    return ""
}

const getValue = (value, type, fieldType) => {
    let _value = null;
    let _type = type ? String(type).toLowerCase().trim() : "unknown";
    if (typeof value === "object" && value.hasOwnProperty('value')) {
        _value = value.value;
    }
    else { _value = value; }
    switch (_type) {
        case "calender":
            return convertToISODate(_value);
        case "tel":
            return String(_value).replace(/\D/g, '');
        case "unknown":
        case "hidden":
        default:
            return fieldType === "boolean" ? (typeof (_value) === "string" || typeof (_value) === "undefined") ? _value === "true" : _value : _value;
    }
}

const groupFields = (values = {}, fields = []) => {
    const finalObj = {}
    if (fields) {
        fields.map(field => {
            const {
                name,
                categoryType,
                apiFlag,
                value,
                type,
                fieldType
            } = field;
            if (values.hasOwnProperty(name) || apiFlag) {

                if (categoryType) {
                    if (categoryType.match(/\[.*\]$/g)) {
                        const cT = String(categoryType.replace(/\[.*\]$/g, '')).trim();
                        if (!finalObj[cT]) finalObj[cT] = [];
                        if (!finalObj[cT][0]) finalObj[cT][0] = {};
                        finalObj[cT][0][name] = getValue(apiFlag ? value : values[name], type, fieldType);
                    }
                    else {
                        if (!finalObj[categoryType]) {
                            finalObj[categoryType] = {};
                        }
                        finalObj[categoryType][name] = getValue(apiFlag ? value : values[name], type, fieldType);
                    }
                } else {
                    finalObj[name] = getValue(apiFlag ? value : values[name], type, fieldType);
                }
            }
        })
    }
    return finalObj;
};

const _defaultHead = {
    "headers": {}
};

const getHeaderData = (values = {}, fields = []) => {
    const finalObj = {};
    if (fields) {
        fields.map(({ name,
            apiFlag,
            value,
            type,
            fieldType }) => {
            finalObj[name] = getValue(apiFlag ? value : values[name], type, fieldType);
        })
    }
    return finalObj;
}

const groupFieldsWithConfig = (values = {}, fields = [], config = _defaultHead) => {
    let finalObj = {}, newConf = {};
    if (fields) {
        const _header = [];
        const _fields = fields.filter((_field = {}) => {
            const { passIn = "body" } = _field;
            if (passIn === "body") {
                return true;
            }
            else if (passIn === "header") {
                _header.push(_field);
            }
            return false;
        });
        finalObj = groupFields(values, _fields);
        newConf = {
            ...config,
            headers: {
                ...config.headers,
                ...getHeaderData(values, _header)
            }
        }
    }
    return [finalObj, newConf];
}

export { groupFields, groupFieldsWithConfig }