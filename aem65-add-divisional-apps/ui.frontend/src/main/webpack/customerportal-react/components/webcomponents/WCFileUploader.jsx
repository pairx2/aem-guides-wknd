import React, { Component, Suspense } from 'react';

import { createCustomElement, DOMModel, byContentVal, byAttrVal, registerEvent } from "@adobe/react-webcomponent";
import {TranslatedFileUploader} from "../shared/TranslatedFileUploader";

export class WCFileUploader extends Component {
    constructor(props) {

        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <Suspense fallback={<div>...</div>}>
                    <TranslatedFileUploader />
                </Suspense>
            </div>
        );
    }
}
class FileUploaderModel extends DOMModel {
    @byContentVal text = "something";
    @registerEvent("change") change;
}

const FileUploaderCustomElement = createCustomElement(WCFileUploader, FileUploaderModel, "element");

window.customElements.define("wc-fileuploader", FileUploaderCustomElement);

export default {FileUploaderCustomElement};
