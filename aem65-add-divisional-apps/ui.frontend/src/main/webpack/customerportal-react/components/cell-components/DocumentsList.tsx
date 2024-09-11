import React from "react";

export const DocumentsList = (props) => {
    const {fileNames, docsCollection, onDownloadClick} = props.value;

    // extracts file name and type
    const parseDocumentObj = (fileName) => {
        // group 0 : full file name
        // group 1 : file name without extension
        // group 2 : extension
        const regex = new RegExp('(.+?)(\\.[^.]*$|$)'),
            matches = fileName?.match(regex);
            if (matches && matches.length == 3) {
                const shortFileName = (matches[1] ? matches[1] : fileName),
                    fullFileName = fileName,
                    extension = matches[2] ? matches[2] : '.file',
                    fileType = extension?.slice(1, extension.length).toUpperCase();
                return {
                    fullFileName : fullFileName,
                    fileName : shortFileName,
                    extension : extension,
                    fileType : fileType
                }
            } else {
                return false;
            }
    }

    const getTitle = (document) => {
        // display document metadata
        let title = "";
        Object.keys(document).forEach((key, index) => {
            if (index != 0) {
                title += ', ';
            }
            title += `${key}: ${document[key]}`
        });
        return title;
    }

    const documents = fileNames?.map( (fileName, indx) => parseDocumentObj(fileName)) ?? [];

    return (<>
        <ul className={'m-documents-list'}>
            {documents.map((document, indx)=> (
                <li key={`document-${indx}`} className={'m-documents-list__item'}>
                    {/* TODO: Remove this conditional on docsCollection */}
                    {docsCollection && (<a href={"#"} onClick={(e) => {
                        e.preventDefault();
                        if (onDownloadClick && typeof onDownloadClick == "function") {
                            onDownloadClick([docsCollection[indx]]);
                        }
                    }} title={getTitle(docsCollection[indx])}><div className="a-chips">
                            <span className="a-chips--link" >{document.fileType}</span>
                        </div>{document.fileName}</a>)}
                    {!docsCollection && (<a href={"#"} onClick={(e) => {
                        e.preventDefault();
                    }}><div className="a-chips">
                            <span className="a-chips--link" >{document.fileType}</span>
                        </div>{document.fileName}</a>)}
                </li>
            ))}
        </ul>
    </>);
}