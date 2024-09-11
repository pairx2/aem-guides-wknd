const getUserProfile = async () => {
  const authContext = getLocalAuthContext();
  const idToken = authContext?.jwtToken?.id_token;

  if (idToken) {
    const { eslEndpoint } = eslConfigDatasets();
    const url = `${eslEndpoint + ESL_EPT?.GET_PROFILE}`;
    const headers = { ...getPageDataAttributes() };
    headers["x-id-token"] = idToken;

    const requestOptions = {
      method: "GET",
      headers: {
        ...headers,
      },
    };
    const data = await fetch(url, requestOptions);

    return data.json();
  }
};
