import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import "./ItemDetail.css";
import { Link,Redirect } from 'react-router-dom';
function ItemDetail(props) {

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const slug = props.match.params.slug;
    useEffect(()=>{
        const config={
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
        async function fetchData(){
            try{
               const res = await axios.get(`http://localhost:8000/api/items/${slug}/`,config);
                setData([res.data]);
            }catch(e){
                setError(true)
            }
            
        };
        fetchData();
    },[slug]);

    const handleClick = async (slug)=>{
        const config={
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        };
        const res = await axios.post("http://localhost:8000/api/add-to-list/",{ slug },config)
        console.log(res);
        props.history.push("/items")
        
    }

    const token = localStorage.getItem('token') || null;
    if(token===null) return <Redirect to="/login"></Redirect>

    const errorDetail=(
        <div className="item-detail-error">
            <div className="item-detail-error-image-div">
                <img className="item-detail-error-image" src="https://isometric.online/wp-content/uploads/2020/04/error_404_svg.svg" alt=""/>
            </div>
            <div className="item-detail-error-text-div">
                <h2 className="item-detail-error-header">THERE IS NO ITEM WITH SLUG /{slug}</h2>
                <p className="item-detail-error-stack">I am Sorry, there is no item with the slug of /{slug}. You can check the url.If the problem persists please contact the devloper for this error.<br/> Thank you.</p>
            </div>
        </div>
    )
    const home=(
        <div className="item-detail-container">
            <h2 className="item-detail-heading">Item Details</h2>
            <div className="item-detail-card-div">
                {data.map((item,i)=>{
                    return <div className="item-detail-card" key={item.id}>
                        <div className="item-detail-img-div">
                            <img className="item-detail-img" src={item.image} alt=""/>
                            <div className="image-links">
                                <Link id="image-link" to="/items">Go Back</Link>
                                <button onClick={()=>handleClick(item.slug)} className="image-button">Add to List</button>
                            </div>
                        </div>
                        <div className="item-detail-content">
                            <h3 id="content-header"> Item name - {item.name}</h3>
                            <table className="item-detail-table" style={{width:"90%"}}>
                                <tr>
                                    <th>Properties</th>
                                    <th>Value</th>
                                </tr>
                                <tr>
                                    <td>Calories</td>
                                    <td>{item.calories}</td>
                                </tr>
                                <tr>
                                    <td>Carbohydrates</td>
                                    <td>{item.calories}</td>
                                </tr>
                                <tr>
                                    <td>Cholestrol</td>
                                    <td>{item.cholestrol}</td>
                                </tr>
                                <tr>
                                    <td>Fats</td>
                                    <td>{item.fats}</td>
                                </tr>
                                <tr>
                                    <td>Fiber</td>
                                    <td>{item.fiber}</td>
                                </tr>
                                <tr>
                                    <td>Protein</td>
                                    <td>{item.protein}</td>
                                </tr>
                                <tr>
                                    <td>Sodium</td>
                                    <td>{item.sodium}</td>
                                </tr>
                                <tr>
                                    <td>Vitamin A</td>
                                    <td>{item.vitamin_a || 0}</td>
                                </tr>
                                <tr>
                                    <td>Vitamin B</td>
                                    <td>{item.vitamin_b || 0}</td>
                                </tr>
                                <tr>
                                    <td>Vitamin C</td>
                                    <td>{item.vitamin_c || 0}</td>
                                </tr>
                                <tr>
                                    <td>Vitamin D</td>
                                    <td>{item.vitamin_d || 0}</td>
                                </tr>
                            </table>
                            <br/>
                        </div>
                        
                    </div>
                })}
            </div>
        </div>
    )

    return (
        <div className="item-detail">
            {error ? errorDetail : home}
        </div>
    )
}

export default (ItemDetail);
