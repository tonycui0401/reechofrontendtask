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


class MessageList extends Component {


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
        refs:null,
        list:[
          {
            id: 'a',
            firstname: 'Robin',
            lastname: 'Wieruch',
            year: 1988,
          },
          {
            id: 'b',
            firstname: 'Dave',
            lastname: 'Davidds',
            year: 1990,
          },
          {
            id: 'c',
            firstname: 'Robin',
            lastname: 'Davidds',
            year: 1988,
          },
          {
            id: 'd',
            firstname: 'Dave',
            lastname: 'Wieruch',
            year: 1990,
          }],
        // cards: [],
        // id:0
      }




      window.onscroll = () => {
        // const {
        //   loadUsers,
        //   state: {
        //     error,
        //     isLoading,
        //     hasMore,
        //   },
        // } = this;
  
        // if (error || isLoading || !hasMore) return;
  
       
        // if (
        //   window.innerHeight + document.documentElement.scrollTop
        //   === document.documentElement.offsetHeight
        // ) {
        //   loadUsers();
        // }
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

    // this.scrollToBottom()

    // const refs = this.state.list.reduce((acc, value) => {
    //   acc[value.id] = React.createRef();
    //   return acc;
    // }, {});
    
    // console.log(refs)
    
    // this.setState({
    // refs:refs
    // })

    // let refs;
    console.log("get all the references")

  // console.log("get scrollId")
  // console.log(this.props.scrollId)
  // console.log("end get scrollId")


  // if(this.props.scrollId){
    console.log("get scrollId")
    console.log(this.props.scrollId)
    console.log(this.props.userId)
    console.log(this.props.targetHistoryUser)

    // if(this.props.targetHistoryUser){
    //   if(!this.props.targetHistoryUser[this.props.userId]){
    //     // this.props.targetHistoryUser[this.props.userId] ={}
    //   }else{

    //     console.log(this.props.targetHistoryUser[this.props.userId])
    //   }
      
     
     
    // }else{
    //   console.log(this.props.targetHistoryUser[this.props.userId])
    // }
    // console.log(this.props.targetHistoryScroll)
    // if(this.props.targetHistoryUser[this.props.userId]!==undefined){
    // console.log(this.props.targetHistoryUser[this.props.userId])
    // }
    // console.log(this.state.refs)
    // console.log("end get scrollId")
    // // refs[this.props.scrollId] =  React.createRef();
    // if(this.props.targetHistoryUser){
    //   if(this.props.targetHistoryUser[this.props.userId]){

    //     console.log("get my historic users")
    //     console.log(this.props.targetHistoryUser[this.props.userId])
    //     console.log("end get my historic users")
    //   }

    // }
    // if(this.props.targetHistoryUser[this.props.userId]){
    // console.log("test test test")
    // console.log(this.props.targetHistoryUser)
    // console.log(this.props.targetHistoryUser[this.props.userId])
    // console.log("end test test test")
    // refs = this.props.targetHistoryUser[this.props.userId].messages.reduce((acc, value) => {
    //   console.log("get value")
    //   console.log(value.id)
    //   acc[value.id] = React.createRef();
    //   return acc;
    // }, 
    // )

// console.log("get all references")
// console.log(this.state.refs)
// console.log("end get all references")

// this.setState({
//   refs:refs
// })

  


    console.log("get the whole refs")
    // console.log(refs)
    console.log("end get the whole refs")

    //.then(
      // if(refs[this.props.scrollId]){
        //   if(this.props.targetHistoryUser[this.props.userId]){

            // refs[this.props.scrollId]?refs[this.props.scrollId].current.scrollIntoView({
            //   behavior: 'smooth',
            //   block: 'start',
            // }):""

          //)
    //       }
    // });
   
   
  // }




// }





    ChatService.getPrivateChat(this.props.me.user_id, this.props.userId)
    .then(
            response => {

              let offset, limit

              // if(response.data.length>=10){
              // offset = response.data.length-10
              // limit = 10
              // }else{
              // offset = 0
              // limit = response.data.length
              // }

              // ChatService.getPrivateChatLimit(this.props.me.user_id,this.props.userId, offset, limit).then(
              //   response => {
                         
  console.log(response.data)      
  console.log(response.data.length)
 
  console.log("end get my private chat")
  let targetId
  let userChatData = this.state.userChatData
   let historyUserChatData = this.state.historyUserChatData
let messageData


if(!this.state.historyUserChatData[this.props.me.user_id]&&!this.state.historyUserChatData[this.props.userId]){
  for (let i in response.data){

  messageData = response.data[i];

 
  // let sourceId;
  if (messageData.sender === this.props.userId || messageData.receipt === this.props.me.user_id){
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

  console.log("get my history chat data")
  console.log(this.state.historyUserChatData[this.props.userId])
  console.log("end get my history chat data")

  let refs

  if(this.state.historyUserChatData){

    if(this.state.historyUserChatData[this.props.userId]){

 refs = this.state.historyUserChatData[this.props.userId].messages.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});
}
}

console.log("check private message ref")
  console.log(refs)
  console.log("end check private message ref")

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

// this.props.targetHistoryUser[this.props.userId] = 





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
    // this.handleClick('c')

    if(!this.props.scrollId){
      this.scrollToBottom()

    }
    // this.state.refs[this.props.scrollId]?(this.state.refs[this.props.scrollId].current?this.state.refs[this.props.scrollId].current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // }):""):""
  //   if(this.props.scrollId){
  //   if(this.state.historyUserChatData){
  //     if(this.state.historyUserChatData[this.props.userId]){
  //   this.handleClick(this.props.scrollId)
  //     }
  //   }
  // }
  }


  handleClick = id =>
  this.state.refs[id].current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });




  scrollToBottom = () => {
    // this.loadUsers()

    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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







  toggleImageView=(e)=>{
    e.preventDefault();
    this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen });
  }


//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }


  render() {

  //   let refs;
  //   console.log("test test test")
  //   console.log(this.props.targetHistoryUser)
  //   console.log(this.props.targetHistoryUser[this.props.userId])
  //   console.log("end test test test")
  //   if(this.props.targetHistoryUser[this.props.userId]){
  //   refs = this.props.targetHistoryUser[this.props.userId].messages.reduce((acc, value) => {
  //     console.log("get value")
  //     console.log(value.id)
  //     acc[value.id] = React.createRef();
  //     return acc;
  //   }, 
  //   )

  
  // console.log("get my refs")
  // console.log(refs)
  // console.log("end get my refs")
  // }




//   }
    // this.forceUpdate()
//   const UsetList = this.state.users.map(user=> <a href="#" key={user.id} onClick={(e)=>{
//       e.preventDefault()
//       this.props.onChatClicked(user)
//       this.forceUpdate();
//     }} className="list-group-item list-group-item-action bg-light">{user.firstname} {user.lastname}</a>)

console.log("message rendering")
console.log(this.props.userId)
// console.log(this.props.targetUser[this.props.userId])
// console.log(this.props.targetUser[this.props.userId][0])
console.log(this.props.targetHistoryUser[this.props.userId])
// console.log(this.props.targetHistoryUser[this.props.userId].messages)
// console.log(this.props.targetUser[this.props.userId].messages)
console.log("message rendering finish")


// if()


const liveMsg = this.props.targetHistoryUser ? this.props.targetHistoryUser[this.props.userId]?(this.props.targetHistoryUser[this.props.userId].messages.map(m=>{
  // const ref = React.createRef();


  // const handleClick = () =>{
  //   console.log(ref)
  // ref.current.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'start',
  // });
  // }
  return(<div className={m.position==="right"?"row justify-content-end":"row"}
  // ref={this.state.refs?this.state.refs[m.id]:""}
  >
  <div className={m.position==="right"?"card message-card bg-lightblue m-1":"card message-card m-1"}>
    
  {/* <button type="button" onClick={handleClick}>
  Scroll Into View
</button> */}
    
      <div className="card-body p-2 message-show"
    
      //  onMouseEnter={this.onMouseOver.bind(this)}  onMouseLeave={this.onMouseOver.bind(this)}
       >
          <span className="mx-2" key={m.id}


          //  ref={refs?refs[m.id]:""}
          
          > 
          
          {/* {this.state.text} */}
{m.type==="image"?
          (m.message.length<10?<i className="fa fa-spinner fa-pulse"></i>:
          // <img src={m.message+".png"}  style={{"width":"50px"}}/>
          m.message?
          
          
          <a href="#" type="button" 
          
          onClick={(e)=>{
            // e.preventDefault();
            // this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
            //   previewViewImageUrl:m.message.split('.').slice(0, -1).join('.'),
            //   downloadFile:m.message,
            //   previewImageType:m.message.split(".").pop()
            // });

            e.preventDefault()
            const url = m.message.split('.').slice(0, -1).join('.')
            const method = 'GET';
            console.log("get the download url")
            console.log(url)
            console.log("end get the download url")
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
            


            {m.message?m.message.split(".").pop().length>=3&&m.message.split(".").length>=2?
 <a href="#" type="button" 
onClick={(e)=>{
  // e.preventDefault();
  // this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
  //   previewViewImageUrl:m.message.split('.').slice(0, -1).join('.'),
  //   downloadFile:m.message,
  //   previewImageType:m.message.split(".").pop()
  // });

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


            : this.emojify(m.message):this.emojify(m.message)}
            
            </span>
          
      
            
           }

 {/* <span className="hide">&nbsp;&nbsp;
 

   <i className="fa fa-reply" aria-hidden="true"></i>
 
 </span> */}
</span>
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




//  new Date(parseInt(m.time)* 1000).getHours()+':'+"0" + new Date(parseInt(m.time) * 1000).getMinutes()
          }
          

          
          </small></span>
      </div>
  </div>
</div>)})):(<div></div>):(<div></div>)













const historyMsg = this.state.historyUserChatData ? this.state.historyUserChatData[this.props.userId]?(this.state.historyUserChatData[this.props.userId].messages.map(m=>{
  // const ref = React.createRef();


  // const handleClick = () =>{
  //   console.log(ref)
  // ref.current.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'start',
  // });
  // }
  return(<div className={m.position==="right"?"row justify-content-end":"row"}
  ref={this.state.refs?this.state.refs[m.id]:""}
  >
  <div className={m.position==="right"?"card message-card bg-lightblue m-1":"card message-card m-1"}>
    
  {/* <button type="button" onClick={handleClick}>
  Scroll Into View
</button> */}
    
      <div className="card-body p-2 message-show"
  
      //  onMouseEnter={this.onMouseOver.bind(this)}  onMouseLeave={this.onMouseOver.bind(this)}
       >
          <span className="mx-2" key={m.id}



          //  ref={refs?refs[m.id]:""}
          
          > 
          
{m.type==="image"?
          (m.message.length<10?<i className="fa fa-spinner fa-pulse"></i>:
         
         
          m.message?
          
          
          <a href="#" type="button" 
          
          onClick={(e)=>{
      
            e.preventDefault()
            const url = m.message.split('.').slice(0, -1).join('.')
            const method = 'GET';
            console.log("get the download url")
            console.log(url)
            console.log("end get the download url")
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

           m.message.split('-')[1]==="mobile"?m.message:
            m.message.split('.').slice(0, -1).join('.')
          
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

<img src={"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/chat_images/"+


m.message.split('.').slice(0, -1).join('.')


}  style={{"width":"50px"}} crossOrigin="anonymous" />:<i className="fa fa-file" aria-hidden="true">{m.message.substring(m.message.lastIndexOf('/') + 1)}</i> 


  }
  
  
 
  </a>


            : this.emojify(m.message):this.emojify(m.message)}
            
            </span>
          
      
            
           }

 {/* <span className="hide">&nbsp;&nbsp;
 

   <i className="fa fa-reply" aria-hidden="true"></i>
 
 </span> */}
</span>
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




//  new Date(parseInt(m.time)* 1000).getHours()+':'+"0" + new Date(parseInt(m.time) * 1000).getMinutes()
          }
          

          
          </small></span>
      </div>
  </div>
</div>)})):(<div></div>):(<div></div>
)







console.log("show this targetuserhistory")
console.log( this.props.targetHistoryUser1)
console.log( this.props.targetHistoryUser1[this.props.userId])
console.log("end show this targetuserhistory")




const targetuserhistory = this.props.targetHistoryUser1 ? this.props.targetHistoryUser1[this.props.userId]?(this.props.targetHistoryUser1[this.props.userId].messages.map(m=>{

  return(<div className={m.position==="right"?"row justify-content-end":"row"}
  ref={this.state.refs?this.state.refs[m.id]:""}
  >
  <div className={m.position==="right"?"card message-card bg-lightblue m-1":"card message-card m-1"}>
    
 
    
      <div className="card-body p-2 message-show"
    
     
       >
          <span className="mx-2" key={m.id}

          
          > 
          
       
{m.type==="image"?
          (m.message.length<10?<i className="fa fa-spinner fa-pulse"></i>:
          m.message?
          
          
          <a href="#" type="button" 
          
          onClick={(e)=>{
    
            e.preventDefault()
            const url = m.message.split('.').slice(0, -1).join('.')
            const method = 'GET';
            console.log("get the download url")
            console.log(url)
            console.log("end get the download url")
            axios.request({url,
              method,
              responseType: 'blob', 
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
    responseType: 'blob', 
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


  }

  </a>


            : this.emojify(m.message):this.emojify(m.message)}
            
            </span>
          
      
            
           }
</span>
<div className="dropdown-content">
    <a href="#"
    onClick={(e)=>{
      e.preventDefault()
      this.setState({ isImageViewModalOpen: !this.state.isImageViewModalOpen,
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
</div>)})):(<div></div>):(
<div></div>
)












    return (     
<div className="container-fluid message-scroll" style={{"flex": "1 1"},{"height":"300px"} }>






{
  historyMsg
}

{
  !this.state.historyUserChatData[this.props.userId]?targetuserhistory:""
}
{
  liveMsg
}


            {
            // msg
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

        // this.props.onSendForwardImageClicked(image, user, image.split("."));

        console.log("start forwarding")
      console.log(image)
      console.log(user)
      // console.log(image.split(".")[1])

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

export default MessageList