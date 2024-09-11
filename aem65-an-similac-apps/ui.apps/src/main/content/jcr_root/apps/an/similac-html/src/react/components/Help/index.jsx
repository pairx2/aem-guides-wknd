import React from "react";
import { SvgIcon } from "../../common/common";
const { jQuery } = window;

class Help extends React.Component {
  constructor(props) {
    super(props);    
    const { data: { content = "", icon = "" , tooltipImageD = "", tooltipImageM = "",direction = "right"} = {} } = props;
    const template = `
    <div class="popover temp"
    role="tooltip">
    <div class="arrow"></div>
    <h3 class="popover-header"></h3>
    <div class="popover-body"></div>
    </div>
  `;
    this.state = {
      clickMode: false,
      template,
      content,
      icon,
      tooltipImageD,
      tooltipImageM,
      direction
    }
    this.infoRef = React.createRef();
  }
  componentDidMount() {

    const { content } = this.state;
    const { direction } =this.state;
    const { tooltipImageD,tooltipImageM } = this.state;
    jQuery(this.infoRef.current).popover({
      trigger: "click focus",
      html: true,
      placement: direction,
      animation:false,      
      content
    });
    jQuery(this.infoRef.current).on('shown.bs.popover', () => {
      jQuery('body').on('click', this.hideLogic);
    });
    jQuery(this.infoRef.current).on('hidden.bs.popover', () => {
      jQuery('body').off('click', this.hideLogic);
    });
    if(tooltipImageD || tooltipImageM){
      jQuery(this.infoRef.current).on('click',()=>{
        event.preventDefault();
        clearTimeout();
        var self = this.infoRef.current;
        jQuery(this.infoRef.current).popover('show');

        jQuery(".popover").on('mouseenter',()=>{
          clearTimeout();
        });
        jQuery(".popover").on('mouseleave',()=>{
          jQuery(self).popover('hide');
        });

        setTimeout(()=>{
          if(!jQuery('.popover:hover').length){
           jQuery(self).popover("hide");
         }
       },5000);
      });      
    }
  }
  hideLogic = (e) => {
    const { target } = e;
    this.setState({ clickMode: false }, () => {
      let popover = jQuery(this.infoRef.current).data('bs.popover');
      popover._activeTrigger = { hover: false, click: false, focus: false };
      if (!jQuery(target).closest('.popover').length) {
        jQuery(this.infoRef.current).popover('hide');
      }
    });
  }
  componentDidCatch(e) {
  }
  componentWillUnmount() {
    jQuery(this.infoRef.current).popover('dispose');
  }
  shouldComponentUpdate({ data: { content = "" } }) {
    const { data = {} } = this.props;
    if (data.content != content)
      return true;
    return false;
  }
  handleClick = () => {

    this.setState({ clickMode: !this.state.clickMode }, () => {
      const { clickMode } = this.state;
      const { tooltipImageD,tooltipImageM } = this.state;
      let popover = jQuery(this.infoRef.current).data('bs.popover');      
      popover._activeTrigger = { hover: false, click: clickMode, focus: false };
      if (clickMode) {        
        popover._hoverState = "show";
        jQuery(this.infoRef.current).popover('show');        
      }
      else {
        popover._hoverState = "";
        jQuery(this.infoRef.current).popover('hide');
      }
    });
  }
  render() {
    const { data } = this.props;
    const { template, icon,tooltipImageD,tooltipImageM } = this.state;
    let {content} = this.state; 
    if(tooltipImageD || tooltipImageM){
      content = "<div class='tooltip-img'><img src='"+tooltipImageD+"' alt='check image' class='check-img d-none d-sm-block'><img src='"+tooltipImageM+"' alt='check image' class='check-imgM d-sm-none'></div>"+content;
     }
    return (
      <>
        {data && (
          <i
            ref={this.infoRef}
            className="info-component"
            data-content={content}
            data-template={template}
            onClick={this.handleClick}
          >
            {icon && <SvgIcon icon={icon} style={{cursor:"pointer"}}/>}
          </i>
        )}
      </>
    );
  }
}

export default Help;
