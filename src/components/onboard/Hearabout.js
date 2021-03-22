/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { Col, Checkbox } from "react-bootstrap";
import { Container,  Row} from 'react-bootstrap';
import HearAboutSuggestion  from './HearAboutSuggestion'
import SelectionSuggestion from './selectionSuggestion'
import {COMPANIES} from './comapnies';
import {JOBS} from './jobs';
import  MonthPickerInput from 'react-month-picker-input'
import  CheckBox  from './CheckBox'
import TagService from "../../services/tag.service";
import UserService from "../../services/user.service";
import JobTagSuggestion  from './JobTagSuggestion'
import EmployerSuggestion  from './EmployerSuggestion'


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class Hearabout extends Component{

    constructor(props) {
    super(props);
    this.state = {
      remaining:300,
      employTypes: [
        {id: 1, value: "Self-employed", isChecked: false},
        {id: 2, value: "In-house", isChecked: false}
      ],
      showEnd:true,
      job:[],
      employer:[]
    }



    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }




    // handleAllChecked = (event) => {
    //   let fruites = this.state.fruites
    //   fruites.forEach(fruite => fruite.isChecked = event.target.checked) 
    //   this.setState({fruites: fruites})
    // }
  
    handleCheckChieldElement = (event) => {
      let employTypes = this.state.employTypes
      employTypes.forEach(employType => {
         if (employType.value === event.target.value)
         employType.isChecked =  event.target.checked
      })
      this.setState({employTypes: employTypes})

      this.props.changeEmployType(this.state.employTypes)
      console.log(this.state.employTypes)
    }
  


    skipit = (e) => {
      e.preventDefault()
      this.props.nextStep()
  }




    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()

        let employTypes

        if(this.props.values.employTypes!==''){
          employTypes = this.props.values.employTypes.map((elem)=>{
            if(elem.isChecked === true){
              return elem.value;
            }
        }).join(",");
        }else{
          employTypes=''
        }
        
        console.log("check employ types")
        console.log(this.props.values.employTypes)
        console.log(employTypes)
        console.log("end check employ types")

     
        let jobEnd= "";
        if(this.props.values.recruiterCurrentJob===true){
            jobEnd = "current"
        }else{
            jobEnd = this.props.values.rejobendTime
        }

        let recruiterJobTitle
        let recruiterCompany

        if(this.props.values.recruiterJobTitle!==''){
          recruiterJobTitle = this.props.values.recruiterJobTitle[0].text
        }else{
          recruiterJobTitle=''
        }
        
        if(this.props.values.recruiterCompany!==''){
          recruiterCompany = this.props.values.recruiterCompany[0].text
        }else{
          recruiterCompany=''
        }

              UserService.createRecruiterExperience(recruiterJobTitle, recruiterCompany, this.props.values.rejobstartTime,
                jobEnd, employTypes
                        ).then(
                          response => {
                  
                         
                            console.log("this is"+response.data)
                         
                          }).catch((error) => {
                            console.log(error);
                            });




    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }


  

  updateHearAbout =(hearabout)=>{
    this.props.addHearAbout(hearabout)
}

updateRemaining = (remaining, status)=>{
  this.setState({
    remaining:300-remaining
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




  updateJobTitle=(jobTitle)=>{
   
    this.props.changeRecruiterJobTitle(jobTitle);

}

updateCompany =(company)=>{

    this.props.changeRecruiterCompany(company);

}

updateStart =(maskedValue, selectedYear, selectedMonth)=>{
    this.props.changeRecruiterStart(maskedValue)
}

updateEnd =(maskedValue, selectedYear, selectedMonth)=>{
    this.props.changeRecruiterEnd(maskedValue)
}



handleCurrentChange= (e) => {

      
    
  if(e.target.checked){
    this.props.recruiterCurrentJob(true)
    this.setState({
      showEnd:false
    })
  }else{
    this.props.recruiterCurrentJob(false)
    this.setState({
      showEnd:true
    })
  }
}




//   updateJobTitle = ()=>{
   

// }


// updateCompany = ()=>{
   

// }





    render(){
        const { values } = this.props;


        console.log(values.profileType)

        return(
           
            <Fragment>
            <Container className="mt-5">
        {values.profileType==='talent' ? (
              <Row>
                <Col md={6} className="mx-auto">
                  <h2>What do you want to hear about?</h2>
                  <br/>
                  <p>Your're more than your CV. Tag anything you want to hear about - job titles, companies, type of work, sectors, location, benefits, etc</p>

                  <br/>
            <Form >
                <center>
            <HearAboutSuggestion  addHearAbout = {this.updateHearAbout} updateRemaining = {this.updateRemaining} tagtype="general"/>
            <p>character remaining: {this.state.remaining}</p>

            </center>
                
            <div className="row justify-content-center">
            {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div> */}
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>
         
            </Form>
            </Col>
          </Row>):(
            <Row>
                <Col md={6} className="mx-auto">
                <h2>Who do you work for?</h2>
                <br/>



               { this.state.employTypes.map((employType, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={this.handleCheckChieldElement}  {...employType} />)
          })
        }



                {/* <input
            name="isGoing"  type="checkbox"
          onChange={this.handleSelfEmployedChange} /> Self-employed
          <br/>

          <input
            type="checkbox"
          name="YourInputName"
          onChange={this.handleInHouseChange} /> In-house */}




            <div className="form-group">
              <label htmlFor="username">Your Title</label>
              <JobTagSuggestion  singleEntry={true} addJobTitle={this.updateJobTitle} />





          


              {/* <SelectionSuggestion  handleChange={this.updateJobTitle} locationList = {this.state.job} /> */}
              {/* <input className="form-control"
                    placeholder='Job Title'
                    defaultValue={values.jobTitle}
                    /> */}
            </div>
               
                <div className="form-group">
                <label>Employer</label>
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
<div className="row justify-content-center">
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
          
          <br/><br/>
            <div className="row justify-content-center">
            <a href="#" onClick={this.skipit}><strong>Skip</strong></a>
            </div>
        </Container>
      </Fragment>

        )
    }
}

export default Hearabout;