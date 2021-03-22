/* eslint-disable jsx-a11y/anchor-is-valid */
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




class SurpriseOf extends Component{


  constructor(props) {
    super(props);
    this.state = {
      remaining:300
    }

  }


  skipit = (e) => {
    e.preventDefault()
    this.props.nextStep()
}


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
      
      this.props.handleSurpriseOf(e.target.value);
      this.setState({
remaining:300-e.target.value.length
      });

    }

    updateReChange = (e) => {

      // console.log(e.target.value.length)
      
      this.props.changeReProudOf(e.target.value);
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
                  <h2>I surprise people with</h2>
                 <br/>
                  <p>What do people appreciate about you that isn't immediately apparent.</p>
                  <br/>
            <Form >
            <TextArea placeholder='' style={{ minHeight: 100 }} 
              onChange={this.updateChange}
                    defaultValue={values.surpriseOf}/>
            <p>characters remaining: {this.state.remaining}</p>

                
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
                  <h2>I'm most proud of</h2>
                  <p>Perhaps you've changed someone's life, have a standard you keep to, or just make a mean cup of tea. We want to hear:</p>
    
    <hr/>
<Form >
<TextArea placeholder='' style={{ minHeight: 100 }} 
onChange={this.updateReChange}
      defaultValue={values.proudOf}/>
<p>character remaining {this.state.remaining}</p>
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

export default SurpriseOf;