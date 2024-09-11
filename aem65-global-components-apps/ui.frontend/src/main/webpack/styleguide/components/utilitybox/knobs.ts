import Prism from 'prismjs';
import { ComponentVariant, Knob, KnobValueSet } from '../../framework/AEMPUnkTree/punk-tree';
import { formatHTML, updateHTMLUtilityByHTMLString } from './html'


let currentVariant: ComponentVariant;
let getKnobInputHTMLString: any;
getKnobInputHTMLString = (knob: Knob): string => {
    let inputHTMLString = '';
    if (knob.type == 'text') {
        inputHTMLString += '<input class="form-control bg-ab-dk-gray" type="text" data-knob-id=' + knob.id + ' value="' + knob.value + '">';
    }
    else if (knob.type == 'textarea') {
        inputHTMLString += '<textarea class="form-control bg-ab-dk-gray" rows="3" data-knob-id=' + knob.id + '>' + knob.value + '</textarea>'
    }
    else {
        inputHTMLString += `
        <select class="form-control bg-ab-dk-gray" data-knob-id=`+ knob.id + `>`;

        for (let optionIn of knob.options) {
            inputHTMLString += '<option>' + optionIn + '</option>';
        }

        inputHTMLString += `</select>`;
    }
    return inputHTMLString;
}


let knobsMapFromUtilBox: KnobValueSet[] = [];


let updateKnobsMapFromDOMSelector;
updateKnobsMapFromDOMSelector = (selectorIn: string) => {
    $(selectorIn).each((index, element) => {
        let knobId = $(element).attr('data-knob-id');
        let knobValue = $(element).val();
        if ($(element).val() == '') {
            knobValue = '';
        }
        knobsMapFromUtilBox.push(new KnobValueSet(knobId, String(knobValue)));
    });
}

let updateDemoBox;
updateDemoBox = () => {
    knobsMapFromUtilBox = [];
    updateKnobsMapFromDOMSelector('#stg-util-b-knobs input');
    updateKnobsMapFromDOMSelector('#stg-util-b-knobs textarea');
    updateKnobsMapFromDOMSelector('#stg-util-b-knobs select');
    if (knobsMapFromUtilBox.length > 0) {
        let finalDom = currentVariant.getDecodedHTMLFromKnobSets(knobsMapFromUtilBox);
        $('#stg-demo-iframe').contents().find('body').html(finalDom);
    }
}

let updateHtml: any;
updateHtml = () => {
    let stgDemoBoxHtml = $('#stg-demo-iframe').contents().find('body').html();
    updateHTMLUtilityByHTMLString(stgDemoBoxHtml);
}

$(document).on('keyup', '#stg-util-b-knobs input', function () {
    updateDemoBox();
    updateHtml();
});

$(document).on('keyup', '#stg-util-b-knobs textarea', function () {
    updateDemoBox();
    updateHtml();
});
$(document).on('change', '#stg-util-b-knobs select', function () {
    updateDemoBox();
    updateHtml();
});

let updateKnobs: any;
updateKnobs = (compVariant: ComponentVariant) => {

    let finalDOMout = '';
    if (compVariant.knobs.length == 0) {
        finalDOMout += `<p id="stg-knobs-warning" class="m-2" role="alert">
        .<br>.<br>No Knobs found for variant:`+ compVariant.name + `
      </div>`;
    }
    else {
        for (let knob of compVariant.knobs) {
            finalDOMout +=
                `<tr>
                <td>
                    <p>`+ knob.lable + `</p>
                </td>
                <td>`
                + getKnobInputHTMLString(knob);
            `</td>`;

            finalDOMout += '</tr>';
        }
    }
    currentVariant = compVariant;
    $('#stg-util-b-knobs tbody').html(finalDOMout);
    updateDemoBox();
}
export { updateKnobs }
