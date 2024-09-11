const constructAuthObject = (data) => {
  const {
    email,
    title,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    phoneNumber,
    fiscalCode,
    totalEarnedPoints,
    id_token,
    meridianJwtToken,
    refresh_token,
    consents,
    ecomToken: ecommToken,
  } = data;

  return {
    consents,
    timeStamp: 'timeStamp',
    accountInfo: {
      userInfo: {
        email,
        newUserName: 'newUserName',
        userName: 'userName',
        title,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        phoneNumber,
        fiscalCode,
        verified: true,
        additionalProperties: {
          extToken: 'extToken',
          ecommToken,
        },
      },
      activeUser: true,
      searchable: false,
    },
    jwtToken: {
      refresh_token,
      id_token,
      meridianJwtToken,
    },
    totalEarnedPoints,
  };
};

const storeProfileInfoForCommerce = (data) => {
  try {
    // Save user info in local storage
    const commerceContext = getLocalCommerceContext();
    const { firstName = '', lastName = '', email = '' } = data;

    setItemLocalStorage(
      getLocalCommerceContextName(),
      JSON.stringify({
        ...commerceContext,
        profile: {
          ...commerceContext?.profile,
          userInfo: {
            firstName,
            lastName,
            email,
          },
        },
      })
    );
  } catch (e) {
    // Do not fail login if this isn't set -- it will be done later
  }
};

const storeAuthInfoForCommerce = async (data) => {
  //construct auth info object from response
  const authObj = constructAuthObject(data);
  const authContext = getLocalAuthContext();

  setItemLocalStorage(
    getLocalAuthContextName(),
    JSON.stringify({
      ...authContext,
      ...authObj,
      timeStamp: Date.now(),
    })
  );
  storeProfileInfoForCommerce(data);
};

const myFreestyleCartId = () => getLocalCommerceContext()?.cart?.id;
