import React, {Component} from "react";
import { isAuthenticated } from "../auth";

class EditProfile extends Component{
    constructor(){
        super();
        this.state={
            redirect:false
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.deleteConfirmed} className="btn btn-outline-danger">Delete Profile</button>
            </div>
        );
    }
}

export default EditProfile;