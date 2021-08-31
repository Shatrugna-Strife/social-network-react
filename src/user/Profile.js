import React, {Component} from 'react';
import {isAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser';
import DefaultProfile from '../images/User_Avatar.png';
import DeleteUser from './DeleteUser';

class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:"",
            redirectToSignIn:false
        }
    }

    init(userId, token){
        read(userId, token)
        .then(data=>{
            if(!!data.error){
                console.log(data.error);
                this.setState({redirectToSignIn:true});
            }else this.setState({user:data});
        })
        
    }

    componentDidMount(){

        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        
        this.init(userId, token);
    }

    //in this do not invoke this.setState it would create an infinity loop.
    // componentDidUpdate(prevState, prevProp){

    //     if(!!this.props.match.params.userId){
    //         const userId = this.props.match.params.userId;
    //         const token = isAuthenticated().token;
            
    //         this.init(userId, token);
    //     }
    // }

    componentWillReceiveProps(props){
        const userId = props.match.params.userId;
        const token = isAuthenticated().token;
        
        this.init(userId, token);
    }

    render(){

        if(this.state.redirectToSignIn){
            return <Redirect to="/signin" />
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">User Profile</h2>
                        <img className="card-img-top" style={{width:"10vw", height:"10vw",objectFit:"cover"}} src={DefaultProfile} alt={this.state.user.name}/>
                    </div>
                    <div className="col-md-6">
                        {isAuthenticated() && isAuthenticated().user._id === this.state.user._id &&
                            (<div className="d-inline-flex mt-5">
                                <Link className="btn btn-outline-primary mr-3" to={`/user/edit/${this.state.user._id}`}>Edit Profile</Link>
                                <DeleteUser userId={this.state.user._id}/>
                        
                            </div>)
                        }
                        <div className="lead mt-5">
                            <p>Hello {this.state.user.name}</p>
                            <p>Email: {this.state.user.email}</p>
                            <p>Joined: {new Date(this.state.user.created).toDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
   }
}

export default Profile;