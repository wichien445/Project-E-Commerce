import axios from "axios"

export const listUser = async (authtoken) => {
    return await axios.get(`${import.meta.env.VITE_APP_API}/users`, {
        headers: {
            authtoken
        }
    })
}

export const changeStatus = async (authtoken, value) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/change-status`, value, {
        headers: {
            authtoken
        }
    })
}

export const changeRole = async (authtoken, value) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/change-role`, value, {
        headers: {
            authtoken
        }
    })
}

export const removeUser = async (authtoken, id) => {
    return await axios.delete(`${import.meta.env.VITE_APP_API}/users/${id}`, {
        headers: {
            authtoken
        }
    })
}

export const userCart = async (authtoken, cart) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/user/cart`, {cart}, {
        headers: {
            authtoken
        }
    })
}

export const getUserCart = async (authtoken) => {
    return await axios.get(`${import.meta.env.VITE_APP_API}/user/cart`, {
        headers: {
            authtoken
        }
    })
}

export const saveAddress = async (authtoken, address) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/user/address`, {address}, {
        headers: {
            authtoken
        }
    })
}

export const saveOrder = async (authtoken) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/user/order`,{}, {
        headers: {
            authtoken
        }
    })
}

export const emptyCart = async (authtoken) => {
    return await axios.delete(`${import.meta.env.VITE_APP_API}/user/cart`, {
        headers: {
            authtoken
        }
    })
}

export const getOrders = async (authtoken) => {
    return await axios.get(`${import.meta.env.VITE_APP_API}/user/orders`, {
        headers: {
            authtoken
        }
    })
}

export const getOrdersAdmin = async (authtoken) => {
    return await axios.get(`${import.meta.env.VITE_APP_API}/user/orders`, {
        headers: {
            authtoken
        }
    })
}