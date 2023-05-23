import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";
import { getUser } from "../../Services/auth";
import { useDispatch, useSelector } from 'react-redux'

function NavbarComponents() {
  const [userData, setUserdata] = useState('');
  const { cart } = useSelector((state) => ({...state}))
  useEffect(() => {
    const data = sessionStorage.getItem('email');
    if (data) {
      setUserdata(data);
    }
  }, []);
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const navigation = {
    pages: [
      { name: "สินค้า", href: "/products" }
    ],
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    navigate('/')
  }
  return (
    <div className="bg-white">
      <header className="relative bg-white">
        {/* Banner */}
        <p className="flex h-10 items-center justify-center bg-amber-500 px-4 text-base font-medium text-white sm:px-6 lg:px-8">
          จัดส่งฟรีเมื่อซื้อสินค้าเกิน 300฿ ขึ้นไป
        </p>

        {/* Navbar */}
        <nav aria-label="Top" className="max-w-7xlpx-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-12 w-auto"
                    src="https://sv1.img.in.th/UxdLcL.png"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  { !getUser() && (
                    <Link to="/login">เข้าสู่ระบบ</Link>
                  )}
                  { !getUser() && (
                    <Link to="/register">สมัครสมาชิก</Link>
                  )}
                  { getUser() && (
                    <p>{userData}</p>
                  )}
                  { getUser() && (
                    <Link to="/history">ประวัติการสั่งซื้อ</Link>
                  )}
                  { getUser() && (
                    <button onClick={logout}>Log Out</button>
                  )}
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavbarComponents;
