import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

const AdminItemOptions = ({ name, options, setOptions, limited }) => {
    return (
        <div>
            <h1 className='pl-1 font-semibold first-letter:capitalize'>{name}</h1>
            <div className='border border-muted p-1 w-full flex flex-wrap gap-2 rounded-md'>
                {options.length === 0 ? (
                    <button className='flex items-center gap-1 px-2 rounded-sm text-sm text-accent bg-[rgb(0,0,0,.1)] border border-accent w-fit hover:bg-[rgb(0,0,0,.05)] opacity-0 cursor-default'>
                        No Options
                        <MdOutlineClose />
                    </button>
                ) : (
                    options.map((option, i) => (
                        <button
                            onClick={() => setOptions(options.filter(s => s !== option))}
                            className='flex items-center gap-1 px-2 rounded-sm text-sm text-accent bg-[rgb(0,0,0,.1)] border border-accent w-fit hover:bg-[rgb(0,0,0,.05)]'
                            key={i}
                        >
                            {option}
                            <MdOutlineClose />
                        </button>
                    ))
                )}
            </div>
            <div>
                <input
                    onInput={e => {
                        const val = e.target.value;
                        if (val.charAt(val.length - 1) === ' ') {
                            e.target.value = '';
                            if (!limited) {
                                setOptions(prev => [...prev, val.replaceAll('%', ' ')]);
                            } else {
                                setOptions([val.replaceAll('%', ' ')]);
                            }
                        }
                    }}
                    className='w-full px-2 p-1 text-accent outline-none border-b border-muted text-sm'
                    placeholder='Type to add more (use % for spaces)'
                />
            </div>
        </div>
    );
};

export default AdminItemOptions;
