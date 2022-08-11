import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCollectionsContext } from '../context/CollectionsContext';

const Paypal = ({ items, discount }) => {
    const [loading, setLoading] = useState(false);
    const { getSpecificItems } = useCollectionsContext();

    const options = {
        'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: 'GBP',
        intent: 'capture',
    };

    const handleCreateOrder = async (data, actions) => {
        setLoading(true);
        const basket = await getSpecificItems(items.map(item => item.id));
        setLoading(false);

        let basketTotal = basket.reduce((prev, curr) => prev + Number(curr.price), discount * -1);
        if (basketTotal <= 0) basketTotal = 1;

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: basketTotal,
                        currency_code: 'GBP',
                        breakdown: {
                            item_total: { value: basketTotal, currency_code: 'GBP' },
                        },
                    },
                    items: items.map(item => {
                        return {
                            name: item.name,
                            unit_amount: {
                                value: item.price,
                                currency_code: 'GBP',
                            },
                            quantity: '1',
                        };
                    }),
                },
            ],
        });
    };

    const handleOnApprove = (data, actions) => {
        return actions.order.capture().then(details => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    };

    const style = {
        layout: 'vertical',
        color: 'black',
        shape: 'rect',
        tagline: false,
    };

    return (
        <PayPalScriptProvider options={options}>
            <PayPalButtons createOrder={handleCreateOrder} onApprove={handleOnApprove} style={style} disabled={loading} className='col-span-full py-1 text-sm' />
        </PayPalScriptProvider>
    );
};

export default Paypal;
