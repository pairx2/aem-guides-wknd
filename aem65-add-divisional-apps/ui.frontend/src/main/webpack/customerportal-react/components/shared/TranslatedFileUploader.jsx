import React, {useMemo, useState} from "react";
import {FileUploader} from "@abbott/add-platform";
import {useTranslation} from "react-i18next";
import {s3FileUploadService} from "../services/S3FileUploadService";

export const TranslatedFileUploader = () => {
    const { t, i18n } = useTranslation();
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFilenames, setUploadedFilenames] = useState([]);
    const {uploadFile} = s3FileUploadService();

    const processUploads = (inFiles) => {
        let processedFiles = [];
        let previousFiles = uploadedFiles;
        let processedUploadedFilenames = uploadedFilenames;

        inFiles.map((item, key) => {
            if (!processedUploadedFilenames.includes(item.filename)) {
                window.showLoading();
                const filename = item.filenameWithoutExtension.slice(0, 18) + "." + item.fileExtension;
                const s3Filename = crypto.randomUUID() + "." + item.fileExtension;
                uploadFile(s3Filename, item);
                processedUploadedFilenames.push(item.filename);
                processedFiles.push({
                    "AttachmentType": "Business",
                    "FileName": filename,
                    "S3FileName": s3Filename,
                    "FullFileName": item.filename
                });
            } else {
                const previous = previousFiles.find((found) => found.FullFileName == item.filename);
                processedFiles.push(previous);
            }
        });

        setUploadedFilenames(processedUploadedFilenames);
        setUploadedFiles(processedFiles);
    };

    const processFiles = useMemo(() => {
        processUploads(files);
    },
    [files]);

    const onChange = (inFiles) => {
        setFiles(inFiles);
    };

    return (
        <>
            <FileUploader
                labelError={t('file-type-error')}
                labelDrag={t('drag-and-drop-your-files-here')}
                labelOr={t('or')}
                labelSelect={t('choose-files')}
                labelMaxFileSizeExceeded={t('file-uploader-file-too-large')}
                labelMaxFileSize={t('file-uploader-file-should-not-exceed-size')}
                labelMaxTotalFileSizeExceeded={t('file-uploader-total-file-size-exceeded')}
                onChange={onChange}></FileUploader>
            <input type="hidden" name="uploaded-s3-files" value={JSON.stringify(uploadedFiles)} />
        </>
    );


};

export default TranslatedFileUploader;
