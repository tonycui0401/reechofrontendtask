/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
import moment from 'moment';
import { Form, Button, Input } from 'semantic-ui-react';
import MessageList from './MessageList'
import "./chatmember.css"
import "./searchbox.css"
import axios from "axios";
import {apibase} from '../reecho-config'
import {chatserver} from '../reecho-config'
import { Dropdown} from 'react-bootstrap';
import Emoji from "react-emoji-render";
import SelectSearch from "./SelectSearch";
import SearchChatResults from "./SearchChatResults";
import SearchChatImagesResults from "./SearchChatImagesResults";
import SearchChatFilesResults from "./SearchChatFilesResults";
import _ from 'lodash';
import ChatService from "../services/chat.service";

// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import UserService from "../services/user.service";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
// const emoji = require('node-emoji')
//   import {
//     MessageList,
//     Navbar as NavbarComponent,
//     Avatar
//   } from "react-chat-elements";

class SearchChatBox extends Component {





  constructor(props) {
    super(props);

    this.chatGroupsList = {}
    this.state = {
        users:{},
        messageText: "",
        toggleActiveChat:true,
        toggleActiveProfile:false,
        toggleActiveMember:false,
        ImageOptions:[],
        FileOptions:[],
          selected: null,
          selectedImages:null,
          selectedFiles:null,
          chatmsg:[],
          groupchatmsg:[],
          chatmsgimages:[],
          groupchatmsgimages:[],
          chatmsgfiles:[],
          groupchatmsgfiles:[],
          selectPrivateInImage:null,
          selectPrivateInFile:null,

        //   userList:{}
        // userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+this.props.user.userimg,
        // cards: [],
        // id:0
      }


     
    


      let emoticon = require('emoticon');

      this.emoticons = [];
  
      _.map(emoticon, entry => {
        _.map(entry.emoticons, emoticon_pattern => {
          // this.emoticons.push(entry.emoji);
          this.emoticons.push(emoticon_pattern);
          return null;
        });
        
        return null;
      });



    }

    // sendAttachment() {
    //   if (!this.state.messageText) {
    //     return;
    //   }
    //   this.props.onSendImageClicked(this.state.messageText, this.props.user);
    //   this.setState({ messageText: "" });
    // }

    onSendForwardImageClicked(text, user, filetype){
      this.props.onSendImageClicked(text, user, filetype);
    }

    handleChangeImages = value => {
    
        console.log(value)
    
        if(value.label.split("/")[1]==="private"){
     
        console.log("private select")
        console.log(value.value)
        this.setState({
            selectPrivateInImage:true
        })
            ChatService.searchPrivateChatImages(this.props.me.user_id, value.value)
        .then(
                response => {
        console.log("test select private")
        console.log(response.data)
    this.setState({
        chatmsgimages:response.data
    })

              
                },
                error => {
                  console.log(error)
                }
              );


        }else{

        console.log("group select")
        this.setState({
            selectPrivateInImage:false
        })
        ChatService.searchGroupChatImages(value.value)
        .then(
                response => {
        console.log("test select")
        console.log(response.data)
    this.setState({
        groupchatmsgimages:response.data
    })

              
                },
                error => {
                  console.log(error)
                }
              );

        }

        this.setState({
          selectedImages: value
        });
      };

      handleChangeFiles = value => {
          
        if(value.label.split("/")[1]==="private"){
     
            console.log("private select")
            console.log(value.value)
            this.setState({
                selectPrivateInFile:true
            })
                ChatService.searchPrivateChatFiles(this.props.me.user_id, value.value)
            .then(
                    response => {
            console.log("test select private")
            console.log(response.data)
        this.setState({
            chatmsgfiles:response.data
        })
    
                  
                    },
                    error => {
                      console.log(error)
                    }
                  );
    
    
            }else{
    
            console.log("group select")
            this.setState({
                selectPrivateInFile:false
            })
            ChatService.searchGroupChatFiles(value.value)
            .then(
                    response => {
            console.log("test select")
            console.log(response.data)
        this.setState({
            groupchatmsgfiles:response.data
        })
    
                  
                    },
                    error => {
                      console.log(error)
                    }
                  );
    
            }
    
            this.setState({
              selectedFiles: value
            });
      };

    onSendForwardClicked(text, user){
      this.props.onSendClicked(text, user);
    }

    onSendForwardGroupClicked(text, room){
      this.props.onSendGroupClicked(text, room)
    }

    onSendForwardGroupImageClicked(text, room, filetype){
      this.props.onSendGroupImageClicked(text, room, filetype)
    }



    insertEmoticon = emoticon => {
      let currentMessage = this.state.messageText;

      if (currentMessage.length > 0 && currentMessage[currentMessage.length - 1] !== ' ') {
        this.setState({ messageText: currentMessage.concat(' ' + emoticon + ' ') });
      } else {
        this.setState({ messageText: currentMessage.concat(emoticon + ' ') });
      }
    console.log("check insertion") 
    console.log(this.state.messageText)
    console.log("end check insertion") 
    }



    onSendClicked() {
        if (!this.state.messageText) {
          return;
        }
        // console.log(this.state.messageText)
        // this.props.onSendClicked(this.state.messageText, this.props.user);
        // this.setState({ messageText: "" });

        ChatService.searchGroupChatText(this.state.messageText)
        .then(
                response => {
        console.log("test")
        console.log(response.data)
    this.setState({
        groupchatmsg:response.data
    })

              
                },
                error => {
                  console.log(error)
                }
              );


        ChatService.searchPrivateChatText(this.state.messageText, this.props.me.user_id)
        .then(
                response => {
        console.log("test")
        console.log(response.data)
    this.setState({
        chatmsg:response.data
    })

              
                },
                error => {
                  console.log(error)
                }
              );


      }
      onMessageInputChange(e) {
        this.setState({ messageText: e.target.value });
      }
      /**
       *
       * @param {KeyboardEvent} e
       *
       * listen for enter pressed and sends the message.
       */
      onMessageKeyPress(e) {
        if (e.key === "Enter") {
          this.onSendClicked();
        }
      }


      onChatClicked =(user, scrollId)=>{
        //   e.preventDefault()
          this.props.onChatClicked(user, scrollId)
      }


      onGroupChatClicked =(group, scrollId)=>{
        //   e.preventDefault()

        console.log("get my group scrollId")
        console.log(scrollId)
        console.log("end get my group scrollId")
          this.props.onGroupChatClicked(group, scrollId)
      }















    

  componentDidMount(){

    let userlist = {}
    UserService.getAllCandidate()
    .then(
            response => {
    console.log("test")
    console.log(response.data)

// this.setState({
// users:response.data
// })

let imageoptions1 = []
let FileOptions1 = []

for (let i in response.data){
    userlist[response.data[i].id]={}
    userlist[response.data[i].id].userimg= response.data[i].userimg
    userlist[response.data[i].id].lastname= response.data[i].lastname
    userlist[response.data[i].id].firstname= response.data[i].firstname
    imageoptions1[i] = {}
    imageoptions1[i].label = response.data[i].firstname + " "+ response.data[i].lastname + " /private"
    imageoptions1[i].value = response.data[i].id
    FileOptions1[i] = {}
    FileOptions1[i].label = response.data[i].firstname + " "+ response.data[i].lastname + " /private"
    FileOptions1[i].value = response.data[i].id
  }


 

  let imageoptions2 = []
  let FileOptions2 = []

  for(let i in this.props.chatGroups){
    console.log("loop happening")
   if(!this.chatGroupsList[this.props.chatGroups[i].id]){
    this.chatGroupsList[this.props.chatGroups[i].id]={}
   }
   console.log(this.chatGroupsList[this.props.chatGroups[i].id])
    this.chatGroupsList[this.props.chatGroups[i].id].name = this.props.chatGroups[i].name
  
    console.log("end loop happening")

    imageoptions2[i]={}
    imageoptions2[i].label = this.props.chatGroups[i].name + " /group"
    imageoptions2[i].value = this.props.chatGroups[i].id
    FileOptions2[i]={}
    FileOptions2[i].label = this.props.chatGroups[i].name + " /group"
    FileOptions2[i].value = this.props.chatGroups[i].id
   }
   Array.prototype.push.apply(imageoptions2,imageoptions1); 
   Array.prototype.push.apply(FileOptions2,FileOptions1); 
//    const newimageoptions = imageoptions1 + imageoptions2
   console.log(this.chatGroupsList)


   this.setState({
    users:userlist,
    ImageOptions:imageoptions2,
    FileOptions:FileOptions2
})
          
            },
            error => {
              console.log(error)
            }
          );

      

//     UserService.getCandidateViewProfile(this.props.userID)
//     .then(
//             response => {
//     console.log("test")
//     console.log(response.data)

// this.setState({
//     userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
//     firstname:response.data[0].firstname,
//     lastname:response.data[0].lastname,
// })
          
//             },
//             error => {
//               console.log(error)
//             }
//           );


  }




  render() {

    console.log("show users")
    // console.log(this.props.message)
    console.log(this.state.users)
    console.log("end show users")



//   const UsetList = this.state.users.map(user=> <a href="#" onClick={(e)=>{
//       e.preventDefault()
//       this.props.onChatClicked(user.id)
//     }} className="list-group-item list-group-item-action bg-light">{user.firstname} {user.lastname}</a>)
// const userimg = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+this.props.user.userimg
// this.props.message.pop()

const chatActive = this.state.toggleActiveChat?"nav-link active":"nav-link"
const profileActive = this.state.toggleActiveProfile?"nav-link active":"nav-link"
const memebrActive = this.state.toggleActiveMember?"nav-link active":"nav-link"
console.log("get search results")
console.log(this.state.chatmsg)
console.log("end search results")


    return (    
        
        
    
        <div className="col">
    
    <h4>Search Chat</h4>



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
                                <li className="nav-item">
                                    <a className={profileActive} id="home-tab" 
                                    
                                    onClick={
                                        (e)=>{
                                          e.preventDefault()  
                                          this.setState({
                                            toggleActiveChat:false,
                                            toggleActiveProfile:true,
                                            toggleActiveMember:false
                                          })
                                        }

                                    }
                                    
                                    >images</a>
                                </li>
                                <li className="nav-item">
                                    <a className={memebrActive} id="home-tab" 
                                    
                                    onClick={
                                        (e)=>{
                                          e.preventDefault()  
                                          this.setState({
                                            toggleActiveChat:false,
                                            toggleActiveProfile:false,
                                            toggleActiveMember:true
                                          })
                                        }

                                    }
                                    
                                    >files</a>
                                </li>
                          
                            </ul>





{this.state.toggleActiveChat?
(
<div>

<div className="input-group">

<div className="custom-file">
<input className="form-control"
                  placeholder='type here ...'
                  onChange={this.onMessageInputChange.bind(this)}
                  onKeyPress={this.onMessageKeyPress.bind(this)}  
                  />
</div>
<div className="input-group-append">
  <button className="btn btn-outline-secondary" type="button"
     disabled={!this.state.messageText}
     onClick={this.onSendClicked.bind(this)}
  ><i className="fa fa-search"></i></button>
</div>
</div>

<br/>

<SearchChatResults chatmsg = {this.state.chatmsg} users = {this.state.users} groupchatmsg={this.state.groupchatmsg} chatGroups = {this.props.chatGroups}
chatGroupsList = {this.chatGroupsList}
onChatClicked = {this.onChatClicked}
onGroupChatClicked = {this.onGroupChatClicked}
me = {this.props.me}
/>


</div>

):(




    <div>

{this.state.toggleActiveProfile?

(
    <div>
<SelectSearch
          options={this.state.ImageOptions}
          onChange={this.handleChangeImages}
          selected={this.state.selectedImages}
        />
        {/* <div>label: {this.state.selectedImages ? this.state.selectedImages.label : ""}</div>
        <div>value: {this.state.selectedImages ? this.state.selectedImages.value : ""}</div> */}

<br/>
<SearchChatImagesResults chatmsgimages = {this.state.chatmsgimages} users = {this.state.users} groupchatmsgimages={this.state.groupchatmsgimages} chatGroups = {this.props.chatGroups}
chatGroupsList = {this.chatGroupsList}
selectPrivateInImage = {this.state.selectPrivateInImage}
onChatClicked = {this.onChatClicked}
onGroupChatClicked = {this.onGroupChatClicked}
me = {this.props.me}
/>

    




        </div>
):(
    <div>
<SelectSearch
          options={this.state.FileOptions}
          onChange={this.handleChangeFiles}
          selected={this.state.selected}
        />
        {/* <div>label: {this.state.selected ? this.state.selected.label : ""}</div>
        <div>value: {this.state.selected ? this.state.selected.value : ""}</div> */}

<br/>
<SearchChatFilesResults chatmsgfiles = {this.state.chatmsgfiles} users = {this.state.users} groupchatmsgfiles={this.state.groupchatmsgfiles} chatGroups = {this.props.chatGroups}
chatGroupsList = {this.chatGroupsList}
selectPrivateInFile = {this.state.selectPrivateInFile}
onChatClicked = {this.onChatClicked}
onGroupChatClicked = {this.onGroupChatClicked}
me = {this.props.me}
/>



        </div>

)}

    </div>








)}






    </div>
                 
       

   
        
       
        
        
        
        
        )
  }
}

export default SearchChatBox