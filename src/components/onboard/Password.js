import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import Input from "react-validation/build/input";





class Password extends Component{

  constructor(props){
    super(props);

    console.log(this.props.values)

    this.state = {
        password_errors:'',
        repassword_errors: ''
    }
 }
 


    saveAndContinue = (e) => {
      console.log(this.props.values.password)
      e.preventDefault()
      if(this.props.values.password===''){
        this.setState({ password_errors : "password cannot be empty" })
      }else if(this.props.values.repassword===''){
        this.setState({ repassword_errors : "confirm password cannot be empty" })
      }else if(this.props.values.repassword.length<12){
        this.setState({ repassword_errors : "Your password needs to have at least 12 characters" })
      }else if(this.props.values.repassword.length<12){
        this.setState({ repassword_errors : "Your password needs to have at least 12 characters" })
      }
      else if(this.props.values.password !==this.props.values.repassword){
        this.setState({ repassword_errors : "password is not match" })
      }
      else if(this.props.values.password ===this.props.values.repassword){
        this.props.nextStep()
      }else{
        this.setState({ password_errors :""})
        this.setState({ repassword_errors : ""})
     }
    }

    render(){
        const { values } = this.props;


        return(
           
            <Fragment>
            <Container className="mt-5">
              
              <Row>
                <Col md={6} className="mx-auto">
                  
                  {/* <h2>Enter User Details</h2> */}
                  <h2>Secure your account</h2>
    
                  <hr/>
            <Form >
            <center>
            <p>Your password needs to have at least 12 characters</p>
            </center>
            <div className="form-group">
              <label htmlFor="username">Set your password</label>
              <input className="form-control" type="password"
       
                    placeholder=''
                    onChange={this.props.handleChange('password')}
                    defaultValue={values.password}
                    />
            </div>
            <span style={{color: "red"}}>{this.state.password_errors}</span>
               
                <div className="form-group">
                <label>Confirm password</label>
                    <input className="form-control" type="password"
               
                    placeholder=''
                    onChange={this.props.handleChange('repassword')}
                    defaultValue={values.repassword}
                    />
                </div> 
                <span style={{color: "red"}}>{this.state.repassword_errors}</span>

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
            <br/>
            </Form>
            </Col>
          </Row>
          
        </Container>
      </Fragment>

        )
    }
}

export default Password;