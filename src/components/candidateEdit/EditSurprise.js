/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment, useState} from 'react';
import { Form, Button } from 'semantic-ui-react';
import Modal from "../Modal";
import UserService from "../../services/user.service";
import { TextArea } from 'semantic-ui-react';


class EditSurprise extends Component{


  constructor(props) {
    super(props);
    this.state = {
        editSurpriseWith:false,
        surpriseWith:'',
        isSurpriseOfOpen:false
    }



    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }




    updateChange = (e) => {

      // console.log(e.target.value.length)
      
      // this.props.handleProudof(e.target.value);

      this.setState({surpriseWith: e.target.value});


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



   

    changeSurpriseWith=(e)=>{
        e.preventDefault();
        this.setState({
          editSurpriseWith:!this.state.editSurpriseWith
        })

        
        UserService.updateCandidateSurpriseOf(this.props.profileId, this.state.surpriseWith).then(
          response => {
      
            console.log("this is"+response.data)
         
          }).catch((error) => {
            console.log(error);
            });


      }



   

      toggleSurpriseOfPrivacy =(e)=>{
        e.preventDefault();
        this.setState({ isSurpriseOfOpen: !this.state.isSurpriseOfOpen });
      }




    componentDidMount() {





      if(this.props.userID){

        UserService.getCandidateViewProfile(this.props.userID)
        .then(
                response => {
            
      
        this.setState({
        
          surpriseWith:response.data[0].surpriseof,
      
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
        
          surpriseWith:response.data[0].surpriseof,

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

<h5>I surprise people with
{this.props.edit?(
  <span>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.changeSurpriseWith} ><i  className="fa fa-edit"></i></a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleSurpriseOfPrivacy}><i className="fa fa-lock"></i></a>
</span>):(<div></div>)}
</h5>
{!this.state.editSurpriseWith ? (
  <div className="col-10">
<p>{this.state.surpriseWith}</p>
</div>
):(
  <div>
<TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="proudOf"
              value={this.state.surpriseWith}
                    />
            {/* <p>character remaining {this.state.remaining}</p> */}
           
            </div>
)}


<Modal isOpen={this.state.isSurpriseOfOpen} onClose={this.toggleSurpriseOfPrivacy}>
          
          <center>
          <h4>Surprise with</h4>
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

export default EditSurprise;







