/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
import "./chatmember.css"
import moment from 'moment';
import ChatService from "../services/chat.service";

// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
// import MessageList from "../services/user.service";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class MemberList extends Component {


  constructor(props) {
    super(props);
    this.state = {
        members:[]
        // cards: [],
        // id:0
      }
    }

  componentDidMount(){


//     ChatService.getAllChatGroupsMembers(this.props.groupId)
//     .then(
//             response => {
        
  
//     this.setState({
//         members:response.data
//       // userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
//       // hearabout:response.data[0].hearabout,
//       // surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
//       // email:response.data[0].email,
//       // phone:response.data[0].phone,
//     })
// console.log("get all chat members")
// console.log(this.props.roomMembers)
// console.log("end get all chat members")          
//             },
//             error => {
//               console.log(error)
//             }
//           );


  }




  render() {

    console.log("get all chat members")
console.log(this.props.roomMembers)
console.log("end get all chat members")   

const member = this.props.roomMembers[this.props.groupId].members.map(m=> 

<div className="list-item" data-id="7">
<div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img className="rounded member-img" src={"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+m.userimg} alt="." /></span></a></div>
<div className="flex"> <a href="#" className="item-author text-color" data-abc="true">{m.firstname} {m.lastname}</a>
    {/* <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div> */}
   &nbsp; &nbsp;
   {/* <i className={m.chatstatus==="offline"?"fa fa-circle":"fa fa-circle active"} aria-hidden="true"></i> */}


   <i className={this.props.targetUserChatStatus[m.member]?
  
  (this.props.targetUserChatStatus[m.member].chatstatus==="offline"?"fa fa-circle":"fa fa-circle active")
  
  :("")}

  aria-hidden="true"></i>


   {/* <i className="fa fa-circle" aria-hidden="true"></i> */}
</div> 
<div className="no-wrap">
<div className="item-date text-muted text-sm d-none d-md-block">
  
   {
// m.lastSeen?"seen "+ m.lastSeen:'unseen'

m.lastSeen?"seen "+moment(Number(m.lastSeen)).format('h:mm a')+" "+moment(Number(m.lastSeen)).format('L'):'unseen'
    // m.lastSeen?m.lastSeen:''
  }
  
  {/* joined at {


moment(Number(m.joindate)).format('h:mm a')+" "+moment(Number(m.joindate)).format('L')


} */}


</div>
</div>
</div>

)

    return (     
<div className="container-fluid message-scroll" style={{"flex": "1 1"},{"height":"300px"} }>


<div className="padding">
        <div className="row justify-content-center">
            <div className="col-sm-8">
                <div className="list list-row block">
                   {member}

                  {/* <div className="list-item" data-id="7">
                        <div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img src="https://img.icons8.com/color/48/000000/administrator-male.png" alt="." /></span></a></div>
                        <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Kinley Adolf</a>
                            <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                        </div>
                        <div className="no-wrap">
                            <div className="item-date text-muted text-sm d-none d-md-block">Joined 21 July</div>
                        </div>
                    </div>

                    <div className="list-item" data-id="7">
                        <div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img src="https://img.icons8.com/color/48/000000/administrator-male.png" alt="." /></span></a></div>
                        <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">Kinley Adolf</a>
                            <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                        </div>
                        <div className="no-wrap">
                            <div className="item-date text-muted text-sm d-none d-md-block">Joined 21 July</div>
                        </div>
                    </div>  */}
                   
                </div>
            </div>
        </div>
    </div>
       


        </div>

         )
  }
}

export default MemberList