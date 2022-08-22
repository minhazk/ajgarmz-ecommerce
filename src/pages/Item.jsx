import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectionsContext } from '../context/CollectionsContext';
import DropDown from '../components/DropDown';
import formatCurrency from '../utilities/formatCurrency';
import { useMemo } from 'react';

const Item = () => {
    const { id } = useParams();
    const { getItem, addToBasket } = useCollectionsContext();
    const [item, setItem] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [size, setSize] = useState();
    const [colour, setColour] = useState();
    const fetchItem = useMemo(
        () => async () => {
            setItem(await getItem(id));
        },
        [item]
    );

    useEffect(() => {
        fetchItem();
    }, []);

    const handleAddToBasket = () => {
        addToBasket({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.images[currentImage],
            size,
            colour,
        });
    };

    if (item)
        return (
            <div className='p-4 sm:flex sm:gap-5 lg:gap-7 mx-auto w-11/12 max-w-5xl'>
                <div className='w-full sm:w-80 md:w-96 lg:w-[32rem]'>
                    <div className='w-full aspect-square object-cover rounded-md md:rounded-lg border border-muted overflow-hidden'>
                        {!!item.images.length ? <img className='w-full h-full object-cover' src={item.images[currentImage]} alt='display' /> : <div className='w-screen h-screen bg-accent'></div>}
                    </div>
                    <div className='flex gap-3 w-full overflow-x-auto mt-3 pb-2'>
                        {item.images.map((image, i) => (
                            <img
                                onClick={() => setCurrentImage(i)}
                                className={`aspect-square object-cover rounded-md ${currentImage === i && 'border border-white'} cursor-pointer`}
                                style={{ width: 'calc(25% - 0.75rem / 1.3)' }}
                                src={image}
                                key={i}
                                alt='other'
                            />
                        ))}
                    </div>
                </div>

                <div className='mt-3 sm:mt-0 sm:w-1/2'>
                    <h1 className={`text-xl sm:text-2xl ${item && 'relative after:absolute after:h-full after:w-11'}`}>{item.name}</h1>
                    <p className='mt-2 text-lg font-semibold'>{formatCurrency(item.price)}</p>

                    <h3 className='text-base font-semibold mt-2'>Product description</h3>
                    <p className='text-sm mt-2'>{!!item.description && item.description}</p>

                    <p className='text-sm mt-3 font-semibold'>Choose your options</p>

                    <DropDown setOption={setSize} options={item.sizes} styles='p-1 mt-4' />
                    <DropDown setOption={setColour} options={item.colours} styles='p-1 mt-4' />

                    <button onClick={handleAddToBasket} className='uppercase text-center w-full p-2 text-sm mt-5 bg-accent hover:bg-orange transition-all rounded-lg'>
                        {item ? 'Add To Basket' : 'Loading...'}
                    </button>
                </div>
            </div>
        );
    else return 'Loading';
};

export default Item;
