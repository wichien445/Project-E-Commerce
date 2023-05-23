import React from 'react'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment/min/moment-with-locales';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Components
import AdminSideBarComponents from './AdminSideBarComponents';
//Function
import { listUser, changeStatus, changeRole, removeUser } from '../../Services/user'
import { currentUser } from '../../Services/auth';
//Icons
import {
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Switch, Select } from 'antd'

function AdminHomeComponents() {

  const status = [
    { name: "Published", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Draft", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Hidden", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Rejected", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Under Review", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
  ]

  const {user} = useSelector((state) => ({...state}))
  const [data, setData] = useState([])

  useEffect(() => {
    loadData(user.token)
  }, [])

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleOnChange = (e, id) => {
    const value = {
      id:id,
      enabled:e
    }
    changeStatus(user.token, value)
    .then((res) => {
      console.log(res)
      loadData(user.token)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleChangeRole = (e, id) => {
    const value = {
      id:id,
      role:e
    }
    changeRole(user.token, value)
    .then((res) => {
      console.log(res)
      loadData(user.token)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleRemove = (id) => {
    Swal.fire({
      title: "คุณต้องการลบผู้ใช้หรือไหม?",
      icon: "warning",
      showCancelButton:true
    }).then((result)=>{
      //กด OK
      if(result.isConfirmed){
        removeUser(user.token, id)
        .then((res) => {
          console.log(res)
          loadData(user.token)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
  }

  const roleData = ['admin', 'user']
  return (
    <div className='w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex'>
      <AdminSideBarComponents/>

      <main className='flex-1 pb-8'>
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Dashboard</h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
          </div>
        </div>

        <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
          {status.map((item, index) => (
            <li key={index}>
              <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
                <img src={item.icon} className="w-6 h-6 fill-current" alt="" />
                <span className="font-medium">{item.name}</span>
                <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
          ))}
        </ul>

        <table className="w-full border-b border-gray-200">
          <thead>
            <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
              <td className="pl-10">
                <div className="flex items-center gap-x-4">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                    indeterminate="indeterminate"
                  />
                  <span>User List</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">Role</td>
              <td className="py-4 px-4 text-center">Status</td>
              <td className="py-4 px-4 text-center">CreatedAt</td>
              <td className="py-4 px-4 text-center">UpdateAt</td>
              <td className="py-4 px-4 text-center">Action</td>
            </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors group"
            >
              <td className="flex gap-x-4 items-center py-4 pl-10">
                <input
                  type="checkbox"
                  className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                />
                <div>
                  <a href="#" className="text-lg font-semibold text-gray-700">
                    {item.email}
                  </a>
                  <div className="font-medium text-gray-400">
                    {item.role}
                  </div>
                </div>
              </td>
              <td className="font-medium text-center">
                <Select className='w-full' value={item.role} onChange={(e) => handleChangeRole(e, item._id)}> 
                  {roleData.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </td>
              <td className="font-medium text-center"><Switch checked={item.enabled} onChange={(e) => handleOnChange(e,item._id)}/></td>
              <td className="text-center">
                <span className="w-20">
                  {moment(item.createdAt).locale("th").format("lll")}
                </span>
              </td>
              <td className="text-center">
                <span className="w-20">
                {moment(item.updatedAt).locale("th").startOf(item.updatedAt).fromNow()}
                </span>
              </td>
              <td className="text-center"><TrashIcon className="w-6 h-6 cent" onClick={() => handleRemove(item._id)}/></td>
            </tr>
          ))}
        </tbody>
        </table>
      
      </main>
    </div>
  )
}

export default AdminHomeComponents