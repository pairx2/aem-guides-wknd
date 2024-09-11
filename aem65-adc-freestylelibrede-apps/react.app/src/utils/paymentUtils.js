import { ARVATO_SESSION_ID } from "./enums";

export const cartObject = (cartId, isShipping= false, isBilling= false, payload={} ) => {
    const ssidFromSessionStorage = sessionStorage.getItem(ARVATO_SESSION_ID);
    const cartObject = {
        cartId: cartId,
        ssid: ssidFromSessionStorage,
        AddressStatus: {
            isBilling: isBilling,
            isShipping: isShipping
        },
        payload: payload
    };
    return cartObject
}