/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment, useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import Modal from "../Modal";
import UserService from "../../services/user.service";
import { TextArea } from 'semantic-ui-react';


class EditProud extends Component{


  constructor(props) {
    super(props);
    this.state = {
        editProudOf:false,
        proudOf:'',
        isProudOfOpen:false
    }



    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }



    updateChange = (e) => {

      // console.log(e.target.value.length)
      
      // this.props.handleProudof(e.target.value);

      this.setState({proudOf: e.target.value});


      // UserService.updateCandidateProfileHearabout(this.state.profileId, this.state.hearabout).then(
      //   response => {
    
      //     console.log("this is"+response.data)
       
      //   }).catch((error) => {
      //     console.log(error);
      //     });
    
      // }


   

//       this.setState({
// remaining:300-e.target.value.length
//       });

    }

   

    changeProud =( e)=>{
        e.preventDefault();
        this.setState({
          editProudOf:!this.state.editProudOf
        })

        UserService.updateCandidateProudOf(this.props.profileId, this.state.proudOf).then(
          response => {
      
            console.log("this is"+response.data)
         
          }).catch((error) => {
            console.log(error);
            });
            
      }


   

      toggleProudOfPrivacy =(e)=>{
        e.preventDefault();
        this.setState({ isProudOfOpen: !this.state.isProudOfOpen });
      }




    componentDidMount() {



      if(this.props.userID){

        UserService.getCandidateViewProfile(this.props.userID)
        .then(
                response => {
            
      
        this.setState({
        
          proudOf:response.data[0].proudof,
      
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
        
            proudOf:response.data[0].proudof,

        })
              
                },
                error => {
                  console.log(error)
                }
              );
    
            }

          }
     






  

    render(){
     



        return(
           <div>

<h5>I am proud of
{this.props.edit?(
  <span>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"  onClick={this.changeProud}><i  className="fa fa-edit"></i></a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleProudOfPrivacy}><i className="fa fa-lock"></i></a>
</span>):(<div></div>)}
</h5>
{!this.state.editProudOf ? (
<div className="col-10">
<p>{this.state.proudOf}</p>
</div>
):(
  <div>
<TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="proudOf"


              value={this.state.proudOf}


                    />
            {/* <p>character remaining {this.state.remaining}</p> */}
           
            </div>
)}

<Modal isOpen={this.state.isProudOfOpen} onClose={this.toggleProudOfPrivacy}>
          
          <center>
          <h4>Proud Of</h4>
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

export default EditProud;







