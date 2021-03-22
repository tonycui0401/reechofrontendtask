import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import Input from "react-validation/build/input";


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class UserDetails extends Component{

  constructor(props){
    super(props);

    this.state = {
        firstname_errors:'',
        lastname_errors: ''
    }
 }
 


    saveAndContinue = (e) => {
      e.preventDefault()
      if(this.props.values.firstName===''){
        this.setState({ firstname_errors : "first name cannot be empty" })
      }else if(this.props.values.lastName===''){
        this.setState({ lastname_errors : "last name cannot be empty" })
      }else{
        this.setState({ firstname_errors :""})
        this.setState({ lastname_errors : ""})
      // alert(e.target.value)
      // let formIsValid = true;
      // let errors = {};
      // let fields = this.state.fields;
      // if(e.target.defaultValue===''){
        // formIsValid = false;
        // alert("ddd")
    //     this.setState({ firstname_errors : "can not be empty" })
    //     this.setState({ lastname_errors : "can not be empty" })
    //     // this.state.errors["lastname"] = "Cannot be empty";
    //  }else{
      // this.form.validateAll();
        this.props.nextStep()
     }
    }

    render(){
        const { values } = this.props;


        return(
           
            <Fragment>
            <Container className="mt-5">
              
              <Row>
                <Col md={6} className="mx-auto">
                  
                  <h2>To start, what is your full name</h2>
    
                 <br/>
            <Form >
            <div className="form-group">
              <label htmlFor="username">First Name</label>
              <input className="form-control"
                    placeholder=''
                    onChange={this.props.handleChange('firstName')}
                    defaultValue={values.firstName}
                    />
            </div>
            <span style={{color: "red"}}>{this.state.firstname_errors}</span>
               
                <div className="form-group">
                <label>Last Name</label>
                    <input className="form-control"
                    placeholder=''
                    onChange={this.props.handleChange('lastName')}
                    defaultValue={values.lastName}
                    />
                </div> 
                <span style={{color: "red"}}>{this.state.lastname_errors}</span>

                    {/* <label>Last Name</label>
                    <Input
                    placeholder='Last Name'
                    onChange={this.props.handleChange('lastName')}
                    defaultValue={values.lastName}
                    />
               
                    <label>Email Address</label>
                    <Input
                    type='email'
                    placeholder='Email Address'
                    onChange={this.props.handleChange('email')}
                    defaultValue={values.email}
                    /> */}
                 <div className="row justify-content-center">
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

export default UserDetails;