import React from 'react';
import PropTypes from 'prop-types';


//FormInput component
class CheckInput extends React.Component {


  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }
 
  state = {
 
    invalid: false,
    errorMsg:'',

  };

  handleChange = event => {
    // this.setState({value: event.target.value});
     
  }

  validate = (e) => {
    
      
    
   
  }

  render () {
    return (
 
  <div className="form-row">
  <div className="input-group" id="group">
                <div className="input-field">

    <p>
<input type={this.props.inputType} id={this.props.id} name={this.props.name} value={this.props.label} onChange={this.handleChange}/>
<label htmlFor={this.props.id}>{this.props.label}</label></p>
<div className="errorMessage"><p>{this.state.errorMsg}</p></div>

 


</div>
             
</div>  </div> 
);
  }
}
export default CheckInput;