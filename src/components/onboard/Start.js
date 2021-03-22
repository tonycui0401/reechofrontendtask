import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

class Start extends Component{


    constructor(props){
        super(props);
    
        this.state = {
            // firstname_errors:'',
            // lastname_errors: ''
        }
     }


    saveAndContinue = (e) => {
        e.preventDefault()
        // let history = useHistory();

        this.props.nextStep()
        // window.location.reload();
    }

    render(){
        return(
        <Fragment>
            <Container className="mt-5">
              
            
                <Col md={6} className="mx-auto">
                  <br/><br/>
                  <h2>Welcome!</h2>
                  <br/>
                  <center>
                  <p>We are excited to meet you. Let's set up your space.</p>
                  </center>
                  <br/>
                  <div className="row justify-content-center">
            <div className="col-3">
            <Button className="btn btn-primary btn-block" onClick={this.saveAndContinue}>Start </Button>
            </div>
            </div>
            </Col>
         
          
        </Container>
      </Fragment>
        )
    }
}

// export default withRouter(PassToMeMyRouterHistory);

export default Start;