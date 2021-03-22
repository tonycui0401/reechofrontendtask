/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import EditJob from './candidateEdit/EditJob'
import EditBenefit from './candidateEdit/EditBenefit'
import EditEducation from './candidateEdit/EditEducation'
import EditAchieve from './candidateEdit/EditAchieve'
import EditProud from './candidateEdit/EditProud'
import EditSurprise from './candidateEdit/EditSurprise'
import UserService from "../services/user.service";
// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class UserProfileView extends Component {


  constructor(props) {
    super(props);
    this.state = {
        cards: [],
        userimg:'',
        hearabout:"",
        firstname:'',
        lastname:'',
        seekingstatus:''
      }
    }

  componentDidMount(){



    UserService.getCandidateView()
    .then(
            response => {
    console.log("test")
    console.log(response.data[0].corder)
        
  const card = JSON.parse(response.data[0].corder)
  // console.log(card)
    this.setState({
      cards:card,
    
    //   userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
      // hearabout:response.data[0].hearabout,
      // surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
      // email:response.data[0].email,
      // phone:response.data[0].phone
    })
          
            },
            error => {
              console.log(error)
            }
          );




    UserService.getCandidateViewProfile(this.props.user.id)
    .then(
            response => {
    console.log("test")
    console.log(response.data)

this.setState({
    userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
    hearabout:response.data[0].hearabout,
    surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
    email:response.data[0].email,
    phone:response.data[0].phone,
    firstname:response.data[0].firstname,
    lastname:response.data[0].lastname,
    seekingstatus:response.data[0].seekingstatus,
    chatstatus:response.data[0].chatstatus,
    id:response.data[0].id
})
          
            },
            error => {
              console.log(error)
            }
          );


  }


//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }


  render() {

    let first
let second
let third
let fouth
let fifth
let sixth
        if(this.state.cards[0]==="Experience"){
            first = <EditJob edit={false} userID={this.props.user.id} />
        }else if(this.state.cards[0]==="Benefit"){
            first = <EditBenefit edit={false} userID={this.props.user.id}/>
        }else if(this.state.cards[0]==="Education"){
            first = <EditEducation edit={false} userID={this.props.user.id}/>
       }else if(this.state.cards[0]==="Proud Of"){
          first = <EditProud edit={false} userID={this.props.user.id}/>
      }else if(this.state.cards[0]==="Suprise With"){
          first = <EditSurprise edit={false} userID={this.props.user.id}/>
      }else if(this.state.cards[0]==="Next Achievement"){
        first = <EditAchieve edit={false} userID={this.props.user.id}/>
    }

    if(this.state.cards[1]==="Experience"){
      second = <EditJob edit={false} userID={this.props.user.id}/>
  }else if(this.state.cards[1]==="Benefit"){
    second = <EditBenefit edit={false} userID={this.props.user.id}/>
  }else if(this.state.cards[1]==="Education"){
    second = <EditEducation edit={false} userID={this.props.user.id}/>
 }else if(this.state.cards[1]==="Proud Of"){
  second = <EditProud edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[1]==="Suprise With"){
  second = <EditSurprise edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[1]==="Next Achievement"){
  second = <EditAchieve edit={false} userID={this.props.user.id}/>
}


if(this.state.cards[2]==="Experience"){
  third = <EditJob edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[2]==="Benefit"){
  third = <EditBenefit edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[2]==="Education"){
  third = <EditEducation edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[2]==="Proud Of"){
  third = <EditProud edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[2]==="Suprise With"){
  third = <EditSurprise edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[2]==="Next Achievement"){
  third = <EditAchieve edit={false} userID={this.props.user.id}/>
}


if(this.state.cards[3]==="Experience"){
  fouth = <EditJob edit={false} userID={this.props.user.idD}/>
}else if(this.state.cards[3]==="Benefit"){
  fouth = <EditBenefit edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[3]==="Education"){
  fouth = <EditEducation edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[3]==="Proud Of"){
  fouth = <EditProud edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[3]==="Suprise With"){
  fouth = <EditSurprise edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[3]==="Next Achievement"){
  fouth = <EditAchieve edit={false} userID={this.props.user.id}/>
}


if(this.state.cards[4]==="Experience"){
  fifth = <EditJob edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[4]==="Benefit"){
  fifth = <EditBenefit edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[4]==="Education"){
  fifth = <EditEducation edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[4]==="Proud Of"){
  fifth = <EditProud edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[4]==="Suprise With"){
  fifth = <EditSurprise edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[4]==="Next Achievement"){
  fifth = <EditAchieve edit={false} userID={this.props.user.id}/>
}


if(this.state.cards[5]==="Experience"){
  sixth = <EditJob edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[5]==="Benefit"){
  sixth = <EditBenefit edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[5]==="Education"){
  sixth = <EditEducation edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[5]==="Proud Of"){
  sixth = <EditProud edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[5]==="Suprise With"){
  sixth = <EditSurprise edit={false} userID={this.props.user.id}/>
}else if(this.state.cards[5]==="Next Achievement"){
  sixth = <EditAchieve edit={false} userID={this.props.user.id}/>
}

//   const UsetList = this.state.users.map(user=> <a href="#" onClick={(e)=>{
//       e.preventDefault()
//       this.props.onChatClicked(user.id)
//     }} className="list-group-item list-group-item-action bg-light">{user.firstname} {user.lastname}</a>)


    return (   
        
 <div>
        <div className="row justify-content-center profileframe">
        <div className="col-4 imgframe" >
       
        <img src={this.state.userimg} className="avatar img-thumbnail" alt="avatar" />
        <hr/>
        <div className="row justify-content-center">
        <div className="col-8">
        <Button  className="btn btn-primary">connect</Button>
        </div>
        <br/><br/>
        <div className="col-8">
        <Button  className="btn btn-primary">share</Button>
          </div>
        </div>
        </div> 
        <div className="col-4">
          <br/>
    <h5>{this.state.firstname.charAt(0).toUpperCase()+this.state.firstname.slice(1)} {this.state.lastname.charAt(0).toUpperCase()+this.state.lastname.slice(1)} 
    
    {/* <i className="fa fa-circle" aria-hidden="true"></i> */}
    &nbsp;&nbsp;
    {/* <i className={this.state.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"></i> */}
   
   
    <i className={this.props.targetUserChatStatus[this.state.id]?
  
  (this.props.targetUserChatStatus[this.state.id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")
  
  :("")}

  aria-hidden="true"></i>
   
    </h5>
    
    <Button  className="btn btn-info">{this.state.seekingstatus}</Button>
    
        <div className="row" style={{"marginTop":"5px"}}>
{this.state.hearabout.includes(',')? this.state.hearabout.split(",").map(hear=>

<div className="tag label label-success ng-scope ng-binding hearabout" key={hear}>{hear}&nbsp;&nbsp;</div>

):
<div className="tag label label-success ng-scope ng-binding hearabout" key={this.state.hearabout}>{this.state.hearabout}&nbsp;&nbsp;</div>
}
</div> 
        </div>
        </div>
        <br/><br/><br/>
        {first}
        <br/>
         {second}
         <br/>
         {third}
         <br/>
         {fouth}
         <br/>
         {fifth}
         <br/>
         {sixth}
      
      </div>   
        
        
        )
  }
}

export default UserProfileView