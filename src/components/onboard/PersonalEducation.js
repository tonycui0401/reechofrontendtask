/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row} from 'react-bootstrap';
import  MonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css';
import EducationSuggestion  from './EducationSuggestion'
import {EXPERIENCE} from './experience';
import {COMPANIES} from './comapnies';
import {JOBS} from './jobs';
import SelectionSuggestion from './selectionSuggestion'
import {TextArea } from 'semantic-ui-react';
import TagService from "../../services/tag.service";
import DegreeSuggestion from './DegreeSuggestion'
import InsitutionSuggestion from './InstitutionSuggestion'
// import { throws } from 'assert';





const suggestions = EXPERIENCE.map((country) => {
  return {
    id: country,
    text: country
  }
})
  
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class PersonalEducation extends Component{


  constructor() {
    super();
    this.state = {
      remaining:300,
      degree:[],
      institution:[]
    }

  }


  skipit = (e) => {
    e.preventDefault()
    this.props.nextStep()
}


    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }
    
    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }






    updateDegree = (degree)=>{
        this.props.changeDegree(degree)
    }

    updateInstitution=(institute)=>{
   
        this.props.changeInstitute(institute);

    }

    updateEducation =(education)=>{

        this.props.addEducation(education);

    }

    updateStart =(maskedValue, selectedYear, selectedMonth)=>{
        this.props.changeStart(maskedValue)
    }

    updateEnd =(maskedValue, selectedYear, selectedMonth)=>{
        this.props.changeEnd(maskedValue)
    }


    updateChange = (e) => {

      // console.log(e.target.value.length)
      this.props.handleAboutYou(e.target.value);

      // this.props.handleChange('proudOf')
      this.setState({
remaining:300-e.target.value.length
      });

    }


    componentDidMount() {

    TagService.getDegreeTags().then(
      response => {

        const degree = response.data.map((text) => text.title)
        // console.log(response.data)
        this.setState({
          degree: degree
        });
      },
      error => {
        console.log(error)
      }
    );
    

    TagService.getInstitutionTags().then(
      response => {

        const institution = response.data.map((text) => text.title)
        // console.log(response.data)
        this.setState({
          institution: institution
        });
      },
      error => {
        console.log(error)
      }
    );
    }




    

    render(){
        const { values } = this.props;

        console.log("get the values just once")
        console.log(this.props.values)
        console.log("end get the values just once")

        return(
           
            <Fragment>
            <Container className="mt-5">
            {values.profileType==='talent' ? (
              <Row>
                <Col md={6} className="mx-auto">
                  <h2>Education</h2>
                  {/* <h2>Enter User Details</h2> */}
                  <p>The degree you want to highlight</p>
    
                  <hr/>
            <Form >
            <div className="form-group">
              <label htmlFor="username">Degree</label>
              <DegreeSuggestion singleEntry={true} addDegree = {this.updateDegree}/>
              {/* <SelectionSuggestion  handleChange={this.updateDegree} locationList = {this.state.degree} /> */}
              {/* <input className="form-control"
                    placeholder='Job Title'
                    defaultValue={values.jobTitle}
                    /> */}
            </div>
               
                <div className="form-group">
                <label>Institution</label>
                <InsitutionSuggestion  singleEntry={true} addInstitution= {this.updateInstitution}/>
                {/* <SelectionSuggestion  handleChange={this.updateInstitution} locationList = {this.state.institution} /> */}

                    {/* <input className="form-control"
                    placeholder="Company"
                    defaultValue={values.company}
                    /> */}
                </div> 

                <div className="form-group">
                <label>Duration</label>
                <div className="row justify-content-center">
 
                   Start:              <MonthPickerInput
  year={2018}
  month={8}
  onChange={this.updateStart}
/>
&nbsp;&nbsp;
End:              <MonthPickerInput
  year={2018}
  month={8}
  onChange={this.updateEnd}
/>
</div>
                </div> 
                <div className="form-group">
                <label>Tags this degree</label>
                    <div>
                    <EducationSuggestion  addEducation = {this.updateEducation}/>
      </div>
      </div>
      <p>You can add more education in your profile later.</p>
                
                 <div className="row justify-content-left">
                 {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div> */}
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>

            </Form>
            </Col>
          </Row>
              ):(

               <Row>
                <Col md={6} className="mx-auto">
                <h2>About You</h2>
                  {/* <h2>Enter User Details</h2> */}
                  <p>You are making things happen. Let's hear about you.</p>
    
                  <hr/>
            <Form >
            <TextArea placeholder='' style={{ minHeight: 100 } } onChange={this.updateChange} 
            //   onChange={this.props.handleChange('aboutYou')}
            //         defaultValue={values.aboutYou}
                    
                    
                    />
            <p>character remaining: {this.state.remaining}</p>

       <div className="row justify-content-left">
                 {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div> */}
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>

            </Form>
                </Col>
          </Row>
          
                )}

<br/>
            <br/>
   
   <div className="row justify-content-center">
            <a href="#" onClick={this.skipit}><strong>Skip</strong></a>
            </div>
   
        </Container>
      </Fragment>

        )
    }
}

export default PersonalEducation;