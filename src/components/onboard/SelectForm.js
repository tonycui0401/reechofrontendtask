import React, { Component, Fragment} from 'react';

class SelectForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // selectedOption: this.props.selectList.selectedOption,
        options: this.props.selectList.options
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
    if(this.props.selectType==="current"){
        this.props.handleChange(event.target.value)
    }else{
        this.props.handleChange(event.target.value)

    //   this.setState({selectedOption: event.target.value});
    }
    // console.log(event.target.value)
    }
  
    // handleSubmit(event) {
    //   alert('Your favorite fruit is: ' + this.state.selectedOption);
    //   event.preventDefault();
    // }
  
    render() {
      return (
        // <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <select className="form-control" id="jobtime" value={this.state.selectedOption} onChange={this.handleChange}>
              { this.state.options.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
      );
    }
  }

export default SelectForm;