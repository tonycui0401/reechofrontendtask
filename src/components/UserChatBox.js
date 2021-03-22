/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
import moment from 'moment';
import { Form, Button, Input } from 'semantic-ui-react';
import MessageList from './MessageList'
import "./chatmember.css"
import axios from "axios";
import {apibase} from '../reecho-config'
import {chatserver} from '../reecho-config'
import { Dropdown} from 'react-bootstrap';
import Emoji from "react-emoji-render";
import _ from 'lodash';

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

class UserChatBox extends Component {





  constructor(props) {
    super(props);
    this.state = {
        users:[],
        messageText: "",
        userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+this.props.user.userimg,
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
        this.props.onSendClicked(this.state.messageText, this.props.user);
        this.setState({ messageText: "" });
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







      handleChange = (ev) => {
        const rand = Math.random().toString(36).substring(7);
        // // const fileName = rand;
        // this.props.onSendImageClicked(rand, this.props.user);
        // this.setState({success: false, url : ""});
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = rand;
        let fileType = fileParts[1];
        // const rand = Math.random().toString(36).substring(7);
        // const fileName = rand;
        this.props.onSendImageClicked(rand, this.props.user, fileType);
        console.log("Preparing the upload");
        console.log(fileParts)
        // axios.get("http://localhost:8002/sign_s3_chat_image?filename="+fileName+"&filetype="+fileType

        axios.post(apibase+"/sign_s3_chat_image",
        
        {
          fileName : fileName,
          fileType : fileType
        }
        
        )
        .then(response => {
          console.log(response)
          console.log("Preparing no error");
          var returnData = response.data.data.returnData;
          console.log(returnData);
    
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
       

          // this.setState({url: url})
          // this.setState({filename: returnData.filename})
          console.log("Recieved a signed request " + signedRequest);
    
          var options = {
            headers: {
              'Content-Type': fileType
            }
          };
          axios.put(signedRequest,file,options)
          .then(result => {
            console.log("Response from s3")
            // this.setState({success: true});


            axios.get(chatserver+"/sign_s3_chat_image?fileurl="+url+"&user_id="+this.props.user.user_id+"&from_id="+this.props.me.user_id+"&fileext="+fileType).then(response => {
              console.log(response)
            }).catch(error => {
              console.log("ERROR " + JSON.stringify(error));
            })


          })
          .catch(error => {
            console.log("ERROR " + JSON.stringify(error));
          })
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        })
      }













    

  componentDidMount(){


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


//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }


  render() {

    console.log("show message")
    console.log(this.props.message)
    console.log("end show message")



//   const UsetList = this.state.users.map(user=> <a href="#" onClick={(e)=>{
//       e.preventDefault()
//       this.props.onChatClicked(user.id)
//     }} className="list-group-item list-group-item-action bg-light">{user.firstname} {user.lastname}</a>)
const userimg = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+this.props.user.userimg
// this.props.message.pop()





    return (    
        
    
        <div className="col">
        <div className="card">
            <div className="card-header bg-grey py-1 px-2" style={{"flex":"1 1"}}>
                <div className="d-flex flex-row justify-content-start">
                    <div className="col-1 p-1">
                        {/* <p>{this.props.user.id}</p> */}
                    <img src={userimg} className="avatar img-thumbnail" alt="avatar" />

                        {/* <button className="btn text-white bg-darkblue p-0 hover-color-lightgray">
                            <i className="fa fa-bars fa-2x"></i>
                        </button> */}
                    </div>
                    <div className="col">
                        <div className="my-0">
                    <b>{this.props.user.firstname} {this.props.user.lastname} 
                    &nbsp; &nbsp;
                    {/* <i className={this.props.user.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"></i> */}

                    <i className={this.props.targetUserChatStatus[this.props.user.id]?
  
  (this.props.targetUserChatStatus[this.props.user.id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")
  
  :("")}

  aria-hidden="true"></i>
                    
                    </b>
                        </div>
                        <div className="my-0">
                            <small>last seen {
                              this.props.lastSeen!==''?moment(Number(this.props.lastSeen)).format('h:mm a')+" "+moment(Number(this.props.lastSeen)).format('L'):''
                            }</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body bg-lightgrey d-flex flex-column p-0" style={{"flex": "9 1"}}>
            {/* <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.props.message}
            /> */}
                
                  <MessageList userId={this.props.user.user_id} msg={this.props.message} 
                  scrollId = {this.props.scrollId}
                //   targetUser={this.props.targetUser?this.props.targetUser:null}
                  targetHistoryUser={this.props.targetHistoryUser?this.props.targetHistoryUser:null}

                  targetHistoryUser1={this.props.targetHistoryUser1?this.props.targetHistoryUser1:null}

                  // targetHistoryScroll={this.props.targetHistoryUser?this.props.targetHistoryUser[this.props.user.user_id]?this.props.targetHistoryUser[this.props.user.user_id]:null:null}

                  targetLiveHistoryUser={this.props.targetLiveHistoryUser?this.props.targetLiveHistoryUser:null}
                  
                  onSendForwardClicked = {this.onSendForwardClicked.bind(this)}
                  onSendForwardImageClicked = {this.onSendForwardImageClicked.bind(this)}

                  onSendForwardGroupClicked = {this.onSendForwardGroupClicked.bind(this)}

                  onSendForwardGroupImageClicked = {this.onSendForwardGroupImageClicked.bind(this)}

                  me={this.props.me}


                  
                  />

                    {/* <div className="row justify-content-end">
                    <div className="card message-card bg-lightblue m-1">

                    <div className="d-flex flex-row justify-content-start">
                   
                    <div className="col card-body" style={{"padding":"5px"}}>
                       
                     2020dsdsdddsdsdsdsssdsdsddsdsds 
                  
                        
                    </div>
                    <div className="col-1 p-1">
                    <img src={userimg} className="avatar img-thumbnail" alt="avatar" />

                   
                    </div>
                </div>
                </div>
                    </div>




                    <div className="row">
                    <div className="card message-card m-1">

                    <div className="d-flex flex-row justify-content-start">
                    <div className="col-1 p-1">
                    <img src={userimg} className="avatar img-thumbnail" alt="avatar" />

                    
                    </div>
                    <div className="col card-body" style={{"padding":"5px"}}>
                       
                     2020dsdsdddsdsdsdsssdsdsddsdsds 
                  
                        
                    </div>
                   
                </div>
                </div>
                    </div>






                    <div className="row justify-content-end">
                        <div className="card message-card bg-lightblue m-1">
                            <div className="card-body p-2">
                                <span className="mx-2">What's up?</span>
                                <span className="float-right mx-1"><small>14:14<i className="fa fa-check fa-fw" style={{"color":"#66a80f"}}></i></small></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="card-header bg-grey py-1 px-2" style={{"flex":"1 1"}}>
                <div className="d-flex flex-row justify-content-start">
                    <div className="col-1 p-1">
                    <img src={userimg} className="avatar img-thumbnail" alt="avatar" />

                      
                    </div>
                    <div className="col">
                        <div className="my-0">
                    <b>{this.props.user.firstname} {this.props.user.lastname}</b>
                        </div>
                        <div className="my-0">
                            <small>last seen Aug 18 2020</small>
                        </div>
                    </div>
                </div>
            </div>
                        <div className="card message-card m-1">
                        <div className="col-1 p-1">
                    <img src={userimg} className="avatar img-thumbnail" alt="avatar" />

                    
                    </div>
                            <div className="card-body p-2">
                                <span>So far so good, but my plumbus doesn't work as well as Meeseeks can't fix it, please, help me or they... They gonna kill Morty...</span>
                                <span className="float-right"><small>14:16<i className="fa fa-eye fa-fw" style={{"color":"#e64980"}}></i></small></span>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="card message-card bg-lightblue m-1">
                            <div className="card-body p-2">
                                <span>I've called Rick, I'm on the way to your house,
                        but probably I lost my portal gun at the party yesterday.
                        Anyway, don't call the other Meeseeks solve this shit.</span>
                                <span className="float-right mx-1"><small>14:21<i className="fa fa-check fa-fw" style={{"color":"#66a80f"}}></i></small></span>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="input-group private-input-group">
                    <input type="text" className="form-control border-0 chat-input" 
                     onChange={this.onMessageInputChange.bind(this)}
                     onKeyPress={this.onMessageKeyPress.bind(this)}
                     value={this.state.messageText}
                    placeholder="Input message..." />
                    <span className="input-group-addon">
                        <button className="btn border-0 bg-white text-primary hover-color-darkblue chat-input-btn"
                        disabled={!this.state.messageText}
                        onClick={this.onSendClicked.bind(this)}
                        type="button">
                            <i className="fa fa-telegram fa-1x"></i>
                        </button>
                        <input onChange={this.handleChange} id="files" className="hidden-display" ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                        {/* <input type="file" id="files" className="hidden-display"/> */}
                        <label for="files" className="btn border-0 bg-white text-primary hover-color-darkblue chat-input-btn-image"
                        // disabled={!this.state.messageText}
                        // onClick={this.sendAttachment.bind(this)}
                        // type="button"
                        
                        >
                            <i className="fa fa-paperclip"></i>
                        </label>
                        {/* <button className="btn border-0 bg-white text-primary hover-color-darkblue chat-input-btn"
                        disabled={!this.state.messageText}
                        onClick={this.onSendClicked.bind(this)}
                        type="button">
Emoticons
                        </button> */}
                        {/* <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/> */}

                        <Dropdown className="btn border-0 bg-white text-primary hover-color-darkblue chat-input-btn emotions-drop">
                <Dropdown.Toggle block>
                <Emoji text=":)" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="scrollable-menu">
                  {
                    _.map(this.emoticons, emoticon_pattern => {
                      return (
                        <Dropdown.Item onClick={() => this.insertEmoticon(emoticon_pattern) } key={emoticon_pattern}><Emoji text={emoticon_pattern} /></Dropdown.Item>
                      );
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
                    </span>
{/* <label for="files">Select file</label> */}
                </div>
               
                    {/* <Form>
              
                <Input
                  type="text"
                  value={this.state.messageText}
                  onChange={this.onMessageInputChange.bind(this)}
                  onKeyPress={this.onMessageKeyPress.bind(this)}
                  placeholder="Type a message here (Limit 3000 characters)..."
                  ref="messageTextBox"
                  className="messageTextBox"
                  maxLength="3000"
                  autoFocus
                />
               
                  <Button
                    disabled={!this.state.messageText}
                    className="sendButton"
                    onClick={this.onSendClicked.bind(this)}
                  >
                    Send
                  </Button>
              
            
            </Form> */}
            </div>
        </div>
        {/* chat box {this.props.userID} */}

    </div>
                 
       

   
        
       
        
        
        
        
        )
  }
}

export default UserChatBox