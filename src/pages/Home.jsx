import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/Home/CategoryCard';
import Slider from '../components/Home/Slider';
import { useCollectionsContext } from '../context/CollectionsContext';

const Home = () => {
    const { items } = useCollectionsContext();
    const tempItems = [
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
        {
            images: ['https://i.postimg.cc/7LsPwYHG/dummy-Image.jpg'],
            name: 'Very Long Item Name For Width Test',
            price: 148.88,
        },
    ];

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
                <Slider title='New Releases' items={tempItems} />
                <Slider title='Sale Items' items={items} />
            </div>
        </>
    );
};

export default Home;
