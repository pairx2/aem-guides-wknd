const eslEndpoint = document.body.getAttribute('data-esl-endpoint');
let s = document.createElement("input");
s.type = "hidden";
s.name = "API_BASE";
s.value = eslEndpoint;
s.setAttribute('data-config', "true");
document.head.appendChild(s);

$(document).ready(function () {

    const xKeyInput = document.querySelector('input[name="xKeyInput"]');
    const xKeyForm = document.querySelector('#xKey-form form');
    if(xKeyForm) {
        xKeyForm.addEventListener("reset", xKeyFormReset);
    }
    
    let xK = getCookie('xAccessKey', true);
    let xKValid = xK !== undefined && xK !== null && xK !== "";
    if(xKValid && isOnPublish() &&  window.location.pathname.indexOf("rewardsmaster.html") > 0) {

        xKeyInput.value = xK;
        xKeyInput.setAttribute('readOnly', true);

        setTimeout(() => {
            const isXKAvailableEvent = createConditionalEvent(xKValid, "isXKAvailable");
            window.dispatchEvent(isXKAvailableEvent);
        }, 500);
        
    } else if(!xKValid && isOnPublish() && window.location.pathname.indexOf("/rewardsmaster/") > 0 ) {
        window.location.href = document.querySelector('#rewardengine-lp').href + window.location.search;
    }

    if ($("[id*='form-level-']").length > 0) {
        const $levelStartPoint = document.querySelector('input[name="levelStartPoint"]');
        const $levelEndPoint = document.querySelector('input[name="levelEndPoint"]');
        $levelStartPoint.setAttribute('min', 0);
        $levelEndPoint.setAttribute('min', 1);
    }

    if ($("#form-level-update").length > 0) {
        setLevelFieldData();
    }

    if($("[id*='form-asset-']").length > 0) {
        const $assetPoint = document.querySelector('input[name="assetPoint"]');
        $assetPoint.setAttribute('min', 0);
    }

    if ($("#form-asset-update").length > 0) {
        setAssetsFieldData();
    }

    function xKeyFormReset() {
        deleteCookie('xAccessKey', true);
        xKeyInput.value = '';
        xKeyInput.removeAttribute('readOnly');
        
        setTimeout(() => {
            const isXKAvailableEvent = createConditionalEvent(false, "isXKAvailable");
            window.dispatchEvent(isXKAvailableEvent);
        }, 500);
    }

    // **************************
    // Skeleton Loader
    // **************************
    let mfsTransationTable = $('[id*="mfs-txn-table"]');
    if(mfsTransationTable.length > 0) {
        const tableColumns = $('[id="mfs-txn-table"] .m-custom-table__table thead tr th').length;
        const skLoader = '<div class="skeleton-loader"></div><div class="skeleton-loader"></div>';
        const loader = `<div class="skeleton-loader-container">${skLoader.repeat(tableColumns)}</div>`;
        if(mfsTransationTable.find('.skeleton-loader-container').length <= 0) {
            $(loader).insertAfter(mfsTransationTable.find('.m-custom-table__content'));
            $('[id="mfs-txn-table"] .skeleton-loader-container').css({'grid-template-columns': `repeat(${tableColumns}, auto)`});
        }
    }
});

function setLevelFieldData() {
    const $levelId = document.querySelector('input[name="levelId"]');
    const $customLevelId = document.querySelector('input[name="customLevelId"]');
    const $levelType = document.querySelector('input[name="levelType"]');
    const $isValid = $('input[type="radio"][name="isValid"]');
    const $levelStartPoint = document.querySelector('input[name="levelStartPoint"]');
    const $levelEndPoint = document.querySelector('input[name="levelEndPoint"]');

    let levelsData = JSON.parse(sessionStorage.getItem('rowData'));
    if (levelsData && levelsData !== "") {
        $levelId.value = levelsData.levelId;
        $levelId.disabled = true;
        $customLevelId.value = levelsData.customLevelId;
        $levelType.value = levelsData.levelType;
        $levelStartPoint.value = levelsData.levelStartPoint;
        $levelEndPoint.value = levelsData.levelEndPoint;
        $isValid.each(function () {
            if ($(this).val() == levelsData.isValid) {
                $(this).prop("checked", true);
            }
        });
    }
}

function setAssetsFieldData() {
    const $assetId = document.querySelector('input[name="assetId"]');
    const $assetTitle = document.querySelector('input[name="assetTitle"]');
    const $isValid = $('input[type="radio"][name="isValid"]');
    const $assetPoint = document.querySelector('input[name="assetPoint"]');

    let assetsData = JSON.parse(sessionStorage.getItem('rowData'));
    if (assetsData && assetsData !== "") {
        $assetId.value = assetsData.assetId;
        $assetId.disabled = true;
        $assetTitle.value = assetsData.assetTitle;
        $assetPoint.value = assetsData.assetPoint;
        $isValid.each(function () {
            if ($(this).val() == assetsData.isValid) {
                $(this).prop("checked", true);
            }
        });
    }
}