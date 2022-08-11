import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsShuffle, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';

import Item from '../Item';

const Slider = ({ title, items }) => {
    const [imagesPerSlide, setImagesPerSlide] = useState();
    // const [sliderItems, setSliderItems] =
    const [slide, setSlide] = useState(0);

    const handleSlides = () => {
        if (window.innerWidth > 640) setImagesPerSlide(4);
        else if (window.innerWidth > 500) setImagesPerSlide(3);
        else setImagesPerSlide(2);
    };

    const nextSlide = () => {
        if (-slide === Math.ceil(items.length / imagesPerSlide) - 1) return;
        setSlide(prev => prev - 1);
    };

    const prevSlide = () => {
        if (slide === 0) return;
        setSlide(prev => prev + 1);
    };

    useEffect(() => {
        handleSlides();
        window.addEventListener('resize', handleSlides);
    }, []);

    return (
        <div className='mt-3'>
            <div className='py-3 flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                {<BsShuffle />}
            </div>

            <div className='w-full overflow-x-hidden'>
                <div
                    className={`grid grid-flow-col gap-4 transition-transform duration-700`}
                    style={{ gridAutoColumns: `calc(100% / ${imagesPerSlide} - ${1 - 1 / imagesPerSlide}rem)`, transform: `translateX(calc(${slide} * 100% - ${slide} * -1rem))` }}
                >
                    {items.map((item, i) => (
                        <Item item={item} key={item.id} />
                    ))}
                </div>
            </div>

            {/* MOBILE IS FUCKED UP WHEN GOING TO MORE SLIDES */}

            <div className='mt-3 flex items-center'>
                <Link to='/collections' className='underline text-sm'>
                    Browse all items
                </Link>
                <p className='flex justify-center items-center gap-1 text-xs grow'>
                    <span className='text-[#d1d1d1]'>Page</span>
                    <button onClick={prevSlide}>{<BsChevronLeft />}</button>
                    <span className='bg-accent px-2 py-1 text-sm'>{Math.abs(slide) + 1}</span> <button onClick={nextSlide}>{<BsChevronRight />}</button>
                    <span className='text-[#d1d1d1]'>
                        of <span className='ml-1'>{Math.ceil(items.length / imagesPerSlide)}</span>
                    </span>
                </p>
                <button onClick={nextSlide} className='bg-accent flex items-center gap-1 py-2 px-4 rounded-md text-sm'>
                    Next Page
                    <AiOutlineArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Slider;
