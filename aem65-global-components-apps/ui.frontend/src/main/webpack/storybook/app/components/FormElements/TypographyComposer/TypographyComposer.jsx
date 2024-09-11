import React, { useContext, useState, useRef, useEffect } from 'react';
import { PreviewContext } from '../../../context/PreviewContext';
import { sentenceCase } from '../../../utils/Common';
import Button from '../../Button';
import Color from '../Color';
import Font from '../Font';
import FontWeight from '../FontWeight';
import Unit from '../Unit';
import './TypographyComposer.scss';

const TypographyComposer = React.memo((props) => {
  const {config, onChange, changedVariables} = props;
  const {previewState, forceUpdate} = useContext(PreviewContext);
  const [variationActive, setVariationActive] = useState(false);
  const [colorVal, setColorVal] = useState('');
  const [error, setError] = useState('');
  const ref = useRef();

  const handleChange = (key, value) => {
    onChange && onChange(key, value);
  }

  useEffect(()=>{
    if (variationActive) {
      ref.current.querySelector('.ab-input').focus();
    }
  },[variationActive]);

  const handleAddVariation = (e, value) => {
    e.preventDefault();
    setVariationActive(value);
    if (!value) {
      setError('');
      setColorVal('');
    }
  }

  const hasVariantName = (colorName) => {
    if (config.default.variants) {
      const found = config.default.variants.find((variant)=>variant.colorName===colorName)
      if (found) {
        return true;
      }
    }
    return false;
  }

  const handleSaveVariant = (e) => {
    e.preventDefault();

    const clrVal = sentenceCase(colorVal.trim());

    if (hasVariantName(clrVal)) {
      setError('Variation already exists');
      return;
    }

    const obj = {
      key: `${config.default.color.key}-variant-${colorVal.toLowerCase().replace(/\s/g, '-')}`,
      colorName: clrVal,
      value: 'var(--primary-color)'
    }
    previewState.newTheme.addTypographyVariant(config.configkey, obj);
    setVariationActive(false);
    setColorVal('');
    setError('');
    forceUpdate();
  }

  const handleDeleteVariant = (e, variant) => {
    e.preventDefault();
    previewState.newTheme.removeTypographyVariant(config.configkey, variant.key);
    forceUpdate();
  }

  const handleVariantColorChange = (key, val) => {
    previewState.newTheme.updateTypographyVariant(config.configkey, key, val);
    forceUpdate();
  }


  return (
    <div className="stb-typography-composer">
        <div className="stb-typography-composer__ele font">
          <Font config={{
            default: config.default.fontFamily
          }}  changedVariables={changedVariables} onChange={handleChange} />
        </div>

        <div className="stb-typography-composer__ele weight">
          <FontWeight config={{
            default: config.default.fontWeight
          }}  changedVariables={changedVariables} onChange={handleChange} />
        </div>

        <div className="stb-typography-composer__ele">
          <Unit config={{
            default: config.default.fontSize
          }}  changedVariables={changedVariables} onChange={handleChange} />
          <p>Size</p>
        </div>

        <div className="stb-typography-composer__ele">
          <Unit config={{
            default: config.default.letterSpacing
          }}  changedVariables={changedVariables} onChange={handleChange} />
          <p>letter spacing</p>
        </div>

        <div className="stb-typography-composer__ele line">
          <Unit config={{
            default: config.default.lineHeight
          }}  changedVariables={changedVariables} onChange={handleChange} />
          <p>Line Height</p>
        </div>

        <div className="stb-typography-composer__ele color">
          <Color config={{
            default: config.default.color
          }}  changedVariables={changedVariables} onChange={handleChange} />
        </div>

        {!config.isBaseStyle && <div className="stb-typography-composer__variants">
          {
            config.default.variants && config.default.variants.map((variant,idx)=>{
              return <div key={idx} className='stb-typography-composer__variants-color'>
                <span className="stb-right-rail__var-title">{variant.colorName}</span>
                <Color config={{
                  default: variant
                }} onChange={handleVariantColorChange} />
                <a href='#' onClick={(e)=>handleDeleteVariant(e,variant)}>
                    <i className="mdi mdi-delete-outline" aria-hidden="true"></i>
                </a>
              </div>
            })
          }
          <div ref={ref} className="stb-typography-composer__variants-wrap">
            {variationActive && <div className="stb-typography-composer__input-wrap">
              <span className="stb-typography-composer__variants-title">Variation Label</span>
              <input className='ab-input' value={colorVal} onChange={e => setColorVal(e.target.value)} />
              <a href='#' onClick={e => handleAddVariation(e, false)}>
                  <i className="mdi mdi-close" aria-hidden="true"></i>
              </a>
              <a href='#' onClick={e => handleSaveVariant(e)} className={!colorVal ? 'disabled-check' : ''}>
                  <i className="mdi mdi-check" aria-hidden="true"></i>
              </a>
              {error && <p className="error-msg">{error}</p>}
            </div>}
            {!variationActive && <Button size='small' label='Add Variation' secondary={true} onClick={(e)=>handleAddVariation(e, true)} />}
          </div>
        </div>}
    </div>
  )
});

export default TypographyComposer;
