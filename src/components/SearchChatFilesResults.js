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


class SearchChatFilesResults extends Component {


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
console.log(this.props.groupchatmsgfiles)
console.log("end get the chatgroups list")
   searchgroupchat = this.props.groupchatmsgfiles?(this.props.groupchatmsgfiles.length>0?(this.props.groupchatmsgfiles.map(cm=>
    <a href="#" 
    onClick={(e)=>{
        let group = {}
  
        group.id = cm.room
        group.name = this.props.chatGroupsList[cm.room].name
        // user.lastname = this.props.users[cm.receipt].lastname
        // user.userimg = this.props.users[cm.receipt].userimg
        e.preventDefault()
        this.props.onGroupChatClicked(group, cm.id)
      }}
    className="list-group-item list-group-item-action list-group-item-action-search flex-column align-items-start">
            <div className="col-md-12">
                <div className="media">
                  <div className="media-left">
                    <a href="#">
                    <i className="fa fa-file" aria-hidden="true">{cm.message}</i>
                      {/* <img className="media-object" style={{"width":"50px"}} src={`http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/${cm.message.split('.').slice(0, -1).join('.')}`} alt="..." /> */}
                    </a>
                  </div>
                  <div className="media-body-image">
                  <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.users[cm.sender].firstname} {this.props.users[cm.sender].lastname}</h5>
          <small className="text-muted">&nbsp;&nbsp;&nbsp;{moment(Number(cm.time)).format('h:mm a')+" "+moment(Number(cm.time)).format('L')}</small>
        </div>               {this.props.chatGroupsList[cm.room]?this.props.chatGroupsList[cm.room].name:''}
                  </div>
                </div>
            </div>
        </a>
)):(<div></div>)):(<div>no record</div>)
 }




const searchchat = this.props.chatmsgfiles?(this.props.chatmsgfiles.length>0?(this.props.chatmsgfiles.map(cm=>
    <a href="#" 
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
    className="list-group-item list-group-item-action list-group-item-action-search flex-column align-items-start">
    <div className="col-md-12">
        <div className="media">
          <div className="media-left">
            <a href="#">
            <i className="fa fa-file" aria-hidden="true">{cm.message}</i>
              {/* <img className="media-object"  style={{"width":"50px"}} src={`http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/${cm.message.split('.').slice(0, -1).join('.')}`} alt="..." /> */}
            </a>
          </div>
          <div className="media-body-image">
          <div className="d-flex w-100 justify-content-between">
  <h5 className="mb-1">{this.props.users[cm.sender].firstname} {this.props.users[cm.sender].lastname}</h5>
  <small className="text-muted">&nbsp;&nbsp;&nbsp;{moment(Number(cm.time)).format('h:mm a')+" "+moment(Number(cm.time)).format('L')}</small>
</div>        {this.props.users[cm.receipt].firstname} {this.props.users[cm.receipt].lastname}
          </div>
        </div>
    </div>
</a>
)):(<div></div>)):(<div>no record</div>)



    return (     


        <div className="container">
  
        <div className="row">
      
        {!this.props.selectPrivateInFile?
          searchgroupchat:
          searchchat}
        </div>
    </div>


            // <div ref={this.messagesEndRef} />





         )
  }
}

export default SearchChatFilesResults