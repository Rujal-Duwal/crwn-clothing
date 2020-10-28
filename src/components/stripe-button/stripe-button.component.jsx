import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HhF9PE8J0FJqwJoya41PCYVklUSlDrmn2Am4yjCNjoP4SW1N91upxhCipKUpkZiYH8cbuVXRBcAZACOEKMvR2yF00cJlPmgze'

    const onTOken = token => {
        console.log(token);
        alert('payment Sucessful')
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onTOken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton