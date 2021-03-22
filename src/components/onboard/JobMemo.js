import React, { Component, Fragment } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import HearAboutSuggestion from './HearAboutSuggestion'
import EmployerSuggestion from './EmployerSuggestion'
import JobTagSuggestion from './JobTagSuggestion'
import ImportantSuggestion from './ImportantSuggestion'
import SkillSuggestion from './SkillSuggestion'
import TagLocationManager from './TagLocationManager'
import RoleSuggestion from './RoleSuggestion'
import InsitutionSuggestion from './InstitutionSuggestion'
import DegreeSuggestion from './DegreeSuggestion'
import EducationSuggestion from './EducationSuggestion'
import JobMemoService from "../../services/jobmemo";
import AuthService from "../../services/auth.service";
import logo from "../../ReEcho_Logo.svg"
import JobCollaborator from "../../components/jobmemoadmin/jobCollaborator"


class JobMemo extends Component {



  constructor(props) {
    super(props);

    this.state = {
      // jobTitle:'',
      job: [],
      jobApproved: [],
      user: {},
      currentUser: AuthService.getCurrentUser(),
      pending: true,
      //   sidebarOpen: true,
      //   editHearAbout: false,
      //   isHearaboutModalOpen: false,
      //   isPreviewChangeModalOpen:false,
      //   isPreviewModalOpen:false,
      //   isContactOpen: false,
      //   editContact:false,
      //   activelooking:false,
      //   surpriseme:false,
      //   betterbegood:false,
      //   hearabout:'',
      //   hearaboutremaining:300,
      //   job:'',
      //   userimg:'',
      //   email:'',
      //   phone:'',
      //   profileId:'',
      //   showThis:false
      // modalVisible: false
    };
    // this.openModal = this.openModal.bind(this);
  }




  componentDidMount() {

    console.log("get current user")
    console.log(this.state.currentUser)
    console.log("end get current user")


    const user = AuthService.getCurrentUser();


    //     UserService.getCandidateProfile()
    //     .then(
    //             response => {

    //   console.log("show profile data")
    //  console.log(response.data)
    //   console.log("end show profile data")


    //     this.setState({
    //       profileId: response.data[0].id,
    //       userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
    //       hearabout:response.data[0].hearabout,
    //       surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
    //       email:response.data[0].email,
    //       phone:response.data[0].phone,
    //     })

    //             },
    //             error => {
    //               console.log(error)
    //             }
    //           );





    // console.log(this.state.surpriseme)







    JobMemoService.getAllJobMemosPending().then(
      response => {

        // const job = response.data.map((text) => text.title)
        console.log(response.data)
        this.setState({
          job: response.data,
          user: user
        });
      },
      error => {
        console.log(error)
      }
    );

    JobMemoService.getAllJobMemosApproved().then(
      response => {

        // const job = response.data.map((text) => text.title)
        console.log(response.data)
        this.setState({
          jobApproved: response.data,
          user: user
        });
      },
      error => {
        console.log(error)
      }
    );




    console.log("one get default")

    JobMemoService.getContacts(33).then(
      response => {

        console.log("get default")
        console.log(response.data)

      },
      error => {
        console.log(error)
      }
    );
    console.log("end one get default")




  }


  openPending = () => {
    this.setState({
      pending: true
    })
  }

  openApproved = () => {
    this.setState({
      pending: false
    })
  }


  //   approveMemo = (id) => {
  //     JobMemoService.approveMemo(id, 77).then(
  //       response => {

  //         console.log("this is" + response.data)

  //       }).catch((error) => {
  //         console.log(error);
  //       });

  //   }
  // }

  render() {
    const { values } = this.props;

    const selectList = {
      // selectedOption : 'month',
      options: ['select hour/month/year', 'hour', 'month', 'year']
    }

    const jobList = this.state.job.map((job) =>

      <div className="card" key={job.id}>
        <div className="card-body">
          {!job.approval ? <span class="text-warning" >{job.id}pedning for approve</span> : <span class="text-success">approved</span>}          <div className="row">
            <div className="col-12 col-lg-8 col-md-6">
              {/* <h1 className="mb-0 text-truncated">{job.id}</h1> */}
              <h3 className="mb-0 text-truncated">{job.title}</h3>
              <p className="lead">{job.short_description}</p>
              <p>
                {job.long_description}
              </p>
              <p> {job.job_tags.split(',').map((tag) =>

                <span className="badge badge-info tags">{tag}</span>
              )}

              </p>
              <p> {job.benefit_tags.split(',').map((tag) =>

                <span className="badge badge-info tags">{tag}</span>
              )}

              </p>
              <p>{job.referral_fee}</p>
              <p><b>internal message:</b> {job.internal_message}</p>
              <p><b>location:</b> {job.location}</p>
            </div>
            <div className="col-12 col-lg-4 col-md-6 text-center">
              {job.jobmemoimg ? <img src={"https://reecho-frontend.s3-eu-west-1.amazonaws.com/job_memo/" + job.jobmemoimg} className="mx-auto rounded-circle img-fluid" alt="logo" />
                : ''}

              {/* <img src="https://robohash.org/68.186.255.198.png" alt="" className="mx-auto rounded-circle img-fluid" /> */}
              <br />
              <h4>{job.firstname} {job.lastname}</h4>
              {/* <ul className="list-inline ratings text-center" title="Ratings">
                       <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                       </li>
                       <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                       </li>
                       <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                       </li>
                       <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                       </li>
                       <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                       </li>
                   </ul> */}
            </div>
            {/* <p>{job.id}</p> */}
            <hr />
            <div className="row">

              <p>
                <h6>Collaborator: </h6>
                <JobCollaborator jobID={job.id} />
              </p>
            </div>
            <p>
              <button className="btn btn-block btn-outline-success" style={{ "margin-left": "100px" }} onClick={() => {
                JobMemoService.approveMemo(job.id, 77).then(
                  response => {

                    console.log("this is" + response.data)

                  }).catch((error) => {
                    console.log(error);
                  });

              }
              }

              ><span className="fa fa-check-circle"></span> approve</button>
            </p>
            {/* <div className="grid">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">contact:</div>
                <div className="row">

                  <br /><br />

                
                </div>
              </div>
            </div> */}

            {/*  <div className="col-12 col-lg-4">
                   <h3 className="mb-0">43</h3>
                   <small>Snippets</small>
                   <button type="button" className="btn btn-outline-primary btn-block"><span className="fa fa-gear"></span> Options</button>
               </div> */}

          </div>

        </div>

      </div >

    )

    const approvedJobList = this.state.jobApproved.map((job) =>

      <div className="card" key={job.id}>
        <div className="card-body">
          {!job.approval ? <span class="text-warning">pedning for approve</span> : <span class="text-success">approved</span>}
          <div className="row">
            <div className="col-12 col-lg-8 col-md-6">
              {/* <h1 className="mb-0 text-truncated">{job.id}</h1> */}
              <h3 className="mb-0 text-truncated">{job.title}</h3>
              <p className="lead">{job.short_description}</p>
              <p>
                {job.long_description}
              </p>
              <p> {job.job_tags.split(',').map((tag) =>

                <span className="badge badge-info tags">{tag}</span>
              )}

              </p>
              <p> {job.benefit_tags.split(',').map((tag) =>

                <span className="badge badge-info tags">{tag}</span>
              )}

              </p>
              <p>{job.referral_fee}</p>
              <p><b>internal message:</b> {job.internal_message}</p>
              <p><b>location:</b> {job.location}</p>
            </div>
            <div className="col-12 col-lg-4 col-md-6 text-center">
              {job.jobmemoimg ? <img src={"https://reecho-frontend.s3-eu-west-1.amazonaws.com/job_memo/" + job.jobmemoimg} className="mx-auto rounded-circle img-fluid" alt="logo" />
                : ''}

              {/* <img src="https://robohash.org/68.186.255.198.png" alt="" className="mx-auto rounded-circle img-fluid" /> */}
              <br />
              <h4>{job.firstname} {job.lastname}</h4>
              {/* <ul className="list-inline ratings text-center" title="Ratings">
                     <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                     </li>
                     <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                     </li>
                     <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                     </li>
                     <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                     </li>
                     <li className="list-inline-item"><a href="#"><span className="fa fa-star"></span></a>
                     </li>
                 </ul> */}
            </div>
            {/* <p>{job.id}</p> */}
            <hr />
            <div className="row">

              <h6>Collaborator: </h6>
              <JobCollaborator jobID={job.id} />

            </div>
            <div className="grid">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">contact:</div>

              </div>
            </div>

            {/*  <div className="col-12 col-lg-4">
                 <h3 className="mb-0">43</h3>
                 <small>Snippets</small>
                 <button type="button" className="btn btn-outline-primary btn-block"><span className="fa fa-gear"></span> Options</button>
             </div> */}

          </div>

        </div>

      </div>

    )


    return (

      <Fragment>
        <Container className="mt-5">

          <Row>
            <Col md={6} className="mx-auto">

              {/* <h2>Enter User Details</h2> */}
              <h2>Approve job memos
                       {/* {this.state.user.id} */}
              </h2>

              <hr />
              <button type="button" className="btn btn-warning" onClick={this.openPending} >pending</button>&nbsp;&nbsp;
              <button type="button" className="btn btn-success" onClick={this.openApproved} >Aprroved</button>


              {this.state.pending ? jobList : approvedJobList}
              {/* {jobList} */}
              {/* {approvedJobList} */}


            </Col>
          </Row>

        </Container>
      </Fragment>

    )
  }
}

export default JobMemo;