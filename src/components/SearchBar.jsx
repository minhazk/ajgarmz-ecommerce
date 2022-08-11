import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [suggestions, setSuggestions] = useState([]);
    const tempSuggestions = ['item1', 'item1', 'item2', 'minhaz', 'item3'];

    const showSuggestions = e => {
        const searchValue = e.target.value;
        if (!searchValue) {
            setSuggestions([]);
            return;
        }
        const matches = tempSuggestions.filter(item => item.split(' ').some(word => word.startsWith(searchValue)));
        setSuggestions(matches);
    };

    return (
        <div className='relative h-full flex items-center'>
            <input onInput={showSuggestions} className='grow w-full py-1 px-3 bg-accent rounded-md text-sm outline-none' placeholder='Search our store...' />

            <div className={`absolute top-full translate-y-2 border border-muted rounded-md bg-primary overflow-hidden w-full flex flex-col ${!suggestions.length && 'hidden'} z-50`}>
                {!!suggestions.length &&
                    suggestions.map((item, i) => (
                        <Link onClick={() => setSuggestions([])} className='hover:bg-accent py-2 px-5 text-sm' to='/' key={i} exact>
                            {item}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default SearchBar;
