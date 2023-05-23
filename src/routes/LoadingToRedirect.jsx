import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoadingToRedirect() {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000);
    //Redirect 
    count === 0 && navigate('/')
    return () => clearInterval(interval)
  },[count])
  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-amber-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, No Permission, redirect in {count}.</p>
        </div>
      </main>
    </div>
  )
}

export default LoadingToRedirect