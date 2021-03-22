/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment, useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import  MonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css';
import SkillSuggestion  from './SkillSuggestion'
import RoleSuggestion  from './RoleSuggestion'
import {EXPERIENCE} from './experience';
import {COMPANIES} from './comapnies';
import {JOBS} from './jobs';
import SelectionSuggestion from './selectionSuggestion'
import SelectForm from './SelectForm'
import  CheckBox  from './CheckBox'
import TagService from "../../services/tag.service";
import JobTagSuggestion  from './JobTagSuggestion'
import EmployerSuggestion  from './EmployerSuggestion'
import axios from "axios";
import UserService from "../../services/user.service";

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




class PersonalExperience extends Component{


  constructor(props) {
    super(props);
    this.state = {
      contractTypes: [
        {id: 1, value: "Permanent", isChecked: false},
        {id: 2, value: "Fixed Term", isChecked: false},
        {id: 2, value: "Temporary", isChecked: false}
      ],
      showEnd:true,
      job:[],
      employer:[],
      success : false,
      url : "",
      filename:"",
      error: false,
      errorMessage : ""
    }

    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }


    skipit = (e) => {
      e.preventDefault()
      this.props.nextStep()
  }



    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()

        const url = this.state.url.substring(this.state.url.lastIndexOf('/') + 1)

        UserService.updateCompanyImg(url).then(
          response => {
      
            console.log("start update")
            console.log(url)
              console.log(response.data)
              console.log("finish update")
          
          },
          error => {
            console.log(error)
          }
        );



    }
    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    updateJobExpenrience = (job)=>{
        this.props.addJobExperience(job)
    }

    updateReJobExpenrience = (job)=>{
      this.props.addReJobExperience(job)
  }


    updateRole =(role)=>{
      this.props.addReRole(role)
    }


    updateJobTitle=(jobTitle)=>{
   
        this.props.changeJobTitle(jobTitle);

    }

    updateCompany =(company)=>{

        this.props.changeCompany(company);

    }

    updateStart =(maskedValue, selectedYear, selectedMonth)=>{
        this.props.changeStart(maskedValue)
    }

    updateEnd =(maskedValue, selectedYear, selectedMonth)=>{
        this.props.changeEnd(maskedValue)
    }


    handleCheckChieldElement = (event) => {
      let contractTypes = this.state.contractTypes
      contractTypes.forEach(contractType => {
         if (contractType.value === event.target.value)
         contractType.isChecked =  event.target.checked
      })
      this.setState({contractTypes: contractTypes})

      this.props.changeContractType(this.state.contractTypes)

      console.log(this.state.contractTypes)
    }


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




    handleChange = (ev) => {
      this.setState({success: false, url : ""});
      let file = this.uploadInput.files[0];
      // Split the filename to get the name and type
      let fileParts = this.uploadInput.files[0].name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      console.log("Preparing the upload");
      console.log(fileParts)
      axios.post("http://reecho-env.eba-bk9ugpha.eu-west-1.elasticbeanstalk.com/sign_s3_company_image",{
      // axios.post("http://localhost:5000/sign_s3_comapny_image",{

        fileName : fileName,
        fileType : fileType
      })
      .then(response => {
        console.log(response)
        console.log("Preparing no error");
        var returnData = response.data.data.returnData;
        console.log(returnData);
  
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({url: url})
        this.setState({filename: returnData.filename})
        console.log("Recieved a signed request " + signedRequest);
  
        var options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios.put(signedRequest,file,options)
        .then(result => {
          console.log("Response from s3")
          this.setState({success: true});
        })
        .catch(error => {
          alert("ERROR " + JSON.stringify(error));
        })
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })
    }


    componentDidMount() {

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

        console.log("get the current values")
        console.log(this.props.values)
        console.log("end get the current values")

        const selectList = {
          // selectedOption : 'month',
          options: ['select contract type', 'Permanent', 'Fixed Term', 'Temporary']
        }

        const SuccessMessage = () => (
          <div style={{padding:50}}>
            {/* <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3> */}
            <img src={this.state.url} style={{width:'200px'}}/>
            {/* <a href={this.state.url}>Access the file here</a> */}
            <br/>
          </div>
        )
        const ErrorMessage = () => (
          <div style={{padding:50}}>
            <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
            <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
            <span>{this.state.errorMessage}</span>
            <br/>
          </div>
        )

        return(
           
            <Fragment>
            <Container className="mt-5">
            {values.profileType==='talent' ? (
              <Row>
                <Col md={6} className="mx-auto">
                
                  <h2>Let's start connecting you to the right opportunities</h2>
                  {/* <h2>Enter User Details</h2> */}
                  <p>Your current or most recent employment</p>
    
                  <hr/>
            <Form >
            <div className="form-group">
              <label htmlFor="username">Job title</label>
              <JobTagSuggestion  singleEntry={true} addJobTitle={this.updateJobTitle} />
              {/* <SelectionSuggestion  handleChange={this.updateJobTitle} locationList = {this.state.job} /> */}
              {/* <input className="form-control"
                    placeholder='Job Title'
                    defaultValue={values.jobTitle}
                    /> */}
            </div>
               
                <div className="form-group">
                <label>Company</label>
                <EmployerSuggestion  singleEntry={true} addEmployer={this.updateCompany}/>
                {/* <SelectionSuggestion  handleChange={this.updateCompany} locationList = {this.state.employer} /> */}

                    {/* <input className="form-control"
                    placeholder="Company"
                    defaultValue={values.company}
                    /> */}
                </div> 

                <div className="form-group">
                <label>Duration</label>
                <div className="row justify-content-center">
                <div className="col-4">
                   Start:              <MonthPickerInput
  year={2018}
  month={8}
  onChange={this.updateStart}
/>
</div>
&nbsp;&nbsp;
<div className="col-4" style={{display: this.state.showEnd ? 'block' : 'none' }}>
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
      <p>You can add more positions in your profile later.</p>
                
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
            <h2>What do you do?</h2>
            <br/>
            <center>
            <p>You might cover several skills, sectors and role types, you might be specialised. Let us know so others can find you.</p>
            </center>
            <br/>

            <div className="form-group">
                <label>Tag your experience</label>
                    <div>
                    <SkillSuggestion  addJobExperience = {this.updateReJobExpenrience}/>
      </div>
      </div>
      <div className="form-group">
                <label>Tag your roles</label>
                    <div>
                    <RoleSuggestion addRole = {this.updateRole}/>
      </div>
      </div>
      <div className="form-group">
      <label>Contract Type</label>
      { this.state.contractTypes.map((contractType, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={this.handleCheckChieldElement}  {...contractType} />)
          })
        }
      </div>


<div>



            
            <Col md={6} className="mx-auto">
               
              <br/>
              <h2>Pic of your comapny</h2>
              <br/><br/>
              <center>
              {/* <p>Putting a face to the name</p> */}
              </center>
        <br/>
       
        <br/>
        <center>
              {/* <p>You can always add another profile type later</p> */}
              </center>
              <center>
      {/* <h1>UPLOAD A FILE</h1> */}
      {this.state.success ? <SuccessMessage/> : null}
      {this.state.error ? <ErrorMessage/> : null}
      <br/>
      <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
      {/* <br/>
      <div className="row justify-content-center">
        <div className="col-3">
      <button className="btn btn-primary btn-block" onClick={this.handleUpload}>UPLOAD</button>
      </div>
      </div> */}
      <br/>
    </center>
              <div className="row justify-content-center">
        {/* <div className="col-3">
        <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
        </div> */}
        {/* <div className="col-3">
        <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
        </div> */}
       
        </div>
        </Col>
       

</div>

<br/><br/>
<br/><br/>
      <div className="row justify-content-left">
                 <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div>
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>
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

export default PersonalExperience;