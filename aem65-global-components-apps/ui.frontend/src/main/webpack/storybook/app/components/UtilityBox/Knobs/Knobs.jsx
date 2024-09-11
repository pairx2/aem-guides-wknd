import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { PreviewContext } from '../../../context/PreviewContext';
import Input from './FormElements/Input';
import Textarea from './FormElements/Textarea';
import Select from './FormElements/Select';
import './Knobs.scss';

const Knobs = () => {
  const {appState} = useContext(AppContext);
  const {updatePreview} = useContext(PreviewContext);
  const knobs = appState.component.knobs ? [...appState.component.knobs] : [];

  const formElements = {
    'text': Input,
    'textarea': Textarea,
    'dropdown': Select
  }


  const handleOnKnobsChange = () => {
    const finalKnobsets = [];
    knobs.map((knob)=>{
      finalKnobsets.push({id: knob.id, value: knob.value!=='Default Text' ? knob.value: ''});
    });
    updatePreview(finalKnobsets);
  }


  return (
    <div className="stb-knobs">
        {!knobs.length && <p className="stb-knobs__info">No knobs found for this variant</p>}
        {knobs.map((knob)=>{
          const Element = formElements[knob.type];
          return (
            <label key={knob.id} className="stb-knobs__wrap">
              <span className="stb-knobs__label">{knob.lable}</span>
              <Element knob={knob} onChange={handleOnKnobsChange} />
            </label>
          )
        })}
    </div>
  )
}

export default Knobs;
