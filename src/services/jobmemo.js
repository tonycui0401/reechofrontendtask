import axios from 'axios';
// import authHeader from './auth-header';

// const API_URL = `${process.env.DOMAIN}/api/tags/`;
import { authEndpoint } from '../reecho-config'
import { mailEndpoint } from '../reecho-config'
import { apibase } from '../reecho-config'
import authHeader from './auth-header';
const querystring = require('querystring');


class JobMemoService {
  getAllJobMemos() {
    return axios.get(authEndpoint + '/allJobMemos');
  }

  getAllJobMemosApproved() {
    return axios.get(authEndpoint + '/allJobMemosApproved');
  }

  getAllJobMemosPending() {
    return axios.get(authEndpoint + '/allJobMemosPending');
  }

  getContacts(id) {
    return axios.get(authEndpoint + '/allContactsFromJob?id=' + id);
  }

  getCollaborators(id) {
    return axios.get(authEndpoint + '/allCollaboratorsFromJob?id=' + id);
  }


  approveMemo(id, admin_id) {
    return axios.put(authEndpoint + '/approvalJobMemo?id=' + id + '&admin_id=' + admin_id);
  }

  updateCandidateProudOf(id, surpriseOf) {
    // const profile = {
    //   "surpriseof":surpriseOf,
    // }
    // return axios.put(authEndpoint + '/updateCandidateProfile?id='+ id, profile, { headers: authHeader() });
  }



  //   getSkillTags() {
  //     return axios.get(apiEndpoint + '/tags/skillTags');
  //   }

  //   getImportantTags() {
  //     return axios.get(apiEndpoint + '/tags/importantTags');
  //   }

  //   getJobTags() {
  //     return axios.get(apiEndpoint + '/tags/jobTags');
  //   }

  //   getEmployerTags() {
  //     return axios.get(apiEndpoint + '/tags/employerTags');
  //   }

  //   getRoleTags() {
  //     return axios.get(apiEndpoint + '/tags/roleTags');
  //   }

  //   getDegreeTags() {
  //     return axios.get(apiEndpoint + '/tags/degreeTags');
  //   }

  //   getInstitutionTags() {
  //     return axios.get(apiEndpoint + '/tags/institutionTags');
  //   }

  //   getEducationTags() {
  //     return axios.get(apiEndpoint + '/tags/educationTags');
  //   }


  //   createRoleTag(role) {
  //     const roles = {
  //         "title":role,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createRoleTag', roles);
  //   }


  //   createDegreeTag(degree) {
  //     const degrees = {
  //         "title":degree,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createDegreeTag', degrees);
  //   }


  //   createInstitutionTag(institution) {
  //     const institutions = {
  //         "title":institution,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createInstitutionTag', institutions);
  //   }


  //   createEducationTag(education) {
  //     const educations = {
  //         "title":education,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createEducationTag', educations);
  //   }




  //   createSkillTag(skill) {
  //     const skills = {
  //         "title":skill,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createSkillTag', skills);
  //   }

  //   createImportantTag(important) {
  //     const importants = {
  //         "title":important,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createImportantTag', importants);
  //   }

  //   createHearabout(hearabout) {
  //     const hearabouts = {
  //         "title":hearabout,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createHearabout', hearabouts);
  //   }

  //   createJobTag(job) {
  //     const jobs = {
  //         "title":job,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createJobTag', jobs);
  //   }

  //   createLocationTag(location, country) {
  //     const locations = {
  //         "title":location,
  //         "country":country
  //       }
  //     return axios.post(apiEndpoint + '/tags/createLocationTag', locations);
  //   }

  //   createEmployerTag(employer) {
  //     const employers = {
  //         "title":employer,
  //       }
  //     return axios.post(apiEndpoint + '/tags/createEmployerTag', employers);
  //   }

  //   getLocationTags() {
  //     return axios.get(apiEndpoint + '/tags/locationTags');
  //   }

  //   // getUserBoard() {
  //   //   return axios.get(API_URL + 'user', { headers: authHeader() });
  //   // }

  //   // getModeratorBoard() {
  //   //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  //   // }

  //   // getAdminBoard() {
  //   //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  //   // }

  //   // sendMail(mail) {
  //   //   return axios.get(apibase + '/send?to='+mail);
  //   // }

  //   sendMail(email){

  //     return axios.post(mailEndpoint+'/sendmail', 
  //     querystring.stringify({
  //       email: email, 
  // }),   


  // {
  //   headers: { 
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   }
  // }
  // )
  //   }

  //   // ${localStorage.getItem('token')}`;

}

export default new JobMemoService();


// INSERT INTO employer_tag VALUES (3,'Deliveroo'),(4,'Dropbox'),(5,'eBay'),(6,'Facebook'),(7,'Funding Circle'),(8,'Google'),(9,'Groupon'),(10,'Intercom'),(11,'LinkedIn'),(12,'Microsoft'),(13,'Monzo'),(14,'N29'),(15,'Revolut'),(16,'Salesforce'),(17,'Skype'),(18,'Spotify'),(19,'Transferwise'),(20,'Uber'),(21,'Zendesk');
