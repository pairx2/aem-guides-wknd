import { USER_SALUTATION } from "./enums";
import translate, { i18nLabels } from "./translationUtils";

export const setSalution = (customer, dictionary) =>{
    if(customer?.prefix === translate(dictionary, i18nLabels.SALUTATION_MAN_LABEL))
        return USER_SALUTATION.MAN_LABEL;
    else if(customer?.prefix === translate(dictionary, i18nLabels.SALUTATION_WOMAN_LABEL)) 
            return USER_SALUTATION.WOMAN_LABEL;
    else return '';
}

export const setBillingAddress = (isBilling, address, billingAddress, streetAndNumber, billingStreetAndNumber) => {
    return {
        lastName: isBilling ? address.lastname: billingAddress.lastName,
        firstName: isBilling ? address.firstname: billingAddress.firstName,
        street: isBilling ? streetAndNumber.street: billingStreetAndNumber.street,
        streetNumber: isBilling ? streetAndNumber.streetNumber: billingStreetAndNumber.streetNumber,
        zipcode: isBilling ? address.postcode: billingAddress.zipCode,
        city: isBilling ? address.city: billingAddress.city,
        country: isBilling ? (address.country_name.value || address.country_id): (billingAddress.country || billingAddress.countryCode)
    }
}

export const setShippingAddress = (isShipping, address, deliveryAddress, streetAndNumber, shippingStreetAndNumber) => {
    return {
        lastName: isShipping ? address.lastname: deliveryAddress.lastName,
        firstName: isShipping ? address.firstname: deliveryAddress.firstName,
        street: isShipping ? streetAndNumber.street: shippingStreetAndNumber.street,
        streetNumber: isShipping ? streetAndNumber.streetNumber: shippingStreetAndNumber.streetNumber,
        zipcode: isShipping ? address.postcode: deliveryAddress.zipCode,
        city: isShipping ? address.city: deliveryAddress.city,
        country: isShipping ? (address.country_name.value || address.country_id):(deliveryAddress.country || deliveryAddress.countryCode)
    }
}