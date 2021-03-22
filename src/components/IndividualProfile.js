/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { slide as Menu } from "react-burger-menu";
import { Container, Col, Row } from 'react-bootstrap';
import './profile.css'
import HearAboutSuggestion  from './onboard/HearAboutSuggestion'
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { Button } from 'semantic-ui-react';
import { Glyphicon } from 'react-bootstrap';
import Modal from "./Modal";
import  MonthPickerInput from 'react-month-picker-input'
import SelectionSuggestion from './onboard/selectionSuggestion';
import SkillSuggestion  from './onboard/SkillSuggestion'
import SelectForm from './onboard/SelectForm'
import EducationSuggestion  from './onboard/EducationSuggestion'
import ImportantSuggestion from './onboard/ImportantSuggestion'
import {COUNTRIES} from './onboard/countries'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Form, TextArea } from 'semantic-ui-react';





export default class IndividualProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      sidebarOpen: true,
      editHearAbout: false,
      isModalOpen: false
    };

  }




  componentDidMount() {

    // UserService.sendUserEmail('tonycui0401@gmail.com').then(
    //   response => {

        
    //     console.log("this is"+response.data)
     
    //   }).catch((error) => {
    //     console.log(error);
    //     });

  }

  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
   }
  




  render() {

    const countryselectList = {
        // selectedOption : 'month',
        options: COUNTRIES
      }

    const selectList = {
        // selectedOption : 'month',
        options: ['hour', 'day', 'month', 'year']
      }
    
      const currency = {
        options: ['GBP', 'USD', 'EUR']
      }


    let chatBoxProps = this.state.showChatBox
    ? {
        xs: 12,
        sm: 12
      }
    : {
        xsHidden: true,
        smHidden: true
      };

  let chatListProps = this.state.showChatList
    ? {
        xs: 12,
        sm: 12
      }
    : {
        xsHidden: true,
        smHidden: true
      };



    const { currentUser } = this.state;
console.log(currentUser)
    return (
      <div className="container">


<Row className="show-grid">

            <Col md={3}  {...chatListProps}>
            <div  className="bg-light border-right" id="sidebar-wrapper">
    
      <div  className="list-group list-group-flush">
        <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 1</a>
        <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 2</a>
        <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 3</a>
        <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 4</a>
        <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 5</a>
        <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 6</a>
      </div>
    </div>       
            </Col>
            <Col  md={8} {...chatBoxProps}>
        <br/>
       <center>
        <div className="col-8">
        <button type="button" className="btn btn-primary" style={{"float":"right"}}>Preview</button>
      
          <div className="text-center">
          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar rounded-circle img-thumbnail" alt="avatar" />
       <br/><br/>
        <h6>Upload a different photo...</h6>
        <input type="file" className="text-center center-block file-upload" />
            </div>
            </div>
            </center> 
        <div className="col-4">
        </div>
           
            <br/>
            {/* <center>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Personal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Recruiter</a>
                                </li>
                                <li className="nav-item">
                                </li>
                                <li className="nav-item">
                                <button type="button" onClick={this.toggleModal} className="btn btn-primary">add a profile</button>
                                </li>
                            </ul>
                            </center> */}
<h4>Create a profile: Personal</h4>
     <br/>
<br/>
<h4>I want to hear about</h4>
<br/>


<HearAboutSuggestion  addHearAbout = {this.updateHearAbout} updateRemaining = {this.updateRemaining} tagtype="general"/>
            <p>character remaining: {this.state.remaining}</p>
            <div className="row justify-content-center">
            {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveHearAbout}>save</Button>
            </div> */}
            </div>
         

<br/><br/>
<h4>Your Anwsers</h4>  
<br/>
<h5>I am proud of</h5>
<TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="proudOf"
                    />
            <p>character remaining {this.state.remaining}</p>

<br/>
<h5>I surprise people with</h5>
<TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="surpriseWith"
                    />
            <p>character remaining {this.state.remaining}</p>
<br/>
<h5>I want to achieve</h5>
<TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="surpriseWith"
                    />
            <p>character remaining {this.state.remaining}</p>

<br/>
<h4>Experience</h4>
<br/>

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

<br/>

<br/><br/>
<h4>Benefits</h4>
<br/>
<div className="form-group">
              <label htmlFor="username">Current Pay</label>
              <div className="row justify-content-center">
                 <div className="col-4">
              <input className="form-control" type="number"
                    placeholder=''
                    // onChange={this.props.handleChange('currentPay')}
                    onKeyPress={this.onKeyPress.bind(this)} 
                    />
                </div>
                <div className="col-4">
                <SelectForm selectType="current" selectList = {selectList} handleChange={this.updateSelectCurrent}/>
                </div>
                <div className="col-4">
                <SelectForm selectType="current" selectList = {currency} handleChange={this.updateSelectCurrency}/>
                </div>
                </div>
            </div>
               
                <div className="form-group">
                <label>Expected Pay</label>
                <div className="row justify-content-center">
                 <div className="col-4">
                    <input className="form-control" type="number"
                    placeholder=''
                    // onChange={this.props.handleChange('expectedPay')}
                    onKeyPress={this.onKeyPress.bind(this)} 
                    />
                    </div>
                    <div className="col-4">
                <SelectForm selectType="current" selectList = {selectList} handleChange={this.updateSelectCurrent}/>
                </div>
                    <div className="col-4">
                <SelectForm selectType="expected" selectList = {currency} handleChange={this.updateSelectCurrency}/>
                </div>
                    </div>
                </div> 
                <div className="form-group">
                   <label>Notice Period</label>
                    <input
                    placeholder='' className="form-control"
                    // onChange={this.props.handleChange('noticePeriod')}
                    />
               </div>
               <div className="form-group">
                <label>Anything Important</label>
                    <div>
                    <ImportantSuggestion  addAnythingImportant= {this.updateAnythingImportant}/>
      </div>
      </div>
<br/>
<br/>
<h4>Education</h4>
<br/>
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
<br/>
{/* <div className="panel panel-yellow">
  <center>
  <a href="#"><h5><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add Education</h5></a>
  </center>
  </div> */}

  <br/><br/>
<h4>Contact</h4>
<br/>
<div className="form-group">
                  <label>Email Address</label>
                    <input
                    type='email' className="form-control"
                    placeholder=''
                    // onChange={this.props.handleChange('email')}
                    // defaultValue={values.email}
                    />
                    </div>
                    <span style={{color: "red"}}>{this.state.email_errors}</span>

                    <div className="form-group">
                  <label>Phone</label>
                    <input
                    type='phone' className="form-control"
                    placeholder=''
                    // onChange={this.props.handleChange('phone')}
                    // defaultValue={values.phone}
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

                    <SelectForm selectType="expected" selectList = {countryselectList} handleChange={this.updateCountry}/>

<br/><br/>






        <p>
          <strong>Token:</strong>{" "}
          {/* {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)} */}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {/* {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)} */}
        </ul>
              {/* <ChatBox
                signedInUser={this.state.user}
                onSendClicked={this.createMessage.bind(this)}
                onBackPressed={this.toggleViews.bind(this)}
                targetUser={
                  this.state.userChatData[this.state.selectedUserIndex]
                }
              /> */}
            </Col>
          </Row>




       
      </div>
    );
  }
}
