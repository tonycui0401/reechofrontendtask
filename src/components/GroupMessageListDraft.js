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
        // cards: [],
        // id:0
      }
    }
    componentDidMount(){

      this.scrollToBottom()
  
   
  
  
    }
  
    componentDidUpdate () {
      this.scrollToBottom()


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
  
    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }



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


const msg = this.props.targetRoom[this.props.roomId] ? (this.props.targetRoom[this.props.roomId].messages.map(m=>   
    
  // m.message
    <div className="direct-chat-msg doted-border">
                      <div className="direct-chat-info clearfix">
<span className="direct-chat-name pull-left">{memberLists[m.sender]?memberLists[m.sender].firstname:""} {memberLists[m.sender]?memberLists[m.sender].lastname:""}</span>
                      </div>
                      {/* <img alt="message user image" src={m.img!==''?"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg"} className="direct-chat-img" /> */}
                      <img alt="message user image" src={memberLists[m.sender]?"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+memberLists[m.sender].userimg:""
                      } className="direct-chat-img" />
                      <div className="direct-chat-text message-show">


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

          <img src={m.message.split('.').slice(0, -1).join('.')}  style={{"width":"50px"}} crossOrigin="anonymous" />:<i className="fa fa-file" aria-hidden="true">{m.message.substring(m.message.lastIndexOf('/') + 1)}</i> 
        }
          
          </a>:""

          ):<span>
            


          {/* {m.message?m.message.split(".").pop().length>=3&&m.message.split(".").length>=2?
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


          :m.message:m.message} */}
          
          {m.message}
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
   
    //   if(this.state.message.type!=="image"){
    //   this.props.onSendForwardGroupClicked(this.state.message.message, cg.id);
    // }else{

    //   const image = this.state.message.message.substring(this.state.message.message.lastIndexOf('/') + 1)
    //   this.props.onSendForwardGroupClicked(image, cg.id);

    // }


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