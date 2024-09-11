import {getSiteData} from './endpointUrl';

export const getRequiredSiteData = key => getSiteData()?.[key];