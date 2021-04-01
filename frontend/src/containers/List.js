import "./List.css";
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { logout } from '../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faPlus,faMinus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
function List({logout,isAuthenticated}) {
    const [data,setData] = useState({ list_items:[] });
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        };
        async function fetchData(){
            try{
                setLoading(true);
                await axios.get("http://localhost:8000/api/list-summary/",config)
                .then(res=>{
                  setData(res.data);  
                })
                
                setLoading(false)  
            }catch(e){
                setLoading(false);
                console.log(e);
                setError(true)
            };
            
        }
        fetchData();
    },[]);
    console.log("data: ",data)
    const handleAddCart=async (slug)=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        };
        const res = await axios.post("http://localhost:8000/api/add-to-list/",{ slug },config);
        console.log(res);
        window.location.reload();
    }

    const handleRemoveItem=async (slug)=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        };
        const res = await axios.post("http://localhost:8000/api/count-decrease/update/",{ slug },config)
        console.log(res);
        window.location.reload();
    };

    const handleClear=async (id)=>{
        const config={
            header:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        };
        const res = await axios.delete(`http://localhost:8000/api/items-list/delete/${id}`,{id},config);
        window.location.reload();
    }

    if(!isAuthenticated) return <Redirect to="/login"></Redirect>

    const noItem=(
        <div className="no-item">
            <div className="no-item-image-div">
                <img className="no-item-image" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/No_data_re_kwbl.svg" alt=""/>
            </div>
            <div className="no-item-content">
                <h1 className="no-item-header">
                    You Don't Have any items
                </h1>
                <p className="no-item-stack">
                    I am sorry, but it seems that you haven't added any items into your list.<br/>Please add some items and come back.
                    <br/>To go to the items page, please click the link below.
                    <br/>Thank You
                </p>
                <Link id="no-item-button" to="/items">Items Page</Link>
            </div>
        </div>
    )

    const errorList=(
        <div className="list-error">
            <div className="list-error-image-div">
                <img className="list-error-image" src="https://isometric.online/wp-content/uploads/2019/07/Coding_SVG.svg" alt=""/>
            </div>
            <div className="list-error-content">
                <h1 className="list-error-header">An Error has been occurred</h1>
                <p className="list-error-stack">We are trying to solve this problem and it will solve in some time.<br/>Till then thank you for your patience</p>
                <button className="list-error-logout" onClick={logout}>Logout</button>
            </div>
            
        </div>
    );
    
    const loadingScreen=(
        <div className="loading">
            <div className="loader">Loading</div>
        </div>
    )
    return (
        <div className="list">
            {loading ? loadingScreen : error ? errorList : data.list_items.length !== 0 ? (
        <div className="list-home">
            <h1 className="list-home-header">Item List Details</h1>
            <div className="list-home-content">
                <div className="list-home-image-div">
                    <img className="list-home-image" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/To_do_re_jaef.svg" alt=""/>
                </div>
                <div className="list-home-table">
                    <h1 className="list-home-table-header">Item List</h1>
                    <table className="list-home-table-tr" style={{ width:"90%" }}>
                        <tr>
                            <th>Item #</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Calories Per 1 Item</th>
                            <th>Total Item Calories</th>
                        </tr>
                        {data.list_items.map((listItem,i)=>{
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td><Link to={`/item/${listItem.item.slug}`} style={{color:"black"}}>{listItem.item.name}</Link></td>
                                <td>
                                <FontAwesomeIcon onClick={()=>handleRemoveItem(listItem.item.slug)} icon={faMinus} style={{marginRight:"20px",marginLeft:"10px",fontSize:"12px",cursor:"pointer"}}/>
                                    {listItem.quantity}
                                <FontAwesomeIcon onClick={()=>{handleAddCart(listItem.item.slug)}} icon={faPlus} style={{marginLeft:"20px",fontSize:"12px",cursor:"pointer"}}  />
                                </td>
                                <td>
                                    {listItem.item.calories}
                                    <FontAwesomeIcon onClick={()=>handleClear(listItem.id)} icon={faTrashAlt} style={{color:"red",marginLeft:"110px",cursor:"pointer"}}/>
                                    </td>
                                <td>{listItem.all_calories}</td>
                            </tr>
                        })}
                        <tr>
                        <td>Total </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{data.total}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    ): noItem}
        </div>
    )
}
List.propTypes={
    logout:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool, 
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(List);
