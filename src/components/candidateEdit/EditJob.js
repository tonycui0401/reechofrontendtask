/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment, useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import  MonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css';
import SkillSuggestion  from '../onboard/SkillSuggestion'
// import RoleSuggestion  from './RoleSuggestion'
// import {EXPERIENCE} from './experience';
// import {COMPANIES} from './comapnies';
// import {JOBS} from './jobs';
import SelectionSuggestion from '../onboard/selectionSuggestion'
// import SelectForm from './SelectForm'
import  CheckBox  from '../onboard/CheckBox'
import TagService from "../../services/tag.service";
import Modal from "../Modal";
import UserService from "../../services/user.service";


class EditJob extends Component{


  constructor(props) {
    super(props);
    this.state = {
        editExperience:false,
        addExperience:false,
        isExperienceOpen: false,
    //   contractTypes: [
    //     {id: 1, value: "Permanent", isChecked: false},
    //     {id: 2, value: "Fixed Term", isChecked: false},
    //     {id: 2, value: "Temporary", isChecked: false}
    //   ],
      showEnd:true,
      job:[],
      employer:[],
      jobTitle:'',
      company:'',
      startdate:'',
      enddate:'',
      experience:''
    }



    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }




    updateJobExpenrience = (job)=>{
        // this.props.addJobExperience(job)
    }


    updateRole =()=>{

    }


    updateJobTitle=(jobTitle)=>{
   
        // this.props.changeJobTitle(jobTitle);

    }

    updateCompany =(company)=>{

        // this.props.changeCompany(company);

    }

    updateStart =(maskedValue, selectedYear, selectedMonth)=>{
        // this.props.changeStart(maskedValue)
    }

    updateEnd =(maskedValue, selectedYear, selectedMonth)=>{
        // this.props.changeEnd(maskedValue)
    }


    // handleCheckChieldElement = (event) => {
    //   let contractTypes = this.state.contractTypes
    //   contractTypes.forEach(contractType => {
    //      if (contractType.value === event.target.value)
    //      contractType.isChecked =  event.target.checked
    //   })
    //   this.setState({contractTypes: contractTypes})
    //   console.log(this.state.contractTypes)
    // }


    handleCurrentChange= (e) => {

      
    
      if(e.target.checked){
        this.props.currentJob(true)
        this.setState({
          showEnd:false
        })
      }else{
        this.props.currentJob(false)
        this.setState({
          showEnd:true
        })
      }
    }


    changeExperience=(e)=>{
        e.preventDefault();
        this.setState({
          editExperience:!this.state.editExperience
        })
      }


      saveNewExperience=(e)=>{
        this.forceUpdate();
        this.setState({
      addExperience:false
    })
      }



      saveExperience=(e)=>{
        this.forceUpdate();
        this.setState({
      editExperience:false
    })
      }
    
      addExperience=(e)=>{
        e.preventDefault();
        this.forceUpdate();
        this.setState({
      addExperience:!this.state.addExperience
    })
      }

      toggleExperiencePrivacy =(e)=>{
        e.preventDefault();
        this.setState({ isExperienceOpen: !this.state.isExperienceOpen });
      }




    componentDidMount() {




      if(this.props.userID){

        UserService.getCandidateViewExperience(this.props.userID)
        .then(
                response => {
            
      
        this.setState({
        
          jobTitle:response.data[0].job_title,
          startdate:response.data[0].start_date,
          enddate:response.data[0].end_date,
          company:response.data[0].company,
          experience:response.data[0].experience      
        })
              
                },
                error => {
                  console.log(error)
                }
              );
      
            }else{


        UserService.getCandidateExperience()
        .then(
                response => {
            
      
        this.setState({
          jobTitle:response.data[0].job_title,
          startdate:response.data[0].start_date,
          enddate:response.data[0].end_date,
          company:response.data[0].company,
          experience:response.data[0].experience
        })
              
                },
                error => {
                  console.log(error)
                }
              );
              }




      TagService.getJobTags().then(
        response => {
  
          const job = response.data.map((text) => text.title)
          // console.log(response.data)
          this.setState({
            job: job
          });
        },
        error => {
          console.log(error)
        }
      );
      
  
      TagService.getEmployerTags().then(
        response => {
  
          const employer = response.data.map((text) => text.title)
          // console.log(response.data)
          this.setState({
            employer: employer
          });
        },
        error => {
          console.log(error)
        }
      );
      }
  







  

    render(){
        const { values } = this.props;
        const selectList = {
          // selectedOption : 'month',
          options: ['select contract type', 'Permanent', 'Fixed Term', 'Temporary']
        }



        return(
           <div>



<h4>Experience&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
{this.props.edit?(
  <span><a href="#" onClick={this.changeExperience}><i  className="fa fa-edit"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleExperiencePrivacy}><i className="fa fa-lock"></i></a></span>
):(<div></div>)}
</h4>
<br/>
{!this.state.editExperience ? (
  <div>
<h5>{this.state.company}</h5>
<h6>{this.state.jobTitle}</h6>
<p>{this.state.startdate} to {this.state.enddate}</p>
<div className="row">
{this.state.experience.includes(',')? this.state.experience.split(",").map(hear=>

<div className="tag label label-success ng-scope ng-binding" key={hear}>{hear}&nbsp;&nbsp;</div>

):
<div className="tag label label-success ng-scope ng-binding" key={this.state.experience}>{this.state.experience}&nbsp;&nbsp;</div>
}
</div>
</div>
):(
  <div>
<div className="form-group">
              <label htmlFor="username">Job title</label>
              <SelectionSuggestion  handleChange={this.updateJobTitle} locationList = {this.state.job} />
            </div>

            <div className="form-group">
                <label>Company</label>
                <SelectionSuggestion  handleChange={this.updateCompany} locationList = {this.state.employer} />

                    {/* <input className="form-control"
                    placeholder="Company"
                    defaultValue={values.company}
                    /> */}
                </div> 

                <div className="form-group">
                <label>Duration</label>
                <div className="row justify-content-center">
                <div className="col-3">
                   Start:              <MonthPickerInput
  year={2018}
  month={8}
  onChange={this.updateStart}
/>
</div>
&nbsp;&nbsp;
<div className="col-3" style={{display: this.state.showEnd ? 'block' : 'none' }}>
End:              <MonthPickerInput
  year={2018}
  month={8}
  onChange={this.updateEnd}
/>
</div>
</div>
<input
            name="currentOne"  type="checkbox"
          onChange={this.handleCurrentChange} /> Current Job
          <br/>
</div>
                <div className="form-group">
                <label>Tags this experience</label>
                    <div>
                    <SkillSuggestion  addJobExperience = {this.updateJobExpenrience}/>
      </div>
      </div>
      <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveExperience}>save</Button>
            </div>
            </div>
      </div>
)}
<br/>

{this.props.edit?(
<div className="panel panel-yellow">
  <center>
  <a href="#" onClick={this.addExperience}><h5><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add Experience</h5></a>
  </center>
  </div>
):(<div></div>)}
{!this.state.addExperience ? (

<div></div>

):(

  <div>
  <div className="form-group">
                <label htmlFor="username">Job title</label>
                <SelectionSuggestion  handleChange={this.updateJobTitle} locationList = {this.state.job} />
              </div>
  
              <div className="form-group">
                  <label>Company</label>
                  <SelectionSuggestion  handleChange={this.updateCompany} locationList = {this.state.employer} />
  
                      {/* <input className="form-control"
                      placeholder="Company"
                      defaultValue={values.company}
                      /> */}
                  </div> 
  
                  <div className="form-group">
                  <label>Duration</label>
                  <div className="row justify-content-center">
                  <div className="col-3">
                     Start:              <MonthPickerInput
    year={2018}
    month={8}
    onChange={this.updateStart}
  />
  </div>
  &nbsp;&nbsp;
  <div className="col-3" style={{display: this.state.showEnd ? 'block' : 'none' }}>
  End:              <MonthPickerInput
    year={2018}
    month={8}
    onChange={this.updateEnd}
  />
  </div>
  </div>
  <input
              name="currentOne"  type="checkbox"
            onChange={this.handleCurrentChange} /> Current Job
            <br/>
  </div>
                  <div className="form-group">
                  <label>Tags this experience</label>
                      <div>
                      <SkillSuggestion  addJobExperience = {this.updateJobExpenrience}/>
        </div>
        </div>
        <div className="row justify-content-center">
              <div className="col-3">
              <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveNewExperience}>save</Button>
              </div>
              </div>
        </div>

)}




<Modal isOpen={this.state.isExperienceOpen} onClose={this.toggleExperiencePrivacy}>
          
          <center>
          <h4>Experience</h4>
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
        {/* <div>
          <label>
            <input
              type="radio"
              name="letter"
              value="c"
              // checked={value === "c"}
              onChange={this.handleChange}
            />{" "}
            C
          </label>
        </div>
        <div>Selected: </div> */}
        {/* <div>History: {history.join(", ")}</div> */}
  
           
          
        </Modal>


    


           </div>
          
        )
    }
}

export default EditJob;







