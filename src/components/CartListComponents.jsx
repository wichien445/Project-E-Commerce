import React from "react";
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2';

function CartListComponents({item}) {
    const dispatch = useDispatch()

    const handleChangeCount = (e) => {
        const count = e.target.value < 1 ? 1 : e.target.value
        if(count > parseInt(item.quantity)){
            Swal.fire("แจ้งเตือน","ไม่สามารถเพิ่มสินค้าได้","error")
            return
        }
        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product,i) => {
            if(product._id == item._id){
                cart[i].count = count
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
        dispatch({
            type:"ADD_TO_CART",
            payload:cart
        })
    }

    const handleRemove = () => {
        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product,i) => {
            if(product._id == item._id){
                cart.splice(i,1)
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
        dispatch({
            type:"ADD_TO_CART",
            payload:cart
        })
    }
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageSrc}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a>{item.name}</a>
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.content.substring(0, 20)}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-around text-sm">
          <p className="text-gray-500">มีสินค้าทั้งหมด {item.quantity} ชิ้น</p>
          <div className="flex">
            <p>฿{item.price}</p>
          </div>
          <div className="flex">
            <button
              type="button"
              className="flex w-1 h-1 items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              +
            </button>
            <input
              type="number"
              className="text-center bg-white form-control"
              value={item.count}
              onChange={handleChangeCount}
            />
            <button
              type="button"
              className="flex w-1 h-1 items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              -
            </button>
          </div>
          <div className="flex">
            <p>฿{item.price * item.count}</p>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-amber-500 hover:text-amber-600"
            >
              ลบสินค้า
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartListComponents;
