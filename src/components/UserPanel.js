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

import UserChatBox from "./UserChatBox"
import UserProfileView from "./UserProfileView"
import GroupChatBox from "./GroupChatBox"
import MemberList from "./MemberList"
import CandidateView from './CandidateView'
import Individual from './Individual'
import UserList from './UserList'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

export default class UserPanel extends Component {
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
      userID:0,
      toggleActiveChat:true,
      toggleActiveProfile:false,
      toggleActiveMember:false
      // modalVisible: false
    };
    // this.openModal = this.openModal.bind(this);
  }


  createGroupMessage(text, room){
    this.props.createGroupMessage(text, room)
  }


  createGroupImageMessage(text , filetype, roomId) {
    // console.log("this is")
    // console.log(text)
    // console.log("my chat")
    this.props.createGroupImageMessage(text, filetype, roomId)

  }

  createImageMessage(text , user, filetype) {
    console.log("this is")
    console.log(text)
    console.log("my chat")
    this.props.createImageMessage(text, user, filetype)

  }




  createMessage(text , user) {
    console.log("this is")
    console.log(text)
    console.log("my chat")
    this.props.createMessage(text, user)
    // let message = {
    //   to: this.state.userChatData[this.state.selectedUserIndex].id,
    //   message: {
    //     type: "text",
    //     text: text,
    //     date: +new Date(),
    //     className: "message"
    //   },
    //   from: this.state.user.id
    // };
    // this.socket.emit("message", message);
  }



  componentDidMount() {

    if(this.props.switchToChat===true){
      this.setState({
        toggleActiveProfile:false
      })
    }

    // UserService.getCandidateProfile()
    // .then(
    //         response => {
        
  
    // this.setState({
    //   userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
    //   hearabout:response.data[0].hearabout,
    //   surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
    //   email:response.data[0].email,
    //   phone:response.data[0].phone,
    // })
          
    //         },
    //         error => {
    //           console.log(error)
    //         }
    //       );




  }


//   onChatClicked = (id)=>{
//       console.log("open chat: "+id)
// this.setState({
//     userID:id
// })
//   }
  

  render() {

  



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






const chatActive = this.state.toggleActiveChat?"nav-link active":"nav-link"
const profileActive = this.state.toggleActiveProfile?"nav-link active":"nav-link"
const memebrActive = this.state.toggleActiveMember?"nav-link active":"nav-link"




    return (
      <div>
<center>
<ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className={chatActive} id="home-tab" 
                                    
                                    onClick={
                                        (e)=>{
                                          e.preventDefault()  
                                          this.setState({
                                            toggleActiveChat:true,
                                            toggleActiveProfile:false,
                                            toggleActiveMember:false
                                          })
                                        }

                                    }
                                    
                                    >Chat</a>
                                </li>
                                {!this.props.groupChat?
                                (<li className="nav-item">
                                    <a className={profileActive} id="profile-tab" 
                                    onClick={
                                        (e)=>{
                                          e.preventDefault()  
                                          this.setState({
                                            toggleActiveProfile:true,
                                            toggleActiveChat:false,
                                            toggleActiveMember:false
                                          })
                                        }

                                    }
                                    
                                    >Profile</a>
                                </li>):(<li className="nav-item">
                                    <a className={memebrActive} id="profile-tab" 
                                    onClick={
                                        (e)=>{
                                          e.preventDefault()  
                                          this.setState({
                                            toggleActiveMember:true,
                                            toggleActiveChat:false,
                                            toggleActiveProfile:false,
                                          })
                                        }

                                    }
                                    
                                    >Member</a>
                                </li>)}
                            </ul>

                            </center>



                            {this.state.toggleActiveChat?(  
  !this.props.groupChat?
 <UserChatBox user={this.props.user}  me={this.props.me} socket={this.props.socket} message={this.props.message} 
 
 scrollId = {this.props.scrollId}

 onSendImageClicked = {this.createImageMessage.bind(this)}
 
 onSendClicked={this.createMessage.bind(this)}

 onSendGroupImageClicked = {this.createGroupImageMessage.bind(this)}
 onSendGroupClicked={this.createGroupMessage.bind(this)} 

  // msgTxt = {this.props.msgTxt}
  // targetUser={this.props.targetUser?this.props.targetUser:null}
  targetHistoryUser={this.props.targetHistoryUser?this.props.targetHistoryUser:null}

  targetHistoryUser1={this.props.targetHistoryUser1?this.props.targetHistoryUser1:null}


  targetLiveHistoryUser={this.props.targetLiveHistoryUser?this.props.targetLiveHistoryUser:null}


  targetUserChatStatus = {this.props.targetUserChatStatus}


  lastSeen = {this.props.lastSeen}
  />: <GroupChatBox groupName={this.props.groupName} 

  groupId={this.props.groupId} 
  
  me={this.props.me}

  roomMembers={this.props.roomMembers}

  targetRoom={this.props.targetRoom}

  scrollId = {this.props.scrollId}


   onSendClicked={this.createMessage.bind(this)}


  onSendGroupImageClicked = {this.createGroupImageMessage.bind(this)}

  targetUserChatStatus = {this.props.targetUserChatStatus}

  
  onSendGroupClicked={this.createGroupMessage.bind(this)} />
  
  ):(

this.state.toggleActiveProfile?
<UserProfileView user={this.props.user}
targetUserChatStatus = {this.props.targetUserChatStatus}
/>:<MemberList 
targetUserChatStatus = {this.props.targetUserChatStatus}
roomMembers={this.props.roomMembers} groupId={this.props.groupId} />

)}
   

        
      </div>
    );
  }
}
