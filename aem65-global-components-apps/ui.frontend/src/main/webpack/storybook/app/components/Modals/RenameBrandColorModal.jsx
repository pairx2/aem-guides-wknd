import React, {useState} from 'react'
import Modal from './Modal'

const RenameBrandColorModal = (props) => {
  const {show, onClose, onCancel, colorName, onChange, colorsData} = props;
  const [newColorName, setNewColorName] = useState(colorName);
  const [errorMsg, setErrorMsg] = useState(false);
  const [nameError, setNameError] = useState(false);

  const resetState = () => {
    setNewColorName('');
    setErrorMsg(false);
    setNameError(false);
  }

  const handleColorNameChange = (e) => {
    const clrName = e.target.value;
    let isValid = clrName.match(/^([a-zA-Z]+){3,30}$/g);
    isValid = isValid && !clrName.match(/(color)/gi);
    setErrorMsg(!isValid);
    setNewColorName(clrName);
    if (nameError) {
      setNameError(false);
    }
  }

  const handleOk = () => {

    const colorNameLower = newColorName.toLowerCase();
    const found = colorsData.find((clr)=>clr.label === colorNameLower);

    if (found) {
      setNameError(true);
      return;
    }

    onChange && onChange(colorName, colorNameLower)
    resetState();
  }

  const handleModalClose = () => {
    resetState();
    onClose && onClose();
  }

  const handleModalCancel = () => {
    resetState();
    onCancel && onCancel();
  }


  return (
    <Modal
      show={show}
      okDisabled={errorMsg || !newColorName}
      cancelTitle="Cancel"
      okTitle="Rename"
      heading='Rename Color'
      onOk={handleOk}
      onCancel={handleModalCancel}
      onClose={handleModalClose}
    >
      <form className="modal_popup_form">
          <label>Color Name
            <input type="text" maxLength={30} onChange={handleColorNameChange} className="color-name" value={newColorName} />
          </label>
          {nameError && <p className="help-text error">{`Color name '${newColorName}' already exists`}</p>}
          <div className={`help-text ${errorMsg ? 'error' : ''}`}>
            <ul>
              <li>Letters only (cannot include special characters, cannot include multiple spaces between the characters)</li>
              <li>Minimum 3 characters</li>
              <li>Don't include the text "color" in the name</li>
            </ul>
          </div>
      </form>
    </Modal>
  )
}

export default RenameBrandColorModal
