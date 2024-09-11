import React, { Component } from 'react';
import PropTypes from "prop-types";
 
class UseIntersection extends Component {

  static propTypes = {
    onVisible: PropTypes.bool,
    children: PropTypes.func.isRequired
  }

  state = {
    isVisible: false
  }

  elementRef = React.createRef();
 
  componentDidMount() {
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.state.isVisible) {
          this.setState({ isVisible: true });
 
          if (this.props.onVisible) {
            this.props.onVisible();
          }
        }
      },
      { rootMargin: '0px' }
    );
 
    this.intersectionObserver.observe(this.elementRef.current);
  }
 
  componentWillUnmount() {
    this.intersectionObserver.disconnect();
  }
 
  render() {
    const { isVisible } = this.state;
    const { children } = this.props;
 
    return <div ref={this.elementRef}>{children(isVisible)}</div>;
  }
}
 
export default UseIntersection;