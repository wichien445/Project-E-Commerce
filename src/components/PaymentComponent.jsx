import React from 'react'
import Script from "react-load-script";
import axios from 'axios';
import { useState } from 'react'

function PaymentComponent() {
    let OmiseCard
    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: "pkey_test_5vg3kfzvsluibq1h76w",
            currency: 'THB',
            frameLabel: 'Yerba MaTe Shop',
            submitLabel: 'Pay NOW',
            buttonLabel: 'Pay with Omise'
        });
    }

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: []
        });
        OmiseCard.configureButton("#credit-card");
        OmiseCard.attach();
    }

    const omiseCardHandler = () => {
        OmiseCard.open({
            frameDescription: 'Invice #3847',
            amount: 1000,
            onCreateTokenSuccess: (token) => {
                console.log(token)
                // axios.post(`${import.meta.env.VITE_APP_API}/payment`, {
                //     email: "borntodev@gmail.com",
                //     name: 'Borntodev',
                //     token: token,
                //     amount: getTotal,
                //     headers: {
                //         "Content-Type": "application/json"
                //     }
                // }).then(res => {
                //     console.log(res)

                // }).catch(err => {
                //     console.log(err)
                // })
            },
            onFormClosed: () => {},
        })  
    }

    const handleClick = (e) => {
        e.preventDefault();
        creditCardConfigure();
        omiseCardHandler();
    }

  return (
    <div className="own-form">
        <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={handleLoadScript}
        />
        <form>
            <button className="flex mt-4 mr-5 w-auto h-auto items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" id="credit-card" type="button" onClick={handleClick}>
                ชำระเงินด้วยบัตรเครดิต
            </button>
        </form>
    </div>
  )
}

export default PaymentComponent