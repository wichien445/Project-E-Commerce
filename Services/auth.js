import axios from "axios"
import { useDispatch } from 'react-redux'
//SAVE TOKEN IN SESSION STORAGE
export const authenticate = (response)=>{
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("email", response.data.payload.user.email)
    localStorage.setItem("role", response.data.payload.user.role)
}

//GET TOKEN
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }
    }else{
        return false
    }
}

//GET USER
export const getUser=()=>{
    if(window !== "undefined"){
        if(localStorage.getItem("email")){
            return (localStorage.getItem("email"))
        }
    }else{
        return false
    }
}

//LOGOUT
export const logout=()=>{
    const dispatch = useDispatch()
    return dispatch({
        type: "LOGOUT",
        payload: null
    })
}

export const currentUser = async (authtoken) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/current-user`,{},{
        headers: {
            authtoken
        }
    })
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/current-admin`,{},{
        headers: {
            authtoken
        }
    })
}