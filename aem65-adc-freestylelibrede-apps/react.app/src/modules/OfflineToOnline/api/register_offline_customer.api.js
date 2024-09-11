import axios from 'axios';
import { getAxiosEslCallOptions, httpRequestMethod} from '../../../utils/endpointUrl';
import {ESL_SERVICE_ENDPOINT} from '../../../api/esl.auth.service';

export const registerOfflineCustomer = async (payload) => {
      const construct_payload = {
        "action": "convertOfflineToOnline", 
                            "userInfo": {
                                "email": payload.email,
                                "password": payload.password,
                                "additionalProperties": {
                                    "reCaptcha":  payload.recaptchaValue,
                                    "kvnr" : payload.kvnr,
                                    "customerId" : payload.customerId,
                                    "sessionToken": payload.sessionToken,
                                    "data_processing": payload.dataProcessingConsentConfirmation,
                                    "is_newsletter_subscribed": payload.newsletterConfirmation,
                                    "terms_and_condition_agreed": payload.termsConditionsConfirmation,
                                    "data_privacy": payload.dataProcessingConsentConfirmation,
                                    "training": payload.trainingConfirmation
                                } 
                            }  
                    }
     
    const options = {
        ...getAxiosEslCallOptions(
          ESL_SERVICE_ENDPOINT.REGISTER_USER,
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
