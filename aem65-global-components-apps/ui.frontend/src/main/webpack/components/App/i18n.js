import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { getPageDataAttributes } from './services/eslService';
import ESL_EPT from './data/eslEndpoints';
import { eslConfigDatasets } from './utils/common';

const { eslEndpoint } = eslConfigDatasets();
const customHeaders = getPageDataAttributes();

i18n
  .use(HttpApi)

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
      customHeaders,
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
