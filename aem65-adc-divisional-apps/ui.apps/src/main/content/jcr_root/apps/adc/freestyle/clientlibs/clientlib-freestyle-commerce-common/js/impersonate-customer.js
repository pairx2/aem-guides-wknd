(function ($, document) {
  const getUrlHashParameter = (name) => new RegExp(`[#&]${name}=([^&]*)`).exec(location.hash)?.[1];

  const idTokenKey = 'id_token';
  const refreshTokenKey = 'refresh_token';
  const idToken = getUrlHashParameter(idTokenKey);
  const refreshToken = getUrlHashParameter(refreshTokenKey);
  const hasIdToken = !!idToken;
  const hasRefreshToken = !!refreshToken;

  const init = async () => {
    if (hasIdToken && hasRefreshToken) {
      $('#page-spinner').show();

      try {
        let data = { id_token: idToken, refresh_token: refreshToken };

        await storeAuthInfoForCommerce(data);

        const { response: sessionResponse } = await extendSession();
        const { meridian_token, jwtToken, ecommToken } = sessionResponse;

        data['meridianJwtToken'] = meridian_token;
        data['ecomToken'] = ecommToken;
        data['jwtToken'] = jwtToken;

        const { response: profileResponse } = await getUserProfile();

        const response = { ...data, ...profileResponse };
        const authData = { errorCode: 0, status: true, response };

        onSuccessMyFreestyleUserLogin(authData);
      } catch (error) {
        $('#page-spinner').hide();
      }
    }
  };

  $(document).ready(() => init());
})(jQuery, document);
