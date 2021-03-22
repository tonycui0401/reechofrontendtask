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
import { TextArea } from 'semantic-ui-react';
import RoleSuggestion  from './onboard/RoleSuggestion'
import  CheckBox  from './onboard/CheckBox'
import EmployerSuggestion  from './onboard/EmployerSuggestion'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

export default class RecruitersProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      sidebarOpen: true,
      editHearAbout: false,
      isHearaboutModalOpen: false,
      isAnswersOpen: false,
      isExperienceOpen: false,
      isBenefitOpen: false,
      isEducationOpen: false,
      isContactOpen: false,
      editProudOf: false,
      editSurpriseWith:false,
      editAchieve:false,
      editExperience:false,
      addExperience:false,
      editBenefit:false,
      editEducation:false,
      addEducation:false,
      editContact:false,
      activelooking:false,
      surpriseme:false,
      betterbegood:false,
      showEnd:true,





      contractTypes: [
        {id: 1, value: "Permanent", isChecked: false},
        {id: 2, value: "Fixed Term", isChecked: false},
        {id: 2, value: "Temporary", isChecked: false}
      ],


      employTypes: [
        {id: 1, value: "Self-employed", isChecked: false},
        {id: 2, value: "In-house", isChecked: false}
      ],

      // modalVisible: false
    };
    // this.openModal = this.openModal.bind(this);
  }




  componentDidMount() {

    // UserService.sendUserEmail('tonycui0401@gmail.com').then(
    //   response => {

        
    //     console.log("this is"+response.data)
     
    //   }).catch((error) => {
    //     console.log(error);
    //     });

  }

  toggleHearaboutPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isHearaboutModalOpen: !this.state.isHearaboutModalOpen });
  }


  toggleAnswersPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isAnswersOpen: !this.state.isAnswersOpen });
  }


  toggleEducationPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isEducationOpen: !this.state.isEducationOpen });
  }


  toggleExperiencePrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isExperienceOpen: !this.state.isExperienceOpen });
  }


  toggleBenefitPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isBenefitOpen: !this.state.isBenefitOpen });
  }

  toggleContactPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isContactOpen: !this.state.isContactOpen });
  }






  changeHearAbout =(e)=>{
    e.preventDefault();
    this.setState({
      editHearAbout:!this.state.editHearAbout
    })
  }

  changeProud =(e)=>{
    e.preventDefault();
    this.setState({
      editProudOf:!this.state.editProudOf
    })
  }

  changeSurpriseWith=(e)=>{
    e.preventDefault();
    this.setState({
      editSurpriseWith:!this.state.editSurpriseWith
    })
  }

  changeAchieve=(e)=>{
    e.preventDefault();
    this.setState({
      editAchieve:!this.state.editAchieve
    })
  }

  changeExperience=(e)=>{
    e.preventDefault();
    this.setState({
      editExperience:!this.state.editExperience
    })
  }

  changeBenefit=(e)=>{
    e.preventDefault();
    this.setState({
      editBenefit:!this.state.editBenefit
    })
  }

  changeEducation=(e)=>{
    e.preventDefault();
    this.setState({
      editEducation:!this.state.editEducation
    })
  }


  changeContact=(e)=>{
    e.preventDefault();
    this.setState({
      editContact:!this.state.editContact
    })
  }

  saveHearAbout =(e)=>{
    // const { refreshTable } = this.props;
    this.forceUpdate();
    this.setState({
  editHearAbout:false
})
  }

  saveProudOf=(e)=>{
    this.forceUpdate();
    this.setState({
  editProudOf:false
})
  }

  saveSurpriseWith=(e)=>{
    this.forceUpdate();
    this.setState({
  editSurpriseWith:false
})
  }

  saveAchieve=(e)=>{
    this.forceUpdate();
    this.setState({
  editAchieve:false
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


addNewEducation=(e)=>{
  e.preventDefault();
  this.forceUpdate();
  this.setState({
addEducation:!this.state.addEducation
})
}



  saveNewExperience=(e)=>{
    this.forceUpdate();
    this.setState({
  addExperience:false
})
  }

  saveBenefit=(e)=>{
    this.forceUpdate();
    this.setState({
  editBenefit:false
})
  }

  saveEducation=(e)=>{
    this.forceUpdate();
    this.setState({
  editEducation:false
})
  }

  saveNewEducation=(e)=>{
    this.forceUpdate();
    this.setState({
  addEducation:false
})
  }

  saveContact=(e)=>{
    this.forceUpdate();
    this.setState({
  editContact:false
})
  }




  handleActiveLooking=(e)=>{
    // this.forceUpdate();
    this.setState({
  activelooking:!this.state.activelooking,
  surpriseme:false,
  betterbegood:false
})
  }

  handleSurpriseme=(e)=>{
    // this.forceUpdate();
    this.setState({
  surpriseme:!this.state.surpriseme,
  activelooking:false,
  betterbegood:false
})
  }

  handleBetterbegood=(e)=>{
    // this.forceUpdate();
    this.setState({
  betterbegood:!this.state.betterbegood,
  surpriseme:false,
  activelooking:false
})
  }





  // openModal=(e)=>{
  //   e.preventDefault()
  //   this.setState({
  //     modalVisible:!this.state.modalVisible
  //   });
  //   console.log("Open modal called ", this.state.modalVisible);
  // }

  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
   }























   handleCheckChieldElement = (event) => {
    let contractTypes = this.state.contractTypes
    contractTypes.forEach(contractType => {
       if (contractType.value === event.target.value)
       contractType.isChecked =  event.target.checked
    })
    this.setState({contractTypes: contractTypes})
    console.log(this.state.contractTypes)
  }
















  render() {


    let styles = this.state.modalVisible
    ? { display: "block" }
    : { display: "none" };


  //   let chatBoxProps = this.state.showChatBox
  //   ? {
  //       xs: 12,
  //       sm: 12
  //     }
  //   : {
  //       xsHidden: true,
  //       smHidden: true
  //     };

  // let chatListProps = this.state.showChatList
  //   ? {
  //       xs: 12,
  //       sm: 12
  //     }
  //   : {
  //       xsHidden: true,
  //       smHidden: true
  //     };



    const { currentUser } = this.state;
console.log(currentUser)








const selectList = {
  // selectedOption : 'month',
  options: ['hour', 'day', 'month', 'year']
}

const currency = {
  options: ['GBP', 'USD', 'EUR']
}












    return (
      <div className="container">

<Row className="show-grid">

            <Col md={3}  >
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
            <Col  md={8}>
        <br/>
       <center>
        <div className="col-8">
        <button type="button" className="btn btn-primary" style={{"float":"right"}}>Preview</button>
          <div className="text-center">
          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar rounded-circle img-thumbnail" alt="avatar" />
       <br/><br/>
        {/* <h6>Upload a different photo...</h6> */}
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
     <br/>
    
<br/>
<h4>What do you do
</h4>
<br/>



            <p>You might cover several skills, sectors and role types, you might be specialised. Let us know so others can find you.</p>

            <br/>

            <div className="form-group">
                <label>Tag your experience</label>
                    <div>
                    <SkillSuggestion  addJobExperience = {this.updateJobExpenrience}/>
      </div>
      </div>
      <div className="form-group">
                <label>Tag your roles</label>
                    <div>
                    <RoleSuggestion  addJobExperience = {this.updateRole}/>
      </div>
      </div>
      <div className="form-group">
      <label>Contract Type</label>
      { this.state.contractTypes.map((contractType, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={this.handleCheckChieldElement}  {...contractType} />)
          })
        }
      </div>
      <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveExperience}>save</Button>
            </div>
            </div>
<br/><br/>
<h4>Your Anwsers</h4>
<h5>About you</h5>
<br/>
<p>You are making things happen. Let's hear about you.</p>
    
<TextArea placeholder='' style={{ minHeight: 100 } } onChange={this.updateChange} 
//   onChange={this.props.handleChange('aboutYou')}
//         defaultValue={values.aboutYou}
      
      
      />
<p>character remaining: {this.state.remaining}</p>

<br/>

<h5>Your approach to candidate experience</h5>
              <p>Tell us what you are doing right.</p>
              <br/>
              <TextArea placeholder='' onChange={this.updateCandidateChange} style={{ minHeight: 100 }} 
          //   onChange={this.props.handleChange('aboutYou')} 
            />
            <p>character remaining: {this.state.cremaining}</p>
            <br/>
            <h5>Your approach to employer needs</h5>
              <p>Tell us what sets you apart.</p>
              <br/>
              <TextArea placeholder='' onChange={this.updateEmployerChange} style={{ minHeight: 100 }} 
          //   onChange={this.props.handleChange('aboutYou')} 
            />
  <p>character remaining: {this.state.eremaining}</p>



<br/>

<h5>If you weren't a recruiter</h5>
           
             <p>We love recruitment but we also appreciate the twist, turns, hidden talents and forking path of a career. Let us know!</p>
        
             <br/>
             <TextArea placeholder='' style={{ minHeight: 100 }} 
          //   onChange={this.props.handleChange('aboutYou')} 
            onChange={this.updateChange}
            />
            <p>character remaining: {this.state.remaining}</p>
            <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveExperience}>save</Button>
            </div>
            </div>


{/* <div className="panel panel-yellow">
  <center>
  <a href="#"><h5><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;I want to achieve</h5></a>
  </center>
  </div> */}
  <br/><br/>
<h4>Employer</h4>
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
              <SelectionSuggestion  handleChange={this.updateJobTitle} locationList = {this.state.job} />
              {/* <input className="form-control"
                    placeholder='Job Title'
                    defaultValue={values.jobTitle}
                    /> */}
            </div>
               
                <div className="form-group">
                <label>Employer</label>
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

<br/>
<div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveExperience}>save</Button>
            </div>
            </div>

<br/>
<h4>Your clients</h4>
<br/>
<p>Why not showcase some of your clients.</p>
<br/>
<EmployerSuggestion  addEmployer = {this.updateEmployer}/>
<br/>

<div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveExperience}>save</Button>
            </div>
            </div>






<br/>
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
     <div className="row justify-content-center">
     <div className="col-3">
     <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveContact}>save</Button>
     </div>
     </div>

<br/><br/>






        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
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
        */}
            </Col>
          </Row>




          <Modal isOpen={this.state.isHearaboutModalOpen} onClose={this.toggleHearaboutPrivacy}>
          
          <center>
          <h4>I want to hear about</h4>
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


        <Modal isOpen={this.state.isAnswersOpen} onClose={this.toggleAnswersPrivacy}>
          
          <center>
          <h4>Your Answers</h4>
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


        <Modal isOpen={this.state.isBenefitOpen} onClose={this.toggleBenefitPrivacy}>
          
          <center>
          <h4>Benefit</h4>
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


        <Modal isOpen={this.state.isContactOpen} onClose={this.toggleContactPrivacy}>
          
          <center>
          <h4>Contact</h4>
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
    );
  }
}
