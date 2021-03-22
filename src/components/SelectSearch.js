import React, {Component} from 'react';
import Select from "react-select";

class SelectSearch extends Component {
  render() {

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'lightgrey' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            // backgroundColor:'lightgrey',
            backgroundColor: isDisabled ? 'red' : 'blue',
            color: '#000',
            // cursor: 'pointer',
            // hover: '#ddd'
            // cursor: isDisabled ? 'not-allowed' : 'default',
        }
      }
    }

    return (
      <Select
        value={this.props.selected}
        onChange={this.props.onChange}
        options={this.props.options}
        // styles={colourStyles}
      />
    );
  }
}

export default SelectSearch;