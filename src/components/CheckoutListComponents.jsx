import React from "react";
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2';

function CheckoutListComponents({item}) {

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.imageSrc}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a>{item.product.nameTH}</a>
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.product.content.substring(0, 20)}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-around text-sm">
          <p className="text-gray-500">มีสินค้าทั้งหมด {item.product.quantity} ชิ้น</p>
          <div className="flex">
            <p>฿{item.product.price}</p>
          </div>
          <div className="flex">
            <p>{item.count}</p>
          </div>
          <div className="flex">
            <p>฿{item.product.price * item.count}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CheckoutListComponents;
