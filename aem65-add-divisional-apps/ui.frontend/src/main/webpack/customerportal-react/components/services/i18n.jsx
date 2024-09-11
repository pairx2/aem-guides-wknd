import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {ESL_EPT} from "../../../customerportal/forms/commonContants";
import {getPageDataAttributes,eslConfigDatasets} from "../../../customerportal/forms/common";

const { eslEndpoint } = eslConfigDatasets();
const customHeaders = getPageDataAttributes();

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)

    .init({
        fallbackLng: 'en-US',
        debug: true,

        load: 'currentOnly',
        defaultNS: 'common',
        ns: [],

        interpolation: {
            escapeValue: false,
            format: (value, format, lng) => {
                if (format === 'price') {
                    return new Intl.NumberFormat(lng, {
                        style: 'currency',
                        currency: value.currency,
                    }).format(value.value);
                }
                return value;
            },
        },

        detection: {
            order: ['htmlTag', 'path', 'subdomain'],

            lookupFromPathIndex: 1,
            lookupFromSubdomainIndex: 0,
        },

        backend: {
            loadPath: `${eslEndpoint}${ESL_EPT.i18n.url}`,
            allowMultiLoading: false,
            withCredentials: true,
            customHeaders: customHeaders,
            queryStringParams: {
                ...ESL_EPT.i18n.queryParams,
                language: customHeaders['x-preferred-language'],
            },
            parse: (data) => {
                if (data) {
                    return Object.assign(
                        {},
                        ...JSON.parse(data)?.response?.map((item) => ({
                            [item.key]: item.value,
                        }))
                    );
                }
                return null;
            },

            requestOptions: {
                cache: 'force-cache',
            },
        },
    });

export default i18n;