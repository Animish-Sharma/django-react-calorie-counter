import axios from 'axios';
import { setAlert } from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGOUT,
} from './types.js'


export const login=(email,password)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({email,password});
    try{
        const res = await axios.post("http://localhost:8000/token/",body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });

        dispatch(setAlert("Authentication Successful","success")); 
    }catch(err){
        dispatch({
            type:LOGIN_FAILED
        });
        dispatch(setAlert("Error in Authentication","error"));
    }
    
}

export const register=({name,email,password,password2})=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({name,email,password,password2});
    try{
        
        const res = await axios.post("http://localhost:8000/accounts/",body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(login(email,password));
    }catch(err){
        dispatch({
            type:REGISTER_FAILED
        });

        dispatch(setAlert("Error in Signing up","error"));
    };
};

export const logout=()=>dispatch=>{
    dispatch({
        type:LOGOUT
    });
    dispatch(setAlert("Logged Out Successfully","success"));
}