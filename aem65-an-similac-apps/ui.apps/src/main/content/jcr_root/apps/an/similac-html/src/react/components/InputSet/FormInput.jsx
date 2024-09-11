

import React from 'react';
import PropTypes from 'prop-types';


//FormInput component
class FormInput extends React.Component {


  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
   
  }
 
  state = {
    value: '',
   invalid: false,
        errorMsg:'',
    
 
  };

  handleChange = event => {
     this.setState({value: event.target.value});
     
  }

  validate = (e) => {
    const inputVal= this.state.value;
    const inputType= e.target.type;
 
    let errorMsg=''
    let invalid = false;
    if (inputVal === '' && e.target.required) {
      errorMsg = 'This field is required'
      invalid = true;
    } 
    else if (inputType==="text") {
      if(!inputVal.match(/^[a-zA-Z]+$/)){
      errorMsg = 'Name can be letters only'
      invalid = true;}
    }
  
    else if (inputType==="email") {
      if(!inputVal.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
      errorMsg = "Email Address must contain a valid email address, e.g. 'name@server.com'."
      invalid = true;}
    }   
      
    
    this.setState({
      invalid,
      errorMsg,
     
    })
    
    return invalid;
  }

  render () {
    return (
      <div className="form-row">
      <div className="input-group" id="group">
		        	<div className="input-field">
      <label htmlFor={this.props.id}>{this.props.label} </label>
      <input 
                type={this.props.inputType}
                id={this.props.id} 
                name={this.props.id} 
                defaultValue={this.state.value} 
                onChange={this.handleChange} 
                placeholder={this.props.placeholder}
                onBlur={this.validate}
                
                />
                <div className="errorMessage"><p>{this.state.errorMsg}</p></div>
                </div>
             
</div>  </div>  );
  }
}
export default FormInput;