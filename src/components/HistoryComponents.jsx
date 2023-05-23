import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import NavbarComponents from './NavbarComponents'
import { getOrders } from '../../Services/user'

function HistoryComponents() {
    const { user } = useSelector((state) => ({...state}))
    const [ orders, setOrders ] = useState([])
    useEffect(() => {
        loadData()
    },[])

    const loadData = () => {
        getOrders(user.token)
        .then(res => {
            setOrders(res.data)
            console.log(orders)
        })
    }
  return (
    <div className="bg-gray-200 relative" style={{ height: "100vh" }}>
        <NavbarComponents/>

        <div className="container mx-auto mt-4 p-3 bg-white flex justify-start rounded-xl">
            <div>
            <div className='ml-3'>ประวัติการสั่งซื้อ {orders.length} Order</div>
            </div>
        </div>

        <div className="container mx-auto mt-4 p-3 bg-white flex rounded-xl">
            <div className="flow-root container mx-auto mt-4 p-3">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {orders.map((item,index) => (
                        <li className="flex py-6">
                
                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <a>Order : {item._id}</a>
                                        </h3>
                                        <h3>
                                            <a>{item.orderstatus}</a>
                                        </h3>
                                    </div>
                                </div>

                                {item.products.map((p,i) => (
                                    <div className="flex flex-1 items-end justify-around text-sm my-3">
                                        <img
                                            src={p.product.imageSrc}
                                            className="h-20 w-20 object-cover object-center"
                                        />
                                        <div className="flex">
                                            <p>{p.product.nameTH}</p>
                                        </div>
                                        <div className="flex">
                                            <p>฿{p.price}</p>
                                        </div>
                                        <div className="flex">
                                            <p>{p.count} ชิ้น</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='ml-3 text-right'>ราคาสุทธิ {item.cartTotal} บาท</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default HistoryComponents