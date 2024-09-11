import {useSharedContacts} from "../shared/Contacts";
import {getCookie} from "../shared/Utils";

const JWT_TOKEN_KEY = "jwtToken";
export const contactsService = () => {
    const {setSharedContacts, setSharedIsLoading, setSharedIsLoaded} = useSharedContacts();
    
    const getHeaders = () => {
        const headers = window.getPageDataAttributes();
        const token = getCookie(JWT_TOKEN_KEY);
        headers["x-id-token"] = token;
        return headers;
    };

    const getData = (id) => {
        return JSON.stringify({
            "action": "getCustomerContacts",
            "cmsNextCustomerId": id
        });
    };
    
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    
    const getContacts = (id) => {
        const service = eslEndpoint + ESL_EPT?.GET_CONTACTS;
        setSharedIsLoading(true);
        window.showLoading();
        fetch(service, {
            method: 'POST', // or 'PUT'
            headers: getHeaders(),
            body: getData(id)
        })
          .then((response) => response.json())
          .then((data) => {
              let contacts = data?.response;
              const contactDropdown = contacts.map((contact) => {
                 return {
                     label: contact["Name"],
                     value: contact["ContactId"],
                     email: contact["EmailAddress"],
                     phone: contact["Phone"]
                 };
              });
              setSharedIsLoading(false);
              window.hideLoading();
              setSharedIsLoaded(true);
              setSharedContacts(contactDropdown ?? []);
          })
          .catch((error) => {
              // TODO: Handle Error
              setSharedIsLoading(false);
              setSharedIsLoaded(true);
              console.error("Contacts Error");
          });
    };
    
    return {
        getContacts
    }
}

