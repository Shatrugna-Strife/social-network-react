import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";

const MainRouter = () =>{
    return (
        <div>
            <Menu />
            <Switch>
                {/* <Route path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>

                The "/" path overrides the "/signup" route and won't display the page. Solution
                1. Change the order of the Route Tag "/Signup", put it on the top.
                2. use exact attribute.

                 */}
                
                <Route exact path="/" component={Home}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/user/:userId" component={Profile}/>

            </Switch>
        </div>
    );
}
export default MainRouter;