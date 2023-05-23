import React from 'react'
import App from './App'
//Router
import { BrowserRouter , Routes, Route } from "react-router-dom";
//Component
import LoginComponents from './components/LoginComponents';
import CartComponents from './components/CartComponents';
import ProductListComponents from './components/ProductListComponents';
import NewProductListComponents from './components/NewProductListComponents';
import ProductOverviewsComponents from './components/ProductOverviewsComponents';
import RegisterComponents from './components/RegisterComponents';
import PaymentComponent from './components/PaymentComponent';
import TestCartComponent from './components/TestCartComponents';
import CheckoutComponents from './components/CheckoutComponents';
import HistoryComponents from './components/HistoryComponents';
//Admin Component
import AdminHomeComponents from './components/AdminHomeComponents'
import AdminManagementComponents from './components/AdminManagementComponents'
import AdminRoute from './routes/AdminRoute';
import AdminOrderComponents from './components/AdminOrderComponents';

function MyRoute() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact Component={App}/>
            <Route path="/login" exact Component={LoginComponents}/>
            <Route path="/cart" exact Component={CartComponents}/>
            <Route path="/products" exact Component={ProductListComponents}/>
            <Route path="/newproducts" exact Component={NewProductListComponents}/>
            <Route path="/product/:slug" exact Component={ProductOverviewsComponents}/>
            <Route path="/register" exact Component={RegisterComponents}/>
            <Route path="/payment" exact Component={PaymentComponent}/>
            <Route path="/test" exact Component={TestCartComponent}/>
            <Route path="/checkout" exact Component={CheckoutComponents}/>
            <Route path="/admin/index" element={<AdminRoute><AdminHomeComponents/></AdminRoute>}/>
            <Route path="/admin/management" element={<AdminManagementComponents/>}/>
            <Route path="/history" exact Component={HistoryComponents}/>
            <Route path="/admin/orders" exact Component={AdminOrderComponents}/>
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoute