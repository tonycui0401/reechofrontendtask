/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import SelectForm from './SelectForm'
import HearAboutSuggestion  from './HearAboutSuggestion'
import {ANYTHINGIMPORTANTS} from './anythingimportant';
import ImportantSuggestion from './ImportantSuggestion'
import { TextArea } from 'semantic-ui-react';

const suggestions = ANYTHINGIMPORTANTS.map((country) => {
    return {
      id: country,
      text: country
    }
  })


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class Benefit extends Component{


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



    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }
    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    updateAnythingImportant = (important)=>{
        this.props.addAnythingImportant(important)
    }

    updateSelectCurrent=(current)=>{
   
        this.props.changeCurrent(current);

    }


    updateSelectCurrentCurrency=(currency)=>{


    this.props.changeCurrentCurrency(currency)

    }



    updateSelectExpected=(expected)=>{
   
        this.props.changeExpected(expected);

    }



    updateSelectExpectedCurrency=(currency)=>{


      this.props.changeExpectedCurrency(currency)
  
      }





    updateReChange = (e) => {

      // console.log(e.target.value.length)
      this.props.changeWerenotRe(e.target.value)
      // this.props.handleChange('proudOf')
      this.setState({
remaining:300-e.target.value.length
      });

    }


  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
   }

    render(){
        const { values } = this.props;

        const selectList = {
            // selectedOption : 'month',
            options: ['select hour/day/month/year', 'hour', 'day', 'month', 'year']
          }
        
          const currency = {
            options: ['select currency', 'GBP', 'USD', 'EUR']
          }

        return(
           
            <Fragment>
            <Container className="mt-5">
            {values.profileType==='talent' ? (
  
              <Row>
                <Col md={6} className="mx-auto">
                  
                  <h2>Benefits</h2>
                  <p>This is your private information. You can share this with certain others at your discretion.</p>
    
                 <br/>
            <Form >
            <div className="form-group">
              <label htmlFor="username">Current Pay</label>
              <div className="row justify-content-center">
                 <div className="col-4">
              <input className="form-control" type="number"
                    placeholder=''
                    onChange={this.props.handleChange('currentPay')}
                    defaultValue={values.currentPay}
                    onKeyPress={this.onKeyPress.bind(this)} 
                    />
                </div>
                <div className="col-4">
                <SelectForm selectType="current" selectList = {selectList} handleChange={this.updateSelectCurrent}/>
                </div>
                <div className="col-4">
                <SelectForm selectType="current" selectList = {currency} handleChange={this.updateSelectCurrentCurrency}/>
                </div>
                </div>
            </div>
               
                <div className="form-group">
                <label>Expected Pay</label>
                <div className="row justify-content-center">
                 <div className="col-4">
                    <input className="form-control" type="number"
                    placeholder=''
                    onChange={this.props.handleChange('expectedPay')}
                    defaultValue={values.expectedPay}
                    onKeyPress={this.onKeyPress.bind(this)} 
                    />
                    </div>
                    <div className="col-4">
                <SelectForm selectType="current" selectList = {selectList} handleChange={this.updateSelectExpected}/>
                </div>
                    <div className="col-4">
                <SelectForm selectType="expected" selectList = {currency} handleChange={this.updateSelectExpectedCurrency}/>
                </div>
                    </div>
                </div> 
                <div className="form-group">
                   <label>Notice Period</label>
                    <input
                    placeholder='' className="form-control"
                    onChange={this.props.handleChange('noticePeriod')}
                    defaultValue={values.noticePeriod}
                    />
               </div>
               <div className="form-group">
                <label>Anything Important</label>
                    <div>
                    <ImportantSuggestion  addAnythingImportant= {this.updateAnythingImportant}/>
      </div>
      </div>
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
             <h2>If you weren't a recruiter</h2>
             <center>
             <p>We love recruitment but we also appreciate the twist, turns, hidden talents and forking path of a career. Let us know!</p>
             </center>
             <br/>
             <TextArea placeholder='' style={{ minHeight: 100 }} 
          //   onChange={this.props.handleChange('aboutYou')} 
            onChange={this.updateReChange}
            />
            <p>character remaining: {this.state.remaining}</p>
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

export default Benefit;