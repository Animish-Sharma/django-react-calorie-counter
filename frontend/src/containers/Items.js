import React,{ useState , useEffect } from 'react';
import "./Items.css";
import axios from 'axios';
import { logout } from '../store/actions/auth';
import PropTypes from 'prop-types';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../store/actions/alert';

function Items({logout,isAuthenticated,setAlert}) {
    const [items,setItems] = useState([]);
    const [error,setError] = useState(false);
    const onClick=(slug)=>{
        const config ={
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        };
        const res = axios.post("http://localhost:8000/api/add-to-list/",{ slug },config)
        console.log(res)
        setAlert(`Item has been added to list`,'success')
    }

    useEffect(()=>{
        const fetchItems = async ()=>{
            const config={
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            try{
                const res = await axios.get("http://localhost:8000/api/items/",config);
                setItems(res.data);
                console.log(res)  
            }catch(e){
                setError(true)
            }
            
        }
        fetchItems();
    },[]);
    if(!isAuthenticated){
           return <Redirect to="/login"></Redirect>
    }

    const errorPage = (
        <div className="error-items">
            <div className="error-items-image">
                <img className="error-image" src="https://isometric.online/wp-content/uploads/2020/04/error_notification_svg.svg" alt=""/>
            </div>
            <div className="error-items-text">
                <h2 className="error-items-header">An Error has been occured</h2>
                <p className="error-items-paragraph">I am sorry an error has been occured. Please Refresh your page or logout.
                If problem still pops please contact the devloper
                </p>
                <a href="#!" id="error-items-logout" onClick={logout}>Logout</a>
            </div>
        </div>
    );
    const home = (
        <div className="items-list">
            <h1 className="items-list-header">Items List</h1>
            <div className="items-card-div">
               {items.map(item => {
                return <div key={item.id} className="items-list-card">
                    <div className="items-card-image-div">
                        <img className="items-card-image" src={item.image} alt=""/>
                    </div>
                    <hr/>
                    <div className="card-detail">
                    <h1 className="card-title">{item.name}</h1>
                    <p className="card-detail-info">Calories:- {item.calories}</p>
                    <p className="card-detail-info">Protein :- {item.protein}</p>
                    <p className="card-detail-info">Quantity(L or KG):- {item.value}</p>
                    <div className="card-links">
                        <Link className="read-more-items" to={`/item/${item.slug}`}>Read More</Link>
                        <button onClick={()=>onClick(item.slug)} className="add-to-list">Add To List</button>
                    </div>  
                    </div>
                    
                </div>
                })} 
            </div>
            
        </div>
    )
    return (
        <div className="items">
            {error ? errorPage : home}
        </div>
    )
}

Items.propTypes = {
    logout : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logout,setAlert})(Items);
