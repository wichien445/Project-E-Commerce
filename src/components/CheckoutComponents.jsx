import React from "react";
import { useState, useEffect } from 'react'
import NavbarComponents from "./NavbarComponents";
import CheckoutListComponents from "./CheckoutListComponents";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MapPinIcon, CreditCardIcon } from "@heroicons/react/20/solid";
import { RadioGroup} from '@headlessui/react'
import PaymentComponent from "./PaymentComponent";
import axios from "axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getUserCart, saveAddress, saveOrder, emptyCart } from '../../Services/user'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CheckoutComponents() {
  const product = {
    name: 'Basic Tee 6-Pack ',
    price: '$192',
    rating: 3.9,
    reviewCount: 117,
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
    imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
      { name: 'เก็บเงินปลายทาง', inStock: true, value: 1 },
      { name: 'บัตรเครดิต/บัตรเดบิต', inStock: true, value: 2},
      { name: 'Mobile Banking', inStock: false, value: 3},
      { name: 'QR พร้อมเพย์', inStock: false, value: 4 }
    ],
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart ,user } = useSelector((state) => ({ ...state }))
  const [ products, setProducts ] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)

  useEffect(() => {
    getUserCart(user.token)
    .then(res => {
      console.log(res)
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    })
  },[])

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  }

  const handleSaveAddress = () => {
    console.log(address)
    saveAddress(user.token, address)
    .then(res => {
      console.log(res.data)
      if(res.data.ok){
        Swal.fire(
          'แจ้งเตือน',
          'บันทึกที่อยู่เรียบร้อย',
          'success'
        )
      }
      setAddressSaved(true)
    })
  }

  const handleCreateOrder = () => {
    saveOrder(user.token)
    .then(res => {
      console.log(res.data)
      emptyCart(user.token)
      dispatch({
        type:'ADD_TO_CART',
        payload:[]
      })
      if(typeof window !== 'undefined'){
        localStorage.removeItem('cart')
      }
      Swal.fire(
        'แจ้งเตือน',
        'สั่งซื้อสินค้าเรียบร้อย',
        'success'
      )
      navigate('/history')
    })
  }

  const createCreditCardCharge = async (email, name, amoount, token) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_APP_API}/payment`,
      data: {
        email,
        name,
        amoount,
        token
      }
    })
  }

  return (
    <div className="bg-gray-200 relative" style={{ height: "100vh" }}>
      <NavbarComponents />
      <div className="container mx-auto mt-4 p-3 bg-white flex justify-start rounded-xl">
        <MapPinIcon className="mt-3 ml-10 mr-2 h-5 w-5 flex-shrink-0 text-amber-500" />
        <div>
          <p className="mt-3">ที่อยู่ในการจัดส่ง</p>
          <ReactQuill className="my-5" value={address} onChange={setAddress}/>
          <button className="flex mt-4 mr-5 w-auto h-auto items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" onClick={handleSaveAddress}>
                บันทึกที่อยู่
            </button>
        </div>
      </div>

      <div className="container mx-auto mt-4 p-3 bg-white flex rounded-xl">
        <div className="flow-root container mx-auto mt-4 p-3">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <div>สั่งซื้อ {products.length} สินค้า</div>
            {products.map((item,i) => (
              <CheckoutListComponents key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-4 p-3 bg-white flex justify-start rounded-xl">
        <CreditCardIcon className="ml-10 mr-3 my-8 h-5 w-5 flex-shrink-0 text-amber-500" />
        <div className="mr-20 my-8">วิธีการชำระเงิน</div>
        <PaymentComponent createCreditCardCharge={createCreditCardCharge} cart={cart} getTotal={getTotal}/>
      </div>

      {/* <div className="container mx-auto mt-4 p-3 bg-white flex justify-start rounded-xl">
        <div className="ml-10 my-auto">สถานะการชำระเงิน : </div>
      </div> */}

      <footer className="max-w-screen-l mx-auto w-screen" style={{ bottom: 0 }}>
        <div className="container mx-auto mt-4 p-3 bg-white flex justify-end rounded-xl">
          <div className="mt-3">
            รวม ({products.length} สินค้า) : ฿{total}
          </div>
          <div className="ml-5">
            <button
              type="button"
              onClick={handleCreateOrder}
              disabled={!addressSaved || !products.length}
              className="flex w-auto h-auto items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              สั่งสินค้า
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CheckoutComponents;
