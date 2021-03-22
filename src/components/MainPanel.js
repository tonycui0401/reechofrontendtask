/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import ChatService from "../services/chat.service";
import { slide as Menu } from "react-burger-menu";
import { Container, Col, Row } from 'react-bootstrap';
import './profile.css'
import HearAboutSuggestion  from './onboard/HearAboutSuggestion'
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { Button } from 'semantic-ui-react';
import { Glyphicon } from 'react-bootstrap';
import Modal from "./Modal";
import io from "socket.io-client";
import moment from 'moment';
import {chatserver} from '../reecho-config'
import SearchChatBox from './SearchChatBox'

import CandidateView from './CandidateView'
import Individual from './Individual'
import Recruiter from './Recruiter'
// import UserList from './UserList'
import UserPanel  from './UserPanel'
import ErrorModal from "./ErrorModal";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";


import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';


const SOCKET_URI = chatserver;

// const SOCKET_URI ="http://localhost:8002"



export default class MainPanel extends Component {

  socket = null;

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
      toggleUserView:false,
      toggleSearchView:false,
      user:{},
      userChatData: {},
      userChatUnseenData:{},
      userChatStatusData:{},
      userGroupChatUnseenData:{},
      historyUserChatData: {},
      historyUserChatData1: {},
      liveHistoryUserChatData: {},
      me:{},
      socket:{},
      message:[],
      msgTxt:[],
      targetId:null,
      selectedUserIndex: null,
      selectedRommIndex: null,
      groupChat:false,
      groupName:"",
      messages:[],
      roomMessages:{},
      roomMember:{},
      userCount:0,
      roomMembers:{},
      room1:1,
      room2:2,
      chatGroups:[],
      lastSeen:'',
      error: false,
      errorMessage: "",
      groupLastSeen:'',
      switchToChat:false,
      switchToProfile:false,
      switchToMember:false,
      scrollId:null,
      groupLastMessage:{},
      sortedGroup:[],
      groupObj:{},
      groupMembers:{},
      profileType:""
    };


   
  }






  componentWillUnmount(){
  





    this.socket.emit('disconnect', 77);

  
    
}



  componentDidMount() {
    this.initSocketConnection();
    this.setupSocketListeners();



    console.log("start profileType")


    UserService.getUserProfileType()
    
    .then(
      response => {

        console.log("get my profile type")
        console.log(response.data[0])

        this.setState({
          profileType:response.data[0].type
        })
        console.log("end get my profile type")


   },
            error => {
              console.log(error)
            }
          );




//     UserService.getAllCandidate()
//     .then(
//             response => {
//     console.log("test")
//     console.log(response.data)


// let userChatStatusData = this.state.userChatStatusData


// for(let i in response.data){


//         if(!userChatStatusData[response.data[i].user_id]){
//           userChatStatusData[response.data[i].user_id]=[]
//         }
//         if(!userChatStatusData[response.data[i].user_id].chatstatus){
//           userChatStatusData[response.data[i].user_id].chatstatus = response.data[i].chatstatus
//         console.log(userChatStatusData[response.data[i].user_id])
//         }else{
//           userChatStatusData[response.data[i].user_id].chatstatus = response.data[i].chatstatus
//         }


//       }

//       this.setState({userChatStatusData})

          
//             },
//             error => {
//               console.log(error)
//             }
//           );


//     UserService.getCandidateProfile()
//     .then(
//             response => {

        
  
//     this.setState({
//       me:response.data[0],
    
    
//     })
//         console.log("this is me")  
//         console.log(this.state.me)
//         console.log("ok")
//         this.socket.emit("sign-in", this.state.me)
        

//         const params1 = {
//           user_id:this.state.me.user_id,
//           room_id:1,
//       }


//       const params2 = {
//         user_id:this.state.me.user_id,
//         room_id:2,
//     }
    

//     console.log("joined room 1")

//         this.socket.emit('join', params1)
        
  

//       console.log("joined room 2")

//       this.socket.emit('join', params2)
      
 


   


//         NotificationManager.success("Connection Established.", "Reconnected!");




//         ChatService.getPrivateChatUnseen(this.state.me.user_id)
//         .then(
//                 response => {
            
//             console.log('get the unseen private chat data')
//              console.log(response.data)    
            
//              let userChatUnseenData = this.state.userChatUnseenData

//             for(let i in response.data){
//               const sender = response.data[i].sender

//               if(!userChatUnseenData[sender]){
//                 userChatUnseenData[sender]=[]
//                 }

//               if (!userChatUnseenData[sender].unread) {
//                 userChatUnseenData[sender].unread=0
//               }

//               if(!userChatUnseenData[sender].lastMessage){
//                 userChatUnseenData[sender].lastMessage={}
//               }
             
//               userChatUnseenData[sender].unread++
//               userChatUnseenData[sender].lastMessage.message = response.data[i].message
//               userChatUnseenData[sender].lastMessage.time = response.data[i].time
//               userChatUnseenData[sender].sender = sender


//             }


//             this.setState({ userChatUnseenData });


            
    
//             console.log('end the unseen private chat data')
    
//                 },
//                 error => {
//                   console.log(error)
//                 }
//               );






//               ChatService.getAllChatGroups()
//               .then(
//                       response => {
                
                        
//                         let groupObj = {}

//                         for(let i in response.data){
//                           groupObj[response.data[i].id] = response.data[i]
//                         }         
            
//               this.setState({
//                 chatGroups:response.data,
//                 groupObj:groupObj
//               })
          
          
//               console.log("get group room unseen data me")
//                     console.log(this.state.me.user_id)
//                     console.log(this.state.chatGroups)
//           console.log("end get group room unseen data me")
          
          
//               for(let i in this.state.chatGroups){
          

//                 ChatService.getAllChatGroupsMembers(this.state.chatGroups[i].id)
//                 .then(
//                         response => {
//                           let roomMembers = {};

//                           for(let i in response.data){
          
//                             roomMembers[response.data[i].member] = response.data[i]

//                           }
         
//                 this.state.groupMembers[this.state.chatGroups[i].id] = roomMembers

              
//               },
//               error => {
//                 console.log(error)
//               }
//             );
      


//                 ChatService.getGroupChatLastMessage(this.state.chatGroups[i].id)
//                 .then(
//                         response => {
//                           console.log("get group room last message")
//                           console.log(response.data)
//                           console.log("end get group room last message")

// const chatRoomId = this.state.chatGroups[i].id

//                           let groupLastMessage = this.state.groupLastMessage

// // let userLastMessage ={}
// for(let i in response.data){

//   let messageData = {}
//   messageData.id = response.data[i].id
//   messageData.sender = response.data[i].sender
//   messageData.room = response.data[i].room
//   messageData.message = response.data[i].message
//   messageData.time = response.data[i].time

 

//   if(!groupLastMessage[chatRoomId]){
//     groupLastMessage[chatRoomId]={}
//   }
//   if(!groupLastMessage[chatRoomId].messages){
//     groupLastMessage[chatRoomId].messages={}
//   }
//   groupLastMessage[chatRoomId].messages = messageData

// }

                       
// this.setState({groupLastMessage:groupLastMessage})



// const testObj = Object.entries(this.state.groupLastMessage).sort((a,b)=>b[1].messages.time-a[1].messages.time)

// this.setState({
//   sortedGroup:testObj
// })
   
// console.log("check my sorted group message") 
// console.log(this.state.groupObj)
// console.log(this.state.sortedGroup)
// console.log(this.state.groupMembers)
// console.log(this.state.userGroupChatUnseenData)
// console.log("end check my sorted group message") 





//                         },
//                         error => {
//                           console.log(error)
//                         }
//                       );
                





          
                
//                 ChatService.getGroupChatUnseen(this.state.me.user_id, this.state.chatGroups[i].id).then(
//                   response => {
          
          
//                     console.log("get group room unseen data")
//                     console.log(response.data)
//                     console.log("end get group room unseen data")
          
          
//                     let userGroupChatUnseenData = this.state.userGroupChatUnseenData
          
//                     for(let i in response.data){
//                       const room = response.data[i].room
          
//                       if(!userGroupChatUnseenData[room]){
//                         userGroupChatUnseenData[room]=[]
//                         }
          
//                       if (!userGroupChatUnseenData[room].unread) {
//                         userGroupChatUnseenData[room].unread=0
//                       }
                     
//                       userGroupChatUnseenData[room].unread++
//                     }
          
//                     this.setState({ userGroupChatUnseenData });
          
          
          
          
          
          
          
          
//                   },
//                   error => {
//                     console.log(error)
//                   }
//                 );
          
          
          
          
          
//               }
          
          
          
          
//           console.log("get all chat groups last message")
//           console.log(this.state.groupLastMessage)
//           console.log("end get all chat groups last message")

                    
//                       },
//                       error => {
//                         console.log(error)
//                       }
//                     );
          










//             },
//             error => {
//               console.log(error)
//             }
//           );




        








          
    
    

  }

  initSocketConnection() {
    this.socket = io.connect(SOCKET_URI);
    console.log("get socket")
    // console.log(this.state.socket)
  }


  setupSocketListeners() {
    this.socket.on("offline", this.onMessageOffline.bind(this));
    this.socket.on("online", this.onMessageOnline.bind(this));
    this.socket.on("new image message", this.onMessageImage.bind(this));
    this.socket.on("new group image message", this.onGroupMessageImage.bind(this));
    this.socket.on("message", this.onMessageRecieved.bind(this));
    this.socket.on('newGroupMessage', this.onGroupMessageRecieved.bind(this));
    console.log("get message")
    // console.log(this.state.socket)
    this.socket.on("reconnect", this.onReconnection.bind(this));
    this.socket.on("disconnect", this.onClientDisconnected.bind(this));
  }


    /**
   *
   * Shows error if client gets disconnected.
   */
  onClientDisconnected() {
    NotificationManager.error(
      "Connection Lost from server please check your connection.",
      "Error!"
    );
    

  }

  /**
   *
   * Established new connection if reconnected.
   */
  onReconnection() {
    if (this.state.user) {
      this.socket.emit("sign-in", this.state.me);
      NotificationManager.success("Connection Established.", "Reconnected!");
    
    }
  }



  


  createGroupMessage(text, room_id){
    // console.log("show group messages")
    // console.log(text)
    // console.log(userId)
    // console.log(room_id)
    // console.log(firstname)
    // console.log(lastname)
    // console.log(userimg)
    // console.log("end group messages")
    // e.preventDefault()
    var obj = {
        'user_id':this.state.me.user_id,
        'text': text,
        'type':'text',
        'room': room_id,
        'name':this.state.me.firstname+" "+this.state.me.lastname,
        'img':this.state.me.userimg
    };
    this.socket.emit('createMessage', obj);
  }


  createGroupImageMessage(text, filetype, room_id) {
   
  
    // e.preventDefault()
    var obj = {
        'user_id':this.state.me.user_id,
        'text': text+"."+filetype,
        'type':'image',
        'room': room_id,
        'name':this.state.me.firstname+" "+this.state.me.lastname,
        'img':this.state.me.userimg
    };

    console.log("check group image sent")
    console.log(obj)
    console.log("end check group image sent")
   
    this.socket.emit('createMessage', obj);
  }







  createImageMessage(text, user, filetype) {
    // this.initSocketConnection();
    console.log("catch it image")
    console.log(filetype)
    console.log(text)
    console.log(user.user_id)
    console.log(this.state.me.user_id)

    let message = {
      to: user.user_id,
      message: {
        type: "image",
        message: text+"."+filetype,
        time: moment().valueOf(),
        className: "message",
      },
      from: this.state.me.user_id
    };

    console.log(message)
    // socket.emit("sign-in", user);
    // console.log(socket)
    this.socket.emit("message", message);
  }






  createMessage(text, user) {

    console.log("start main forwarding")
    console.log(text)
    console.log(user)
    console.log("end main forward")
    // this.initSocketConnection();
    console.log("catch it")
    console.log(text)
    console.log(user.user_id)
    console.log(this.state.me.user_id)
    console.log("sure")
    const options = {
      weekday: "long",
      year: "numeric",
      month:"long",
      day:"numeric"
 };
   const  d = new Date();
   const m = new Date().toLocaleDateString("en-US",options);

const n = d.toLocaleTimeString([], {timeStyle: 'short'})+' '+m;

    let message = {
      to: user.user_id,
      message: {
        type: "text",
        message: text,
        time: moment().valueOf(),
        className: "message",
      },
      from: this.state.me.user_id
    };

    console.log(message)
    // socket.emit("sign-in", user);
    // console.log(socket)
    this.socket.emit("message", message);
  }


  onChatClicked = (user, scrollId)=>{

    console.log("set my scrollId")
console.log(scrollId)
    console.log("end set my scrollId")

    this.setState({
      switchToChat:true,
      switchToProfile:false,
      switchToMember:false,
      scrollId:scrollId
    })


    ChatService.getPrivateChatLastSeen(user.user_id, this.state.me.user_id)
      .then(

        response => {

          if(response.data[0]){
          this.setState({
            lastSeen:response.data[0].time
          })
        }

        },
        error => {
          console.log(error)
        }
      );


    //   this.forceUpdate()
    console.log(user)
      // console.log("open chat: "+id)
      this.setState({
          toggleUserView:true,
          toggleSearchView:false,
        //   loadChatWindow:true,
          user:user,
          selectedUserIndex:user.user_id,
          selectedRommIndex:"1000000000",
          groupChat:false
      })
      if(this.state.userChatUnseenData[user.user_id]){
        this.state.userChatUnseenData[user.user_id].unread=''
      }
      console.log("get this socket")
      console.log(this.socket)
      console.log("get me")
      console.log(this.state.me)
      console.log("end me")


      ChatService.updatePrivateChatSatus(user.user_id, this.state.me.user_id, moment().valueOf()).then(
        response => {

      },
      error => {
        console.log(error)
      }
    );

    console.log("get my private chat")
    console.log(this.state.me.user_id)  
    console.log(user.user_id)  

      ChatService.getPrivateChat(this.state.me.user_id, user.user_id)
      .then(
              response => {

                // let offset, limit

                // if(response.data.length>=10){
                // offset = response.data.length-10
                // limit = 10
                // }else{
                // offset = 0
                // limit = response.data.length
                // }

                // ChatService.getPrivateChatLimit(this.state.me.user_id, user.user_id, offset, limit).then(
                //   response => {
                           
    console.log(response.data)      
    console.log(response.data.length)
   
    console.log("end get my private chat")
    let targetId
    let userChatData = this.state.userChatData
     let historyUserChatData = this.state.historyUserChatData
  let messageData


  if(!this.state.historyUserChatData[this.state.me.user_id]&&!this.state.historyUserChatData[user.user_id]){
    for (let i in response.data){

    messageData = response.data[i];

   
    // let sourceId;
    if (messageData.sender === user.user_id || messageData.receipt === this.state.me.user_id){
    // targetId = message.from;
      // targetId = message.to
   
      messageData.position = "left";
      // targetId = message.to;
    
        targetId = messageData.sender 
    
    } else {
      messageData.position = "right";
      // targetId = message.from;
        targetId = messageData.receipt
     
    }


    if(messageData.type==="image"){
      messageData.message = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+messageData.message
  }
   

  
    if(!historyUserChatData[targetId]){
      historyUserChatData[targetId]=[]
    }
    if(!historyUserChatData[targetId].messages){
      historyUserChatData[targetId].messages=[]
    }
    historyUserChatData[targetId].messages.push(messageData)
    console.log("come on")
  
  }

   
    this.setState({ historyUserChatData });

    }

//   },
//   error => {
//     console.log(error)
//   }
// );



              },
              error => {
                console.log(error)
              }
            );
  
  
  










      // this.socket.emit("sign-in", this.state.me);
  }
  





onGroupChatClicked=(cg, scrollId)=>{

  this.setState({
    scrollId:scrollId
  })

  this.setState({toggleUserView:true})
  this.setState({groupChat:true})
  this.setState({groupName:cg.name})
  this.setState({groupId:cg.id})
  this.setState({selectedRommIndex:cg.id})
 
  const params = {
    user_id:this.state.me.user_id,
    room_id:cg.id,
    // scrollId:scrollId
}



ChatService.updateGroupChatSatus(this.state.me.user_id, cg.id, moment().valueOf()).then(
  response => {

},
error => {
  console.log(error)
}
);


if(this.state.userGroupChatUnseenData[cg.id]){
  this.state.userGroupChatUnseenData[cg.id].unread=''
}

  ChatService.getGroupChat(cg.id)
  .then(
          response => {

// const offset = response.data.length-10
// const limit = 10

//               ChatService.getGroupChatLimit(cg.id, offset, limit)
//               .then(
//                       response => {
  

console.log("get room messages data here")
console.log(response.data)
console.log("end get room messages data here")
let roomId
let roomMessages = this.state.roomMessages
//    let historyUserChatData = this.state.historyUserChatData
let messageData

console.log("get roomMessages length")
console.log(roomMessages)
console.log("end get roomMessages length")




if(!this.state.roomMessages[cg.id]){

for (let i in response.data){

messageData = response.data[i];
roomId = response.data[i].room

if(!roomMessages[roomId]){
  roomMessages[roomId]=[]
  }
  if(!roomMessages[roomId].messages){
    roomMessages[roomId].messages=[]
  }

  if(messageData.type==="image"){
    messageData.message = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+messageData.message
}



  roomMessages[roomId].messages.push(messageData)


}



this.setState({ roomMessages });
}



// },
// error => {
//   console.log(error)
// }
// );







          },
          error => {
            console.log(error)
          }
        );



        console.log("get group last seen start")

      



      


               


                    ChatService.getAllChatGroupsMembers(cg.id)
                    .then(
                            response => {
                      
              
                    let roomMembers = this.state.roomMembers
                    let roomId
       
         
       


        if(!this.state.roomMembers[cg.id]){

        for (let i in response.data){


          const members = response.data[i];
        
          roomId = response.data[i].room







          ChatService.getGroupChatLastSeen(response.data[i].member, cg.id)
          .then(
    
            response => {
    
              if(response.data[0]){

          console.log("get group last seen"+response.data[0].seenby)
          console.log(response.data[0].seenat)
          console.log("end get group last seen")
          members.lastSeen = response.data[0].seenat
              // this.setState({
              //   groupLastSeen:response.data[0].time
              // })
            }



          },
          error => {
            console.log(error)
          }
        );









       


        console.log("get member data inside")
        // console.log()
        console.log(response.data[i])
        console.log("end get member data inside")

      
     
          if(!roomMembers[roomId]){
            roomMembers[roomId]=[]
            }
            if(!roomMembers[roomId].members){
              roomMembers[roomId].members=[]
            }
            roomMembers[roomId].members.push(members)
        
        }




        this.setState({ roomMembers });
      }


                  },
                  error => {
                    console.log(error)
                  }
                );




            



             

              console.log("get all chat members in it")
              // console.log(response.data)
              console.log(this.state.roomMembers)
              console.log("end get all chat members in it")  


this.socket.emit('join', params)
  

}













  onGroupMessageImage(imgmsg){

    console.log("track my image message")
    console.log(imgmsg)


    let roomMessages = this.state.roomMessages

      if(!roomMessages[imgmsg.room_id]){
        roomMessages[imgmsg.room_id]=[]
        }
        if(!roomMessages[imgmsg.room_id].messages){
          roomMessages[imgmsg.room_id].messages=[]
        }
      

        for(let i in roomMessages[imgmsg.room_id].messages){

          const urlstring = imgmsg.url.substring(imgmsg.url.lastIndexOf('/') + 1)
    
  
    
          if(roomMessages[imgmsg.room_id].messages[i].type==="image" && roomMessages[imgmsg.room_id].messages[i].message.split(".")[0]===urlstring){
           
            console.log("print me")
      console.log(roomMessages[imgmsg.room_id].messages[i])
           
            roomMessages[imgmsg.room_id].messages[i].message = imgmsg.url+"."+imgmsg.fileext
    
        }
    
        
    
        }



        this.setState({ roomMessages });
     





  }




  onMessageImage(imgmsg){
    console.log("track my image message")
    console.log(imgmsg)

    let historyUserChatData1 = this.state.historyUserChatData1

    if(!historyUserChatData1[imgmsg.user_id]){
      historyUserChatData1[imgmsg.user_id]=[]
    }
    if(!historyUserChatData1[imgmsg.user_id].messages){
      historyUserChatData1[imgmsg.user_id].messages=[]
    }
    if(!historyUserChatData1[imgmsg.from_id]){
      historyUserChatData1[imgmsg.from_id]=[]
    }
    if(!historyUserChatData1[imgmsg.from_id].messages){
      historyUserChatData1[imgmsg.from_id].messages=[]
    }
   
    for(let i in  historyUserChatData1[imgmsg.user_id].messages){

      const urlstring = imgmsg.url.substring(imgmsg.url.lastIndexOf('/') + 1)



      if(historyUserChatData1[imgmsg.user_id].messages[i].type==="image" && historyUserChatData1[imgmsg.user_id].messages[i].message.split(".")[0]===urlstring){
        historyUserChatData1[imgmsg.user_id].messages[i].message = imgmsg.url+"."+imgmsg.fileext

    }

    

    }


    for(let i in  historyUserChatData1[imgmsg.from_id].messages){

      const urlstring = imgmsg.url.substring(imgmsg.url.lastIndexOf('/') + 1)


    if(historyUserChatData1[imgmsg.from_id].messages[i].type==="image" && historyUserChatData1[imgmsg.from_id].messages[i].message.split(".")[0]===urlstring){
      historyUserChatData1[imgmsg.from_id].messages[i].message = imgmsg.url+"."+imgmsg.fileext
    }


  }

    this.setState({ historyUserChatData1});


    // console.log(messageData.user_id)
    console.log("end track my image message")


  }










  onMessageOnline(messageData){
    console.log("track who in")
    console.log(messageData)
    console.log(messageData.user_id)
    console.log("end track who in")


 let userChatStatusData = this.state.userChatStatusData

        if(!userChatStatusData[messageData.user_id]){
          userChatStatusData[messageData.user_id]=[]
        }
        if(!userChatStatusData[messageData.user_id].chatstatus){
          userChatStatusData[messageData.user_id].chatstatus = 'online'
        console.log(userChatStatusData[messageData.user_id])
        }else{
          userChatStatusData[messageData.user_id].chatstatus = 'online'
        }

        this.setState({userChatStatusData})

  }

  onMessageOffline(messageData){
console.log("track who exit")
console.log(messageData)
console.log(messageData.user_id)
console.log("end track who exit")
let userChatStatusData = this.state.userChatStatusData

        if(!userChatStatusData[messageData.user_id]){
          userChatStatusData[messageData.user_id]=[]
        }
        if(!userChatStatusData[messageData.user_id].chatstatus){
          userChatStatusData[messageData.user_id].chatstatus = 'offline'
        console.log(userChatStatusData[messageData.user_id])
        }else{
          userChatStatusData[messageData.user_id].chatstatus = 'offline'
        }

        this.setState({userChatStatusData})



  }



  onGroupMessageRecieved(message){


  console.log("start receiving the group message")
  console.log(message)
  console.log("end start receiving the group message")


    let roomMessages = this.state.roomMessages
    let roomMember = this.state.roomMember
    let userGroupChatUnseenData = this.state.userGroupChatUnseenData
    const formattedTime = moment(message.createdDate).format('h:mm a');
    let newMsg = {
        room: message.room,
        sender: message.from,
        message: message.text,
        time: message.createdDate,
        type:message.type
    }
  
    let results = this.state.messages;
    results.push(newMsg);
    this.setState({
        messages: results
    });

    console.log(this.state.messages)


  

  console.log("show group member now")
  console.log(roomMember)
  console.log(this.state.selectedRommIndex)
  console.log(message.room)
  console.log(newMsg)
  console.log("end show group member now")
  

    if(message.location==='in'){
    if(!roomMessages[message.room]){
      roomMessages[message.room]=[]
      }
      if(!roomMessages[message.room].messages){
        roomMessages[message.room].messages=[]
      }
      roomMessages[message.room].messages.push(newMsg)
      this.setState({ roomMessages });


    if (message.room !== this.state.selectedRommIndex) {

      if(!userGroupChatUnseenData[message.room]){
        userGroupChatUnseenData[message.room] = []
      }

      if (!userGroupChatUnseenData[message.room].unread) {
        userGroupChatUnseenData[message.room].unread = 0;
      }

      if(!userGroupChatUnseenData[message.room].lastMessage){
        userGroupChatUnseenData[message.room].lastMessage={}
      }

      userGroupChatUnseenData[message.room].lastMessage.message = newMsg.message
      userGroupChatUnseenData[message.room].lastMessage.sender = newMsg.sender
      userGroupChatUnseenData[message.room].lastMessage.time = newMsg.time



      userGroupChatUnseenData[message.room].unread++;

      // userGroupChatUnseenData[message.room].lastMessage = historyUserChatData1[targetId].messages[historyUserChatData1[targetId].messages.length-1]
      // userChatUnseenData[targetId].sender = targetId


      this.setState({userGroupChatUnseenData})

      console.log("unread room messages unsee data")
      console.log(userGroupChatUnseenData)
      console.log(userGroupChatUnseenData[message.room].unread)
      console.log("end unread room messages unsee data")
  
    }





    console.log("test unread data")
    console.log(this.state.selectedRommIndex)
    console.log(message.room)
    console.log("end unread room messages")
    }





    
    console.log("room data")
    console.log(roomMessages)
    console.log("end room data")




}










  onMessageRecieved(message) {
    let stop = true

    // let userChatData = this.state.userChatData;
    if(stop){
      // stop = false
    console.log("I received")
    console.log(message)
    let historyUserChatData1 = this.state.historyUserChatData1;
    let userChatUnseenData = this.state.userChatUnseenData
    let messageData = message.message;
    let messageText = message.message.text
    let targetId;
    // let sourceId;
    if (message.from === this.state.user.user_id || message.to === this.state.me.user_id){
  
   
      messageData.position = "left";
    
        targetId = message.from
    
    } else {
      messageData.position = "right";
        targetId = message.to
     
    }

 

    console.log("let find the target user id")
    console.log(message.to)
    console.log(this.state.me.user_id)
    console.log(targetId)
    console.log("stop find user id")

   
 
  





          if(!historyUserChatData1[targetId]){
            historyUserChatData1[targetId]=[]
          }
          if(!historyUserChatData1[targetId].messages){
            historyUserChatData1[targetId].messages=[]
          }
          historyUserChatData1[targetId].messages.push(messageData)
          console.log("come on")
        
          this.setState({ historyUserChatData1 });
        





    if (targetId !== this.state.selectedUserIndex) {


      if(!userChatUnseenData[targetId]){
        userChatUnseenData[targetId] = []
      }



      if (!userChatUnseenData[targetId].unread) {
        userChatUnseenData[targetId].unread = 0;
      }
      userChatUnseenData[targetId].unread++;
      userChatUnseenData[targetId].lastMessage = historyUserChatData1[targetId].messages[historyUserChatData1[targetId].messages.length-1]
      userChatUnseenData[targetId].sender = targetId

    }


    console.log("user data")
    // console.log(userChatUnseenData[targetId].lastMessage)
    console.log(message)
    console.log("end check user data")
    console.log(userChatUnseenData)
    console.log(targetId)
    
 
    console.log("push message data")
    console.log(messageData)



    // this.setState({
    //   msgTxt:[...this.state.msgTxt, messageText]
    // });


    this.setState({
      message:[...this.state.message, messageData]
    });



    // this.state.message.push(messageData)
    console.log("let's see it")
    console.log( this.state.message)
    
  }
  }



  render() {

console.log("check the room members")
console.log(this.state.roomMembers)
console.log("end check room members")

    const { currentUser } = this.state;
console.log(currentUser)





let detail
    detail =<UserPanel user={this.state.user} me={this.state.me} 

    scrollId = {this.state.scrollId}
    
    createImageMessage = {this.createImageMessage.bind(this)}
    
    createMessage={this.createMessage.bind(this)} socket={this.state.socket} message={this.state.message}
  

    lastSeen = {this.state.lastSeen}

    targetHistoryUser = {
      this.state.historyUserChatData1
    }

    targetHistoryUser1 = {
      this.state.historyUserChatData
    }

    targetLiveHistoryUser = {
    this.state.liveHistoryUserChatData
    }

    targetUserChatStatus = {this.state.userChatStatusData}

    groupChat={this.state.groupChat}
    groupName={this.state.groupName}
    groupId={this.state.groupId}
    createGroupMessage = {this.createGroupMessage.bind(this)}
    createGroupImageMessage = {this.createGroupImageMessage.bind(this)}
    targetRoom={
      this.state.roomMessages
    }

    switchToChat = {this.state.switchToChat}
    switchToProfile = {this.state.switchToProfile}
    switchToMember = {this.state.switchToMember}

    roomMembers = {this.state.roomMembers}
    />


// let message
//     message = this.state.message.map(msg=><p>{msg.text}</p>)




const testGroups = this.state.sortedGroup.map(

  sg=>

  <a href="#"  onClick={(e)=>{
    e.preventDefault()
    this.onGroupChatClicked(this.state.groupObj[sg[0]])
 }} className="list-group-item list-group-item-action bg-light">{this.state.groupObj[sg[0]].name.length>10?this.state.groupObj[sg[0]].name.substring(0,10)+"...":this.state.groupObj[sg[0]].name}
 
 <span>&nbsp;&nbsp;&nbsp;







 {this.state.userGroupChatUnseenData[sg[0]]?this.state.userGroupChatUnseenData[sg[0]].unread?
  <b>
    {this.state.userGroupChatUnseenData[sg[0]]?this.state.userGroupChatUnseenData[sg[0]].lastMessage?


moment(Number(this.state.userGroupChatUnseenData[sg[0]].lastMessage.time)).format('h:mm a')+" "+moment(Number(this.state.userGroupChatUnseenData[sg[0]].lastMessage.time)).format('L').substring(0,5)

:




moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('L').substring(0,5)





:

moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('L').substring(0,5)

 
 
 }
    </b>:

moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('L').substring(0,5)


 
 :moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[sg[0]].messages.time)).format('L').substring(0,5)




}




 
 
  </span>
<span className="badge badge-danger">{this.state.userGroupChatUnseenData[sg[0]]?this.state.userGroupChatUnseenData[sg[0]].unread:''}</span>
<p>

{
this.state.groupMembers[sg[0]]?  
this.state.userGroupChatUnseenData[sg[0]]?this.state.userGroupChatUnseenData[sg[0]].unread?



  <b>
    {
    
     
    this.state.userGroupChatUnseenData[sg[0]]?this.state.userGroupChatUnseenData[sg[0]].lastMessage?



this.state.userGroupChatUnseenData[sg[0]].lastMessage.message.length>25?

this.state.groupMembers[sg[0]][this.state.userGroupChatUnseenData[sg[0]].lastMessage.sender].firstname+": "+this.state.userGroupChatUnseenData[sg[0]].lastMessage.message.slice(0, 25)+"...":

this.state.groupMembers[sg[0]][this.state.userGroupChatUnseenData[sg[0]].lastMessage.sender].firstname+": "+this.state.userGroupChatUnseenData[sg[0]].lastMessage.message:

this.state.groupMembers[sg[0]]?this.state.groupMembers[sg[0]][this.state.groupLastMessage[sg[0]].messages.sender].firstname+": "+

this.state.groupLastMessage[sg[0]]?this.state.groupLastMessage[sg[0]].messages.message.length>25?

this.state.groupMembers[sg[0]][this.state.groupLastMessage[sg[0]].messages.sender].firstname+": "+this.state.groupLastMessage[sg[0]].messages.message.slice(0, 25)+"..."

:this.state.groupMembers[sg[0]][this.state.groupLastMessage[sg[0]].messages.sender].firstname+": "+this.state.groupLastMessage[sg[0]].messages.message:"":""
  
:
    this.state.groupMembers[sg[0]][this.state.groupLastMessage[sg[0]].messages.sender].firstname+": "+ this.state.groupLastMessage[sg[0]]?this.state.groupLastMessage[sg[0]].messages.message.length>25?this.state.groupLastMessage[sg[0]].messages.message.slice(0, 25)+"...":this.state.groupLastMessage[sg[0]].messages.message:""
  
 
  }
    </b>:
 this.state.groupLastMessage[sg[0]]?this.state.groupLastMessage[sg[0]].messages.message.length>25?
 
 this.state.groupLastMessage[sg[0]].messages.message.slice(0, 25)+"...":
 
 this.state.groupLastMessage[sg[0]].messages.message:"":this.state.groupLastMessage[sg[0]]?
 
 this.state.groupMembers[sg[0]][this.state.groupLastMessage[sg[0]].messages.sender].firstname+": "+this.state.groupLastMessage[sg[0]].messages.message.slice(0, 25):""

:""

}
</p>



 </a>

)






const chatGroups = this.state.chatGroups.map(cg =>
  
 
<a href="#"  onClick={(e)=>{
    e.preventDefault()
    this.onGroupChatClicked(cg)
 }} className="list-group-item list-group-item-action bg-light">{cg.name.substring(0,10)}
 
 
  <span>&nbsp;&nbsp;&nbsp;

  {this.state.userGroupChatUnseenData[cg.id]?this.state.userGroupChatUnseenData[cg.id].unread?
    <b>{this.state.groupLastMessage[cg.id]?this.state.groupLastMessage[cg.id].messages?moment(Number(this.state.groupLastMessage[cg.id].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[cg.id].messages.time)).format('L').substring(0,5):"":""}</b>
  :moment(Number(this.state.groupLastMessage[cg.id].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[cg.id].messages.time)).format('L').substring(0,5):this.state.groupLastMessage[cg.id]?this.state.groupLastMessage[cg.id].messages?moment(Number(this.state.groupLastMessage[cg.id].messages.time)).format('h:mm a')+" "+moment(Number(this.state.groupLastMessage[cg.id].messages.time)).format('L').substring(0,5):"":""}
    </span>
  <span className="badge badge-danger">{this.state.userGroupChatUnseenData[cg.id]?this.state.userGroupChatUnseenData[cg.id].unread:''}</span>
 <p>
 {this.state.userGroupChatUnseenData[cg.id]?this.state.userGroupChatUnseenData[cg.id].unread?
   <b>{this.state.groupLastMessage[cg.id]?this.state.groupLastMessage[cg.id].messages.message.length>25?this.state.groupLastMessage[cg.id].messages.message.slice(0, 25)+"...":this.state.groupLastMessage[cg.id].messages.message:""}</b>:
   this.state.groupLastMessage[cg.id]?this.state.groupLastMessage[cg.id].messages.message.length>25?this.state.groupLastMessage[cg.id].messages.message.slice(0, 25)+"...":this.state.groupLastMessage[cg.id].messages.message:"":this.state.groupLastMessage[cg.id]?this.state.groupLastMessage[cg.id].messages.message.slice(0, 25)+"...":""
 }
  </p>
 </a>
  
  )


    return (
      <div className="container">

<Row className="show-grid">

            <Col md={3.5}  >
  
    <a href="#"  onClick={(e)=>{
        e.preventDefault()
        this.setState({toggleUserView:false})
        this.setState({toggleSearchView:false})

        }} className="list-group-item list-group-item-action bg-light">Home Edit</a>









{/* <a href="#"  onClick={(e)=>{
        e.preventDefault()
        this.setState({toggleSearchView:true})
        this.setState({toggleUserView:false})

        }} className="list-group-item list-group-item-action bg-light">Search Chat <i className="fa fa-search fa-3x"></i></a>
  */}







 {testGroups}
 {/* {chatGroups} */}

 {/* {this.state.userChatUnseenData?
 this.state.userChatUnseenData[]
<p>dsddkskd</p> */}










      {/* <UserList onChatClicked = {this.onChatClicked}
  

    targetUserChatStatus = {this.state.userChatStatusData}
    
    userChatUnseenData = {this.state.userChatUnseenData}

    
    />      */}








            </Col>
            <Col  md={8}>

            {/* {this.state.toggleSearchView?(<div></div>):
    (
        <div>

<Individual />
        </div>
        
        
        )} */}


    {!this.state.toggleUserView?(
    
    this.state.toggleSearchView?(<SearchChatBox me={this.state.me} chatGroups = {this.state.chatGroups} 
      onChatClicked = {this.onChatClicked}
      onGroupChatClicked = {this.onGroupChatClicked}
    />):



    this.state.profileType==='talent'?

    <Individual />:

    <Recruiter />


    
    
    
    ):
    (
        <div>
 {/* {this.state.toggleSearchView?(<div></div>): */}
{detail}
{/* } */}
        </div>
        
        
        )}
    {/* (<UserPanel userID={this.state.userID}/>)} */}
       {/* <Individual /> */}
            </Col>
          </Row>


          <ErrorModal
          show={this.state.error}
          errorMessage={this.state.errorMessage}
        />
        {/* <LoadingModal show={this.state.loading} /> */}
        <NotificationContainer />

        
      </div>
    );
  }
}
