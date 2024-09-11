import axios from 'axios';
import { getAxiosEslCallOptions, httpRequestMethod} from '../../../utils/endpointUrl';
import {ESL_SERVICE_ENDPOINT} from '../../../api/esl.auth.service';
import {dottedToDashed} from '../../../utils/dateUtils'

export const validateOfflineCustomer = async (payload) => {
      const construct_payload = {
        "action": "validateOfflineCustomer",
        "reCaptcha": payload.recaptchaValue,
        "userInfo": {
            "additionalProperties": {
                "lastName": payload.lastName,
                "dob": payload.birthDate ? dottedToDashed(payload.birthDate) : "",
                "customerId": payload.customerNumber,
                "kvnr": payload.kvnrNumber
            }
        }
     }
    const options = {
        ...getAxiosEslCallOptions(
          ESL_SERVICE_ENDPOINT.OFFLINE_TO_ONLINE,
          httpRequestMethod.POST
        ),
        data: construct_payload,
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
