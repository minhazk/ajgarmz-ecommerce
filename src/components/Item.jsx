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

    const handleAddToBasket = () => {
        addToBasket({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.images[0],
            size,
            colour,
        });
    };

    return (
        <div className='bg-accent text-white p-2 sm:p-3 rounded-md flex flex-col' onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className='relative aspect-square overflow-hidden rounded-md'>
                <img className='w-full aspect-square object-cover rounded-sm' src={item.images[0]} alt='item' />

                <div className={`absolute w-full ${hovering ? 'bottom-0' : '-bottom-full'} bg-primary grid grid-cols-2 p-2 gap-2 transition-[bottom]`}>
                    <DropDown setOption={setSize} options={['XL', 'L', 'M', 'S', 'XS']} />
                    <DropDown setOption={setColour} options={['Black', 'White', 'Gray', 'Blue']} />
                    <button onClick={handleAddToBasket} className='text-center text-sm px-2 uppercase bg-accent rounded-md'>
                        Add
                    </button>
                    <Link className='text-center text-sm px-2 uppercase bg-accent rounded-md' to={`/item/${item.id}`}>
                        View
                    </Link>
                </div>
            </div>
            <p className='text-xs my-2'>{item.name}</p>
            <p className='text-xs font-semibold ml-auto'>{formatCurrency(item.price)}</p>
        </div>
    );
};

export default Item;
