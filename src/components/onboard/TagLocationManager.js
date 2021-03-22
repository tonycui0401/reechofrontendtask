import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';

import 'react-month-picker-input/dist/react-month-picker-input.css';
import {EXPERIENCE} from './experience';

import SelectionSuggestion from './selectionSuggestion'
import SelectForm from './SelectForm'
import {COUNTRIES} from './countries'
import TagService from "../../services/tag.service";

// import { throws } from 'assert';

// const ncountries = COUNTRIES.unshift('select your country')

const selectList = {
    // selectedOption : 'month',
    options: COUNTRIES
  }





class TagLocationManager extends Component{


    constructor(props) {
        super(props);

        this.state = {
          cities: [],
          city:'',
          country:'',
          msg:''
      }

    }


    componentDidMount() {
  
        TagService.getLocationTags().then(
          response => {
      
            const suggestions = response.data.map((country) => {
              return country.title
            })
            // console.log(response.data)
            this.setState({
              cities: suggestions
            });
          },
          error => {
            this.setState({
              cities:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
          }
        );
        }


    saveAndContinue = (e) => {
        e.preventDefault()

        TagService.createLocationTag(this.state.city, this.state.country).then(
            response => {
    
              console.log("this is"+response.data)

              if(response.data!=='equal'){
                this.setState({msg:'location added successfully'});
              }else{
                this.setState({msg:'same location already exist'});
              }
           
            }).catch((error) => {
              console.log(error);
              });

    }

    updateLocation=(location)=>{
   
        this.setState({
            city: location
          });
          console.log(this.state.city)
    }

    updateCountry =(country)=>{
      
        this.setState({
            country: country
          });   
        
          console.log(this.state.country)
        }



    render(){


        return(
           <div>
           
                <div className="form-group">
                <label>Location</label>
                    {/* <input
                    type='phone' className="form-control"
                    placeholder='location'
                    onChange={this.props.handleChange('location')}
                    defaultValue={values.location}
                    /> */}
                     <SelectionSuggestion  handleChange={this.updateLocation}  locationList = {this.state.cities}
                    />
                    </div>
                    <p>location</p>

                    <SelectForm selectList = {selectList}  handleChange={this.updateCountry} />

                    <span style={{color: "red"}}>{this.state.msg}</span>

     
                
                 <div className="row justify-content-left">
            <div className="col-4">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Add location </Button>
            </div>
            </div>
            </div>
        )
    }
}

export default TagLocationManager;