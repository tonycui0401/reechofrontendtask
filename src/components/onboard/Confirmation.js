import React, { Component, Fragment } from 'react';
import { Button, List } from 'semantic-ui-react';
import { Container, Col, Row} from 'react-bootstrap';

class Confirmation extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        // const {values: { firstName, lastName, email, phone, location, country, hearabout, jobTitle, company, startTime, endTime, jobExperience, aboutYou, nextAchieve, proudOf, surpriseOf, interests, currentPay, currentType, expectedPay, expectedType, noticePeriod, anythingImportant}} = this.props;
        // let hearaboutlistItems = ''
        // let jobExperiencelistItems = ''
        // let anythingImportantlistItems = ''
        // if (hearabout!==''){
        //     hearaboutlistItems = hearabout.map((d) => <span key={d.id}>{d.text}&nbsp;&nbsp;</span>);
        // }
        // if (jobExperience!==''){
        //     jobExperiencelistItems = jobExperience.map((d) => <span key={d.id}>{d.text}&nbsp;&nbsp;</span>);
        // }
        // if (anythingImportant!==''){
        //     anythingImportantlistItems = anythingImportant.map((d) => <span key={d.id}>{d.text}&nbsp;&nbsp;</span>);
        // }
        return(
            <Fragment>
            <Container className="mt-5">
              
              <Row>
<br/><br/><br/><br/>
              <Col md={7} className="mx-auto">
              <h2>You have already created an account</h2>
            {/* <Col md={6} className="mx-auto">
                <h2 className="ui centered">Confirm your Details</h2>
                <p>Click Confirm if the following details have been correctly entered</p>
                <hr/>
                <List>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>First Name: {firstName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Last Name: {lastName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            <a href='mailto:{email}'>Email: {email}</a>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Phone: {phone}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Location: {location} {country}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Hear about: {hearaboutlistItems}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>jobTitle: {jobTitle}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>company: {company}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>start time: {startTime}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>end time: {endTime}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Job Experience: {jobExperiencelistItems}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>About you: {aboutYou}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Next achievement: {nextAchieve}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Proud of: {proudOf}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Suprise Of: {surpriseOf}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Interests: {interests}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Current Pay: {currentPay} {currentType}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Expected Pay: {expectedPay} {expectedType}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Notice Period: {noticePeriod}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Anything Important: {anythingImportantlistItems}</List.Content>
                    </List.Item>
                </List>


                <div className="row justify-content-left">
                 <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.back}>Back</Button>
            </div>
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Confirm </Button>
            </div>
            </div>
                </Col>  */}
                </Col>
          </Row>
          
        </Container>
      </Fragment>
        )
    }
}

export default Confirmation;