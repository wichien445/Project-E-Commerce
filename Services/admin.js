import axios from "axios"

export const getOrdersAdmin = async () => {
    return await axios.get(`${import.meta.env.VITE_APP_API}/admin/orders`, {
    })
}

export const updateStatusOrder = async (orderId, orderstatus) =>
    await axios.put(`${import.meta.env.VITE_APP_API}/admin/order-status`,
    { orderId, orderstatus },
    {

    }
);