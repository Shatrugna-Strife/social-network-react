import React from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, signout} from "../auth";

const activeLink = (props,link)=>{
    if(typeof window !== "undefined"){
        if(props.history.location.pathname === link){
            return true;
        }else return false;
    }
}

const Menu =(props) =>(
    <div>
        <ul className="nav nav-tabs">
            <li className="nav-item"><Link className={activeLink(props, "/")?"active nav-link":"nav-link"} to="/">Home</Link></li>
            {
                !isAuthenticated()&&(<>
                <li className="nav-item"><Link className={activeLink(props, "/signin")?"active nav-link":"nav-link"} to="/signin">Sign In</Link></li>
                <li className="nav-item"><Link className={activeLink(props, "/signup")?"active nav-link":"nav-link"} to="/signup">Sign Up</Link></li>
                </>)
            }
            {
                isAuthenticated()&&(
                <>
                    <li className="nav-item"><a className="nav-link" style={{cursor:"pointer"}} onClick={()=>{return signout(()=>{props.history.push("/");})}}>Signout</a></li>
                    <li className="nav-item">
                        {/* <a className="nav-link" style={{cursor:"pointer"}}> */}
                        <Link className={activeLink(props, `/user/${isAuthenticated().user._id}`)?"active nav-link":"nav-link"} to={`/user/${isAuthenticated().user._id}`}>
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                        {/* </a> */}
                    </li>
                </>)
            }
        </ul>
        {/* <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link> */}
    </div>
);

export default withRouter(Menu);