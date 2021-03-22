/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import { green } from 'color-name';
import TagService from "../../services/tag.service";
import UserService from "../../services/user.service";



class Greetings extends Component{

    constructor(props) {

      
        super(props);
        this.state = {
          emailSent:false
        }
    

        console.log(this.props.values)

      }
    

      componentDidMount() {


        UserService.createUser(this.props.values.firstName, this.props.values.lastName, this.props.values.email,
          this.props.values.password, this.props.values.phone, this.props.values.location, this.props.values.country    
          ).then(
            response => {
    
              if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));




                // TagService.sendMail().then(
                //   response => {
          
                    
                //     console.log("this is"+response.data)
                 
                //   }).catch((error) => {
                //     console.log(error);
                //     });
        





              }
              





              console.log("this is"+response.data.token)
              console.log("this is"+response.data.user)
           
            }).catch((error) => {
              console.log(error);
              });



      }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    sendEmail  = (e) => {

        TagService.sendMail(this.props.values.email).then(
            response => {
    
              
              console.log("this is"+response.data)
           
            }).catch((error) => {
              console.log(error);
              });
  
        e.preventDefault();
       this.setState({emailSent:true})
    }

    render(){
        return(
        <Fragment>
            <Container className="mt-5">
              
            
                <Col md={6} className="mx-auto">
                  <br/><br/>
                  <h2>Check your email!</h2>
                  <br/>
                  <center>
                  <p style={{display:this.state.emailSent ? 'block':'none',color:'green'}} >Email re sent</p>
                  </center>
                  <center>
                  <p>Please check your mailbox to confirm your email address</p>
                  </center>
                  {/* <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div>
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
           
            </div> */}
            </Col>
            <br/><br/>
            <div className="row justify-content-center">
            <a href="#" onClick={this.sendEmail}><strong>I didn't receive the email</strong></a>
            </div>
          
        </Container>
      </Fragment>
        )
    }
}

export default Greetings;