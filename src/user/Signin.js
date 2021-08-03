import React from "react";import {Component} from "react";
import { Redirect } from "react-router-dom";
import {signIn} from '../auth/index';

class Signin extends Component{
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            error: "",
            redirectToReferer:false,
            loading:false
        };
        // this.handleChangeName = this.handleChange("name").bind(this);
        this.handleChangeEmail = this.handleChange("email").bind(this);
        this.handleChangePassword =  this.handleChange("password").bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
    }

    handleChange(name){ // handleChange("password") returns a callback and would be called as handleChange("password")(e)
        return(function(e){
            this.setState({[name]:e.target.value,error:""});
        });
    }// in html tag this.handleChange("name").bind(this) add the .bind(this) to bind the function to the class scope
    
    authenticate(jwt, next){
        if(typeof window != "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    }

    clickSubmit(e){
        e.preventDefault();
        this.setState({loading:true});
        const user = {
            email:this.state.email,
            password:this.state.password
        }
        //console.log(user);
        signIn(user).then(data=>{
            if(!!data){
                if(!!data.error){
                    this.setState({error:data.error});
                }else{
                    // authenticate
                    this.authenticate(data,()=>{this.setState({redirectToReferer:true})});

                    // this.setState({
                    //     email:"",
                    //     password:"",
                    //     error:"",
                    //     loading:false
                    // })
                }
            }else{
                this.setState({error:"Failed Sending request to the backend",loading:false});
            }
        }); 
    }

    render(){

        if(this.state.redirectToReferer){
            return <Redirect to="/" />
        }

        return(
            <div className="container">
                <h2 className="mt-5 mb-5">User Signin</h2>

                <div className="alert alert-danger" style={{display:!!this.state.error?"":"none"}}>{this.state.error}</div>
                <div className="alert alert-primary" style={{display:!!this.state.loading?"":"none"}}>Loading ....</div>
                {/* <div className="alert alert-info" style={{display:!!this.state.open?"":"none"}}>Account Created Successfully</div> */}
                
                <form>
                    {/* <div className="form-group">
                        <label className="text-muted">Name/Username</label>
                        <input type="text" className="form-control" onChange={this.handleChangeName} value={this.state.name}/>
                    </div> */}
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

export default Signin;