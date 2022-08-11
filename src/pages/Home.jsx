import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/Home/CategoryCard';
import Slider from '../components/Home/Slider';
import { useCollectionsContext } from '../context/CollectionsContext';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const { items } = useCollectionsContext();
    const tempItems = [];

    const dummyItem = {
        images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
        name: 'Coming Soon...',
        price: 1000,
    };

    return (
        <>
            <div className='w-[100vw] max-w-[1600px] px-3 md:px-10 mx-auto pb-5'>
                <div>
                    <h1 className='text-xl font-semibold pt-3 pb-4 text-center'>Categories</h1>
                    <div className='grid grid-cols-3 justify-items-center gap-1 xs:gap-3'>
                        <CategoryCard name='Clothing' image='https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg' />
                        <CategoryCard name='Footwear' image='https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg' />
                        <CategoryCard name='Accessories' image='https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg' />
                    </div>
                </div>
                <Slider
                    title='New Releases'
                    items={[
                        ...items.filter(item => !!item.images.length),
                        ...Array.from({ length: items.length < 4 ? 4 - items.length : 0 }).map(x => {
                            return { id: uuidv4(), ...dummyItem };
                        }),
                    ]}
                />
                <Slider
                    title='Sale Items'
                    items={[
                        ...tempItems,
                        ...Array.from({ length: tempItems.length < 4 ? 4 - tempItems.length : 0 }).map(x => {
                            return { id: uuidv4(), ...dummyItem };
                        }),
                    ]}
                />
            </div>
        </>
    );
};

export default Home;
