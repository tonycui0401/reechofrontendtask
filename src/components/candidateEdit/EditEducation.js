/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row} from 'react-bootstrap';
import  MonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css';
import EducationSuggestion  from '../onboard/EducationSuggestion'
// import {EXPERIENCE} from './experience';
// import {COMPANIES} from './comapnies';
// import {JOBS} from './jobs';
import SelectionSuggestion from '../onboard/selectionSuggestion'
import {TextArea } from 'semantic-ui-react';
import TagService from "../../services/tag.service";
import Modal from "../Modal";
import UserService from "../../services/user.service";

// import { throws } from 'assert';





// const suggestions = EXPERIENCE.map((country) => {
//   return {
//     id: country,
//     text: country
//   }
// })
  
// const required = value => {
//     if (!value) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           This field is required!
//         </div>
//       );
//     }
//   };




class EditEducation extends Component{


  constructor() {
    super();
    this.state = {
      remaining:300,
      degree:[],
      institution:[],
      editEducation:false,
      addEducation:false,
      isEducationOpen: false,
      education:''
    }

  }

  changeEducation=(e)=>{
    e.preventDefault();
    this.setState({
      editEducation:!this.state.editEducation
    })
  }


  saveEducation=(e)=>{
    this.forceUpdate();
    this.setState({
  editEducation:false
})
  }




  toggleEducationPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isEducationOpen: !this.state.isEducationOpen });
  }








addNewEducation=(e)=>{
  e.preventDefault();
  this.forceUpdate();
  this.setState({
addEducation:!this.state.addEducation
})
}





  saveNewEducation=(e)=>{
    this.forceUpdate();
    this.setState({
  addEducation:false
})
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
      
      // this.props.handleChange('proudOf')
      this.setState({
remaining:300-e.target.value.length
      });

    }


    componentDidMount() {


      if(this.props.userID){

        UserService.getCandidateViewEducation(this.props.userID)
        .then(
                response => {
            
      
        this.setState({
        
          degree:response.data[0].degree,
          startdate:response.data[0].start_date,
          enddate:response.data[0].end_date,
          institution:response.data[0].institution,
          education:response.data[0].education
      
        })
              
                },
                error => {
                  console.log(error)
                }
              );
      
            }else{

        UserService.getCandidateEducation()
        .then(
                response => {
            
      
        this.setState({
          degree:response.data[0].degree,
          startdate:response.data[0].start_date,
          enddate:response.data[0].end_date,
          institution:response.data[0].institution,
          education:response.data[0].education
        })
              
                },
                error => {
                  console.log(error)
                }
              );
              }


    // TagService.getDegreeTags().then(
    //   response => {

    //     const degree = response.data.map((text) => text.title)
    //     // console.log(response.data)
    //     this.setState({
    //       degree: degree
    //     });
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // );
    

    // TagService.getInstitutionTags().then(
    //   response => {

    //     const institution = response.data.map((text) => text.title)
    //     // console.log(response.data)
    //     this.setState({
    //       institution: institution
    //     });
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // );
    }




    

    render(){
        const { values } = this.props;


        return(
           
           <div>

<h4>Education&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
{this.props.edit?(
  <span><a href="#" onClick={this.changeEducation}><i  className="fa fa-edit"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleEducationPrivacy}><i className="fa fa-lock"></i></a></span>
):(<div></div>)}
</h4>
<br/>




{!this.state.editEducation ? (
<div>
<h5>{this.state.degree}</h5>
<h6>{this.state.institution}</h6>
<p>{this.state.startdate} to {this.state.enddate}</p>
<div className="row">

{this.state.education.includes(',')? this.state.education.split(",").map(hear=>

<div className="tag label label-success ng-scope ng-binding" key={hear}>{hear}&nbsp;&nbsp;</div>

):
<div className="tag label label-success ng-scope ng-binding" key={this.state.education}>{this.state.education}&nbsp;&nbsp;</div>
}
</div>
</div>
):(
<div>
<div className="form-group">
              <label htmlFor="username">Degree</label>
              <SelectionSuggestion  handleChange={this.updateDegree} locationList = {this.state.degree} />
              {/* <input className="form-control"
                    placeholder='Job Title'
                    defaultValue={values.jobTitle}
                    /> */}
            </div>
               
                <div className="form-group">
                <label>Institution</label>
                <SelectionSuggestion  handleChange={this.updateInstitution} locationList = {this.state.institution} />

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
      <div className="row justify-content-center">
  <div className="col-3">
  <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveEducation}>save</Button>
  </div>
  </div>
      </div>
)}






<br/>
{this.props.edit?(
<div className="panel panel-yellow">
  <center>
  <a href="#" onClick={this.addNewEducation}><h5><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add Education</h5></a>
  </center>
  </div>
):(<div></div>)}

  {!this.state.addEducation ? (
<div></div>

  ):(

<div>
<div className="form-group">
              <label htmlFor="username">Degree</label>
              {/* <SelectionSuggestion  handleChange={this.updateDegree} locationList = {this.state.degree} /> */}
              {/* <input className="form-control"
                    placeholder='Job Title'
                    defaultValue={values.jobTitle}
                    /> */}
            </div>
               
                <div className="form-group">
                <label>Institution</label>
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
      <div className="row justify-content-center">
  <div className="col-3">
  <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveNewEducation}>save</Button>
  </div>
  </div>
      </div>
  )}


<Modal isOpen={this.state.isEducationOpen} onClose={this.toggleEducationPrivacy}>
          
          <center>
          <h4>Education</h4>
          </center>
          {/* <h5>Change privacy</h5> */}
        
           <div style={{"padding":"20px"}}>    
          <label>
            <strong>Public</strong>
            <br/>
            <p>Everyone can see this information
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="letter"
              value="a"
              // checked={value === "a"}
              onChange={this.handleChange}
            />{" "}
            </p>
            
          </label>
       

          <label>
          <strong>Private</strong>
          <br/>
          <p>Only you can see it
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="letter"
              value="b"
              // checked={value === "b"}
              onChange={this.handleChange}
            />{" "}
            </p>
          </label>
          </div>  
          
        </Modal>


  


           </div>
        )
    }
}

export default EditEducation;