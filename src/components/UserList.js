/* eslint-disable jsx-a11y/anchor-is-valid */
import "./chatmember.css"

import React, {Component} from 'react';
import moment from 'moment';
// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import UserService from "../services/user.service";
import ChatService from "../services/chat.service";

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class UserList extends Component {


  constructor(props) {
    super(props);
    this.state = {
        users:[],
        me:[],
        userLastMessage:{},
        sortedMessage:{},
        sortedUsers:[],
        userObj:{}
        // cards: [],
        // id:0
      }
    }

  componentDidMount(){


   

UserService.getCandidateProfile()
.then(
        response => {

    

this.setState({
  me:response.data[0],


})

console.log("check me here")
// console.log(this.state.me.user_id)
console.log("end check me here")


    UserService.getAllCandidate()
    .then(
            response => {
    console.log("test")
    console.log(response.data)



let userObj = {}

for(let i in response.data){
userObj[response.data[i].user_id] = response.data[i]
}

this.setState({
  users:response.data,
  userObj:userObj
  })


for(let i in this.state.users){

  console.log("user id:")
  console.log(this.state.me.user_id+" "+this.state.users[i].user_id)



  ChatService.getPrivateChatLastMessage(this.state.me.user_id, this.state.users[i].user_id)
  .then(
          response => {
let userLastMessage = this.state.userLastMessage

// let userLastMessage ={}
for(let i in response.data){

  let messageData = {}
  messageData.id = response.data[i].id
  messageData.sender = response.data[i].sender
  messageData.receipt = response.data[i].receipt
  messageData.message = response.data[i].message
  messageData.time = response.data[i].time

  let targetId

  if(messageData.sender !== this.state.me.user_id){
    targetId = messageData.sender 
  }else if(messageData.receipt !== this.state.me.user_id){
    targetId = messageData.receipt
  }



  // userLastMessage.push(messageData)

  if(!userLastMessage[targetId]){
    userLastMessage[targetId]={}
  }
  if(!userLastMessage[targetId].messages){
    userLastMessage[targetId].messages={}
  }
  userLastMessage[targetId].messages = messageData

}
this.setState({userLastMessage:userLastMessage})

console.log("check user message")
console.log(response.data)
console.log("end check user message")
console.log("get my last message")
console.log(this.state.userLastMessage)
console.log(Object.values(this.state.userLastMessage))
console.log(Object.entries(this.state.userLastMessage))
const testObj = Object.entries(this.state.userLastMessage).sort((a,b)=>b[1].messages.time-a[1].messages.time)
const newObj = Object.fromEntries(testObj)
var obj = {};
testObj.forEach((data)=>{
  console.log("print each data")
   console.log(data)
   return obj[' ' +data[0]] = data[1]

  //  console.log("end print each data")
});

this.setState({
  sortedMessage:obj
})

this.setState({
  sortedUsers:testObj
})

console.log("check from entries")
console.log(this.state.sortedUsers)
console.log(this.state.sortedMessage)
console.log(this.state.users)
console.log(this.state.userObj)
console.log("end check from entries")
// console.log(this.alphabetical_sort_object_of_objects(this.state.userLastMessage, 'lastMessage'))
// this.setState({
//   userLastMessage:Object.entries(this.state.userLastMessage).sort((a,b)=>b[1].messages.time-a[1].messages.time)
// })


// console.log(Object.fromEntries(userLastMessage))

console.log("end get my last message")

          },
          error => {
            console.log(error)
          }
        );


  console.log("end user id:")

}



          
            },
            error => {
              console.log(error)
            }
          );



        },
        error => {
          console.log(error)
        }
      );



  }


//   alphabetical_sort_object_of_objects(data, attr) {
//     var arr = [];
//     for (var prop in data) {
//         if (data.hasOwnProperty(prop)) {
//             var obj = {};
//             obj[prop] = data[prop];
//             obj.tempSortName = data[prop][attr].toLowerCase();
//             arr.push(obj);
//         }
//     }

//     arr.sort(function(a, b) {
//         var at = a.tempSortName,
//             bt = b.tempSortName;
//         return at > bt ? 1 : ( at < bt ? -1 : 0 );
//     });

//     var result = [];
//     for (var i=0, l=arr.length; i<l; i++) {
//         var obj = arr[i];
//         delete obj.tempSortName;
//         for (var prop in obj) {
//             if (obj.hasOwnProperty(prop)) {
//                 var id = prop;
//             }
//         }
//         var item = obj[id];
//         result.push(item);
//     }
//     return result;
// }




//   clickList =(id)=>{
//     //   e.preventDefault();
//       this.props.onChatClicked(id)
//   }


  render() {

    console.log("get initial chat online status")
    console.log(this.props.userChatStatusData)
    console.log("end get initial chat online status")
    console.log("get user notify")
    // console.log(Object.keys(this.props.targetHistoryUser))
    console.log(this.props.targetUserChatStatus)
    // if(this.props.userChatUnseenData){
    // console.log(this.props.userChatUnseenData[77])
    // }
    console.log("end get user notify")




    const UserUnseenList = this.state.users.map(user=> this.props.userChatUnseenData[user.user_id]?<a href="#" key={user.user_id} onClick={(e)=>{
      e.preventDefault()
      this.props.onChatClicked(user)
    //   this.forceUpdate();
  }} className="list-group-item list-group-item-action bg-light">{user.firstname + " "+user.lastname}
  
  <span className="badge badge-danger">{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].unread:''}</span>
  &nbsp;&nbsp;&nbsp;
  
  {/* {user.chatstatus} */}
  
  {/* <i class={user.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"> */}

  <i class={this.props.targetUserChatStatus[user.user_id]?
  
  (this.props.targetUserChatStatus[user.user_id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")
  
  :("")}

  aria-hidden="true"></i><span>&nbsp;&nbsp;
    {this.props.userChatUnseenData[user.user_id].unread?
    <b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.time?moment(Number(this.props.userChatUnseenData[user.user_id].lastMessage.time)).format('h:mm a')+" "+moment(Number(this.props.userChatUnseenData[user.user_id].lastMessage.time)).format('L').substring(0,5):'':''}</b>
  :this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.time?moment(Number(this.props.userChatUnseenData[user.user_id].lastMessage.time)).format('h:mm a')+" "+moment(Number(this.props.userChatUnseenData[user.user_id].lastMessage.time)).format('L').substring(0,5):'':''}
    </span>
  
  {this.props.userChatUnseenData[user.user_id]?
  
  (<p>
    {this.props.userChatUnseenData[user.user_id].unread?
    <b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.message?this.props.userChatUnseenData[user.user_id].lastMessage.message.length>25?this.props.userChatUnseenData[user.user_id].lastMessage.message.slice(0, 25)+"...":this.props.userChatUnseenData[user.user_id].lastMessage.message:'':""}</b>
    :this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.message?this.props.userChatUnseenData[user.user_id].lastMessage.message.length>25?this.props.userChatUnseenData[user.user_id].lastMessage.message.slice(0, 25)+"...":this.props.userChatUnseenData[user.user_id].lastMessage.message:'':""}
    </p>)
 

:(<p> {this.state.userLastMessage[user.user_id]?this.state.userLastMessage[user.user_id].messages?this.state.userLastMessage[user.user_id].messages.message.length>25?this.state.userLastMessage[user.user_id].messages.message.slice(0, 25)+"...":this.state.userLastMessage[user.user_id].messages.message:"":""}</p>)}

   
   </a>:"")


// const testUsers = this.state.sortedUsers?this.state.sortedUsers.map(user=>

//   <li>{this.state.userObj?this.state.userObj[user[0]]?this.state.userObj[user[0]].firstname:"":""} {this.state.userObj?this.state.userObj[user[0]]?this.state.userObj[user[0]].lastname:"":""} {user[1].messages.message}</li>
  
//   ):""

  const testUsers = this.state.sortedUsers?this.state.sortedUsers.map(user=>
  user[0]!==undefined?
<a href="#"  onClick={(e)=>{
  e.preventDefault()
  this.props.onChatClicked(this.state.userObj[user[0]])
//   this.forceUpdate();
}} className="list-group-item list-group-item-action bg-light">{this.state.userObj?this.state.userObj[user[0]]?this.state.userObj[user[0]].firstname:"":""} {this.state.userObj?this.state.userObj[user[0]]?this.state.userObj[user[0]].lastname:"":""}
<span className="badge badge-danger">{this.state.userObj?this.state.userObj[user[0]]?this.props.userChatUnseenData[this.state.userObj[user[0]].user_id]?this.props.userChatUnseenData[this.state.userObj[user[0]].user_id].unread:'':'':''}</span>
&nbsp;&nbsp;&nbsp;

{/* {user.chatstatus} */}

{/* <i class={user.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"> */}

<i class={this.state.userObj?this.state.userObj[user[0]]?this.props.targetUserChatStatus[this.state.userObj[user[0]].user_id]?

(this.props.targetUserChatStatus[this.state.userObj[user[0]].user_id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")

:(""):"":""}

aria-hidden="true"></i>


<span>&nbsp;&nbsp;

{this.props.userChatUnseenData[user[0]]?


(<b>
    
  {this.props.userChatUnseenData[user[0]]?this.props.userChatUnseenData[user[0]].lastMessage.time?moment(Number(this.props.userChatUnseenData[user[0]].lastMessage.time)).format('h:mm a')+" "+moment(Number(this.props.userChatUnseenData[user[0]].lastMessage.time)).format('L').substring(0,5):"":""}

  </b>):
  (this.state.sortedMessage[" "+user[0]]?this.state.sortedMessage[" "+user[0]].messages?moment(Number(this.state.sortedMessage[" "+user[0]].messages.time)).format('h:mm a')+" "+moment(Number(this.state.sortedMessage[" "+user[0]].messages.time)).format('L').substring(0,5):"":"")
}
  
  </span>


{this.props.userChatUnseenData[user[0]]?

(<p><b>{this.props.userChatUnseenData[user[0]].lastMessage.sender===this.state.me.user_id?"You":  this.state.userObj[user[0]].lastname}: {this.props.userChatUnseenData[user[0]]?this.props.userChatUnseenData[user[0]].lastMessage.message?this.props.userChatUnseenData[user[0]].lastMessage.message.length>25?this.props.userChatUnseenData[user[0]].lastMessage.message.slice(0, 25)+"...":this.props.userChatUnseenData[user[0]].lastMessage.message:'':""}</b></p>)


:(<p>{this.state.sortedMessage[" "+user[0]].messages.sender===this.state.me.user_id?"You":  this.state.userObj[user[0]].lastname}: {this.state.sortedMessage[" "+user[0]]?this.state.sortedMessage[" "+user[0]].messages?this.state.sortedMessage[" "+user[0]].messages.message.length>25?this.state.sortedMessage[" "+user[0]].messages.message.slice(0, 25)+"...":this.state.sortedMessage[" "+user[0]].messages.message:"":""}</p>)}




</a>:<p>dsdsdds</p>):""







const UserLastMessageList = this.state.users.map(user=> this.state.sortedMessage[" "+user.user_id]?<a href="#" key={user.user_id} onClick={(e)=>{
  e.preventDefault()
  this.props.onChatClicked(user)
//   this.forceUpdate();
}} className="list-group-item list-group-item-action bg-light">{user.firstname + " "+user.lastname}

<span className="badge badge-danger">{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].unread:''}</span>
&nbsp;&nbsp;&nbsp;

{/* {user.chatstatus} */}

{/* <i class={user.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"> */}

<i class={this.props.targetUserChatStatus[user.user_id]?

(this.props.targetUserChatStatus[user.user_id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")

:("")}

aria-hidden="true"></i><span>&nbsp;&nbsp;

{this.state.sortedMessage[" "+user.user_id]?this.state.sortedMessage[" "+user.user_id].messages?moment(Number(this.state.sortedMessage[" "+user.user_id].messages.time)).format('h:mm a')+" "+moment(Number(this.state.sortedMessage[" "+user.user_id].messages.time)).format('L').substring(0,5):"":""}
  
  {/* <b>{this.props.userLastMessage[user.user_id]?this.props.userLastMessage[user.user_id].messages?this.props.userLastMessage[user.user_id].messages.time?moment(Number(this.props.userLastMessage[user.user_id].messages.time)).format('h:mm a'):'':'':''}</b> */}
  
  </span>

{this.props.userChatUnseenData[user.user_id]?

(<p><b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.message?this.props.userChatUnseenData[user.user_id].lastMessage.message.length>25?this.props.userChatUnseenData[user.user_id].lastMessage.message.slice(0, 25)+"...":this.props.userChatUnseenData[user.user_id].lastMessage.message:'':""}</b></p>)


:(<p>{this.state.sortedMessage[" "+user.user_id].messages.sender===this.state.me.user_id?"You: ": user.firstname + " "+user.lastname+": "}{this.state.sortedMessage[" "+user.user_id]?this.state.sortedMessage[" "+user.user_id].messages?this.state.sortedMessage[" "+user.user_id].messages.message.length>25?this.state.sortedMessage[" "+user.user_id].messages.message.slice(0, 25)+"...":this.state.sortedMessage[" "+user.user_id].messages.message:"":""}</p>)}


</a>:"")













//     const UserUnseenList = this.state.users.map(user=>
//       <a href="#" key={user.user_id} onClick={(e)=>
//       e.preventDefault()
//       this.props.onChatClicked(user)
//   } className="list-group-item list-group-item-action bg-light">{user.firstname + " "+user.lastname}
  
//   <span className="badge badge-danger">{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].unread:''}</span>
//   &nbsp;&nbsp;&nbsp;
  
  

//   <i class={this.props.targetUserChatStatus[user.user_id]?
  
//   (this.props.targetUserChatStatus[user.user_id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")
  
//   :("")}

//   aria-hidden="true"></i><span>&nbsp;&nbsp;<b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.time?moment(Number(this.props.userChatUnseenData[user.user_id].lastMessage.time)).format('h:mm a'):'':''}</b></span>
  
//   {this.props.userChatUnseenData[user.user_id]?
  
//   (<p><b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.message?this.props.userChatUnseenData[user.user_id].lastMessage.message.length>25?this.props.userChatUnseenData[user.user_id].lastMessage.message.slice(0, 25)+"...":this.props.userChatUnseenData[user.user_id].lastMessage.message:'':""}</b></p>)
 

// :(<p> {this.state.userLastMessage[user.user_id]?this.state.userLastMessage[user.user_id].messages?this.state.userLastMessage[user.user_id].messages.message.length>25?this.state.userLastMessage[user.user_id].messages.message.slice(0, 25)+"...":this.state.userLastMessage[user.user_id].messages.message:"":""}</p>)}

   
//    </a>

   
//   })





















  const UsetList = this.state.users.map(user=> !this.state.userLastMessage[user.user_id] && !this.props.userChatUnseenData[user.user_id]?<a href="#" key={user.user_id} onClick={(e)=>{
      e.preventDefault()
      this.props.onChatClicked(user)
    //   this.forceUpdate();
  }} className="list-group-item list-group-item-action bg-light">{this.props.userChatUnseenData[user.user_id]?this.state.userLastMessage[user.user_id]?user.firstname + " "+user.lastname:user.firstname + " "+user.lastname:user.firstname + " "+user.lastname}
  
  <span className="badge badge-danger">{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].unread:''}</span>
  &nbsp;&nbsp;&nbsp;
  
  {/* {user.chatstatus} */}
  
  {/* <i class={user.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"> */}

  <i class={this.props.targetUserChatStatus[user.user_id]?
  
  (this.props.targetUserChatStatus[user.user_id].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")
  
  :("")}

  aria-hidden="true"></i>
  
  <span>&nbsp;&nbsp;
   <b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.time?moment(Number(this.props.userChatUnseenData[user.user_id].lastMessage.time)).format('h:mm a')+" "+moment(Number(this.state.userChatUnseenData[user.user_id].messages.time)).format('L').substring(0,5):'':''}</b>
    
    </span>
  
  {this.props.userChatUnseenData[user.user_id]?
  
  
  (<p><b>{this.props.userChatUnseenData[user.user_id]?this.props.userChatUnseenData[user.user_id].lastMessage.message?this.props.userChatUnseenData[user.user_id].lastMessage.message.length>25?this.props.userChatUnseenData[user.user_id].lastMessage.message.slice(0, 25)+"...":this.props.userChatUnseenData[user.user_id].lastMessage.message:'':""}</b></p>)
 



:(<p> {this.state.userLastMessage[user.user_id]?this.state.userLastMessage[user.user_id].messages?this.state.userLastMessage[user.user_id].messages.message.length>25?this.state.userLastMessage[user.user_id].messages.message.slice(0, 25)+"...":this.state.userLastMessage[user.user_id].messages.message:"":""}</p>)}

   
   </a>:"")


    return (       <div  className="bg-light border-right" id="sidebar-wrapper">
    
    <div  className="list-group list-group-flush">
      {testUsers}
    {/* {UserUnseenList} */}
    {/* {UserLastMessageList} */}
    {UsetList} 
    {/* {this.state.users.map((user)=>{

    <a href="#"  className="list-group-item list-group-item-action bg-light">{user.firstname}</a>

    })} */}
      {/* <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 1</a>
      <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 2</a>
      <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 3</a>
      <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 4</a>
      <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 5</a>
      <a href="#"  className="list-group-item list-group-item-action bg-light">chat list 6</a> */}
    </div>
  </div>      )
  }
}

export default UserList