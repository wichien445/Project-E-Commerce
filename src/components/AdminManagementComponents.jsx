import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment/min/moment-with-locales';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Components
import AdminSideBarComponents from './AdminSideBarComponents';
//Function
import { listProduct, changeStatusProduct, removeProduct, updateProduct, createProduct} from '../../Services/product'
import { currentUser } from '../../Services/auth';
//Icons
import {
  PlusIcon,
  FunnelIcon,
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { Switch, Select, Modal } from 'antd'

function AdminManagementComponents() {
  const sidebar = [
    [
      { name: "Overview", icon: "https://sv1.picz.in.th/images/2023/05/20/F1R7su.png" },
      { name: "Products", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rk8k.png" },
      { name: "Analytics", icon: "https://sv1.picz.in.th/images/2023/05/20/F1RTcE.png" },
      { name: "Schedule", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rt2N.png" },
      { name: "Payout", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rt2N.png" },
      { name: "Statements", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rt2N.png" },
    ],
    [
      { name: "Help", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rt2N.png" },
      { name: "Community", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rt2N.png" },
      { name: "Settings", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rt2N.png" },
      { name: "Logout", icon: "https://sv1.picz.in.th/images/2023/05/20/F1RwyV.png" },
    ],
  ]

  const status = [
    { name: "Published", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Draft", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Hidden", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Rejected", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Under Review", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
  ]

  const {user} = useSelector((state) => ({...state}))
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false)
  const [crateProduct, setCreatProduct] = useState({
    name: "", 
    content: "", 
    price: "", 
    imageSrc: "", 
    category: "", 
    nameTH: "", 
    status: "", 
    quantity: ""
  })
  const [values, setValues] = useState({
    id: "",
    nameTH: "",
    price: "",
    content: ""
  })

  const showModal = (id) => {
    setIsModalOpen(true)
    setValues({...values, id:id})
  }

  const showModalCreate = () => {
    setIsModalOpenCreate(true)
    setCreatProduct({...crateProduct})
  }

  const handleChangeName = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  }

  const handleCreateProduct = (e) => {
    setCreatProduct({...crateProduct, [e.target.name]:e.target.value})
  }

  const handleOk = () => {
    setIsModalOpen(false)
    updateProduct(values.id, {values})
    .then((res) => {
      console.log(res)
      loadData()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleOkCreate = () => {
    setIsModalOpenCreate(false)
    createProduct({crateProduct})
    .then((res) => {
      console.log(res)
      loadData()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCancelCreate = () => {
    setIsModalOpenCreate(false)
  }

  const loadData = () => {
    listProduct()
    .then(response=>{
      setData(response.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleChangeRole = (e, id) => {
    const value = {
      id:id,
      status:e
    }
    changeStatusProduct(value)
    .then((res) => {
      console.log(res)
      loadData()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleRemove = (id) => {
    Swal.fire({
      title: "คุณต้องการลบสินค้าหรือไหม?",
      icon: "warning",
      showCancelButton:true
    }).then((result)=>{
      //กด OK
      if(result.isConfirmed){
        removeProduct(id)
        .then((res) => {
          console.log(res)
          loadData()
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
  }

  const statusData = ['มีสินค้า', 'สินค้าหมด']
  return (
    <div  className='w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex'>
      <AdminSideBarComponents/>

      <main className='flex-1 pb-8'>
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Products</h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
          </div>
          <button
            className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            onClickCapture={() => showModalCreate()}
          >
            <PlusIcon className="w-6 h-6 fill-current" />
            <span className="text-sm font-semibold tracking-wide">Create Products</span>
          </button>
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
                  <span>Product List</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">Status</td>
              <td className="py-4 px-4 text-center">Quantity</td>
              <td className="py-4 px-4 text-center">Pricing</td>
              <td className="py-4 px-4 text-center">CreateAt</td>
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
                <img
                  src={item.imageSrc}
                  alt=""
                  className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
                />
                <div>
                  <a href="#" className="text-lg font-semibold text-gray-700">
                    {item.nameTH}
                  </a>
                  <div className="font-medium text-gray-400">
                    {item.category}
                  </div>
                </div>
              </td>
              <td className="font-medium text-center">
                <Select className='w-full' value={item.status} onChange={(e) => handleChangeRole(e, item._id)}> 
                  {statusData.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </td>
              <td className="font-medium text-center">{item.quantity}</td>
              <td className="font-medium text-center">{item.price}฿</td>
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
              <td className="text-center pl-10"><TrashIcon className="w-6 h-6" onClick={() => handleRemove(item._id)}/></td>
              <td className="text-center"><PencilIcon className="w-6 h-6" onClick={() => showModal(item._id)}/></td>
            </tr>
          ))}
        </tbody>
        </table>
        
        <Modal title="Update Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>New NameTH : </p>
          <input
            onChange={handleChangeName}
            type="text"
            name='nameTH'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>New Price : </p>
          <input
            onChange={handleChangeName}
            type="text"
            name='price'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>New Content : </p>
          <input
            onChange={handleChangeName}
            type="text"
            name='content'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
        </Modal>

        <Modal title="Create Product" open={isModalOpenCreate} onOk={handleOkCreate} onCancel={handleCancelCreate}>
          <p>Create Name : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='name'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create Content : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='content'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create Price : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='price'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create ImageSrc : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='imageSrc'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create Category : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='category'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create nameTH : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='nameTH'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create Status : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='status'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
          <p className='mt-3'>Create Quantity : </p>
          <input
            onChange={handleCreateProduct}
            type="text"
            name='quantity'
            className='text-center w-1/2 mt-3 border-2 border-gray-200 border-solid rounded-lg'
          />
        </Modal>
      </main>
    </div>
  )
}

export default AdminManagementComponents