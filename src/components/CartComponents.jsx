import React from 'react'
import NavbarComponents from './NavbarComponents'
import CartListComponent from './CartListComponents'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { userCart } from '../../Services/user'

function CartComponents() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  const { cart, user } = useSelector((state) => ({...state}))

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price
    },0)
  }

  const handleSaveOrder = () => {
    // code
    userCart(user.token, cart)
      .then((res) => {
        console.log(res)
        navigate("/checkout")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='bg-gray-200 relative' style={{height:'100vh'}}>
      <NavbarComponents/>
        <div className='container mx-auto mt-4 p-3 bg-white flex justify-around rounded-xl'>
            <div>{cart.length} : สินค้าในตะกร้า</div>
            <div>ราคาต่อชิ้น</div>
            <div>จำนวน</div>
            <div>ราคารวม</div>
            <div>แอคชั่น</div>
        </div>
        
        <div className="container mx-auto mt-4 p-3 bg-white flex rounded-xl">
          <div className="flow-root container mx-auto mt-4 p-3">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.map((item) => <CartListComponent key={item._id} item={item}/>)}
            </ul>
          </div>
        </div>

        <footer className='absolute w-screen' style={{bottom: 0}}>
          <div className='container mx-auto mt-4 p-3 bg-white flex justify-end rounded-xl'>
              <div>รวม ({cart.length} สินค้า) : ฿{getTotal()}</div>
              <div className='ml-5'>
              <button
                type="button"
                onClick={handleSaveOrder}
                className="flex w-auto h-1 items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                สั่งสินค้า
              </button>
              </div>
          </div>
        </footer>
    </div>
  )
}

export default CartComponents