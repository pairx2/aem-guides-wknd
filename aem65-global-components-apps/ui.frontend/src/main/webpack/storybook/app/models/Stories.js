import { treeConfig, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import "../../../styleguide/styleguide";
import { deepObjectCopy } from '../utils/Common';

export const getStoryConfigs = () => {
  return deepObjectCopy(treeConfig.branches);
}

export const  getComponentVariant = (component) => {

  if(component) {
      const obj = new ComponentVariant(component.name, component.html, component.knobs);
      obj.componentName = component.component;
      return obj;
  }

}
