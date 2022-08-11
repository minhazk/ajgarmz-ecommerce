import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

const AccountForm = ({ name, isOpen, closeModal, error, children }) => {
    return (
        <div className={`bg-[#00000080] fixed top-0 left-0 h-screen w-screen ${!isOpen && 'invisible opacity-0'} transition-opacity duration-1000 flex justify-center items-center z-50`}>
            <div className={`bg-white text-primary p-4 rounded-sm max-w-[85vw] w-[550px]`}>
                <div className='flex justify-between gap-2'>
                    <h1 className='uppercase font-semibold'>{name}</h1>
                    <button onClick={() => closeModal(false)}>
                        <MdOutlineClose />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default AccountForm;
