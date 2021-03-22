/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import TagService from "../services/tag.service";
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
import EditJob from './candidateEdit/EditJob'
import EditBenefit from './candidateEdit/EditBenefit'
import EditEducation from './candidateEdit/EditEducation'
import EditSurprise from './candidateEdit/EditSurprise'
import EditProud from './candidateEdit/EditProud'
import EditAchieve from './candidateEdit/EditAchieve'
import CandidateChangeView from './CandidateChangeView'
import CandidateView from './CandidateView'


import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

export default class Individual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      sidebarOpen: true,
      editHearAbout: false,
      isHearaboutModalOpen: false,
      isPreviewChangeModalOpen:false,
      isPreviewModalOpen:false,
      isContactOpen: false,
      editContact:false,
      activelooking:false,
      surpriseme:false,
      betterbegood:false,
      hearabout:'',
      hearaboutremaining:300,
      job:'',
      userimg:'',
      email:'',
      phone:'',
      profileId:'',
      showThis:false
      // modalVisible: false
    };
    // this.openModal = this.openModal.bind(this);
  }




  componentDidMount() {


    UserService.getCandidateProfile()
    .then(
            response => {
        
  console.log("show profile data")
 console.log(response.data)
  console.log("end show profile data")


    this.setState({
      profileId: response.data[0].id,
      userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
      hearabout:response.data[0].hearabout,
      surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
      email:response.data[0].email,
      phone:response.data[0].phone,
    })
          
            },
            error => {
              console.log(error)
            }
          );

    
    


// console.log(this.state.surpriseme)







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








  }

  toggleHearaboutPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isHearaboutModalOpen: !this.state.isHearaboutModalOpen });
  }


  // toggleAnswersPrivacy =(e)=>{
  //   e.preventDefault();
  //   this.setState({ isAnswersOpen: !this.state.isAnswersOpen });
  // }



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

// console.log("new hearabout")
// console.log(this.state.hearabout)
// console.log("end new hearabout")


UserService.updateCandidateProfileHearabout(this.state.profileId, this.state.hearabout).then(
    response => {

      console.log("this is"+response.data)
   
    }).catch((error) => {
      console.log(error);
      });



  }

//   saveProudOf=(e)=>{
//     this.forceUpdate();
//     this.setState({
//   editProudOf:false
// })
//   }

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

 
  saveContact=(e)=>{
    this.forceUpdate();
    this.setState({
  editContact:false
})
  }


  updateHearAbout=(hearabout)=>{

    const newhear = hearabout.map(function(elem){
      return elem.text;
  }).join(",");

  this.setState({hearabout:newhear})



// console.log("new "+hearabout)

  }


  updateJobTitle=(jobTitle)=>{
   
    console.log('job '+jobTitle)
    // this.props.changeJobTitle(jobTitle);

}


togglePreviewChange=(e)=>{
  e.preventDefault();
  this.setState({ isPreviewChangeModalOpen: !this.state.isPreviewChangeModalOpen });
}



savePreviewChange=(e)=>{
  this.forceUpdate();
  this.setState({
    isPreviewChangeModalOpen:false
})
}


togglePreview=(e)=>{
  e.preventDefault();
  this.setState({ isPreviewModalOpen: !this.state.isPreviewModalOpen });
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


  updateRemaining = (hearaboutremaining, status)=>{
    this.setState({
      hearaboutremaining:300-hearaboutremaining
    })
  }

  moveDown = () =>{
    // alert("ddd")
    this.setState({
      showThis:true
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





console.log("checking suprise me")
console.log(this.state.surpriseme)
console.log("end checking suprise me")






    return (
      <div>


        <br/>
       <center>





       <div className="row justify-content-center">
            <div className="col-3">
            <button type="button" onClick={this.togglePreview} className="btn btn-primary" style={{"float":"right"}}>Preview</button>
            </div>
            <div className="col-3">
        <a href="#" type="button" onClick={this.togglePreviewChange} className="btn btn-primary" style={{"float":"right"}}>Change Preview</a>       
        </div>    
            </div>
         
<br/>

        
         <div className="col-6">
          <div className="text-center">
          <img src={this.state.userimg} className="avatar rounded-circle img-thumbnail" alt="avatar" />
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
     <div className="row justify-content-center imagebox">
        <div className="col-4">
        <center>
    <div className= {this.state.activelooking ? 'test rounded-circle' : 'test1 rounded-circle'} onClick={this.handleActiveLooking}></div>  
    <br/>
    <p>Actively looking</p>   
    </center>  
        </div>
        <div className="col-4">
        <center>
   <div className= {this.state.surpriseme ? 'test rounded-circle' : 'test1 rounded-circle'} onClick={this.handleSurpriseme}></div>  
    <br/>
    <p>Surprise me</p>   
    </center>  
        </div>
        <div className="col-4">
        <center>
        <div className= {this.state.betterbegood ? 'test rounded-circle' : 'test1 rounded-circle'} onClick={this.handleBetterbegood}></div>  
    <br/>
    <p>This better be good</p>   
    </center>  
        </div>
      </div>
<br/>
<h4>I want to hear about &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.changeHearAbout}><i  className="fa fa-edit"></i></a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleHearaboutPrivacy} ><i className="fa fa-lock"></i></a>
</h4>
<br/>


{!this.state.editHearAbout ? (
  <div className="row">
{this.state.hearabout.includes(',')? this.state.hearabout.split(",").map(hear=>

<div className="tag label label-success ng-scope ng-binding" key={hear}>{hear}&nbsp;&nbsp;</div>

):
<div className="tag label label-success ng-scope ng-binding" key={this.state.hearabout}>{this.state.hearabout}&nbsp;&nbsp;</div>
}
</div> 
):


(<div>
<HearAboutSuggestion editList = {this.state.hearabout} tagtype="edit" updateHearAbout = {this.updateHearAbout} updateRemaining = {this.updateRemaining} />
            {/* <p>character remaining: {this.state.hearaboutremaining}</p> */}
            <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveHearAbout}>save</Button>
            </div>
            </div>
            </div>
            )}

<br/><br/>
<h4>Your Anwsers</h4>
<br/>

{/* {this.state.showThis? */}

<EditProud edit={true} profileId = {this.state.profileId}/>



{/* <button onClick={this.moveDown}
>move down</button> */}

<br/>

<EditSurprise edit={true} profileId = {this.state.profileId}/>

<br/>
<EditAchieve edit={true} profileId = {this.state.profileId}/>
<br/>


<EditJob edit={true}/>
<br/><br/>
<EditBenefit edit={true}/>

  <br/><br/>

<EditEducation edit={true}/>

<br/><br/>


<h4>Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.changeContact}><i  className="fa fa-edit"></i></a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleContactPrivacy}><i className="fa fa-lock"></i></a></h4>
<br/>
{!this.state.editContact ? (
<div>
  <p><i  className="fa fa-phone"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.phone}</p>
<p><i  className="fa fa-envelope"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.email}</p>
</div>
):(
<div>
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
     </div>
)}
<br/><br/>


    




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

           
          
        </Modal>

        <Modal  preview={true} isOpen={this.state.isPreviewModalOpen} onClose={this.togglePreview}>
          
          <center>
          <h4>Your Preview</h4>
          </center>
          {/* <h5>Change privacy</h5> */}
        
           <div style={{"padding":"20px"}}>    
           <CandidateView />
          </div>  

           
          
        </Modal>


        <Modal isOpen={this.state.isPreviewChangeModalOpen} onClose={this.togglePreviewChange}>
          
          <center>
          <h4>Change your preview order</h4>
          </center>
          {/* <h5>Change privacy</h5> */}
        
           <div style={{"padding":"20px"}}>    
           <CandidateChangeView />
          </div>  

          {/* <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.savePreviewChange}>save</Button>
            </div>
            </div> */}
          
          
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
