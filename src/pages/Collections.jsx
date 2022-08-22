import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectionsContext } from '../context/CollectionsContext';
import Item from '../components/Item';

const Collections = () => {
    const { category } = useParams();
    const { items } = useCollectionsContext();
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        if (category === undefined) setItemList(items);
        setItemList(items.filter(item => item.category.includes(category)));
    }, [category, items]);

    console.log(items);

    return (
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 py-3 md:py-5 px-3 md:px-10'>
                {itemList.map(item => !!item.images.length && <Item item={item} key={item.id} />)}
            </div>
        </div>
    );
};

export default Collections;
