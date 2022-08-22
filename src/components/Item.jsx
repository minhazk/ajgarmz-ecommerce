import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { useCollectionsContext } from '../context/CollectionsContext';
import formatCurrency from '../utilities/formatCurrency';

const Item = ({ item }) => {
    const { addToBasket } = useCollectionsContext();
    const [size, setSize] = useState();
    const [colour, setColour] = useState();
    const [hovering, setHovering] = useState(false);

    const handleAddToBasket = e => {
        addToBasket({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.images[0],
            size,
            colour,
        });
        e.target.classList.add('add-item-anim');
        setTimeout(() => {
            e.target.classList.remove('add-item-anim');
        }, 700);
    };

    return (
        <div className='bg-accent text-white p-2 sm:p-3 rounded-md flex flex-col' onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className='relative aspect-square overflow-hidden rounded-md'>
                <img className='w-full aspect-square object-cover rounded-sm' src={item.images[0]} alt='item' />

                <div className={`absolute w-full ${hovering ? 'bottom-0' : '-bottom-full'} bg-primary grid grid-cols-2 p-2 gap-2 transition-[bottom]`}>
                    <DropDown setOption={setSize} options={item.sizes || []} />
                    <DropDown setOption={setColour} options={item.colours || []} />
                    <button onClick={handleAddToBasket} className='relative text-center text-xs md:text-sm px-2 uppercase bg-accent rounded-md hover:opacity-70 transition-opacity duration-500'>
                        Add
                    </button>
                    <Link className='text-center text-xs md:text-sm px-2 uppercase bg-accent rounded-md hover:opacity-70 transition-opacity duration-500' to={`/item/${item.id}`}>
                        View
                    </Link>
                </div>
            </div>
            <p className='text-sm my-2 leading-5 max-h-10 overflow-hidden'>{item.name}</p>
            <p className='text-sm font-semibold ml-auto'>{formatCurrency(item.price)}</p>
        </div>
    );
};

export default Item;
