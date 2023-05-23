import React from "react";
import NavbarComponents from "./NavbarComponents";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductListComponents() {
  const [products,setProducts] = useState([])

  const fetchData =()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/products`)
    .then(response=>{
      setProducts(response.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="bg-white">
      <NavbarComponents />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">สินค้าทั้งหมด</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.slug} to={`/product/${product.slug}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.nameTH}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">฿{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListComponents;
