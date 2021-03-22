import Autosuggest from 'react-autosuggest';
import React, { Component, Fragment} from 'react';
import "./autosuggest.css"

// const languages = [
//     {
//       name: 'Beijing',
//     },
//     {
//       name: 'Elm',
//     }
//   ];


// Teach Autosuggest how to calculate suggestions for any given input value.


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class SelectionSuggestion extends Component{


    constructor() {
        super();
    
        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
          value: '',
          selectionSuggestions: []
        };
      }
    
      getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : this.props.locationList.filter(lang =>
          lang.toLowerCase().slice(0, inputLength) === inputValue
        );
      };
    
      onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
        this.props.handleChange(newValue)
    
      };
    
      // Autosuggest will call this function every time you need to update suggestions.
      // You already implemented this logic above, so just use it.
      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          selectionSuggestions: this.getSuggestions(value)
        });
      };
    
      // Autosuggest will call this function every time you need to clear suggestions.
      onSuggestionsClearRequested = () => {
        this.setState({
          selectionSuggestions: []
        });
      };

    render(){

        const { value, selectionSuggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
          placeholder: '',
          value:value,
          onChange: this.onChange
        };


        return(
  <Autosuggest 
        suggestions={selectionSuggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
        )

    }

}

export default SelectionSuggestion;