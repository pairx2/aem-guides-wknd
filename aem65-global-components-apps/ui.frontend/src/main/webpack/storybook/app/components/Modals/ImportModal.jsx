import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';
import { useHistory } from 'react-router-dom';
import Modal from './Modal'
import { PreviewContext } from '../../context/PreviewContext';
import Api from '../../services/Api';
import ErrorModal from './ErrorModal';
import './ImportModal.scss';

const ImportModal = (props) => {
  const {previewState} = useContext(PreviewContext);
  const history = useHistory();
  const {show, onClose, onCancel} = props;
  const [modalText, setModalText] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  const handleModalClose = () => {
    setModalText('');
    onClose && onClose();
  }

  const handleModalCancel = () => {
    setModalText('');
    onCancel && onCancel();
  }

  const handleThemeNameChange = (e) => {
    const themeName = e.target.value;
    const isValid = themeName.match(/^([a-zA-Z0-9]+\s?){3,30}$/g);
    setErrorMsg(!isValid);
    setModalText(e.target.value);
  }

  const isValidFile = (file) => {
    if (file.type !== 'text/css') {
      setFileError('Invalid file selected, please select only CSS file')
      return false;
    }
    if (file.size > 1048576) {
      setFileError('Selected file size cannot be more than 1MB')
      return false;
    }
    return true;
  }

  const handleFilesDrop = (files) => {
    const file =  files[0];
    if (isValidFile(file)) {
      setSelectedFile(file);
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (isValidFile(file)) {
      setSelectedFile(file);
    }
  }

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(0)} ${sizes[i]}`
  }

  const renderFileDetails = () => {
     if(selectedFile) {
      const size = bytesToSize(selectedFile.size);
      return `${selectedFile.name}, ${size}`;
     }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null);
  }

  const handleErrorBack = () => {
    setFileError(false);
  }

  const handleImport = () => {
    let hasError = false;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    Api.importCSSFile(formData)
      .then((response)=>{
        if (response.success) {
          previewState.newTheme.setup({
            name: modalText,
            themeId: response.fileName,
            isImported: true,
            data: response.data
          });
        } else {
          setErrorCode(response.code);
          hasError = true;
        }
      })
      .catch((e)=>{
        if (e instanceof DOMException) {
          //do nothing
        } else {
          hasError = true;
          setErrorCode(-1);
        }
      })
      .finally(()=>{
        setLoading(false);
        if (hasError) {
          setShowErrorModal(true);
        } else {
          history.push('/theme-builder');
        }
      })
  }

  return (
    <>
      <Modal loading={loading} okDisabled={errorMsg || !modalText || !selectedFile} show={show} okTitle="Import" cancelTitle="Cancel" heading="Import a CSS File" onOk={handleImport} onCancel={handleModalCancel}  onClose={handleModalClose}>
        <form className="modal_popup_form">
          <label>Theme Name
          <input type="text" maxLength={30} onChange={handleThemeNameChange} className="new-theme" value={modalText} />
          </label>
          <div className={`help-text ${errorMsg ? 'error' : ''}`}>
            <ul>
              <li>Letters and numbers only (cannot include special characters, cannot include multiple spaces between the characters)</li>
              <li>Minimum 3 characters</li>
            </ul>
          </div>
          <FileDrop onDrop={handleFilesDrop} className={`${selectedFile ? 'success': (fileError ? 'error': '')}`}>
            {!selectedFile && !fileError  && <div className="content">
              <img src="/public/images/global/icon-upload.svg" height="47" alt="upload icon" />
              <p>Drag and drop your files here</p>
              <p>or</p>
              <p><label className="link">Choose file
                <input type="file" accept=".css" name="custom-file" onChange={handleFileSelect} className="choose-file" />
              </label></p>
            </div>}

            {fileError && <div className="error">
              <p>{fileError}</p>
              <p><span className="link" onClick={handleErrorBack}>Back</span></p>
            </div>}

            {selectedFile && <div className="success">
            <img src="/public/images/global/icon-upload.svg" height="47" alt="upload icon" />
              <p>{renderFileDetails()}</p>
              <p><span className="link" onClick={handleRemoveFile}>Remove</span></p>
            </div>}
          </FileDrop>
          <p className="help-text">Only .css files are supported. File size must be less than 1MB.</p>
        </form>
      </Modal>
      <ErrorModal
        show={showErrorModal}
        errorCode={''+errorCode}
        onOk={()=>setShowErrorModal(false)}
        onClose={()=>setShowErrorModal(false)}
      />
    </>
  )
}

ImportModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func
}

export default ImportModal
