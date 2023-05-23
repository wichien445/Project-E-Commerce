import React from 'react'
import { useState, useEffect } from 'react';
//Redux
import { useSelector } from 'react-redux';
//Components
import NavbarAdminComponents from './NavbarAdminComponents'
import AdminSideBarComponents from './AdminSideBarComponents';
//Function
import { listUser } from '../../Services/user'
//Icons
import {
  PlusIcon,
  FunnelIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

function AdminProductComponents() {
  const sidebar = [
    [
      { name: "แดชบอร์ด", icon: "https://sv1.picz.in.th/images/2023/05/20/F1R7su.png" },
      { name: "จัดการผู้ใช้", icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rk8k.png" },
      { name: "จัดการสินค้า", icon: "https://sv1.picz.in.th/images/2023/05/20/F1RTcE.png" }
    ],
    [
      { name: "Logout", icon: "https://sv1.picz.in.th/images/2023/05/20/F1RwyV.png" }
    ],
  ]

  const status = [
    { name: "Published", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Draft", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Hidden", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Rejected", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
    { name: "Under Review", icon: "https://sv1.picz.in.th/images/2023/05/20/F1xzCy.png" },
  ]

  const products = [
    {
      name: "Organic Landing page",
      category: "Web Design",
      imageUrl: "https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg",
      price: 20,
      downloaded: 793,
      rating: 4.9,
      platformIcons: ['https://sv1.picz.in.th/images/2023/05/20/F1xezq.png', 'https://sv1.picz.in.th/images/2023/05/20/F1xy68.png'],
      createdAt: "12/01/22",
    },
    {
      name: "Traffic Landing page",
      category: "Web Design",
      imageUrl: "https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg",
      price: 24,
      downloaded: 34,
      rating: 4.4,
      platformIcons: ['https://sv1.picz.in.th/images/2023/05/20/F1xezq.png', 'https://sv1.picz.in.th/images/2023/05/20/F1xy68.png'],
      createdAt: "10/01/22",
    },
    {
      name: "POS Dashboard",
      category: "Web Design",
      imageUrl: "https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg",
      price: 16,
      downloaded: 896,
      rating: 4.6,
      platformIcons: ['https://sv1.picz.in.th/images/2023/05/20/F1xezq.png', 'https://sv1.picz.in.th/images/2023/05/20/F1xy68.png'],
      createdAt: "01/01/22",
    },
    {
      name: "Gallery page",
      category: "Web Design",
      imageUrl: "https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg",
      price: 38,
      downloaded: 194,
      rating: 4.6,
      platformIcons: ['https://sv1.picz.in.th/images/2023/05/20/F1xezq.png', 'https://sv1.picz.in.th/images/2023/05/20/F1xy68.png'],
      createdAt: "04/01/22",
    },
    {
      name: "WFH Landing page",
      category: "Web Design",
      imageUrl: "https://sv1.picz.in.th/images/2023/05/01/yqKXqk.jpg",
      price: 22,
      downloaded: 404,
      rating: 4.3,
      platformIcons: ['https://sv1.picz.in.th/images/2023/05/20/F1xezq.png', 'https://sv1.picz.in.th/images/2023/05/20/F1xy68.png'],
      createdAt: "12/12/21",
    },
  ]

  const {user} = useSelector((state) => ({...state}))
  const [data, setData] = useState([])
  console.log('data', data)

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
  return (
    <div  className='w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex'>
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
                  <span>Product Name</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">Pricing</td>
              <td className="py-4 px-4 text-center">Downloaded</td>
              <td className="py-4 px-4 text-center">Rating</td>
              <td className="py-4 px-4 text-center">Platforms</td>
              <td className="py-4 pr-10 pl-4 text-center">
                <FunnelIcon className="w-6 h-6 fill-current" />
              </td>
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
                    {item.name}
                  </a>
                  <div className="font-medium text-gray-400">
                    {item.category}
                  </div>
                </div>
              </td>
              <td className="font-medium text-center">${item.price}</td>
              <td className="font-medium text-center">{item.quantity}</td>
              <td className="text-center">
                <span className="font-medium">{item.status}</span>
                <span className="text-gray-400">/5</span>
              </td>
              <td>
                <span className="inline-block w-20 group-hover:hidden">
                  {item.createdAt}
                </span>
                <div className="hidden group-hover:flex group-hover:w-20 group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                  <button className="p-2 hover:rounded-md hover:bg-gray-200">
                    <PencilIcon className="w-6 h-6 fill-current" />
                  </button>
                  <button className="p-2 hover:rounded-md hover:bg-gray-200">
                    <TrashIcon className="w-6 h-6 fill-current" />
                  </button>
                </div>
              </td>
              <td>
                <span className="inline-block w-20 group-hover:hidden">
                  {item.updatedAt}
                </span>
                <div className="hidden group-hover:flex group-hover:w-20 group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                  <button className="p-2 hover:rounded-md hover:bg-gray-200">
                    <PencilIcon className="w-6 h-6 fill-current" />
                  </button>
                  <button className="p-2 hover:rounded-md hover:bg-gray-200">
                    <TrashIcon className="w-6 h-6 fill-current" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      
      </main>
    </div>
  )
}

export default AdminProductComponents