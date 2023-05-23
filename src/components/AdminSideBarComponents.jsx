import React from "react";
//React Router Dom
import { Link } from "react-router-dom";
import { getUser } from "../../Services/auth"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
function AdminSideBarComponents() {
    const sidebar = [
        [
            {
                name: "แดชบอร์ด",
                icon: "https://sv1.picz.in.th/images/2023/05/20/F1R7su.png",
                href: "/admin/index"
            },
            {
                name: "จัดการผู้ใช้",
                icon: "https://sv1.picz.in.th/images/2023/05/20/F1Rk8k.png",
                href: "/admin/management"
            },
            {
                name: "จัดการสินค้า",
                icon: "https://sv1.picz.in.th/images/2023/05/20/F1RTcE.png",
                href: "/admin/management"
            },
            {
                name: "จัดการออเดอร์",
                icon: "https://sv1.picz.in.th/images/2023/05/20/F1RTcE.png",
                href: "/admin/orders"
            }
        ]
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        navigate('/')
    }
    return (
        <aside className="py-6 px-10 w-64 border-r border-gray-200">
            {/* Logo */}
            <Link to="/admin/index">
                <img src="https://sv1.img.in.th/UxdLcL.png" className="h-36 w-auto" />
            </Link>
            {sidebar.map((group, index) => (
                <ul key={index} className="flex flex-col gap-y-6 pt-10">
                    {group.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group"
                            >
                                <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
                                <img src={item.icon} className="w-6 h-6 fill-current" alt="" />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            ))}
            { getUser() && (
                <button className='pt-5 pl-10' onClick={logout}>Log Out</button>
            )}
        </aside>
    );
}

export default AdminSideBarComponents;
