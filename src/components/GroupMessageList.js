/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
import "./chatmember.css";
import moment from 'moment';
import axios from "axios";
import UserService from "../services/user.service";
import ChatService from "../services/chat.service";
import Modal from "./Modal";
import _ from 'lodash';

// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
// import MessageList from "../services/user.service";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class GroupMessageList extends Component {

  messagesEndRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
        users:[],
        message:{},
        chatGroups:[],
        isImageViewModalOpen:false,
        historyUserChatData:{},
        refs:null
        // cards: [],
        // id:0
      }
    }
    componentDidMount(){

      // this.scrollToBottom()










      ChatService.getGroupChat(this.props.roomId)
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
    let historyUserChatData = this.state.historyUserChatData
    //    let historyUserChatData = this.state.historyUserChatData
    let messageData
    
    console.log("get roomMessages length")
    console.log(historyUserChatData)
    console.log("end get roomMessages length")
    
    
    
    
    if(!this.state.historyUserChatData[this.props.roomId]){
    
    for (let i in response.data){
    
    messageData = response.data[i];
    roomId = response.data[i].room
    
    if(!historyUserChatData[roomId]){
      historyUserChatData[roomId]=[]
      }
      if(!historyUserChatData[roomId].messages){
        historyUserChatData[roomId].messages=[]
      }
    
      if(messageData.type==="image"){
        messageData.message = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+messageData.message
    }
    
    
    
    historyUserChatData[roomId].messages.push(messageData)
    
    
    }
    
    
    
    this.setState({ historyUserChatData });



    let refs
  
    if(this.state.historyUserChatData){
  
      if(this.state.historyUserChatData[this.props.roomId]){
  
   refs = this.state.historyUserChatData[this.props.roomId].messages.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
  }
  }
   console.log("check group chat refs")
   console.log(this.state.historyUserChatData)
    console.log(refs)
    console.log(this.props.scrollId)
    console.log("end check group chat refs")

    this.setState({
    refs:refs
    })
  
    if(this.props.scrollId){
    this.handleClick(this.props.scrollId)
    }











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
    






















  
   
      UserService.getAllCandidate()
      .then(
              response => {
      console.log("test")
      console.log(response.data)
  
  this.setState({
  users:response.data
  })
            
              },
              error => {
                console.log(error)
              }
            );
  
  
  
            ChatService.getAllChatGroups()
            .then(
                    response => {
                
          
            this.setState({
              chatGroups:response.data
            
            })
        
                  
                    },
                    error => {
                      console.log(error)
                    }
                  );
  
  
    }
  
    componentDidUpdate () {

      if(!this.props.scrollId){
      this.scrollToBottom()

    }


  


    }
  



    handleClick = id =>
    this.state.refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });


    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }



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

toggleImageView=(e)=>{
  e.preventDefault();
  this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen });
}


  render() {


let memberLists = {}
let memberArray=[]
//   const UsetList = this.state.users.map(user=> <a href="#" key={user.id} onClick={(e)=>{
//       e.preventDefault()
//       this.props.onChatClicked(user)
//       this.forceUpdate();
//     }} className="list-group-item list-group-item-action bg-light">{user.firstname} {user.lastname}</a>)

console.log("message rendering")
console.log(this.props.roomId)
console.log(this.props.targetRoom)
console.log(this.props.roomMembers[this.props.roomId])
// console.log(this.props.targetUser[this.props.userId])
// console.log(this.props.targetRoom[this.props.roomId].messages)
console.log(this.props.targetRoom[this.props.roomId])
console.log("message rendering finish")
if(this.props.roomMembers[this.props.roomId]){
  console.log(this.props.roomMembers[this.props.roomId].members)

  const members = this.props.roomMembers[this.props.roomId].members

  for (let i in members){
    memberLists[members[i].member]={}
    memberLists[members[i].member].userimg= members[i].userimg
    memberLists[members[i].member].lastname= members[i].lastname
    memberLists[members[i].member].firstname= members[i].firstname
  }

// console.log(memberLists)

}


console.log("message rendering finish at")
// this.props.roomMembers[this.props.roomId]?this.props.roomMembers[this.props.roomId].members

const historymsg = this.state.historyUserChatData[this.props.roomId] ? (this.state.historyUserChatData[this.props.roomId].messages.map(m=>   
    
  // m.message
    <div className="direct-chat-msg doted-border" >
                      <div className="direct-chat-info clearfix">
<span className="direct-chat-name pull-left">{memberLists[m.sender]?memberLists[m.sender].firstname:""} {memberLists[m.sender]?memberLists[m.sender].lastname:""}</span>
                      </div>
                      {/* <img alt="message user image" src={m.img!==''?"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"} className="direct-chat-img" /> */}
                      <img alt="message user image" src={memberLists[m.sender]?"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+memberLists[m.sender].userimg:""
                      } className="direct-chat-img" />
                      <div className="direct-chat-text message-show" ref={this.state.refs?this.state.refs[m.id]:""}>


                      {m.type==="image"?
          (m.message.length<10?<i className="fa fa-spinner fa-pulse"></i>:
          // <img src={m.message+".png"}  style={{"width":"50px"}}/>
          m.message?
          
          
          <a href="#" type="button" onClick={(e)=>{
            // e.preventDefault();
            // this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
            //   previewViewImageUrl:m.message.split('.').slice(0, -1).join('.'),
            //   downloadFile:m.message,
            //   previewImageType:m.message.split(".").pop()
            // });

            e.preventDefault()
            const url = m.message.split('.').slice(0, -1).join('.')
            const method = 'GET';
            axios.request({url,
              method,
              responseType: 'blob', //important
            }).then(({ data }) => {
      
              const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      
              const link = document.createElement('a');
      
              link.href = downloadUrl;
      
              link.setAttribute('download', m.message.substring(m.message.lastIndexOf('/') + 1)); //any other extension
      
              document.body.appendChild(link);
      
              link.click();
      
              link.remove();
      
            });



          }
          
          
          } > 
          
          {m.message.split(".").pop()==='jpg'||m.message.split(".").pop()==='png'||m.message.split(".").pop()==='jpeg'||m.message.split(".").pop()==='gif'?

          <img src={
            
            m.message.split('_')[1]==="mobile"?
            m.message.split('.').slice(0, -1).join('.'):m.message
            // m.message.split('.').slice(0, -1).join('.')
          
          
          }  style={{"width":"50px"}} crossOrigin="anonymous" />:<i className="fa fa-file" aria-hidden="true">{m.message.substring(m.message.lastIndexOf('/') + 1)}</i> 
        }
          
          </a>:""

          ):<span>
            


          {m.message?m.message.split(".").pop().length>=3&&m.message.split(".").length>=2?
<a href="#" type="button" 
onClick={(e)=>{


e.preventDefault()
const url = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+m.message.split('.').slice(0, -1).join('.')

console.log("get the download url")
console.log(url)
console.log("end get the download url")


const method = 'GET';
axios.request({url,
  method,
  responseType: 'blob', //important
}).then(({ data }) => {

  const downloadUrl = window.URL.createObjectURL(new Blob([data]));

  const link = document.createElement('a');

  link.href = downloadUrl;

  link.setAttribute('download', m.message.substring(m.message.lastIndexOf('/') + 1)); //any other extension

  document.body.appendChild(link);

  link.click();

  link.remove();

});



}


} > 

{m.message.split(".").pop()==='jpg'||m.message.split(".").pop()==='png'||m.message.split(".").pop()==='jpeg'||m.message.split(".").pop()==='gif'?

<img src={"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+m.message.split('.').slice(0, -1).join('.')}  style={{"width":"50px"}} crossOrigin="anonymous" />:<i className="fa fa-file" aria-hidden="true">{m.message.substring(m.message.lastIndexOf('/') + 1)}</i> 


}</a>


          :this.emojify(m.message):this.emojify(m.message)}
          
          {/* {m.message} */}
          </span>
          
          
          
          
          
          }







                      <div className="dropdown-content">
    <a href="#"
    onClick={(e)=>{
      e.preventDefault()
      this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
        // messageText:m.message
        message:m
      })
    }}
      
      >Forward Message</a>

  </div>


                      <span className="float-right mx-1"><small>{
 
 moment(Number(m.time)).format('h:mm a')+" "+moment(Number(m.time)).format('L')
          }
          

          
          </small></span>
                      </div>
                    </div>

   )):(<div></div>)












const msg = this.props.targetRoom[this.props.roomId] ? (this.props.targetRoom[this.props.roomId].messages.map(m=>   
    
  // m.message
    <div className="direct-chat-msg doted-border" >
                      <div className="direct-chat-info clearfix">
<span className="direct-chat-name pull-left">{memberLists[m.sender]?memberLists[m.sender].firstname:""} {memberLists[m.sender]?memberLists[m.sender].lastname:""}</span>
                      </div>
                      {/* <img alt="message user image" src={m.img!==''?"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"} className="direct-chat-img" /> */}
                      <img alt="message user image" src={memberLists[m.sender]?"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+memberLists[m.sender].userimg:""
                      } className="direct-chat-img" />
                      <div className="direct-chat-text message-show" ref={this.state.refs?this.state.refs[m.id]:""}>


                      {m.type==="image"?
          (m.message.length<10?<i className="fa fa-spinner fa-pulse"></i>:
          // <img src={m.message+".png"}  style={{"width":"50px"}}/>
          m.message?
          
          
          <a href="#" type="button" onClick={(e)=>{
            // e.preventDefault();
            // this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
            //   previewViewImageUrl:m.message.split('.').slice(0, -1).join('.'),
            //   downloadFile:m.message,
            //   previewImageType:m.message.split(".").pop()
            // });

            e.preventDefault()
            const url = m.message.split('.').slice(0, -1).join('.')
            const method = 'GET';
            axios.request({url,
              method,
              responseType: 'blob', //important
            }).then(({ data }) => {
      
              const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      
              const link = document.createElement('a');
      
              link.href = downloadUrl;
      
              link.setAttribute('download', m.message.substring(m.message.lastIndexOf('/') + 1)); //any other extension
      
              document.body.appendChild(link);
      
              link.click();
      
              link.remove();
      
            });



          }
          
          
          } > 
          
          {m.message.split(".").pop()==='jpg'||m.message.split(".").pop()==='png'||m.message.split(".").pop()==='jpeg'||m.message.split(".").pop()==='gif'?

          <img src={


            m.message.split('.').slice(0, -1).join('.').split('-')[6]==="mobile"
            ?
            m.message:

            m.message.split('.').slice(0, -1).join('.')

            // (m.message.substring(m.message.lastIndexOf('/') + 1).split('-')[1])==="mobile.jpg"?
            // m.message.split('.').slice(0, -1).join('.'): 
            // m.message
              

          }  style={{"width":"50px"}} crossOrigin="anonymous" />:<i className="fa fa-file" aria-hidden="true">{m.message.substring(m.message.lastIndexOf('/') + 1)}</i> 
        }
          
          


          {/* {m.message.substring(m.message.lastIndexOf('/') + 1).split('-')[1]}
          <br/> */}
          {/* {m.message.split('.').slice(0, -1).join('.').split('-')[6]==="mobile"} */}
          </a>:""

          ):<span>
            


          {m.message?m.message.split(".").pop().length>=3&&m.message.split(".").length>=2?
<a href="#" type="button" 
onClick={(e)=>{


e.preventDefault()
const url = "http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+m.message.split('.').slice(0, -1).join('.')

console.log("get the download url")
console.log(url)
console.log("end get the download url")


const method = 'GET';
axios.request({url,
  method,
  responseType: 'blob', //important
}).then(({ data }) => {

  const downloadUrl = window.URL.createObjectURL(new Blob([data]));

  const link = document.createElement('a');

  link.href = downloadUrl;

  link.setAttribute('download', m.message.substring(m.message.lastIndexOf('/') + 1)); //any other extension

  document.body.appendChild(link);

  link.click();

  link.remove();

});



}


} > 

{m.message.split(".").pop()==='jpg'||m.message.split(".").pop()==='png'||m.message.split(".").pop()==='jpeg'||m.message.split(".").pop()==='gif'?

<img src={"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+m.message.split('.').slice(0, -1).join('.')}  style={{"width":"50px"}} crossOrigin="anonymous" />:<i className="fa fa-file" aria-hidden="true">{m.message.substring(m.message.lastIndexOf('/') + 1)}</i> 


}</a>


          :this.emojify(m.message):this.emojify(m.message)}
          
          {/* {m.message} */}
          </span>
          
          
          
          
          
          }







                      <div className="dropdown-content">
    <a href="#"
    onClick={(e)=>{
      e.preventDefault()
      this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
        // messageText:m.message
        message:m
      })
    }}
      
      >Forward Message</a>

  </div>


                      <span className="float-right mx-1"><small>{
 
 moment(Number(m.time)).format('h:mm a')+" "+moment(Number(m.time)).format('L')
          }
          

          
          </small></span>
                      </div>
                    </div>

   )):(<div></div>)










    return (     
<div className="container-fluid message-scroll" style={{"flex": "1 1"},{"height":"300px"} }>


{
  historymsg
}

{/* {
  !this.state.historyUserChatData[this.props.userId]?targetuserhistory:""
} */}

            {
            msg
            }




              <div ref={this.messagesEndRef} />







              <Modal isOpen={this.state.isImageViewModalOpen} onClose={this.toggleImageView}>
          
          <center>
          <h4>Select user or group to forward your messages</h4>
          </center>
          <div className="forward-users">





         { this.state.chatGroups.map(cg =>
  
 
  <a href="#"  onClick={(e)=>{
      e.preventDefault()
   
      if(this.state.message.type!=="image"){
      this.props.onSendForwardGroupClicked(this.state.message.message, cg.id);
    }else{

      const image = this.state.message.message.substring(this.state.message.message.lastIndexOf('/') + 1)
      this.props.onSendForwardGroupClicked(image, cg.id);

    }


      this.setState({
        isImageViewModalOpen:false
      })
         
      }} className="list-group-item list-group-item-action bg-light">{cg.name}</a>
    

      

    )}









          {this.state.users.map(user=> <a href="#" key={user.user_id} onClick={(e)=>{
      e.preventDefault()

      if(this.state.message.type!=="image"){

      this.props.onSendForwardClicked(this.state.message.message, user);

      }else{

        const image = this.state.message.message.substring(this.state.message.message.lastIndexOf('/') + 1)

        this.props.onSendForwardClicked(image, user);


        console.log("start forwarding")
      console.log(image)
      console.log(user)

      }



      this.setState({
        isImageViewModalOpen:false
      })

      
      // this.props.onChatClicked(user)
    //   this.forceUpdate();
  }} className="list-group-item list-group-item-action bg-light">{user.firstname} {user.lastname}
  
  &nbsp;&nbsp;&nbsp;
  
 
   </a>)}

   </div>
        </Modal>






        </div>

         )
  }
}

export default GroupMessageList