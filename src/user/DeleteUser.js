import React, {Component} from "react";
import { isAuthenticated } from "../auth";
import {remove} from './apiUser';
import {signout} from '../auth';
import { Redirect } from "react-router-dom";

class DeleteUser extends Component{
    constructor(){
        super();
        this.state={
            redirect:false
        }
        this.deleteConfirmed = this.deleteConfirmed.bind(this);
    }

    deleteAccount(){
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token).then(data=>{
            if(!!data.error){
                console.log(data.error);
            }else{
                signout(()=>console.log("User is deleted"));
                this.setState({
                    redirect:true
                })
            }
        })
    }

    deleteConfirmed(){
        let answer = window.confirm("Are you sure you want to delete your account");
        if(answer){
            this.deleteAccount();
        }
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to='/'/>);
        }
        return(
            <div>
                <button onClick={this.deleteConfirmed} className="btn btn-outline-danger">Delete Profile</button>
            </div>
        );
    }
}

export default DeleteUser;