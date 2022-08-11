import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className='h-full  flex-1 flex flex-col justify-center items-center'>
            <h1 className='text-8xl font-bold'>404</h1>
            <p className='text-xl font-medium'>Page Not Found</p>
            <Link to='/' className='mt-3 text-md underline' exact>
                Return back home
            </Link>
        </div>
    );
};

export default Error404;
