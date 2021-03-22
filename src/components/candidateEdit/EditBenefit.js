/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import SelectForm from '../onboard/SelectForm'
// import HearAboutSuggestion  from '../onboard/HearAboutSuggestion'
// import {ANYTHINGIMPORTANTS} from '../onboard/anythingimportant';
import ImportantSuggestion from '../onboard/ImportantSuggestion'
import { TextArea } from 'semantic-ui-react';
import Modal from "../Modal";
import UserService from "../../services/user.service";

// const suggestions = ANYTHINGIMPORTANTS.map((country) => {
//     return {
//       id: country,
//       text: country
//     }
//   })


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
      remaining:300,
      editBenefit:false,
      isBenefitOpen: false,
      important:'',
      currentpay:'',
      expectedpay:'',
      current_currency:'',
      expected_currency:'',
      current_type:'',
      expected_type:''
    }

  }




  componentDidMount() {


    if(this.props.userID){

      UserService.getCandidateViewBenefit(this.props.userID)
      .then(
              response => {
          
    
      this.setState({
      
        currentpay:response.data[0].currentpay,
        expectedpay:response.data[0].expectedpay,
        current_currency:response.data[0].current_currency,
        expected_currency:response.data[0].expected_currency,
        current_type:response.data[0].current_type,
        expected_type:response.data[0].expected_type,
        important:response.data[0].anyimportant
    
      })
            
              },
              error => {
                console.log(error)
              }
            );
    
          }else{

    UserService.getCandidateBenefit()
    .then(
            response => {
        
console.log("this is")
console.log(response.data)
                // console.log(response.data[0])
  if(response.data.length!==0){
    this.setState({
      currentpay:response.data[0].currentpay,
      expectedpay:response.data[0].expectedpay,
      current_currency:response.data[0].current_currency,
      expected_currency:response.data[0].expected_currency,
      current_type:response.data[0].current_type,
      expected_type:response.data[0].expected_type,
      important:response.data[0].anyimportant
    })
    
  }
            },
            error => {
              console.log(error)
            }
          );
        }
      }

  changeBenefit=(e)=>{
    e.preventDefault();
    this.setState({
      editBenefit:!this.state.editBenefit
    })
  }


  saveBenefit=(e)=>{
    this.forceUpdate();
    this.setState({
  editBenefit:false
})
  }


  toggleBenefitPrivacy =(e)=>{
    e.preventDefault();
    this.setState({ isBenefitOpen: !this.state.isBenefitOpen });
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





    updateChange = (e) => {

      // console.log(e.target.value.length)
      
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
           
          <div>


<h4>Benefits
{this.props.edit?(
  <span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"><i  className="fa fa-edit" onClick={this.changeBenefit}></i></a>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.toggleBenefitPrivacy}><i className="fa fa-lock"></i></a>
</span>):(<div></div>)}
</h4>
<br/>
{!this.state.editBenefit ? (
<div>
<h5>Current Pay</h5>
<p>{this.state.currentpay}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.current_currency}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.current_type}</b></p>
<br/>
<h5>Expected Pay</h5>
<p>{this.state.expectedpay}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.expected_currency}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.expected_type}</b></p>
<br/>
<h5>Anything Important</h5>
<div className="row">
{this.state.important.includes(',')? this.state.important.split(",").map(hear=>

<div className="tag label label-success ng-scope ng-binding" key={hear}>{hear}&nbsp;&nbsp;</div>

):
<div className="tag label label-success ng-scope ng-binding" key={this.state.important}>{this.state.important}&nbsp;&nbsp;</div>
}
</div>
</div>
):(
  <div>
<div className="form-group">
              <label htmlFor="username">Current Pay</label>
              <div className="row justify-content-center">
                 <div className="col-4">
              <input className="form-control" type="number"
                    placeholder=''
                    // onChange={this.props.handleChange('currentPay')}
                    onKeyPress={this.onKeyPress.bind(this)} 
                    />
                </div>
                <div className="col-4">
                <SelectForm selectType="current" selectList = {selectList} handleChange={this.updateSelectCurrent}/>
                </div>
                <div className="col-4">
                <SelectForm selectType="current" selectList = {currency} handleChange={this.updateSelectCurrent}/>
                </div>
                </div>
            </div>
               
                <div className="form-group">
                <label>Expected Pay</label>
                <div className="row justify-content-center">
                 <div className="col-4">
                    <input className="form-control" type="number"
                    placeholder=''
                    // onChange={this.props.handleChange('expectedPay')}
                    onKeyPress={this.onKeyPress.bind(this)} 
                    />
                    </div>
                    <div className="col-4">
                <SelectForm selectType="current" selectList = {selectList} handleChange={this.updateSelectCurrent}/>
                </div>
                    <div className="col-4">
                <SelectForm selectType="expected" selectList = {currency} handleChange={this.updateSelectCurrency}/>
                </div>
                    </div>
                </div> 
                <div className="form-group">
                   <label>Notice Period</label>
                    <input
                    placeholder='' className="form-control"
                    // onChange={this.props.handleChange('noticePeriod')}
                    />
               </div>
               <div className="form-group">
                <label>Anything Important</label>
                    <div>
                    <ImportantSuggestion  addAnythingImportant= {this.updateAnythingImportant}/>
      </div>
      </div>

  <div className="row justify-content-center">
  <div className="col-3">
  <Button className="btn btn-primary btn-block" style={{"padding":"5px","width":"80px"}} onClick={this.saveBenefit}>save</Button>
  </div>
  </div>
  </div>
)}




<Modal isOpen={this.state.isBenefitOpen} onClose={this.toggleBenefitPrivacy}>
          
          <center>
          <h4>Benefit</h4>
          </center>
          {/* <h5>Change privacy</h5> */}
        
           <div style={{"padding":"20px"}}>    
          <label>
            <strong>Public</strong>
            <br/>
            <p>Everyone can see this information
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="letter"
              value="a"
              // checked={value === "a"}
              onChange={this.handleChange}
            />{" "}
            </p>
            
          </label>
       

          <label>
          <strong>Private</strong>
          <br/>
          <p>Only you can see it
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="letter"
              value="b"
              // checked={value === "b"}
              onChange={this.handleChange}
            />{" "}
            </p>
          </label>
          </div>  
        </Modal>


          </div>

        )
    }
}

export default Benefit;