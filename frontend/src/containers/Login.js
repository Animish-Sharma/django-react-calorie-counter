import React,{useState} from 'react';
import './Login.css';
import {Helmet} from 'react-helmet';
import {login} from '../store/actions/auth';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

function Login({login,isAuthenticated}) {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const {email,password} = formData;
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit=e=>{
        e.preventDefault();
        try{
            login(email,password);
            console.log(email,password)
        }catch(err){
            console.log(err);
            alert(err);
        }
        
    }
    if(isAuthenticated){
           return <Redirect to="/" ></Redirect>
    }

    return (
        <div className="login">
            <Helmet>
                <title>Calorie Counter :Login</title>
                <meta name="description" content="Login Page"/>
            </Helmet>
            <div className="header-login">
                <div className="login-header-title">
                    <h1 className="login-title">Login Form</h1>
                    <p id="para">Log In To your account</p>
                </div>
            </div>
            
            <div className="form">
                <div className="login-form-image">
                    <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/authentication_fsn5.svg" className="login-img" alt="Login Text"/>
                </div>
                <form onSubmit={onSubmit} className="login-form">
                    <label className="login-label" for="login-email">Email:-</label>
                    <input onChange={onChange} className="email-input" type="text" name="email" id="login-email" />

                    <label className="login-label" for="login-password">Password:-</label>
                    <input onChange={onChange} className="password-input" type="password" name="password" id="login-password"/>
                
                    <button id="submit" name="submit">Log In</button>

                    <p className="form-signup-text">
                        Don't Have an Account? No Problem <Link id="signup-link" to="/register">Register</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}
Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);
