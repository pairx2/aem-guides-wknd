let myAccountUserInfo = {};

function updateRequestMyFreestyleUserInfoExtended(data) {
  data.body.userInfo['dateOfBirth'] = data.body.userInfo['dateOfBirth'] || '';
  updateRequestMyFreestyleUserInfo(data);
  
  myAccountUserInfo = data.body.userInfo;
  myAccountUserInfo.middleName = myAccountUserInfo.middleName || '';
  
}

function onSuccessMyFreestyleUserInfoExtended(data) {
  onsuccessMyFreestyleUserInfo(data);
  if (data.errorCode == 0) {
    toggleUserInfoUpdateEvent(true);
    setLocalUserInfo(myAccountUserInfo);
  }
}

function onSuccessMyFreestyleEmailPasswordExtended(data) {
  onSuccessMyFreestyleEmailPassword(data);
  if (data.errorCode == 0) {
    toggleUserInfoUpdateEvent(true);
  }
}

function onSuccessMyFreestyleEmail(data) {
  onSuccessMyFreestyleEmailPassword(data);
  if (data.errorCode == 0) {
    toggleUserEmailRequestedEvent(true);
  }
}

function onBeforeMyDetailsCommon() {
  toggleUserEmailRequestedEvent(false);
  toggleUserInfoUpdateEvent(false);
}

function toggleUserInfoUpdateEvent(isActive = true) {
  const userInfoUpdatedEvent = new CustomEvent('conditional-component-change', {
    detail: {
      value: isActive,
      var: 'userInfoUpdated',
    },
  });
  window.dispatchEvent(userInfoUpdatedEvent);
}

function toggleUserEmailRequestedEvent(isActive = true) {
  const userEmailChangeRequestedEvent = new CustomEvent('conditional-component-change', {
    detail: {
      value: isActive,
      var: 'userEmailChangeRequested',
    },
  });
  window.dispatchEvent(userEmailChangeRequestedEvent);
}

function onCompleteMyFreestyleEmail() {
  if (isAPISuccess) {
    initializeUserInfo($(document).find('#myfreestyle-mydetails-email-update'));
    isAPISuccess = false;
  }
  myAccountUserObj = {};
}

function onCompleteMyFreestylePassword() {
  if (isAPISuccess) {
    initializeUserInfo($(document).find('#myfreestyle-mydetails-password-update'));
    isAPISuccess = false;
  }
  myAccountUserObj = {};
}

function reloadPage() {
  window.location.reload();
}

function updateRequestMyFreestyleEmail(data) {
  data.body.userInfo = {};

  if (data.body['email'] && data.body['newEmail']) {
    data.body.userInfo.userName = data.body['email'];
    data.body.userInfo.newUserName = data.body['newEmail'];
  }

  delete data.body['email'];
  delete data.body['newEmail'];
  delete data.body['confirmEmail'];
  delete data.body['node'];
  delete data.body['requestType'];

  return data;
}

