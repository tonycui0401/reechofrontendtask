import React, { Component, Fragment } from 'react';
import { Container, Col, Row, Button} from 'react-bootstrap';
import UserService from "../../services/user.service";
import { withRouter } from 'react-router-dom';



class Success extends Component{


    constructor(props){
        super(props);
    
        console.log(this.props.values)
    
        // this.state = {
        //     password_errors:'',
        //     repassword_errors: ''
        // }
     }



     





     componentDidMount() {

    if(this.props.values.profileType === 'talent'){

let hearabout
let education
let experience
let important
let jobtitle
let company
let degree
let institution

if(this.props.values.hearabout!==''){
  hearabout = this.props.values.hearabout.map(function(elem){
    return elem.text;
}).join(",");
}else{
  hearabout=''
}

if(this.props.values.educationTag!==''){
  education = this.props.values.educationTag.map(function(elem){
    return elem.text;
}).join(",");
}else{
  education=''
}

if(this.props.values.jobExperience!==''){
  experience = this.props.values.jobExperience.map(function(elem){
    return elem.text;
}).join(",");
}else{
  experience=''
}

if(this.props.values.anythingImportant!==''){
  important = this.props.values.anythingImportant.map(function(elem){
    return elem.text;
}).join(",");
}else{
  important=''
}



if(this.props.values.jobTitle!==''){
  jobtitle = this.props.values.jobTitle[0].text
}else{
  jobtitle=''
}

if(this.props.values.company!==''){
  company = this.props.values.company[0].text
}else{
  company=''
}

if(this.props.values.degree!==''){
  degree = this.props.values.degree[0].text
}else{
  degree=''
}

if(this.props.values.institution!==''){
  institution = this.props.values.institution[0].text
}else{
  institution=''
}





 let jobEnd= "";
    if(this.props.values.currentJob===true){
        jobEnd = "current"
    }else{
        jobEnd = this.props.values.jobendTime
    }



        UserService.createCandidateProfile(hearabout, this.props.values.nextAchieve, this.props.values.surpriseOf,
          this.props.values.proudOf,"surprise me", 'public', 'public', 'public'
          ).then(
            response => {
    
              console.log("this is"+response.data)
           
            }).catch((error) => {
              console.log(error);
              });


    
              UserService.createCandidateEducation(degree, institution, this.props.values.educationstartTime,
                this.props.values.educationendTime, education, 'public'
                ).then(
                  response => {
          
                 
                    console.log("this is"+response.data)
                 
                  }).catch((error) => {
                    console.log(error);
                    });
        
             UserService.createCandidateExperience(jobtitle, company, this.props.values.jobstartTime,
                jobEnd, experience, 'public'
                        ).then(
                          response => {
                  
                         
                            console.log("this is"+response.data)
                         
                          }).catch((error) => {
                            console.log(error);
                            });


              UserService.createCandidateBenefit(this.props.values.currentPay, this.props.values.expectedPay, this.props.values.currentCurrency,
                                this.props.values.expectedCurrency, this.props.values.noticePeriod, important, this.props.values.currentType,
                                this.props.values.expectedType, 'private'
                                ).then(
                                  response => {
                          
                                    
                                    console.log("this is"+response.data)
                                 
                                  }).catch((error) => {
                                    console.log(error);
                                    });



                                    UserService.createProfileType(this.props.values.profileType).then(
                                        response => {
                                
                                          
                                          console.log("this is"+response.data)
                                       
                                        }).catch((error) => {
                                          console.log(error);
                                          });


                                      UserService.createCandidateView().then(
                                            response => {
                                    
                                              
                                              console.log("this is"+response.data)
                                           
                                            }).catch((error) => {
                                              console.log(error);
                                              });
                                    

                                            }else{

                                       let reJobExperience
                                       let reRole
                                       let reClients
                                       let contractType

                                       if(this.props.values.reJobExperience!==''){
                                        reJobExperience = this.props.values.reJobExperience.map(function(elem){
                                          return elem.text;
                                      }).join(",");
                                      }else{
                                        reJobExperience=''
                                      }

                                      if(this.props.values.reRole!==''){
                                        reRole = this.props.values.reRole.map(function(elem){
                                          return elem.text;
                                      }).join(",");
                                      }else{
                                        reRole=''
                                      }

                                      if(this.props.values.reClients!==''){
                                        reClients = this.props.values.reClients.map(function(elem){
                                          return elem.text;
                                      }).join(",");
                                      }else{
                                        reClients=''
                                      }


                                              // createRecruiterView(){
                                              //   const view = {
                                              //   "rorder":'["About You","Candidate Experience","Employer Needs","Clients","Proud Of","Werenot Recruiter"]'
                                              //   }
                                              //   return axios.post(authEndpoint + '/registerRecruiterView', view, { headers: authHeader() });
                                              // }
                                            
                                            
                                            
                                            
                                              // createRecruiterRoles(experience, roles, contract_type, clients){
                                              //   const profile = {
                                              //     "experience":experience,
                                              //     "roles":roles,
                                              //     "contract_type":contract_type,
                                              //     "clients":clients
                                              //   }
                                              //   return axios.post(authEndpoint + '/registerRecruiterRoles', profile, { headers: authHeader() });
                                              // }
                                            
                                            
                                            
                                            
                                              // createRecruiterProfile(aboutyou, approachcandidates, approachemployer, proudof, wererecruiter){
                                              //   const profile = {
                                              //     "aboutyou":aboutyou,
                                              //     "approachcandidates":approachcandidates,
                                              //     "approachemployer":approachemployer,
                                              //     "proudof":proudof,
                                              //     "wererecruiter":wererecruiter
                                              //   }
                                              //   return axios.post(authEndpoint + '/registerRecruiterProfile', profile, { headers: authHeader() });
                                              // }
                                            

                                              if(this.props.values.contractType!==''){
                                                contractType = this.props.values.contractType.map((elem)=>{
                                                  if(elem.isChecked === true){
                                                    return elem.value;
                                                  }
                                              }).join(",");
                                              }else{
                                                contractType=''
                                              }
                                              
                                              // console.log("check employ types")
                                              // console.log(this.props.values.employTypes)
                                              // console.log(employTypes)
                                              // console.log("end check employ types")
                                      
                                           
                                                    // UserService.createRecruiterExperience(this.props.values.recruiterJobTitle, this.props.values.recruiterCompany, this.props.values.rejobstartTime,
                                                    //   this.props.values.rejobendTime, employTypes
                                                    //           ).then(
                                                    //             response => {
                                                        
                                                               
                                                    //               console.log("this is"+response.data)
                                                               
                                                    //             }).catch((error) => {
                                                    //               console.log(error);
                                                    //               });
                                      





                                              UserService.createRecruiterProfile(this.props.values.aboutYou, this.props.values.candidateEx, this.props.values.employerNe,
                                                this.props.values.reProudOf, this.props.values.werenotRe
                                                ).then(
                                                  response => {
                                          
                                                    console.log("this is"+response.data)
                                                 
                                                  }).catch((error) => {
                                                    console.log(error);
                                                    });
                                      


                                                    UserService.createRecruiterRoles(reJobExperience, reRole, contractType,
                                                      reClients
                                                      ).then(
                                                        response => {
                                                
                                                          console.log("this is"+response.data)
                                                       
                                                        }).catch((error) => {
                                                          console.log(error);
                                                          });
                                      


                                                          
                                                          UserService.createRecruiterView().then(
                                                            response => {
                                                    
                                                              
                                                              console.log("this is"+response.data)
                                                           
                                                            }).catch((error) => {
                                                              console.log(error);
                                                              });
                                                  


                                                              UserService.createProfileType(this.props.values.profileType).then(
                                                                response => {
                                                        
                                                                  
                                                                  console.log("this is"+response.data)
                                                               
                                                                }).catch((error) => {
                                                                  console.log(error);
                                                                  });














                                              

console.log("recruite onboading created")

                                            }


      }


    

      checkOut = (e) => {
        e.preventDefault();
        this.props.history.push('/individual')
    }

   
     back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){


        const { values } = this.props;



        return(
            <Fragment>
            <Container className="mt-5">
              
              <Row>
                <Col md={6} className="mx-auto">
                <h2 className="ui centered">All Done!</h2>
                </Col>
                </Row>
                <br/><br/><br/>
                <div className="row justify-content-center">
            <div className="col-6">
            <Button className="btn btn-primary btn-block" onClick={this.checkOut}>Check out your space</Button>
            </div>
            </div>
            {/* <div className="row justify-content-center">
                <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div>
        
            </div> */}
            </Container>
            </Fragment>
        )
    }
}

// export default Success;
export default withRouter(Success);