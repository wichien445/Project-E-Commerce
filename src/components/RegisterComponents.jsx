import React from 'react'
import axios from 'axios';
import { useState , useEffect} from 'react';
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Swal from 'sweetalert2';
import NavbarComponents from "./NavbarComponents";
import { useNavigate } from 'react-router-dom';
import { authenticate } from "../../Services/auth";
import { Link } from "react-router-dom";

function RegisterComponents() {
    let navigate = useNavigate()
    const [state, setState] = useState({
        email:"",
        password:"",
        confirmpassword:""
    })
    const {email, password, confirmpassword} = state;

    //set value state
    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value})
    }
    //SENT DATA
    const submitForm=(e)=>{
        e.preventDefault();
        if(password !== confirmpassword){
          Swal.fire("แจ้งเตือน","รหัสผ่านไม่ตรงกัน","error")
        }else{
          axios.post(`${import.meta.env.VITE_APP_API}/register`,{email, password})
          //axios.post('http://localhost:8080/api/register',{email, password})
          .then(response=>{
            Swal.fire("แจ้งเตือน","ลงทะเบียนสำเร็จ","success")
            console.log(response)
          })
          .catch(err=>{
            Swal.fire("แจ้งเตือน","ลงทะเบียนไม่สำเร็จ","error")
          })
        }
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
            สมัครสมาชิก
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={confirmpassword} 
                  onChange={inputValue("confirmpassword")}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={password.length < 8 || confirmpassword.length < 8}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponents