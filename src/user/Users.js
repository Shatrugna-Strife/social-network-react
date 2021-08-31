import React, {Component} from 'react';
import {list} from './apiUser';
import {Link} from 'react-router-dom';
import DefaultProfile from '../images/User_Avatar.png';
// import {isAuthenticated} from '../auth';

class Users extends Component{
    constructor(){
        super();
        this.state={
            users:[]
        };
    }

    componentDidMount(){
        // const token = isAuthenticated().
        list().then(data=>{
            if(!!data.error) console.log(data.error);
            else{
                // console.log(data);
                this.setState({
                    users:data
                })
            }
        });
    }

    renderUsers = users =>{
        return(
            <div className="row">
                {users.map((user,index)=>{
                    return (
                    <div className="card col-md-2 mr-1 ml-1" style={{width: "18rem"}} key={index}>
                    <Link to={`/user/${user._id}`}><img className="card-img-top" style={{width:"10vw", height:"10vw",objectFit:"cover"}} src={DefaultProfile} alt={user.name}/></Link>
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <Link to={`/user/${user._id}`} className="btn btn-primary btn-sm">View Profile</Link>
                        </div>
                    </div>
                    );
                })}
            </div>
        );
    }

    render(){
        const users = this.state.users;
        // console.log(users);
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;