import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import Paypal from '../components/Paypal';
import { useCollectionsContext } from '../context/CollectionsContext';
import formatCurrency from '../utilities/formatCurrency';

const Basket = () => {
    const { getBasket, getPromoCodes } = useCollectionsContext();
    const [basket, setBasket] = useState(getBasket());
    const [total, setTotal] = useState(0);
    const [promoCodes, setPromoCodes] = useState({});
    const [showRedeemBtn, setShowRedeemBtn] = useState(false);
    const [promoInput, setPromoInput] = useState('');
    const [redeemMsg, setRedeemMsg] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isRedeemed, setIsRedeemed] = useState(false);

    useEffect(() => {
        setTotal(basket.reduce((prev, curr) => prev + Number(curr.price), 0));
        (async () => {
            setPromoCodes(await getPromoCodes());
        })();
    }, []);

    const tempPromoCodes = [
        { name: 'code10', discount: 10 },
        { name: 'code20', discount: 20 },
    ];

    const handleShowRedeem = e => {
        setPromoInput(e.target.value);
        if (!e.target.value) return setShowRedeemBtn(false);
        setShowRedeemBtn(true);
    };

    const handlePromoRedeem = () => {
        if (!total) return;
        const promo = promoCodes.find(promo => promo.name === promoInput);
        if (!promo) return setRedeemMsg('Invalid Promo Code');
        const discount = (promo.discount / 100) * total;
        setDiscount(discount);
        setTotal(prev => prev - discount);
        setRedeemMsg(`Promo code redeemed! You saved ${formatCurrency(discount)}!`);
        setIsRedeemed(true);
        console.log(discount);
    };

    const BasketItem = ({ item }) => (
        <div className='flex gap-2'>
            <img className='w-20 h-20 sm:w-28 sm:h-28 aspect-square object-cover rounded-md' src={item.image} alt='basket item' />
            <div className='grow'>
                <h2 className='text-sm sm:text-base font-bold'>{item.name}</h2>
                <p className='text-xs sm:text-sm'>Size: {item.size}</p>
                <p className='text-xs sm:text-sm'>Colour: {item.colour}</p>
            </div>
            <h2 className='text-sm sm:text-base font-semibold pl-1 sm:pl-5'>{formatCurrency(item.price)}</h2>
        </div>
    );

    return (
        <div className='h-full bg-white flex-1 text-primary'>
            <div className='max-w-5xl xl:max-w-7xl mx-auto p-2 xs:p-5 lg:flex lg:gap-10'>
                <div className='flex-1 min-w-[60%] flex flex-col'>
                    <h1 className='text-xl md:text-2xl mb-4 font-semibold'>Items</h1>
                    <div className='flex flex-col gap-3 mt-2 overflow-y-auto pr-4' style={{ maxHeight: `calc(7rem * 3 + .5rem * 3)` }}>
                        {basket.map((item, i) => (
                            <BasketItem item={item} key={i} />
                        ))}
                    </div>
                </div>

                <div className='mt-4 lg:mt-0 flex-1'>
                    <h1 className='text-xl md:text-2xl mb-4 font-semibold'>Summary</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <p className='text-sm sm:text-base col-span-full'>Do you have a promo code?</p>
                        <div className='col-span-full relative'>
                            <input
                                disabled={isRedeemed}
                                value={promoInput}
                                onInput={handleShowRedeem}
                                className='w-full rounded-md py-1 px-2 text-primary border border-muted outline-none'
                                placeholder='XYA2BDKBW'
                            />
                            <button
                                disabled={isRedeemed}
                                onClick={handlePromoRedeem}
                                className={`${
                                    showRedeemBtn ? 'visible opacity-100' : 'invisible opacity-0'
                                } transition-opacity duration-300 absolute right-0 top-1/2 -translate-y-1/2 mr-1 text-sm bg-primary text-white rounded-[4px] py-1 px-2`}
                            >
                                Reedem
                            </button>
                        </div>
                        <p className='text-sm sm:text-base '>Subtotal</p>
                        <p className='text-sm sm:text-base justify-self-end'>{formatCurrency(total)}</p>
                        <p className='text-sm sm:text-base '>Delivery</p>
                        <p className='text-sm sm:text-base justify-self-end'>£0.00</p>
                        <p className='text-sm sm:text-base '>Promo</p>
                        <p className='text-sm sm:text-base justify-self-end'>- {formatCurrency(discount)}</p>
                        <div className='col-span-full h-[1px] my-1 bg-muted'></div>
                        <p className='text-sm sm:text-base font-semibold '>Total</p>
                        <p className='text-sm sm:text-base justify-self-end'>{formatCurrency(total)}</p>
                        {/* <button className='col-span-full rounded-md py-1 px-2 bg-accent text-white mt-1'>Pay Now</button> */}
                        <Paypal items={basket} discount={discount} />
                        {redeemMsg && <p className={`col-span-full text-sm text-center ${discount ? 'text-[#57b857]' : 'text-[#dd4242]'} font-semibold`}>{redeemMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basket;
