import React from "react";import {Component} from "react";
import {signUp} from '../auth/index';
import {Link} from 'react-router-dom';
class Signup extends Component{
    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            error: "",
            open:false
        };
        this.handleChangeName = this.handleChange("name").bind(this);
        this.handleChangeEmail = this.handleChange("email").bind(this);
        this.handleChangePassword =  this.handleChange("password").bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
    }

    handleChange(name){ // handleChange("password") returns a callback and would be called as handleChange("password")(e)
        return(function(e){
            this.setState({[name]:e.target.value,error:"",open:false});
        });
    }// in html tag this.handleChange("name").bind(this) add the .bind(this) to bind the function to the class scope
    
    clickSubmit(e){
        e.preventDefault();
        const user = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        //console.log(user);
        signUp(user).then(data=>{
            if(!!data){
                if(!!data.error){
                    this.setState({error:data.error,open:false});
                }else{
                    this.setState({
                        name:"",
                        email:"",
                        password:"",
                        error:"",
                        open:true
                    })
                }
            }else{
                this.setState({error:"Failed Sending request to the backend"});
            }
        }); 
    }

    

    render(){
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">User Signup</h2>

                <div className="alert alert-danger" style={{display:!!this.state.error?"":"none"}}>{this.state.error}</div>
                <div className="alert alert-info" style={{display:!!this.state.open?"":"none"}}>Account Created Successfully. Please <Link to="/signin">Sign In</Link></div>
                
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name/Username</label>
                        <input type="text" className="form-control" onChange={this.handleChangeName} value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" className="form-control" onChange={this.handleChangeEmail} value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" onChange={this.handleChangePassword} value={this.state.password}/>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;