import React from 'react';
import { BsWhatsapp, BsInstagram, BsSnapchat, BsTwitter } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className='bg-accent text-white p-5 grid grid-cols-2 sm:grid-cols-3 gap-2 justify-items-center'>
            <div className='justify-self-start sm:justify-self-center'>
                <h1 className='text-xl font-semibold mb-2'>AJGarmz</h1>
                <div>
                    <p className='text-sm'>London, United Kingdom</p>
                    <p className='text-sm'>© AJGarmz {new Date().getFullYear()}</p>
                </div>
            </div>

            <div className='w-full'>
                <p className='text-sm sm:text-center'>Subscribe to our newsletter</p>
                <input className='bg-white py-1 px-2 my-2 text-sm rounded-md w-full max-w-[40vw] text-center text-primary outline-none' type='email' placeholder='johndoe@gmail.com' />
                <div className='flex gap-2 mt-1 sm:justify-center'>
                    <a href='/' target='_blank'>
                        <BsWhatsapp className='hover:text-orange' />
                    </a>
                    <a href='/' target='_blank'>
                        <BsInstagram className='hover:text-orange' />
                    </a>
                    <a href='/' target='_blank'>
                        <BsSnapchat className='hover:text-orange' />
                    </a>
                    <a href='/' target='_blank'>
                        <BsTwitter className='hover:text-orange' />
                    </a>
                </div>
            </div>

            <div className='col-span-2 sm:col-span-1 justify-self-start sm:justify-self-center'>
                <p className='text-sm mb-2 font-semibold'>Contact Us</p>
                <p className='text-sm'>+44 123456789</p>
                <p className='text-sm'>support@ajgarmz.co.uk</p>
            </div>
        </footer>
    );
};

export default Footer;
