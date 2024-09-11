import axios from 'axios';
import { getAxiosEslCallOptions, httpRequestMethod} from '../../../utils/endpointUrl';
import {ESL_SERVICE_ENDPOINT} from '../../../api/esl.auth.service';

export const confirmOfflineCustomer = async (payload) => {
    const headers = {
      'x-verification-token': payload
    }
     
    const options = {
        ...getAxiosEslCallOptions(
          ESL_SERVICE_ENDPOINT.CONFIRM_OFFLINE_CUSTOMER,
          httpRequestMethod.POST,
          null,
          headers
        )
      };
    
      const userData = await axios.request(options).then(response => {
        try {
            if (response?.status === 200) {
                return response.data
             }
        } catch (error) {
            throw(error)
        }
     });
     return userData;
     };
