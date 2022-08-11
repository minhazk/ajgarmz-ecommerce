import React, { useEffect } from 'react';

const DropDown = ({ setOption, options, styles }) => {
    useEffect(() => {
        setOption(options[0]);
    }, []);

    const handleChange = e => {
        setOption(e.target.value);
    };

    return (
        <select onInput={handleChange} disabled={options.length === 1} className={`bg-accent rounded-md border border-orange text-sm outline-none w-full ${styles}`}>
            {options.map(option => (
                <option className='text-sm' key={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropDown;
