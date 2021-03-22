/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import EmployerSuggestion  from './EmployerSuggestion'
import Swal from 'sweetalert2'


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class ProudOf extends Component{



   constructor(props) {
    super(props);
    this.state = {
      remaining:300
    }

  }


  skipit = (e) => {
    e.preventDefault();
    this.props.nextStep();
}


    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }


    updateEmployer = (employer)=>{

    // console.log(employer)

    this.props.addRecruiterClients(employer)
    }
 


    updateChange = (e) => {

      // console.log(e.target.value.length)
      
      this.props.handleProudof(e.target.value);
      this.setState({
remaining:300-e.target.value.length
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
                  <h2>I'm proud of</h2>
                  {/* <h2>Enter User Details</h2> */}
                  <p>We all have something worth bring up.</p>
    
                  <hr/>
            <Form >
            <TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange} name="proudOf"


              
                    defaultValue={values.proudOf}
                    
                    
                    />
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
          </Row>):
          (




            <Row>
            <Col md={6} className="mx-auto">
              <h2>Your clients</h2>
              <p>Why not showcase some of your clients.</p>
              <br/>
              <div className="form-group">
            {/* <label>Tag your experience</label> */}
                <div>
                <EmployerSuggestion  addEmployer = {this.updateEmployer}/>
  </div>
  </div>
  <br/>
  <div className="row justify-content-center">
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

export default ProudOf;