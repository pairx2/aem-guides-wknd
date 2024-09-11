import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

import Modal from './Modal'

const AddBrandColorModal = (props) => {
  const {show, onClose, onCancel, onAdd, colorsData} = props;
  const [colorName, setColorName] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000');


  const handleColorNameChange = (e) => {
    const clrName = e.target.value;
    let isValid = clrName.match(/^([a-zA-Z]+){3,30}$/g);
    isValid = isValid && !clrName.match(/(color)/gi)
    setErrorMsg(!isValid);
    setColorName(clrName);
    if (nameError) {
      setNameError(false);
    }
  }

  const handleBrandColorChange = (clr) => {
    setSelectedColor(clr.hex);
  }

  const resetState = () => {
    setColorName('');
    setSelectedColor('#000')
    setErrorMsg(false);
    setNameError(false);
  }

  const handleModalClose = () => {
    resetState();
    onClose && onClose();
  }

  const handleModalCancel = () => {
    resetState();
    onCancel && onCancel();
  }

  const handleOk = () => {

    const colorNameLower = colorName.toLowerCase();
    const color = selectedColor;
    const found = colorsData.find((clr)=>clr.label === colorNameLower);
    if (found) {
      setNameError(true);
      return;
    }
    onAdd && onAdd({
      label: colorNameLower,
      color: color
    })
    resetState();
  }

  return (
    <Modal show={show} okDisabled={errorMsg || !colorName} cancelTitle="Cancel" okTitle="Add Color" heading='Add a Color' onOk={handleOk} onCancel={handleModalCancel}  onClose={handleModalClose}>
      <form className="modal_popup_form">
          <label>Color Name
            <input type="text" maxLength={30} onChange={handleColorNameChange} className="color-name" value={colorName} />
          </label>
          {nameError && <p className="help-text error">{`Color name '${colorName}' already exists`}</p>}
          <div className={`help-text ${errorMsg ? 'error' : ''}`}>
            <ul>
              <li>Letters only (cannot include special characters, cannot include multiple spaces between the characters)</li>
              <li>Minimum 3 characters</li>
              <li>Don't include the text "color" in the name</li>
            </ul>
          </div>
          <div className="color-block">
            <SketchPicker
              className='modal-sketch-picker'
              color={selectedColor}
              onChange={handleBrandColorChange}
              disableAlpha={true}
              presetColors={[]}
            />
          </div>
      </form>
    </Modal>
  )
}


AddBrandColorModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onAdd: PropTypes.func
}

export default AddBrandColorModal
