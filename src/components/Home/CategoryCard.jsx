import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, image }) => {
    return (
        <Link to={`/collections/${name.toLowerCase()}`} className='bg-accent text-white w-full p-1 xs:p-2 sm:p-3 rounded-md cursor-pointer'>
            <img className='aspect-video object-cover rounded-lg' src={image} alt='category' />
            <h1 className='text-xs xs:text-sm text-center xs:font-semibold mt-2 mb-1 sm:mt-3'>{name}</h1>
        </Link>
    );
};

export default CategoryCard;
