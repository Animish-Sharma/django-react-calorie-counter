import React, { useState } from 'react';
import {Helmet} from 'react-helmet';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {register} from '../store/actions/auth';
import {connect} from 'react-redux';
import "./Register.css";
import { setAlert } from '../store/actions/alert';
function Register({setAlert,isAuthenticated,register}) {

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const {name,email,password,password2} = formData;

    const onChange=e=> setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=e=>{
        e.preventDefault();
        try{
            if(password !== password2) setAlert("Passwords do not Match","error")
            else{
                register({name,email,password,password2});
                console.log(name,email,password,password2);
            }
            
        }catch(e){
            console.log(e);
        }
    }
    if(isAuthenticated){
        return <Redirect to="/"></Redirect>
    }

    return (
        <div className="register-top">
            <Helmet>
                <title>Register</title>
                <meta
                title="description"
                content="SignUp Page"/>
            </Helmet>
            <div className="register-header">
                <h1 className="register-heading">Register</h1>
                <p id="register-text">Create a New Account</p>
            </div>
            
            <div className="register-form">
                <div className="register-form-image">
                    <img id="register-img" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Sign_in_re_o58h.svg" alt="Register img" srcset=""/>
                </div>
                <form onSubmit={onSubmit} className="register-form-fields">
                    <label className="register-label" for="name">Name:</label>
                    <input onChange={onChange} type="text" id="name" name="name" />
                    <label className="register-label" for='register-email'>Email:</label>
                    <input onChange={onChange} id="register-email" type="email" name="email"/>
                    <label className="register-label" for="register-password">Password:</label>
                    <input onChange={onChange} id="register-password" type="password" name="password"/>
                    <label className="register-label" for="password2">Confirm Password:</label>
                    <input onChange={onChange} id="password2" type="password" name="password2"/>
                    
                    <button className="register-button">Register</button>
                    <p className="login-link">Already have an account? No problem <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
};


Register.prototype={
    setAlert: PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register,setAlert})(Register);
