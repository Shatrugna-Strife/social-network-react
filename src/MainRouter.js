import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "./core/Home";
import Signup from "./user/Signup";

const MainRouter = () =>{
    return (
        <div>
            <Switch>
                {/* <Route path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>

                The "/" path overrides the "/signup" route and won't display the page. Solution
                1. Change the order of the Route Tag "/Signup", put it on the top.
                2. use exact attribute.

                 */}
                
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={Signup}/>

            </Switch>
        </div>
    );
}
export default MainRouter;