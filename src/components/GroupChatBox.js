/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';

import { Form, Button, Input } from 'semantic-ui-react';
import GroupMessageList from './GroupMessageList'
// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import UserService from "../services/user.service";
import "./chatmember.css"
import axios from "axios";
import {apibase} from '../reecho-config'
import {chatserver} from '../reecho-config'
import { Dropdown} from 'react-bootstrap';
import Emoji from "react-emoji-render";
import _ from 'lodash';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
  import {
    MessageList,
    Navbar as NavbarComponent,
    Avatar
  } from "react-chat-elements";

class GroupChatBox extends Component {


  constructor(props) {
    super(props);
    this.state = {
        users:[],
        messageText: "",
        newMsg: '',
        // userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+this.props.user.userimg
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



    inputUpdate(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }


    sendLocation() {
        // this.setState({
        //     fetchingLocation: true
        // });
        // if (!navigator.geolocation) {
        //     return alert('GeoLocation not supported by your browser');
        // }
        // navigator.geolocation.getCurrentPosition((pos) => {
        //     socket.emit('createLocationMsg', {
        //         lat: pos.coords.latitude,
        //         lon: pos.coords.longitude
        //     });
        // }, () => {
        //     alert('Unable to fetch location');
        // });
    }

    

    onSendForwardClicked(text, user){
      this.props.onSendClicked(text, user);
    }

    onSendForwardGroupClicked(text, room){
      this.props.onSendGroupClicked(text, room)
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


    onSendGroupClicked() {
        if (!this.state.messageText) {
          return;
        }
        this.props.onSendGroupClicked(this.state.messageText, this.props.groupId);
        // console.log(this.state.messageText)
        // this.props.onSendClicked(this.state.messageText, this.props.user, this.props.me, this.props.socket);
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
          this.onSendGroupClicked();
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
        this.props.onSendGroupImageClicked(rand, fileType, this.props.groupId);
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


            axios.get(chatserver+"/sign_s3_chat_group_image?fileurl="+url+"&user_id="+this.props.me.user_id+"&room_id="+this.props.groupId+"&fileext="+fileType).then(response => {
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
    let n=0

    console.log("show group member on it it")
    console.log(this.props.groupId)
    console.log(this.props.roomMembers)
    // console.log(this.props.targetRoom[this.props.groupId].members)
    console.log("end show group member on it it")





    return (    
        
    
        <div className="col">
        <div className="card">
            <div className="card-header bg-grey py-1 px-2" style={{"flex":"1 1"}}>
                <div className="d-flex flex-row justify-content-start">
                    <div className="col-1 p-1">
                        {/* <p>{this.props.user.id}</p> */}
                    <img src="https://reecho-frontend.s3-eu-west-1.amazonaws.com/logo/reecho.png" className="avatar img-thumbnail" alt="avatar" />

                        {/* <button className="btn text-white bg-darkblue p-0 hover-color-lightgray">
                            <i className="fa fa-bars fa-2x"></i>
                        </button> */}
                    </div>
                    <div className="col">
                        <div className="my-0">
                    <b>{this.props.groupName}</b>
                    {/* <b>{this.props.user.firstname} {this.props.user.lastname}</b> */}
                        </div>
                        <div className="my-0">
                            <small>{this.props.roomMembers[this.props.groupId]?this.props.roomMembers[this.props.groupId].members.length:0} members</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body bg-lightgrey d-flex flex-column p-0" style={{"flex": "9 1"}}>
          
                
                  <GroupMessageList targetRoom={this.props.targetRoom} roomId={this.props.groupId}  roomMembers={this.props.roomMembers}
                  

                  onSendForwardClicked = {this.onSendForwardClicked.bind(this)}

                  onSendForwardGroupClicked = {this.onSendForwardGroupClicked.bind(this)}

                  scrollId = {this.props.scrollId}
                  
                  />

                  


                <div className="input-group group-chat-input">
                    <input type="text" className="form-control border-0" 
                     onChange={this.onMessageInputChange.bind(this)}
                     onKeyPress={this.onMessageKeyPress.bind(this)}
                     value={this.state.messageText}
                    placeholder="Input message..." />
                    <span className="input-group-addon">
                        <button className="btn border-0 bg-white text-primary hover-color-darkblue group-chat-msg-btn"
                        disabled={!this.state.messageText}
                        onClick={this.onSendGroupClicked.bind(this)}
                        type="button">
                            <i className="fa fa-telegram"></i>
                        </button>
                      
                        <input onChange={this.handleChange} id="files" className="hidden-display" ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                        {/* <input type="file" id="files" className="hidden-display"/> */}
                        <label for="files" className="btn border-0 bg-white text-primary hover-color-darkblue group-chat-input-btn-image"
                        // disabled={!this.state.messageText}
                        // onClick={this.sendAttachment.bind(this)}
                        // type="button"
                        
                        >
                            <i className="fa fa-paperclip"></i>
                        </label>
                        <Dropdown className="btn border-0 bg-white text-primary hover-color-darkblue emotions-drop emotions-drop-group">
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
                </div>





{/* <div className="newMsgForm">
                        <div className="wrap">
                            <form onSubmit={(e) => this.newMessage(e)}>

                                <div className="form_wrap">
                                    <div className="form_row">
                                        <div className="form_item">
                                            <div className="form_input">
                                                <input name="newMsg" placeholder="Type your message..." autoComplete="off" value={this.state.newMsg} onChange={this.inputUpdate.bind(this)} />
                                                <span className="bottom_border"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnWrap">
                                    <button type="submit" className="btn">
                                        <i className="fab fa-telegram-plane"></i>
                                    </button>
                                    <button id="send_location" className="btn" onClick={() => this.sendLocation()}>
                                        <i className="far fa-compass"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div> */}




               
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

export default GroupChatBox