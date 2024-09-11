import React, { useState } from 'react';
import PropTypes  from 'prop-types';
import Modal from './Modal';

const ThemeNameModal = (props) => {
  const {name, show, loading, onChange, onCancel, onClose} = props
  const [modalText, setModalText] = useState(name);
  const [okDisabled, setOkDisabled] = useState(typeof name!== 'string')
  const [errorMsg, setErrorMsg] = useState(false)



  const handleModalClose = () => {
    setModalText(name);
    onClose && onClose();
  }

  const handleModalCancel = () => {
    setModalText(name);
    onCancel && onCancel();
  }

  const handleThemeNameChange = (e) => {
    const themeName = e.target.value;
    const isValid = themeName.match(/^([a-zA-Z0-9]+\s?){3,30}$/g);
    setErrorMsg(!isValid);
    setOkDisabled(!isValid);
    setModalText(e.target.value);
  }

  const handleOkClick = () => {
    if (!okDisabled) {
      setModalText(modalText);
      onChange && onChange(modalText.trim());
    }
  }

  return (
    <Modal loading={loading} okDisabled={okDisabled} show={show} heading="Name Your Theme" cancelTitle="Cancel" okTitle="Continue" onOk={handleOkClick} onCancel={handleModalCancel}  onClose={handleModalClose}>
      <form className="modal_popup_form">
        <label>Theme Name
        <input  type="text" maxLength={30} onChange={handleThemeNameChange} className="new-theme" value={modalText} />
        </label>
        <div className={`help-text ${errorMsg ? 'error' : ''}`}>
          <ul>
            <li>Letters and numbers only (cannot include special characters, cannot include multiple spaces between the characters)</li>
            <li>Minimum 3 characters</li>
          </ul>
        </div>
      </form>
    </Modal>
  )
}

ThemeNameModal.propTypes = {
  show: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  loading: PropTypes.bool
}

export default ThemeNameModal;
