import React from 'react';
import { useCollectionsContext } from '../context/CollectionsContext';
import Item from '../components/Item';

const Collections = () => {
    const { items } = useCollectionsContext();

    return (
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 py-3 md:py-5 px-3 md:px-10'>
                {items.map(item => !!item.images.length && <Item item={item} key={item.id} />)}
            </div>
        </div>
    );
};

export default Collections;
