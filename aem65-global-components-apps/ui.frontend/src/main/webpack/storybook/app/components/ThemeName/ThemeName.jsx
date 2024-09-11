import React, {useState} from 'react';
import Icons from '../../models/Icons';
import IconButton from '../IconButton';
import ThemeNameModal from '../Modals/ThemeNameModal';


const ThemeName = (props) => {
  const {name, className, onChange} = props
  const [newThemeName, setNewThemeName] = useState(name);
  const [showThemeNameEdit, setShowThemeNameEdit] = useState(false);

  const handleEditClick = () => {
    setShowThemeNameEdit(true);
  }

  const handleModalClose = () => {
    setShowThemeNameEdit(false);
  }

  const handleThemeNameChange = (themeName) => {
    setNewThemeName(themeName);
    onChange && onChange(themeName);
    setShowThemeNameEdit(false);
  }


  return (
    <>
      <div className={className}>
        <span className="stb-page-sub-title">{newThemeName}</span>
        <IconButton id="edit" text="Edit" onClick={handleEditClick} small={true} icon={Icons.Edit} />
      </div>
      <ThemeNameModal
        name={newThemeName}
        show={showThemeNameEdit}
        onChange={handleThemeNameChange}
        onClose={handleModalClose}
        onCancel={handleModalClose}
      />
    </>
  )
}

export default ThemeName;
