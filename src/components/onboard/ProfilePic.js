/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import {isMobile} from 'react-device-detect';
import axios from "axios";
import UserService from "../../services/user.service";


class ProfilePic extends Component{



  skipit = (e) => {
    e.preventDefault()
    // this.props.updateProfileType()
    this.props.nextStep()
}




 
    constructor(props){
        super(props);
        this.state = {
          success : false,
          url : "",
          filename:"",
          error: false,
          errorMessage : ""
        }
      }


      saveAndContinue = (e, param) => {
        e.preventDefault()
        // this.props.updateProfileType()
        this.props.nextStep()

        const url = this.state.url.substring(this.state.url.lastIndexOf('/') + 1)

        UserService.updateUserImg(url).then(
          response => {
      
            
              console.log(response.data)
          
          },
          error => {
            console.log(error)
          }
        );



    }




    
      handleChange = (ev) => {
        this.setState({success: false, url : ""});
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        console.log(fileParts)
        axios.post("http://reecho-env.eba-bk9ugpha.eu-west-1.elasticbeanstalk.com/sign_s3",{
          fileName : fileName,
          fileType : fileType
        })
        .then(response => {
          console.log(response)
          console.log("Preparing no error");
          var returnData = response.data.data.returnData;
          console.log(returnData);
    
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          this.setState({url: url})
          this.setState({filename: returnData.filename})
          console.log("Recieved a signed request " + signedRequest);
    
          var options = {
            headers: {
              'Content-Type': fileType
            }
          };
          axios.put(signedRequest,file,options)
          .then(result => {
            console.log("Response from s3")
            this.setState({success: true});
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })
        })
        .catch(error => {
          alert(JSON.stringify(error));
        })
      }
      // handleUpload = (ev) => {
    
      // }
    
    

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const SuccessMessage = () => (
            <div style={{padding:50}}>
              {/* <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3> */}
              <img src={this.state.url} style={{width:'200px'}}/>
              {/* <a href={this.state.url}>Access the file here</a> */}
              <br/>
            </div>
          )
          const ErrorMessage = () => (
            <div style={{padding:50}}>
              <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
              <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
              <span>{this.state.errorMessage}</span>
              <br/>
            </div>
          )
        return(
        <Fragment>
            <Container className="mt-5">
            {!isMobile ? (
            
                <Col md={6} className="mx-auto">
                   
                  <br/>
                  <h2>Pic of you</h2>
                  <br/><br/>
                  <center>
                  <p>Putting a face to the name</p>
                  </center>
            <br/>
           
            <br/>
            <center>
                  {/* <p>You can always add another profile type later</p> */}
                  </center>
                  <center>
          {/* <h1>UPLOAD A FILE</h1> */}
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          <br/>
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          {/* <br/>
          <div className="row justify-content-center">
            <div className="col-3">
          <button className="btn btn-primary btn-block" onClick={this.handleUpload}>UPLOAD</button>
          </div>
          </div> */}
          <br/>
        </center>
                  <div className="row justify-content-center">
            {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div> */}
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
           
            </div>
            </Col>
            ):(
                
                          <Col md={6} className="mx-auto">
                            <h2>Thank you!</h2>
                            {/* <h2>Enter User Details</h2> */}
                            <p>Please retrun to the app to continue registration</p>
                            </Col>
                 )}


<br/>
            <br/>
   
   <div className="row justify-content-center">
            <a href="#" onClick={this.skipit}><strong>Skip</strong></a>
            </div>
         
          
        </Container>
      </Fragment>
        )
    }
}

export default ProfilePic;