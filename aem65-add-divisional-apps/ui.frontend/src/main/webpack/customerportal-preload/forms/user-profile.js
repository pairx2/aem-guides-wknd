/** User Account Profile -- starts**/
let tempUserInfo;

function updateRequestUserProfile(data) {

    tempUserInfo = {
        "firstName": data.body.firstName,
        "lastName": data.body.lastName,
        "phoneNumber": data.body.phoneNumber,
        "email": data.body.email,
        "userType": data.body.role,
        "country": data.body.country
    };

    let userInfo = {
        "action": "updateProfileInfo",
        "userInfo": tempUserInfo
    };

    data.body = userInfo;

    const token = getCookie("jwtToken");
    data.headers["x-id-token"] = token;

    return data;
}
window.updateRequestUserProfile = updateRequestUserProfile;

function onBeforeUserProfile() {
    showLoading();
}
window.onBeforeUserProfile = onBeforeUserProfile;

function onSuccessUserProfile(data) {
    let profileInfo = getLocalStorage('profile');

    if (data.errorCode == 0) {
        profileInfo.email = tempUserInfo.email;
        profileInfo.userType = tempUserInfo.userType;
        profileInfo.phones[0].number = tempUserInfo.phoneNumber;
        profileInfo.country = tempUserInfo.country;

        let originalName = profileInfo.firstName + " " + profileInfo.lastName;
        let modifiedName = tempUserInfo.firstName + " " + tempUserInfo.lastName;
        if (originalName != modifiedName) {
            profileInfo.firstName = tempUserInfo.firstName;
            profileInfo.lastName = tempUserInfo.lastName;
    
            const escapedText = $('<div/>').text(modifiedName).html();
            let account = $("#myAccountDropdown");
            let mobileAccount = account.clone();
            const linkStack = account.find(".m-link-stack__link a");
            linkStack.html("<em class=\"abt-icon abt-icon-avatar\" aria-hidden=\"true\"></em>"+escapedText);
            
            const mobileLinkStack = mobileAccount.find(".m-link-stack__link a");
            mobileLinkStack.html("<em class=\"abt-icon abt-icon-down-arrow\" aria-hidden=\"true\"></em>"+escapedText);
            
            account.appendTo('.a-link--icon-left');
            mobileAccount.appendTo('.m-mega-menu__mobile-item-wrappe');
        }
        setLocalStorage("profile", profileInfo);

        showApiError("update-profile-success");
        $(".o-form-container__success-msg").addClass("d-none");
        setTimeout(function() {
            populateProfile();
        }, 100);
        hideLoading();
    } else {
        onErrorUserProfile(data);
    }
}
window.onSuccessUserProfile = onSuccessUserProfile;

function onErrorUserProfile(error) {
    console.error(error);

    showApiError(error?.response?.i18nMessageKey);

    hideLoading();
}
window.onErrorUserProfile = onErrorUserProfile;
/** User Account Profile -- ends**/
