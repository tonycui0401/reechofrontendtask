/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment, useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import Modal from "../Modal";
import UserService from "../../services/user.service";
import { TextArea } from 'semantic-ui-react';


class EditAchieve extends Component{


  constructor(props) {
    super(props);
    this.state = {
        editAchieve:false,
        achieve:'',
        isAchieveOpen:false
    }



    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }




   

    changeProud =( e)=>{
        e.preventDefault();
        this.setState({
          editProudOf:!this.state.editProudOf
        })
      }


   

      toggleAchievePrivacy =(e)=>{
        e.preventDefault();
        this.setState({ isAchieveOpen: !this.state.isAchieveOpen });
      }




    componentDidMount() {





if(this.props.userID){

  UserService.getCandidateViewProfile(this.props.userID)
  .then(
          response => {
      

  this.setState({
  
      achieve:response.data[0].nextachievements,

  })
        
          },
          error => {
            console.log(error)
          }
        );

      }else{
        UserService.getCandidateProfile()
        .then(
                response => {
            
      
        this.setState({
        
            achieve:response.data[0].nextachievements,

        })
              
                },
                error => {
                  console.log(error)
                }
              );
    
            }

          }
     


  changeAchieve=(e)=>{
    e.preventDefault();
    this.setState({
      editAchieve:!this.state.editAchieve
    })
  }




  

    render(){
     



        return(
           <div>

<h5>I want to achieve
{this.props.edit?(
  <span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.changeAchieve} ><i  className="fa fa-edit"></i></a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleAchievePrivacy}><i className="fa fa-lock"></i></a>
</span>):(<div></div>)}
</h5>
{!this.state.editAchieve ? (
  <div className="col-10">
    <p>{this.state.achieve}</p>
</div>
):(
  <div>
<TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="proudOf"
                    />
            {/* <p>character remaining {this.state.remaining}</p> */}
            
            </div>
)}
<Modal isOpen={this.state.isAchieveOpen} onClose={this.toggleAchievePrivacy}>
          
          <center>
          <h4>Next Achieve</h4>
          </center>
          {/* <h5>Change privacy</h5> */}
        
           <div style={{"padding":"20px"}}>    
          <label>
            <strong>Public</strong>
            <br/>
            <p>Everyone can see this information
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="letter"
              value="a"
              // checked={value === "a"}
              onChange={this.handleChange}
            />{" "}
            </p>
            
          </label>
       

          <label>
          <strong>Private</strong>
          <br/>
          <p>Only you can see it
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="letter"
              value="b"
              // checked={value === "b"}
              onChange={this.handleChange}
            />{" "}
            </p>
          </label>
          </div>  
 
          
        </Modal>


    


           </div>
          
        )
    }

}

export default EditAchieve;







