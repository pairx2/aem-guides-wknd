function showApiError(errorContainer, error) {
    var errorWrapper = document.querySelector(errorContainer);
    errorWrapper.querySelectorAll('.text .cmp-text').forEach(function(htmlDOM) {
        htmlDOM.style.display = 'none';
    });

    if(error.response) {
        var errorCode = error.errorCode;

        if(errorCode !== 0) {            
            var i18Key, i18KeyEle;
            i18Key = (error.response.i18nMessageKey) ? error.response.i18nMessageKey : "";
            i18KeyEle = (i18Key !== "" && $(errorContainer + ' ' + '#'+i18Key).length > 0) ? true : false;

            if(i18Key !== "" && i18KeyEle) {
                $(errorContainer + ' ' + '#'+i18Key).addClass('alert alert-danger');
                $(errorContainer + ' ' + '#'+i18Key).css('display', 'block');             
                errorWrapper.style.display = 'block';
                setTimeout(function() {
                    errorWrapper.style.display = 'none';
                }, 20000);
            }
            else {
                errorWrapper.querySelector('#general-api-error').classList.add('alert', 'alert-danger');
                errorWrapper.querySelector('#general-api-error').style.display = 'block';
                errorWrapper.style.display = 'block';
                setTimeout(function() {
                    errorWrapper.style.display = 'none';
                }, 20000);              
            }
        }        

    }
    else {
        errorWrapper.querySelector('#general-api-error').classList.add('alert', 'alert-danger');
        errorWrapper.querySelector('#general-api-error').style.display = 'block';
        errorWrapper.style.display = 'block';
        setTimeout(function() {
            errorWrapper.style.display = 'none';
        }, 20000);
    }
}