import axios from 'axios';
import authHeader from './auth-header';
import API from './api'
import {authEndpoint} from '../reecho-config'
// const API_URL = 'http://localhost:8080/api/test/';


const API_URL = "http://localhost:5000/auth";


class UserService {
  getPublicContent() {
    return axios.get(authEndpoint+ 'all');
  }

  getUserBoard() {
    return axios.get(authEndpoint + 'user', { headers: authHeader() });
  }


  
  // sendUserEmail() {
  //   return axios.get(API_URL + 'send', { headers: authHeader() });
  // }


  verifyEmail(email){
    return axios.get(authEndpoint + '/email?email='+email);
  }


  createUser(firstname, lastname, email, password, phone, city, country) {
    const users = {
      "firstname":firstname,
      "lastname":lastname,
      "email":email,
      "password":password,
      "phone":phone,
      "city":city,
      "country":country
    }
    return axios.post(authEndpoint + '/register', users);
  }



   createCandidateProfile(hearabout, nextachievements, surpriseof, proudof, seekingstatus, nextachieve_privacy, proudof_privacy, surpriseof_privacy){
    const profile = {
      "hearabout":hearabout,
      "nextachievements":nextachievements,
      "surpriseof":surpriseof,
      "proudof":proudof,
      "seekingstatus":seekingstatus,
      "nextachieve_privacy":nextachieve_privacy,
      "proudof_privacy":proudof_privacy,
      "surpriseof_privacy":surpriseof_privacy
    }
    return axios.post(authEndpoint + '/registerCandidateProfile', profile, { headers: authHeader() });
  }


  updateCandidateProfileHearabout(id, hearabout){
    const profile = {
      "hearabout":hearabout,
      // "nextachievements":nextachievements,
      // "surpriseof":surpriseof,
      // "proudof":proudof,
      // "seekingstatus":seekingstatus,
      // "nextachieve_privacy":nextachieve_privacy,
      // "proudof_privacy":proudof_privacy,
      // "surpriseof_privacy":surpriseof_privacy
    }
    return axios.put(authEndpoint + '/updateCandidateProfile?id='+ id, profile, { headers: authHeader() });
  }

  updateCandidateProudOf(id, surpriseOf){
    const profile = {
      "surpriseof":surpriseOf,
    }
    return axios.put(authEndpoint + '/updateCandidateProfile?id='+ id, profile, { headers: authHeader() });
  }


  updateCandidateSurpriseOf(id, proudOf){
    const profile = {
      "proudof":proudOf,
    }
    return axios.put(authEndpoint + '/updateCandidateProfile?id='+ id, profile, { headers: authHeader() });
  }




  createCandidateEducation(degree, institution, start_date, end_date, education, privacy){
    const profile = {
      "degree":degree,
      "institution":institution,
      "start_date":start_date,
      "end_date":end_date,
      "education":education,
      "privacy":privacy
    }
    return axios.post(authEndpoint + '/registerCandidateEducation', profile, { headers: authHeader() });
  }

  createCandidateExperience(job_title, company, start_date, end_date, experience, privacy){
    const profile = {
      "job_title":job_title,
      "company":company,
      "start_date":start_date,
      "end_date":end_date,
      "experience":experience,
      "privacy":privacy
    }
    return axios.post(authEndpoint + '/registerCandidateExperience', profile, { headers: authHeader() });
  }

  createCandidateBenefit(currentpay, expectedpay, current_currency, expected_currency, noticeperiod, anyimportant, current_type, expected_type, privacy){
    const profile = {
      "currentpay":currentpay,
      "expectedpay":expectedpay,
      "current_currency":current_currency,
      "expected_currency":expected_currency,
      "noticeperiod":noticeperiod,
      "anyimportant":anyimportant,
      "current_type":current_type,
      "expected_type":expected_type,
      "privacy":privacy
    }
    return axios.post(authEndpoint + '/registerCandidateBenefit', profile, { headers: authHeader() });
  }





  createCandidateView(){
    const view = {
    "corder":'["Next Achievement","Experience","Proud Of","Education","Suprise With","Benefit"]'
    }
    return axios.post(authEndpoint + '/registerCandidateView', view, { headers: authHeader() });
  }






  createRecruiterExperience(job_title, company, start_date, end_date, workingtype){
    const profile = {
      "job_title":job_title,
      "company":company,
      "start_date":start_date,
      "end_date":end_date,
      "working_type":workingtype
    }
    return axios.post(authEndpoint + '/registerRecruiterExperience', profile, { headers: authHeader() });
  }


  createRecruiterView(){
    const view = {
    "rorder":'["About You","Candidate Experience","Employer Needs","Clients","Proud Of","Werenot Recruiter"]'
    }
    return axios.post(authEndpoint + '/registerRecruiterView', view, { headers: authHeader() });
  }




  createRecruiterRoles(experience, roles, contract_type, clients){
    const profile = {
      "experience":experience,
      "roles":roles,
      "contract_type":contract_type,
      "clients":clients
    }
    return axios.post(authEndpoint + '/registerRecruiterRoles', profile, { headers: authHeader() });
  }




  createRecruiterProfile(aboutyou, approachcandidates, approachemployer, proudof, wererecruiter){
    const profile = {
      "aboutyou":aboutyou,
      "approachcandidates":approachcandidates,
      "approachemployer":approachemployer,
      "proudof":proudof,
      "werenotrecruiter":wererecruiter
    }
    return axios.post(authEndpoint + '/registerRecruiterProfile', profile, { headers: authHeader() });
  }




  updateCandidateView(cview, id){

    const view = {
      "corder":cview
      }

    return axios.put(authEndpoint + '/updateCandidateView?id=' + id, view, { headers: authHeader() });

  }













 getCandidateProfile(){
return axios.get(authEndpoint + '/candidateProfile', { headers: authHeader() })
 }

 getCandidateEducation(){
  return axios.get(authEndpoint + '/candidateEducation', { headers: authHeader() })
 }

 getCandidateExperience(){
  return axios.get(authEndpoint + '/candidateExperience', { headers: authHeader() })
 }

 getCandidateBenefit(){
  return axios.get(authEndpoint + '/candidateBenefit', { headers: authHeader() })
 }


 getCandidateView(){
  return axios.get(authEndpoint + '/candidateView', { headers: authHeader() })
 }



 getCandidateViewProfile(id){
  return axios.get(authEndpoint + '/candidateViewProfile?id='+id)
   }
  
   getCandidateViewEducation(id){
    return axios.get(authEndpoint + '/candidateViewEducation?id='+id)
   }
  
   getCandidateViewExperience(id){
    return axios.get(authEndpoint + '/candidateViewExperience?id='+id)
   }
  
   getCandidateViewBenefit(id){
    return axios.get(authEndpoint + '/candidateViewBenefit?id='+id)
   }
  
  
   getCandidateViewView(id){
    return axios.get(authEndpoint + '/candidateViewView?id='+id)
   }










getAllCandidate(){
  return axios.get(authEndpoint + '/allCandidateView')
}







getUserProfileType(){

  console.log("check if it's called")
  return axios.get(authEndpoint + '/profileType', { headers: authHeader() })
}







updateCompanyImg(company_pic){

  const company = {
    company_pic:company_pic
  }

  return axios.put(authEndpoint + '/updateRecruiterExperience', company, { headers: authHeader() });

}






  updateUserImg(imgname){

    const user = {
      userimg:imgname
    }

    return axios.put(authEndpoint + '/updateUser', user, { headers: authHeader() });

  }


  updateUserEmailStatus(status){

    const user = {
      emailverified:status
    }

    return axios.put(authEndpoint + '/updateUser', user, { headers: authHeader() });

  }



  // updateUserChatStatus(status){

  //   const user = {
  //     chatstatus:status
  //   }

  //   return axios.put(authEndpoint + '/updateUser', user, { headers: authHeader() });

  // }



  createProfileType(profiletype){

    const profileTye = {
      type:profiletype
    }
  
    
return axios.post(authEndpoint + '/registerProfileType', profileTye, { headers: authHeader() });
  }






  // sendUserEmail(email) {
  //  const emails = {
  //     "to":email
  //   }
  //   return API
  //     .post(`auth/send`, 
  //       emails
  //     )
  //     .then(response => {
  //       console.log(response)
  //       if (response.data.token) {
  //         localStorage.setItem("user", JSON.stringify(response.data.user));
  //       }

  //       return response.data;
  //     });
  // }




  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();