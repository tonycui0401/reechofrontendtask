/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Modal from "../Modal";
import UserService from "../../services/user.service";
import { TextArea } from 'semantic-ui-react';
import JobMemoService from "../../services/jobmemo";


class JobCollaborator extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: []
        }



        // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }








    componentDidMount() {



        JobMemoService.getCollaborators(this.props.jobID).then(
            response => {

                // const job = response.data.map((text) => text.title)
                console.log(response.data)
                this.setState({
                    users: response.data
                });
            },
            error => {
                console.log(error)
            }
        );




        // UserService.getCandidateViewProfile(this.props.userID)
        //     .then(
        //         response => {


        //             this.setState({

        //                 achieve: response.data[0].nextachievements,

        //             })

        //         },
        //         error => {
        //             console.log(error)
        //         }
        //     );



    }









    render() {

        const userList = this.state.users.map((user) => <li>{user.firstname} {user.lastname}</li>)



        return (
            <div>



                {userList}





            </div>

        )
    }

}

export default JobCollaborator;







