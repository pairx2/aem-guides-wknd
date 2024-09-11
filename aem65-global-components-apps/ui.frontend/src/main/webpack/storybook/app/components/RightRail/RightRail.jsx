import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Api from '../../services/Api';
import { getCSSRuleFromTheme } from '../../utils/Common';
import Border from '../FormElements/Border';
import Color from '../FormElements/Color';
import Font from '../FormElements/Font';
import Shadow from '../FormElements/Shadow';
import TRBL from '../FormElements/TRBL';
import Unit from '../FormElements/Unit';
import TypographyComposer from '../FormElements/TypographyComposer';
import ShadowComposer from '../FormElements/ShadowComposer';
import './RightRail.scss';

const RightRail = React.memo((props) => {
  let {componentName, themeId, themeVariables, customPageType, customPageData, large, forceContextUpdate, reload} = props;
  const [componentConfig, setComponentConfig] = useState();
  //this value will be used in fetching the css rule
  const [cssRule, setCssRule] = useState();
  const [loading, setLoading] = useState(true);

  //React component for each type
  const componentType = {
    'TRBL': TRBL,
    'unit': Unit,
    'color': Color,
    'border': Border,
    'font': Font,
    'shadow': Shadow
  };

  const customPageComponentType = {
    'TRBL': TRBL,
    'typography': TypographyComposer,
    'shadow': ShadowComposer
  }

  /*
    makes an api call to fetch the component configuration
    on component name change
  */
  useEffect(() => {

    async function getConfigs() {
      if (componentName==='') {
        return;
      }
      setLoading(true);
      if (customPageType && customPageData) {
        setComponentConfig(customPageData);
        return;
      }
      componentName = `_${componentName}`

      const response = await Api.getComponentConfig(themeId, componentName);
      if (response && response.success) {
        setComponentConfig(response.data[componentName]);
      } else {
        //set error
        setComponentConfig(null);
      }

      setLoading(false);
    }
    getConfigs();
  }, [componentName]);


  /*
    Gets the component related CSS rule from the iframe
    on componentconfig change
  */
  useEffect(()=>{
    if (componentConfig && componentConfig.selector)  {
      let firstKey = '';
      if (componentConfig.selector === ':root') {
        firstKey = getFirstKey(componentConfig)
      }
      let rule = getCSSRuleFromTheme(componentConfig.selector, firstKey);

      //if rule not found for the selector, check for the :root
      if (!rule) {
        firstKey = getFirstKey(componentConfig)
        rule = getCSSRuleFromTheme(':root', firstKey);
      }

      setCssRule(rule);
      setLoading(false);
    }
  },[componentConfig, reload])


  const getFirstKey = (config) => {
    const str = JSON.stringify(config).match(/--[^\"]+/);
    if (str && str.length) {
      return str[0];
    }

  }

  /**
   * Handles expand click
   * @param {event} e
   */
  const handleExpand =(e) => {
    const sibling = e.target.nextSibling;
    const hasOpen = e.target.parentElement.classList.contains('expand');

    if (sibling) {
      sibling.style.height = sibling.firstChild.clientHeight + 'px';
      if (hasOpen) {
        requestAnimationFrame(()=>{
          sibling.style.height= '0';
          sibling.style.overflow= 'hidden';
        });
      }
    }
    e.target.parentElement.classList.toggle('expand');

    // the following code will bring the panel into view
    // if (e.target.parentElement.classList.contains('expand')) {
    //   e.target.nextSibling.scrollIntoView({behavior: "smooth", block: "nearest"})
    // }
  }

  /**
   * Updates the height and overflow of the animated item
   * @param {event} e animationEvent
   */
  const handleTransitionEnd = (e) => {
    const target = e.currentTarget;
    const isOpen = target.parentElement.classList.contains('expand');
    if (isOpen) {
      target.style.height  = 'auto'
      target.style.overflow= 'visible';
    } else {
      target.style.height  = '0'
      target.style.overflow= 'hidden';
    }
  }

  /**
   * Components (Unit/TRBL/Color etc) variable change will
   * be applied to the iframe
   * @param {string} key
   * @param {string} val
   */
  const handleChange = (key, val) => {
    if (cssRule) {
      cssRule.style.setProperty(key, val);
      themeVariables.setThemeVariable(componentName, componentConfig.selector, key, val);
      if (customPageType) {
        forceContextUpdate && forceContextUpdate();
      }
    }
  }

  /**
   * Generated Accordion structure for the provided groups using recursion
   * @param {Object} group component config group
   * @param {String} title title used for key
   * @param {Boolean} expanded default state of the accordion
   * @param {Boolean} onlyGroup is only group in the config list
   * @returns jsx
   */
  const getGroupsMarkup = (group, title, expanded=false, onlyGroup = false) => {
    return (
      <>{
        Object.keys(group).map((key, idx)=> {
          let groupItem = group[key];
          const hasGroups = !(groupItem instanceof Array);
          const hasMoreGroups = Object.keys(groupItem).length > 1;
          if (hasGroups && !hasMoreGroups) {
            groupItem = groupItem[Object.keys(groupItem)[0]];
          }

          return (
            <div className={`stb-right-rail__group ${expanded && idx === 0 ? 'expand':''}`}  key={title+key}>
              {/* Don't render the header when it is only group, directly render
               *  the group or variables
               */}
              {!onlyGroup && <h6 className="stb-right-rail__group-title" onKeyUp={(e)=>{e.key==='Enter' && handleExpand(e)}} onClick={(e)=>handleExpand(e)} tabIndex="0">
                <span>{key.replaceAll('-',' ')}</span>
                <i className="mdi mdi-chevron-right" aria-hidden="true"></i>
              </h6>}
              <div className="stb-right-rail__group-item" style={expanded && idx === 0 ? {overflow:'visible'} : {}} onTransitionEnd={handleTransitionEnd}><div className="stb-right-rail__group-wrap">{
                hasGroups && hasMoreGroups ? getGroupsMarkup(groupItem, title, expanded && idx === 0) : getVariablesMarkup(groupItem, key)
              }</div></div>
            </div>
          );
        })
    }</>
    );
  }

  /**
   * Returns markup with React component by type for provided group of variables
   * @param {Object} group
   * @param {String} key
   * @returns jsx
   */
  const getVariablesMarkup = (group, key) => {
    if (!(group instanceof Array)) {
      return;
    }
    return (
      <div className="stb-right-rail__group-wrap">{
        group.map((item,idx)=>{
          //get the React component by type
          const Comp =  (customPageType ? customPageComponentType[item.type] : componentType[item.type]) || Unit;
          let changedVars = themeVariables.getVariablesByComponent(componentName);
          changedVars = changedVars ? changedVars.vars : {};
          return <div className="stb-right-rail__var-wrap" key={idx+key}>
            {item.label && <span className="stb-right-rail__var-title">{item.label}</span>}
            <Comp config={item.config} onChange={handleChange} changedVariables={changedVars} />
          </div>
        })
      }</div>
    );
  }

  /**
   * Generates the right rail component
   * @returns jsx
   */
   const renderRightRail = () =>{
    const titleKey = componentConfig && componentConfig.title.replaceAll(' ', '-').toLowerCase();

    //logic to stop re-render
    if (titleKey && titleKey.indexOf(componentName)  < 0) {
      return;
    }

    //Render groups markup only if groups are available
    if(componentConfig && componentConfig.groups) {
      return getGroupsMarkup(componentConfig.groups, titleKey, true, Object.keys(componentConfig.groups).length < 2);
    }

    //Render variables marup only when variables are available
    if (componentConfig && componentConfig.variables) {
      return <div className="stb-right-rail__group expand">
        {getVariablesMarkup(componentConfig.variables, 'var')}
      </div>;
    }
  }

  return (
    <div className={`stb-right-rail ${large ? 'stb-right-rail--large':''}`}>
      <span className="stb-right-rail__eyebrow">Variables</span>
      <h4 className="stb-right-rail__title">{componentConfig ? componentConfig.title : componentName.replaceAll('-',' ')}</h4>
      {renderRightRail()}
      {loading && <p className="stb-right-rail__text"><span className="stb-right-rail__loading"></span> Fetching variables...</p>}
      {!loading && !componentConfig && <div className="stb-right-rail__group"><p className="stb-right-rail__text">Variables not available for this component</p></div>}
    </div>
  )
});

RightRail.propTypes = {
  themeId: PropTypes.string,
  componentName: PropTypes.string,
  themeVariables: PropTypes.any,
  customPageType: PropTypes.bool,
  customPageData: PropTypes.any,
  large: PropTypes.bool
}

export default RightRail;
