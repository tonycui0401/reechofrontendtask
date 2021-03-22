import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import {isMobile} from 'react-device-detect';


class ProfileSelect extends Component{
    saveAndContinue = (e, param) => {
        e.preventDefault()
        // alert(param)
        this.props.updateProfileType(param)
        this.props.nextStep()
    }

    // back  = (e) => {
    //     e.preventDefault();
    //     this.props.prevStep();
    // }

    render(){
        return(
        <Fragment>
            <Container className="mt-5">
            {!isMobile ? (
            
                <Col md={6} className="mx-auto">
                    <center>
                    <p>Thank you!</p>
                    </center>
                  <br/>
                  <h2>What profile are you creating?</h2>
                  <br/><br/>
                  <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={(e) =>this.saveAndContinue(e, 'talent')}>Individual</Button>
            </div>
            </div>
            <br/>
            <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={(e) =>this.saveAndContinue(e, 'recruiter')}>Recruiter</Button>
            </div>
            </div>
            <br/>
            <center>
                  <p>You can always add another profile type later</p>
                  </center>
                  <div className="row justify-content-center">
            {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div>
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div> */}
           
            </div>
            </Col>
            ):(
                
                          <Col md={6} className="mx-auto">
                            <h2>Thank you!</h2>
                            {/* <h2>Enter User Details</h2> */}
                            <p>Please retrun to the app to continue registration</p>
                            </Col>
                 )}
          
        </Container>
      </Fragment>
        )
    }
}

export default ProfileSelect;