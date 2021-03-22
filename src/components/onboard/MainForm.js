/* eslint-disable default-case */
import React, { Component } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import PersonalExperience from './PersonalExperience'
import Confirmation from './Confirmation';
import Hearabout from './Hearabout'
import PersonalEducation from './PersonalEducation'
import AboutYou from './AboutYou';
import NextAchieve from './NextAchieve';
import ProudOf from './ProudOf';
import SurpriseOf from './SurpriseOf'
import Interests from './Interests'
import Benefit from './Benefit'
import Greetings from './Greetings';
import ProfilePic from './ProfilePic';
import Success from './Success';
import Start from './Start';
import Password from './Password';
import ProfileSelect from './ProfileSelect';
import UserService from "../../services/user.service";
import TagService from "../../services/tag.service";


const queryString = require('query-string');


class MainForm extends Component {


    constructor(props) {
        super(props);
    this.state = {
        step: 1,
        firstName: '',
        lastName: '',
        password: '',
        repassword: '',
        email: '',
        age: '',
        city: '',
        country: '',
        phone:'',
        location:'',
        profileType:'',
        hearabout:'',
        jobTitle:'',
        company:'',
        degree:'',
        workType:'',
        institution:'',
        recruiterRole:'',
        recruiterClient:'',
        jobstartTime:'',
        recruiterJobTitle:'',
        rejobstartTime:'',
        rejobendTime:'',
        jobendTime:'',
        recruiterCompany:'',
        currentJob:false,
        recruiterCurrentJob:false,
        jobExperience:'',
        educationstartTime:'',
        educationendTime:'',
        educationTag:'',
        contractType:'',
        aboutYou:'',
        currentCurrency:'',
        expectedCurrency:'',
        nextAchieve:'',
        candidateEx:'',
        employerNe:'',
        surpriseOf:'',
        currentPay:0,
        currentType:'',
        expectedPay:0,
        expectedType:'',
        noticePeriod:'',
        anythingImportant:'',
        proudOf:'',
        interests:'',
        NotRecruiter:'',
        emailVerified:false,
        employTypes:'',
        reJobExperience:'',
        reRole:'',
        reClients:'',
        reProudOf:'',
        werenotRe:''
    }
    }
    // this.setState({step:5})

    // constructor(props) {
    //     super(props);

    // //     this.state = {
    // //       email_errors:'',
    // //       phone_errors: '',
    // //       cities: []

    // //   }

    // // console.log(this.props.location.search);


    // }

    componentWillMount(){


        // this.setState({
        //     currentType:"day",
        //     expectedType:"day",
        //     emailVerified:true
        // })

        // console.log(this.state.emailVerified)


        // UserService.createCandidateBenefit(400, 600, this.state.currentCurrency,
        //     this.state.expectedCurrency, this.state.noticePeriod, this.state.anythingImportant, this.state.currentType,
        //     this.state.expectedType
        //     ).then(
        //       response => {
      
                
        //         console.log("this is"+response.data)
             
        //       }).catch((error) => {
        //         console.log(error);
        //         });



        // TagService.sendMail('tonycui0401@gmail.com').then(
        //     response => {
    
              
        //       console.log("this is"+response.data)
           
        //     }).catch((error) => {
        //       console.log(error);
        //       });




        if(this.props.location.search.includes("email")){


            // UserService.updateUserImg("ssssss").then(
            //     response => {
            
            //         console.log(response.data)
                
            //     },
            //     error => {
            //       console.log(error)
            //     }
            //   );


    //         if(localStorage.getItem('user'))
           
    //  {
        const user = JSON.parse(localStorage.getItem('user'))

            UserService.updateUserEmailStatus(true).then(
                response => {
            
                    console.log(response.data)
                //   const employer = response.data.map((text) => text.title)
                //   // console.log(response.data)
                //   this.setState({
                //     employer: employer
                //   });
                },
                error => {
                  console.log(error)
                }
              );

    //  }

    UserService.getCandidateProfile()
    .then(
            response => {
        
                console.log("test get the candidate profile")
                console.log(response.data)
                console.log("end test get the candidate profile")


                if(response.data.lemgth===0){
            console.log("find me")
               
            }else if(response.data.length!==0){
                if(response.data[0].seekingstatus){
                    this.setState({step:16})
                }

                console.log("no me")

            }
          
            },
            error => {
              console.log(error)
            }
          );





        //   UserService.createCandidateBenefit(this.state.currentPay, this.state.expectedPay, this.state.currentCurrency,
        //     this.state.expectedCurrency, this.state.noticePeriod, "", this.state.currentType,
        //     this.state.expectedType
        //     ).then(
        //       response => {
      
                
        //         console.log("this is"+response.data)
             
        //       }).catch((error) => {
        //         console.log(error);
        //         });



    // UserService.verifyEmail(user.email).then(
    //     response => {
    
    //         console.log(response.data)

    //     this.setState({
    //         emailVerified:true 
    //     })
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   );



// if(!this.state.emailVerified){
            this.setState({step:6})
// }


                }
    }
    

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    changeLocation=(location)=>{
        // console.log(location)
        this.setState({location:location})
    }

    changeProfile =(type)=>{
        this.setState({profileType:type})
    }

    changeCountry=(country)=>{
        // console.log(location)
        this.setState({country:country})
    }

    changeJobTitle = (jobTitle)=>{
        this.setState({jobTitle:jobTitle})
    }

    changeRecruiterJobTitle = (jobTitle)=>{
        this.setState({recruiterJobTitle:jobTitle})
    }

    changeRecruiterCompany = (company)=>{
        this.setState({recruiterCompany:company})
    }

    changeCompany = (company)=>{
        this.setState({company:company})
    }

    changeDegree = (degree) =>{

        this.setState({degree:degree})

    }

    changeInstitute = (institute) =>{

        this.setState({institution:institute})
    }

    changeEduStart = (start) => {

        this.setState({educationstartTime:start})

    }

    changeEduEnd = (end) => {

        this.setState({educationendTime:end})

    }


    addEducation = (ed) =>{
        this.setState({educationTag:ed})
    }


    addHearAbout =(hearabout)=>{
        this.setState({hearabout:hearabout})
    }

    changeEmployType =(employTypes)=>{
        this.setState({employTypes:employTypes})
    }

    changeContractType = (contractTypes)=>{
        this.setState({contractType:contractTypes})
    }

    changeStart = (start)=>{
        this.setState({jobstartTime:start})
    }

    changeRecruiterStart = (start)=>{
        this.setState({rejobstartTime:start})
    }

    changeRecruiterEnd = (end)=>{
        this.setState({rejobendTime:end})
    }

    changeEnd = (end)=>{
        this.setState({jobendTime:end})
    }

    currentJob =(e)=>{
        this.setState({currentJob:e})
    }

    recruiterCurrentJob =(e)=>{
        this.setState({recruiterCurrentJob:e})
    }

    addJobExperience = (job) =>{
        this.setState({jobExperience:job})
    }

    addReJobExperience = (job) =>{
        this.setState({reJobExperience:job})
    }

    addRecruiterClients = (clients) =>{
        this.setState({reClients:clients})
    }


    addReRole = (role) =>{
        this.setState({reRole:role})
    }


    handleNextAchieve = (achieve) =>{
        this.setState({nextAchieve:achieve})
    }

    handleProudof = (proudof) =>{
        this.setState({proudOf:proudof})
    }

    handleAboutYou = (aboutyou) =>{
        this.setState({aboutYou:aboutyou})
    }

    handleCandidateChange = (candidateEx) =>{
        this.setState({candidateEx:candidateEx})
    }

    handleEmployerChange = (employerNe) =>{
        this.setState({employerNe:employerNe})
    }

    handleSurpriseOf = (surpriseOf) =>{
        this.setState({surpriseOf:surpriseOf})
    }

    changeCurrentCurrency = (currency)=>{
        this.setState({currentCurrency:currency})
    }

    changeExpectedCurrency = (currency)=>{
        this.setState({expectedCurrency:currency})
    }

    changeReProudOf = (proud) => {
        this.setState({reProudOf:proud})
    }

    changeWerenotRe = (werenot) => {
        this.setState({werenotRe:werenot})
    }

    changeCurrent = (current)=>{
        this.setState({currentType:current})
    }

    changeExpected = (expected)=>{
        this.setState({expectedType:expected})
    }

    addAnythingImportant = (important) =>{
        this.setState({anythingImportant:important})
    }

    render(){
        const {step} = this.state;
        const { firstName, lastName, password, repassword, email, age, city, country, phone, location, profileType, hearabout,jobTitle,company, degree, institution, jobstartTime, jobendTime, currentJob, recruiterCurrentJob, workType, contractType, educationstartTime,  educationendTime, educationTag, recruiterClient, recruiterRole, jobExperience, aboutYou, nextAchieve, proudOf, surpriseOf, interests, currentPay, currentType, expectedPay, expectedType, currentCurrency, expectedCurrency, noticePeriod, anythingImportant, NotRecruiter, employTypes, recruiterCompany, recruiterJobTitle, rejobstartTime, rejobendTime, reJobExperience, reRole, candidateEx, employerNe, reClients, reProudOf, werenotRe} = this.state;
        const values = { firstName, lastName, password, repassword, email, age, city, country, phone, location, profileType, hearabout, jobTitle,company, degree, institution, jobstartTime, jobendTime,  currentJob, recruiterCurrentJob, workType, contractType, educationstartTime,  educationendTime, educationTag, recruiterClient, recruiterRole, jobExperience, aboutYou, nextAchieve, proudOf, surpriseOf, interests, currentPay, currentType, expectedPay, expectedType, currentCurrency, expectedCurrency, noticePeriod, anythingImportant, NotRecruiter, employTypes, recruiterCompany, recruiterJobTitle, rejobstartTime, rejobendTime, reJobExperience, reRole, candidateEx, employerNe, reClients, reProudOf, werenotRe};
        switch(step) {
        case 1:
            return <Start
                    nextStep={this.nextStep}
                        />
        case 2:
            return <UserDetails
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 3:
            return <Password
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 4:
            return <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    changeLocation = {this.changeLocation}
                    changeCountry = {this.changeCountry}
                    values={values}
                    />
        case 5:
            return<Greetings
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
                    />
        case 6:
            return<ProfileSelect
            updateProfileType = {this.changeProfile}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
                    />
        case 7:
            return <Hearabout
            addHearAbout = {this.addHearAbout}
            changeEmployType = {this.changeEmployType}
            recruiterCurrentJob = {this.recruiterCurrentJob}
            // currentRecruiterJob = {this.currentRecruiterJob}
            changeRecruiterJobTitle = {this.changeRecruiterJobTitle}
            changeRecruiterCompany = {this.changeRecruiterCompany}
            changeRecruiterStart = {this.changeRecruiterStart}
            changeRecruiterEnd = {this.changeRecruiterEnd}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            />

        case 8:
            return<PersonalExperience
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            changeContractType = {this.changeContractType}
            addReJobExperience = {this.addReJobExperience}
            addReRole = {this.addReRole}
            currentJob = {this.currentJob}
            changeJobTitle = {this.changeJobTitle}
            changeStart = {this.changeStart}
            changeEnd = {this.changeEnd}
            changeCompany = {this.changeCompany}
            addJobExperience = {this.addJobExperience}
            values={values}
                    />
        case 9:
            return<PersonalEducation
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleAboutYou = {this.handleAboutYou}
            changeDegree = {this.changeDegree}
            changeStart = {this.changeEduStart}
            changeEnd = {this.changeEduEnd}
            changeInstitute = {this.changeInstitute}
            addEducation = {this.addEducation}
            values={values}
                    />
        // case 10:
        //     return<AboutYou
        //     prevStep={this.prevStep}
        //     handleChange = {this.handleChange}
        //     nextStep={this.nextStep}
        //     values={values}
        //             />
        case 10:
            return<NextAchieve
            prevStep={this.prevStep}
            handleCandidateChange = {this.handleCandidateChange}
            handleEmployerChange = {this.handleEmployerChange}
            handleNextAchieve = {this.handleNextAchieve}
            handleChange = {this.handleChange}
            nextStep={this.nextStep}
            values={values}
                    />
        case 11:
            return<ProudOf
            prevStep={this.prevStep}
            addRecruiterClients = {this.addRecruiterClients}
            handleProudof = {this.handleProudof}
            handleChange = {this.handleChange}
            nextStep={this.nextStep}
            values={values}
                    />    
        case 12:
            return<SurpriseOf
            prevStep={this.prevStep}
            changeReProudOf = {this.changeReProudOf}
            handleSurpriseOf = {this.handleSurpriseOf}
            handleChange = {this.handleChange}
            nextStep={this.nextStep}
            values={values}
                     />       
        // case 13:
        //     return<Interests
        //     prevStep={this.prevStep}
        //     handleChange = {this.handleChange}
        //     nextStep={this.nextStep}
        //     values={values}
        //              />  
        case 13:
            return<Benefit
            prevStep={this.prevStep}
            handleChange = {this.handleChange}
            nextStep={this.nextStep}
            changeWerenotRe = {this.changeWerenotRe}
            changeCurrent={this.changeCurrent}
            changeCurrentCurrency={this.changeCurrentCurrency}
            changeExpectedCurrency={this.changeExpectedCurrency}
            changeExpected={this.changeExpected}
            addAnythingImportant = {this.addAnythingImportant}
            values={values}
                     />  
        // case 16:
        //     return <Confirmation
        //             nextStep={this.nextStep}
        //             prevStep={this.prevStep}
        //             values={values}
        //             />
        case 14:
            return <ProfilePic
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    // values={values}
                    />
        case 15:
            return <Success 
            prevStep={this.prevStep}
            values={values}
            />
        case 16:
            return <Confirmation 
       
            />
        }
      console.log(this.state);
    }
}

export default MainForm;