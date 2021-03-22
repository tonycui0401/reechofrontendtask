/* eslint-disable no-useless-constructor */
import React, { Component, Fragment } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import SelectionSuggestion from './selectionSuggestion'
import HearAboutSuggestion  from './HearAboutSuggestion'
// import {ANYTHINGIMPORTANTS} from './anythingimportant';
// import {CITIES} from './cities'
import { isEmail } from "validator";
import SelectForm from './SelectForm'
import {COUNTRIES} from './countries'
import TagService from "../../services/tag.service";
// import { throws } from 'assert';
// const languages = [
//   'Beijing',
//   'Jinan'
// ]



// console.log(typeof suggestions)
// console.log(suggestions)


// const ncountries = COUNTRIES.unshift('select your country')
const selectList = {
  // selectedOption : 'month',
  options: COUNTRIES
}


  // const KeyCodes = {
  //   comma: 188,
  //   enter: 13,
  // };
  
  // const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
  

class PersonalDetails extends Component{

    constructor(props) {
        super(props);

        console.log(this.props.values)

        this.state = {
          email_errors:'',
          phone_errors: '',
          cities: []

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
      let regex = new RegExp('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im')
        e.preventDefault();
        if(this.props.values.email===''){
          this.setState({ email_errors : "Email cannot be empty" })
        }else if(this.props.values.phone===''){
          this.setState({ phone_errors : "phone cannot be empty" })
        }else if(!isEmail(this.props.values.email)){
          this.setState({ email_errors : "This is not a valid email" })
        }else if(isNaN(this.props.values.phone)){
          this.setState({ phone_errors : "This is not a valid phone" })
        }else
        {
        this.props.nextStep();




        TagService.sendMail(this.props.values.email).then(
          response => {
  
            
            console.log("this is"+response.data)
         
          }).catch((error) => {
            console.log(error);
            });


     




        if(this.props.values.country===''){
          // alert("no country")
        }
        }
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }


    updateLocation=(location)=>{
   
        this.props.changeLocation(location);

    }

 

    updateCountry=(country)=>{
      this.props.changeCountry(country)
  }
    
    render(){
   

        const { values } = this.props

        // let listItem = this.state.skillTags.map((d) => <span key={d.id}>{d.text}&nbsp;&nbsp;</span>);
//  console.log(Object.values(this.state.skillTags));

// let suggestions = this.state.skillTags.data.map((country) => {
//   return {
//     id: country.id,
//     text: country.title
//   }
// })

        return(
       
            <Fragment>
              {/* {console.log(this.state.skillTags)} */}

                 
            <Container className="mt-5">
              {/* {show} */}
             {/* {listItem} */}
                <Col md={6} className="mx-auto">
                  
                  <h2>Share your contact details</h2>
                  <p>This is your own private information, you control who you share with, how you can be reached, and the security of your account.</p>
    
                  <hr/>
                  <Form >
                  <div className="form-group">
                  <label>Email Address</label>
                    <input
                    type='email' className="form-control"
                    placeholder=''
                    onChange={this.props.handleChange('email')}
                    defaultValue={values.email}
                    />
                    </div>
                    <span style={{color: "red"}}>{this.state.email_errors}</span>

                    <div className="form-group">
                  <label>Phone</label>
                    <input
                    type='phone' className="form-control"
                    placeholder=''
                    onChange={this.props.handleChange('phone')}
                    defaultValue={values.phone}
                    />
                    </div>
                    <span style={{color: "red"}}>{this.state.phone_errors}</span>

                    <div className="form-group">
                  <label>Location</label>
                    {/* <input
                    type='phone' className="form-control"
                    placeholder='location'
                    onChange={this.props.handleChange('location')}
                    defaultValue={values.location}
                    /> */}
                     <SelectionSuggestion  handleChange={this.updateLocation} locationList = {this.state.cities}
                    />
                    </div>

                    <SelectForm selectType="expected" selectList = {selectList} handleChange={this.updateCountry}/>

                    {/* <label>I want to hear about</label>
                    <div>
                    <HearAboutSuggestion  addHearAbout = {this.updateHearAbout}/>
      </div> */}
              </Form>
              </Col>
              <br/>
              
              <div className="row justify-content-center">
                {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div> */}
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>
         
            
         </Container>
        
       </Fragment>

       
        )
    }
}

export default PersonalDetails;