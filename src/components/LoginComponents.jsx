import React from "react";
import axios from 'axios';
import { useState} from 'react';
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import NavbarComponents from "./NavbarComponents";
import { useNavigate } from 'react-router-dom';
import { authenticate } from "../../Services/auth";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

function LoginComponents() {
  const firebaseConfig = {
    apiKey: "AIzaSyA6j4NKunYDMpiLfWGnT04adCw0MbNileQ",
    authDomain: "loginreact-dc047.firebaseapp.com",
    projectId: "loginreact-dc047",
    storageBucket: "loginreact-dc047.appspot.com",
    messagingSenderId: "132099685417",
    appId: "1:132099685417:web:0fdbd1c28b2d4e2f7f7038"
  }

  firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

  const handleLoginByGoogle = async () => {
    auth.signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      console.log(result)
    })
    .cathch((err) => {
      console.log(err)
    })
  }

  let navigate = useNavigate()
  const dipatch = useDispatch()
  const [state, setState] = useState({
    email:"",
    password:""
  })
  const {email, password} = state;

  const roleBaseRedirect = (role) => {
    if(role === 'admin'){
      navigate('/admin/index')
    }else {
      navigate('/')
    }
  }

  //set value state
  const inputValue = name => event =>{
    setState({...state,[name]:event.target.value})
  }

  //SENT DATA
  const submitForm=(e)=>{
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_API}/login`,{email, password})
    //axios.post('http://localhost:8080/api/login',{email, password})
    .then(response=>{
      console.log(response)
      Swal.fire("แจ้งเตือน","เข้าสู่ระบบสำเร็จ","success")
      dipatch({
        type: 'LOGIN',
        payload: {
          token: response.data.token,
          email: response.data.payload.user.email,
          role: response.data.payload.user.role
        }
      })
      authenticate(response)
      roleBaseRedirect(response.data.payload.user.role)
    })
    .catch(err=>{
      Swal.fire("แจ้งเตือน","Email หรือ Password ไม่ถูกต้อง","error")
    })
  }
  return (
    <div className="bg-gray-100 w-full h-full">
      <NavbarComponents/>
      <div className="container mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-44 w-44"
            src="https://sv1.img.in.th/UxdLcL.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            กรุณาเข้าสู่ระบบ
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={inputValue("email")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password} 
                  onChange={inputValue("password")}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
          <div className="mt-5">
            <h2>React Google Login</h2>
            <br /><br />
            <button
                onClick={handleLoginByGoogle}
                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              ><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" className="mr-3 h-6 w-6"/>
                Continue with Google
              </button>
          </div> 
          <p className="mt-10 text-center text-sm text-gray-500">
            ไม่มีบัญชีงั้นหรอ?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              สมัครสมาชิกได้ที่นี้เลย
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponents;
