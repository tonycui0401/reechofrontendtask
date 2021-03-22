/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
// import { useEffect, useRef } from 'react'
import './privatemessage.css'
import moment from 'moment';
import Modal from "./Modal";
import ChatService from "../services/chat.service";
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import axios from "axios";
import UserService from "../services/user.service";
import _ from 'lodash';
// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
// import MessageList from "../services/user.service";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class SearchChatResults extends Component {


  messagesEndRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
        users:[],
        isImageViewModalOpen:false,
        previewViewImageUrl:'',
        downloadFile:"",
        previewImageType:'',
        isHovering: false,
        text: "",
        messageText:"",
        message:{},
        chatGroups:[],
        historyUserChatData:{},
        hasMore: true,
        isLoading: false,
        // cards: [],
        // id:0
      }




      window.onscroll = () => {
      
      };
   


    
    }




    componentWillMount() {
      // Loads some users on initial load
      // this.loadUsers();
      // this.scrollToBottom()
    }



    loadUsers = () => {

      alert("dd")
      // this.setState({ isLoading: true }, () => {
      //   request
      //     .get('https://randomuser.me/api/?results=10')
      //     .then((results) => {          
      //       // Creates a massaged array of user data
      //       const nextUsers = results.body.results.map(user => ({
      //         email: user.email,
      //         name: Object.values(user.name).join(' '),
      //         photo: user.picture.medium,
      //         username: user.login.username,
      //         uuid: user.login.uuid,
      //       }));
  
      //       this.setState({
           
      //         hasMore: (this.state.users.length < 100),
      //         isLoading: false,
      //         users: [
      //           ...this.state.users,
      //           ...nextUsers,
      //         ],
      //       });
      //     })
      //     .catch((err) => {
      //       this.setState({
      //         error: err.message,
      //         isLoading: false,
      //        });
      //     })
      // });
    }
  


   

  componentDidMount(){

    this.scrollToBottom()


    // let chatGroupsList = {}
    // for(let i in this.props.chatGroups){
    //  if(this.chatGroupsList[this.props.chatGroups[i].id]){
    //     this.chatGroupsList[this.props.chatGroups[i].id].name = this.props.chatGroups[i].name
    //  }
    // }




  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    // this.loadUsers()

    // this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  handleMouseHover= () => {
    this.setState({
      isHovering:!this.state.isHovering
    })
  }


  emojify = (message) => {
    let emoticon = require('emoticon');
    let emojifiedMessage = message;

    _.map(emoticon, entry => {
      _.map(entry.emoticons, emoticon_pattern => {
        let words = _.split(emojifiedMessage, ' ');

        if (words.includes(emoticon_pattern)) {
          emojifiedMessage = _.replace(emojifiedMessage, emoticon_pattern, entry.emoji);
        }          
        
        return null;
      });

      return null;
    });

   

    return emojifiedMessage
  }


  onMouseOver(e) {
    this.setState({
      text: "delete me"
    });
  }

  onMouseOut(e) {
    this.setState({
      text: ""
    });
  }





//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }


  render() {
console.log("get the chatgroups")
console.log(this.props.chatGroups)
console.log("end get the chatgroups")

let searchgroupchat =""
 

 if(this.props.chatGroups){
 
   console.log("get the chatgroups list")
console.log(this.props.chatGroupsList)
console.log("end get the chatgroups list")
   searchgroupchat = this.props.groupchatmsg?(this.props.groupchatmsg.map(cm=>
    <a href="#" 
    key = {cm.id}
    onClick={(e)=>{
        let group = {}

        group.id = cm.room
        group.name = this.props.chatGroupsList[cm.room].name
        // user.lastname = this.props.users[cm.receipt].lastname
        // user.userimg = this.props.users[cm.receipt].userimg
        e.preventDefault()
        this.props.onGroupChatClicked(group, cm.id)
       
    }}
    className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{this.props.users[cm.sender].firstname} {this.props.users[cm.sender].lastname}</h5>
      <small>{moment(Number(cm.time)).format('h:mm a')+" "+moment(Number(cm.time)).format('L')}
</small>
    </div>
    <p className="mb-1">{cm.message}</p>
    <small>{this.props.chatGroupsList[cm.room]?this.props.chatGroupsList[cm.room].name:''}</small>
  </a>
)):(<div></div>)
 }




const searchchat = this.props.chatmsg?(this.props.chatmsg.map(cm=>
    <a href="#" 
    key = {cm.id}
    onClick={(e)=>{
        let user = {}
        if(cm.receipt!==this.props.me.user_id){
        user.user_id = cm.receipt
        user.firstname = this.props.users[cm.receipt].firstname
        user.lastname = this.props.users[cm.receipt].lastname
        user.userimg = this.props.users[cm.receipt].userimg
        e.preventDefault()
        this.props.onChatClicked(user, cm.id)
        }else{
            user.user_id = cm.sender
            user.firstname = this.props.users[cm.sender].firstname
            user.lastname = this.props.users[cm.sender].lastname
            user.userimg = this.props.users[cm.sender].userimg
            e.preventDefault()
            this.props.onChatClicked(user, cm.id)    
        }
      //   this.forceUpdate();
    }}
    className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
<h5 className="mb-1"> {this.props.users[cm.sender].firstname} {this.props.users[cm.sender].lastname}</h5>
      <small>{moment(Number(cm.time)).format('h:mm a')+" "+moment(Number(cm.time)).format('L')}
</small>
    </div>
    <p className="mb-1">{cm.message}</p>
    <small>{this.props.users[cm.receipt].firstname} {this.props.users[cm.receipt].lastname}</small>
  </a>
)):(<div></div>)


    return (     



<div className="list-group">
{searchgroupchat}
{searchchat}

  
</div>



            // <div ref={this.messagesEndRef} />





         )
  }
}

export default SearchChatResults