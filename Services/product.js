import axios from "axios"

export const listProduct = async (authtoken) => {
    return await axios.get(`${import.meta.env.VITE_APP_API}/products`, {
        headers: {
            authtoken
        }
    })
}

export const changeStatusProduct = async (value) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/product/change-status`, value, {
    })
}

export const removeProduct = async (id) => {
    return await axios.delete(`${import.meta.env.VITE_APP_API}/product/${id}`, {
    })
}

export const updateProduct = async (id, values) => {
    return await axios.put(`${import.meta.env.VITE_APP_API}/product/${id}`, values, {
    })
}

export const createProduct = async (values) => {
    return await axios.post(`${import.meta.env.VITE_APP_API}/addproduct`, values, {
    })
}