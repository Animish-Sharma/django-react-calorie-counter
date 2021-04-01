import React,{Fragment} from 'react';
import {Link,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/auth';
import PropTypes from 'prop-types';
import Alert from './Alert';
import './Navbar.css';
function Navbar({auth: {isAuthenticated,loading},logout}) {
    const guestLink=(
        <Fragment className="navbar-nav">
            <NavLink className="nav-2" to="/login">Login</NavLink>
            <NavLink className="nav" to="/register">Register</NavLink>
        </Fragment>
    )
    const userLink = (
        <Fragment className="nav-links">
            <Link className="nav" to="/list">Item List</Link>
            <a href='#!' onClick={logout} className="logout-link" to="/logout">Logout</a>
        </Fragment>
        
    )
    return (
        <Fragment>
            <div className="header">
                <div className="navbar-header">
                    <Link className="navheader-s" to="/">Calorie Counter</Link>
                </div>
                <div className="navbar-items">
                        {!loading &&(
                            <Fragment className="navitems-s">
                                {isAuthenticated ? userLink : guestLink}
                            </Fragment>
                        )}
                </div>
            </div>
            <Alert />
        </Fragment>
    )
}

Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)
