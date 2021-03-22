import React, { Component, Fragment} from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class AboutYou extends Component{


    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render(){
        const { values } = this.props;


        return(
           
            <Fragment>
            <Container className="mt-5">
              
              <Row>
                <Col md={6} className="mx-auto">
                  <h2>About You</h2>
                  {/* <h2>Enter User Details</h2> */}
                  <p>Write a bit about yourself helps you let others help you</p>
    
                  <hr/>
            <Form >
            <TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.props.handleChange('aboutYou')}
                    defaultValue={values.aboutYou}/>


                
            <div className="row justify-content-center">
                <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div>
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Next </Button>
            </div>
            </div>
            </Form>
            </Col>
          </Row>
          
        </Container>
      </Fragment>

        )
    }
}

export default AboutYou;