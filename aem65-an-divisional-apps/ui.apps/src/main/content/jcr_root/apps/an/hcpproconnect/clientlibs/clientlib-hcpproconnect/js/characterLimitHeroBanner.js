//Trim character Limit and Trim character new line
function reduceFlag(id){
    let header = $('#'+id).find('.m-hero__header')[0].innerHTML;
    if(header.trim() == '') {
        let charCount = 0;
        let lineCount = 0;
        $('#'+id + " .m-hero__content").children().each(function() {
            if(!$(this).attr('class')) {
                header =  $(this).text();
                if(!limitFlag && lineCount < 3) {
                    let newContent = characterLineLimitTrimWithParagraph(header,40,3);
                    charCount = charCount + newContent.length;
                    if(charCount > 41) {
                        let currentCount = charCount - newContent.length;
                        let remainCount = 40 - currentCount;
                        newContent = newContent.substring(0, remainCount);
                        limitFlag = true;
                    }
                    $(this).text(newContent);
                    lineCount = lineCount + 1;
                } else {
                    $(this).text('');
                }
            }

        });
    } 
    charlimitHeader(id);
}
function charlimitHeader(id){
    let header = $('#'+id).find('.m-hero__header')[0].innerHTML;
    if(header && header.trim() != '') {
        //trim header max 40 characters and max 3 lines and assign to hero content
        $('#'+id).find('.m-hero__header')[0].innerHTML =
                 characterLineLimitTrimWithParagraph(header,40,3);
     }
}
let limitFlag = false;
$(document).ready(function(){
    if(isCountryCodeUK()) {
        //get all banner ids
        let elements = $("[id^=carouselPreLogin-item");
        let totalElemets = parseInt(elements.length);

        for(let index = 0; index < totalElemets; index++) {
            limitFlag = false;
            let id = $("[id^=carouselPreLogin-item")[index].getAttribute('id');
            //getting the header title
            
            //check if element is available and header is empty
            reduceFlag(id);
            limitFlag = false;
            let body = $('#'+id).find('.m-hero__body')[0].innerHTML;
            //getting the button
            if(body.trim() != '') {
                //trim body max 200 characters and max 4 lines and assign to header
                $('#'+id).find('.m-hero__body')[0].innerHTML =
                        characterLineLimitTrimWithParagraph(body,200,4);

            }
            //check if element is available
            if($('#'+id).find('.m-hero__extras span')[0]) {
                let buttonText  = $('#'+id).find('.m-hero__extras span')[0].innerHTML;
                if(buttonText.trim() != '') {
                    //trim button max 20 characters
                    $('#'+id).find('.m-hero__extras span')[0].innerHTML =
                        characterLineLimitTrimWithParagraph(buttonText,20,0);
                }
            }
        }

      }

});

// trim new line in content.
function characterLineLimitTrimWithParagraph(content, charLimit, charLineLimit) {
    //get all the <p> for new line count
    const searchStr = '<p>';
    const indexes = [...content.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    const searchStrEnd = '</p>';
    const indexesEnd = [...content.matchAll(new RegExp(searchStrEnd, 'gi'))].map(a => a.index);

    if(indexes.length == 0 && content.length > charLimit) {
        limitFlag = true;
        return content.substring(0, charLimit);
    }else if(indexes.length > 0 && indexes.length < charLineLimit + 1) {
        limitFlag = true;
        return characterLimit(content,charLimit, indexes, indexesEnd);
    }else if(indexes.length > 0 && indexes.length > charLineLimit) {
        limitFlag = true;
        //trim to maximum
        return characterLimit(content,charLimit, indexes.slice(0,charLineLimit),
        indexesEnd.slice(0,charLineLimit));
    } else {
        return content;
    }
}

// trim character to its limit
function characterLimit(content, charLimit,indexesStart, indexesEnd) {
    let count = 0;
    let placeHolder = "";
    let indexCount = indexesStart.length;
    for(let i = 0; i < indexCount; i++) {
        let tempCharacterCount = 0;
        let character = content.substring(indexesStart[i] + 3, indexesEnd[i]);
        count = count + parseInt(character.length);
        tempCharacterCount = parseInt(character.length);
        if(count > charLimit) {
            let remainIndex = 0;
            if(placeHolder == "") {
                remainIndex = charLimit;
            } else {
                //deduct the tempCharacterCount to get the exact remaining count
                count = count - tempCharacterCount;
                remainIndex = charLimit - count;
            }
            character = character.substring(0, remainIndex);
            placeHolder=placeHolder + "<p>" + character + "</p>";
            break;
        }
        placeHolder=placeHolder + "<p>" + character + "</p>";
    }
    return placeHolder;
}