import * as React from "react";
import ReactDOM from "react-dom";

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.querySelector(props.node);
    if(!this.modalRoot){
      console.log("div with id: "+ props.node+ " is missing");
    }
  }

  componentDidMount() {
      this.modalRoot && this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
      this.modalRoot && this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default Portal;