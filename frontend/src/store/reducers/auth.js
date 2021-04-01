import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGOUT,
} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated:null,
    loading:false,
}

export default function auth(state = initialState, action) {
    const { type,payload } = action;
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access);
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                token:payload.access
            }
            

        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated:false,
                loading:true
            }
        case LOGIN_FAILED:
        case REGISTER_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            if (state.token !== null) {
                return {...state,isAuthenticated:true}
            
            }
            
            return state
    }
    
};