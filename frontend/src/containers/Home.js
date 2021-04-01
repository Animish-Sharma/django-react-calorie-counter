import React from 'react';
import "./Home.css";
import { Link,Redirect } from 'react-router-dom';
function Home()  {
    const token = localStorage.getItem('token') || null;
    if(token==null) return <Redirect to="/login"></Redirect>       
    
    return (
        <div className="home">
            <h1 className="home-title">Calorie Counter</h1>
            <div className="home-card">
                <div className="card-img">
                    <img className="home-img" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/happy_announcement_ac67.svg" alt=""/>
                </div>
                <div className="card">
                    <h2 className="card-header">Welcome to our website</h2>
                    <p className="home-card-text">
                        You can count the calories of your food. 
                        Just click the button below to get to the counter page.There you can calculate by yourself<br></br>
                        Thank You.<br/>
                        Made by Animish Sharma
                    </p>
                    <Link id="redirect-link" to="items">Calculate Calories</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
