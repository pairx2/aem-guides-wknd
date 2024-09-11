import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FileSize } from "../atoms/FileSize";

import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginFileEncode from "filepond-plugin-file-encode";

registerPlugin(FilePondPluginFileEncode);

const fileExtensionType = [
  "docx",
  "xlsx",
  "ppt",
  "doc",
  "xls",
  "pptx",
  "pdf",
  "zip",
  "txt",
  "png",
  "jpeg",
  "csv",
  "visio",
  "jpg",
];

export const FileUploader = (props) => {
  const {
    allowMultiple,
    encodeBase64,
    onChange,
    maxFiles,
    labelDrag,
    labelOr,
    labelSelect,
    maxFileSize,
    maxTotalFileSize,
    labelMaxFileSizeExceeded,
    labelMaxFileSize,
    labelMaxTotalFileSizeExceeded,
    labelError,
  } = props;

  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [validationError, setValidationError] = useState(false);
  const [totalSizeExceeded, setTotalSizeExceeded] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);

  const removeFile = (index) => {
    setFiles((files) => files.filter((file, i) => i !== index));
    setUploadFiles((uploadFiles) =>
      uploadFiles.filter((file, i) => i !== index)
    );
  };

  const setFileData = (inFiles) => {
    let totalSize = 0;
    let hasError = false;

    var fileSrc = inFiles;

    for (let i in fileSrc) {
      if (!fileExtensionType.includes(fileSrc[i]?.fileExtension)) {
        setFileTypeError(true);
        break;
      }
    }

    fileSrc.map((item, key) => {
      if (!fileExtensionType.includes(item?.fileExtension)) {
        fileSrc.splice(key, 1);
      }
    });

    if (fileSrc.length != 0) {
      let outFiles = fileSrc.map((item, key) => {
        totalSize = totalSize + item.fileSize;
        let jsonFile = {};
        jsonFile["name"] = item.filename;
        jsonFile["nameWithoutExtension"] = item.filenameWithoutExtension;
        jsonFile["extension"] = item.fileExtension;
        jsonFile["size"] = item.fileSize;
        if (item.fileSize > maxFileSize) {
          jsonFile["fileTooLarge"] = true;
          hasError = true;
        } else {
          if (encodeBase64) {
            jsonFile["base64"] = item.getFileEncodeBase64String();
          }
        }
        return jsonFile;
      });
      setUploadFiles(outFiles);
    }
    if (totalSize > maxTotalFileSize) {
      setTotalSizeExceeded(true);
      hasError = true;
    } else {
      setTotalSizeExceeded(false);
    }

    if (hasError) {
      setValidationError(true);
      const event = new Event("file-uploader-invalid");
      document.dispatchEvent(event);
    } else {
      setValidationError(false);
      const event = new Event("file-uploader-valid");
      document.dispatchEvent(event);
    }

    if (onChange && typeof onChange == "function") {
      onChange(fileSrc);
    }

    setFiles(fileSrc);
  };

  const labelIdle = () => {
    var label =
      '<div class="m-file-uploader__drag-drop"><em class="abt-icon abt-icon-upload"></em>';
    label += labelDrag;
    label += '</div><div class="m-file-uploader__label-ortext">';
    label += labelOr;
    label +=
      '</div><div class="filepond--label-action m-file-uploader__label-action">';
    label += labelSelect;
    label += "</div>";
    return label;
  };

  const closeErrorPopUp = () => {
    setFileTypeError(false);
  }

  return (
    <div className="m-file-uploader">
      <div className="a-input-field mt-0">
        <div
          className={`form-group a-form-grp ${
            validationError ? "validation-error" : ""
          }`}
        >
          <FilePond
            files={files}
            onupdatefiles={setFileData}
            allowMultiple={allowMultiple}
            allowFileEncode={true}
            maxFiles={maxFiles}
            labelIdle={labelIdle()}
          />
          <div className="m-file-uploader__filedetails-wrapper">
            {uploadFiles?.map((item, index) => (
              <div
                key={`m-file-uploader__filedetails-${index}`}
                className="m-file-uploader__filedetails"
              >
                <p className="m-file-uploader__filedetails-label"></p>
                <div className="m-file-uploader__filename">
                  <em className="abt-icon abt-icon abt-icon-file-empty"></em>
                  <span className="m-file-uploader__name">{item.name}</span>
                  <span className="m-file-uploader__size">
                    <FileSize size={item.size} />
                  </span>
                </div>
                <div
                  className="m-file-uploader__removefile"
                  onClick={() => removeFile(index)}
                >
                  <em className="abt-icon abt-icon abt-icon-cross"></em>
                  <div className="m-file-uploader__removelabel"></div>
                </div>
                {item.fileTooLarge && (
                  <div className="m-file-uploader__file-error">
                    {labelMaxFileSizeExceeded}
                  </div>
                )}
              </div>
            ))}
            {totalSizeExceeded && (
              <div className="m-file-uploader__file-error">
                {labelMaxTotalFileSizeExceeded}
              </div>
            )}
            <div className="disclaimer-text">({labelMaxFileSize})</div>
          </div>
          <input
            type="hidden"
            name="uploaded-files"
            value={JSON.stringify(uploadFiles)}
          />
        </div>
        {fileTypeError ? (<div className="file-type-error-sec" >
          <div className="file-type-error-desc">
          <em onClick={closeErrorPopUp} class="abt-icon abt-icon abt-icon-cross"></em>
            <p className="filet-type-error-text" >{labelError}</p>
          </div>
        </div>): null}
        
      </div>
    </div>
  );
};

FileUploader.defaultProps = {
  allowMultiple: true,
  maxFiles: 10,
  encodeBase64: false,
  onChange: null,
  labelDrag: "Drag and drop your files here",
  labelOr: "OR",
  labelSelect: "Choose Files",
  maxFileSize: 4 * 1024 * 1024,
  maxTotalFileSize: 20 * 1024 * 1024,
  labelMaxFileSizeExceeded: "File is too large, should not exceed 4MB",
  labelMaxFileSize: "Total file size should not exceed 20MB and 4MB per file",
  labelMaxTotalFileSizeExceeded:
    "Total file size exceeded, should not exceed 20MB",
  labelError: "Error",
};

FileUploader.propTypes = {
  allowMultiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  encodeBase64: PropTypes.bool,
  onChange: PropTypes.func,
  labelDrag: PropTypes.string,
  labelOr: PropTypes.string,
  labelSelect: PropTypes.string,
  maxFileSize: PropTypes.number,
  maxTotalFileSize: PropTypes.number,
  labelMaxFileSizeExceeded: PropTypes.string,
  labelMaxFileSize: PropTypes.string,
  labelMaxTotalFileSizeExceeded: PropTypes.string,
  labelError: PropTypes.string,
};

export default FileUploader;
