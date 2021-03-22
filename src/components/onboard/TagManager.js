import React, { Component, Fragment} from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import HearAboutSuggestion  from './HearAboutSuggestion'
import EmployerSuggestion  from './EmployerSuggestion'
import JobTagSuggestion  from './JobTagSuggestion'
import ImportantSuggestion from './ImportantSuggestion'
import SkillSuggestion from './SkillSuggestion'
import TagLocationManager from './TagLocationManager'
import RoleSuggestion from './RoleSuggestion'
import InsitutionSuggestion from './InstitutionSuggestion'
import DegreeSuggestion from './DegreeSuggestion'
import EducationSuggestion from './EducationSuggestion'




class TagManager extends Component{




    render(){
        const { values } = this.props;

        const selectList = {
            // selectedOption : 'month',
            options: ['select hour/month/year', 'hour', 'month', 'year']
          }

        return(
           
            <Fragment>
            <Container className="mt-5">
              
              <Row>
                <Col md={6} className="mx-auto">
                  
                  {/* <h2>Enter User Details</h2> */}
                  <h2>Add new Tags</h2>
    
                  <hr/>
            <Form >
           
            <div className="form-group">
                <label>Add hear ablout tag</label>
                    <div>
                    <HearAboutSuggestion  tagtype="admin"/>
      </div>
      </div>
{/* 
      <div className="form-group">
                <label>Add Employer Tag</label>
                    <div>
                    <EmployerSuggestion  tagtype="admin"/>
      </div>
      </div>

      <div className="form-group">
                <label>Add Job title tag</label>
                    <div>
                    <JobTagSuggestion  tagtype="admin"/>
      </div>
      </div>
              
              
               <div className="form-group">
                <label>Add Anything Important tag</label>
                    <div>
                    <ImportantSuggestion tagtype="admin" />
      </div>
      </div>
               
      <div className="form-group">
                <label>Add skills tag</label>
                    <div>
                    <SkillSuggestion  tagtype="admin"/>
      </div>
      </div> */}


<TagLocationManager />



<div className="form-group">
                <label>Add Recruter Role Tag</label>
                    <div>
                    <RoleSuggestion  tagtype="admin"/>
      </div>
      </div>

      <div className="form-group">
                <label>Add Institution tag</label>
                    <div>
                    <InsitutionSuggestion  tagtype="admin"/>
      </div>
      </div>
              
              
               <div className="form-group">
                <label>Add Degree tag</label>
                    <div>
                    <DegreeSuggestion tagtype="admin" />
      </div>
      </div>
               
      <div className="form-group">
                <label>Add Education tag</label>
                    <div>
                    <EducationSuggestion  tagtype="admin"/>
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

export default TagManager;