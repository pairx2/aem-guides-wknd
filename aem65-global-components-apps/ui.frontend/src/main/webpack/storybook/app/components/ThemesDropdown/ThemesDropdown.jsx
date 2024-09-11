import React, { useContext } from 'react';
import './ThemesDropdown.scss';
import { themes } from '../../../../../../../themes.config';
import { PreviewContext } from '../../context/PreviewContext';

const ThemesDropdown = () => {
  const {previewState, setTheme, setRTL} = useContext(PreviewContext);

  const handleDropdownChange = (e) => {
    setTheme(e.target.value);
    setRTL(e.target.value.indexOf('rtl') > -1);
  }

  return (
    <label className="stb-themes-dropdown">
      <i className="mdi mdi-chevron-down" aria-hidden="true"></i>
      <select id="stb-theme-box" className="stb-themes-dropdown__ele" value={previewState.theme.name} onChange={(e)=>handleDropdownChange(e)}>
        {
          themes && themes.map((theme, idx)=>{
            return (
              <option value={theme.themeName} key={idx}  >
                  {theme['jcr:title'].join('')} ({theme.themeName})
              </option>
            );
          })
        }
      </select>

    </label>
  )
}

export default ThemesDropdown
