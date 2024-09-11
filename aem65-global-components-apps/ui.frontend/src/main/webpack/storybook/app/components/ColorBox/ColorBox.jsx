import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CompactPicker, SketchPicker } from 'react-color';
import Icons from '../../models/Icons';
import IconButton from '../IconButton';
import Modal from '../Modals/Modal';
import './ColorBox.scss';

const ColorBox = React.memo((props) => {

  const {
    label,
    shadeTintPickerData,
    originalColor,
    color,
    isMainColor,
    varKey,
    onChange,
    readonly,
    isShade,
    isNew,
    onReset,
    onEdit,
    onRemove
  } = props;
  const [selectedColor, setSelectedColor] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [oldOriginalColor, setOldOriginalColor] = useState(originalColor);
  const ref = useRef();


  useEffect(()=>{
    if (selectedColor !== color) {
      onChange && onChange(varKey, selectedColor);
    }
  }, [selectedColor])

  useEffect(()=>{
    if (originalColor !== oldOriginalColor) {
      setSelectedColor(originalColor);
      setOldOriginalColor(originalColor)
    }
  },[originalColor]);


  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
        document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  useEffect(()=>{
    setSelectedColor(color);
  }, [color]);


  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowColorPicker(false);
    }
  }

  const handleResetColor = () => {
    setSelectedColor(originalColor)
    onReset && onReset(varKey, originalColor);
  }

  const handleBoxClick = () => {
    if (!readonly) {
      setShowColorPicker(!showColorPicker)
    }
  }

  const handleEditClick = (...args) => {
    const e = args[args.length-1];
    // have to stop propogation to avoid showing
    // color picker, as it is shown on title click
    if (e) {
      e.stopPropagation();
    }
    onEdit && onEdit(label);
  }

  const handleRemoveClick = () => {
    onRemove && onRemove(label);
    setShowDeleteModal(false);
  }

  return (
    <div ref={ref} className="color-box-wrap">
      <div
        className={`color-box ${!isMainColor ? 'color-box--small' : ''} ${readonly ? 'readonly':''}`}
        style={{backgroundColor: selectedColor}}
        onClick={handleBoxClick}
        key={varKey}
        >
          <p className="color-box__label">
            <span>{label}</span>
            <span className='color-box__color'>{selectedColor}</span>
            {isNew && <IconButton id="edit" className='edit' onClick={handleEditClick} text='Edit' icon={Icons.Edit} small={true}  />}
          </p>
      </div>
      {isNew && <IconButton id="delete" className='delete'  onClick={()=>setShowDeleteModal(true)} text="Remove" icon={Icons.Delete} medium={true} />}
      {originalColor !== selectedColor && <p className='color-box__reset' onClick={handleResetColor} data-tooltip={`Will reset the color to the original value (${originalColor})`}>Reset to default</p>}
      {(isMainColor || !shadeTintPickerData) && showColorPicker && <SketchPicker
        width={325}
        className="stb-sketch-picker"
        color={selectedColor}
        disableAlpha={true}
        presetColors={[]}
        onChange={skchColor=>setSelectedColor(skchColor.hex)}
      />}
      {
        !isMainColor && showColorPicker && shadeTintPickerData && <CompactPicker
          className='stb-block-picker'
          colors={shadeTintPickerData[isShade ? 'shades':'tints']}
          color={selectedColor}
          onChange ={skchColor=>setSelectedColor(skchColor.hex)}
          />
      }
      {showDeleteModal && <Modal show={showDeleteModal} onOk={handleRemoveClick} onCancel={()=>setShowDeleteModal(false)} onClose={()=>setShowDeleteModal(false)} okTitle="Delete" cancelTitle="Cancel" heading="Are you sure you want to delete this color?">
        This color will be removed, and any components in your theme that have this color applied will have a blank color.
      </Modal>}


    </div>
  );
});

ColorBox.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  originalColor: PropTypes.string.isRequired,
  isMainColor: PropTypes.bool,
  varKey: PropTypes.string,
  shadeTintPickerData: PropTypes.object,
  isShade: PropTypes.bool,
  readonly: PropTypes.bool,
  isNew: PropTypes.bool,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};

export default ColorBox;
