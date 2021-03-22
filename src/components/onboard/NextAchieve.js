/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import SkillSuggestion from './selectionSuggestion'


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class NextAchieve extends Component{


   constructor(props) {
    super(props);
    this.state = {
      remaining:300,
      cremaining:300,
      eremaining:300
    }

  }

  skipit = (e) => {
    e.preventDefault();
    this.props.nextStep()}

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    updateChange = (e) => {

      // console.log(e.target.value.length)
      
      this.props.handleNextAchieve(e.target.value);
      this.setState({
remaining:300-e.target.value.length
      });

    }

    updateCandidateChange = (e) => {

      // console.log(e.target.value.length)
      
      this.props.handleCandidateChange(e.target.value);
      this.setState({
cremaining:300-e.target.value.length
      });

    }

    updateEmployerChange = (e) => {

      // console.log(e.target.value.length)
      
      this.props.handleEmployerChange(e.target.value)
      this.setState({
eremaining:300-e.target.value.length
      });

    }

    render(){
        const { values } = this.props;


        return(
           
            <Fragment>
            <Container className="mt-5">
            {values.profileType==='talent' ? (

              <Row>
                <Col md={6} className="mx-auto">
                  <h2>I want to achieve</h2>
                  {/* <h2>Enter User Details</h2> */}
                  <p>We all have something new we want to do!</p>
    
                  <hr/>
            <Form >
            <TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="nextAchieve"
                    defaultValue={values.nextAchieve}/>

            <p>character remaining {this.state.remaining}</p>
                
            <div className="row justify-content-center">
                {/* <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div> */}
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>
            </Form>
            </Col>
          </Row>
            ):(




              <Row>
              <Col md={6} className="mx-auto">
              <h2>Your approach to candidate experience</h2>
              <p>Tell us what you are doing right.</p>
              <br/>
              <TextArea placeholder='' onChange={this.updateCandidateChange} style={{ minHeight: 100 }} 
          //   onChange={this.props.handleChange('aboutYou')} 
            />
            <p>character remaining: {this.state.cremaining}</p>
            <br/>
            <h2>Your approach to employer needs</h2>
              <p>Tell us what sets you apart.</p>
              <br/>
              <TextArea placeholder='' onChange={this.updateEmployerChange} style={{ minHeight: 100 }} 
          //   onChange={this.props.handleChange('aboutYou')} 
            />
            <p>character remaining: {this.state.eremaining}</p>
            <div className="row justify-content-left">
               <div className="col-3">
          <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
          </div> 
          <div className="col-3">
          <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
          </div>
          </div>
              </Col>
        </Row>






            
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

export default NextAchieve;