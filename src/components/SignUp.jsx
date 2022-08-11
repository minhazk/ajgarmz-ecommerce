import React, { useState, useRef } from 'react';
import { useUserContext } from '../context/UserContext';
import AccountForm from './AccountForm';

const SignUp = ({ isOpen, setIsOpen, setIsLoginOpen }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { createUser } = useUserContext();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await createUser(emailRef.current.value, passwordRef.current.value);
            setIsOpen(false);
        } catch {
            setError('Failed to create an account');
        }

        setLoading(false);
    };

    return (
        <AccountForm name='Sign Up' isOpen={isOpen} closeModal={setIsOpen} error={error}>
            <form onSubmit={handleSubmit}>
                <div className='relative mt-8'>
                    <input ref={emailRef} id='loginEmail' className='peer border-b border-[gray] w-full outline-none px-2 text-sm py-1 mt-1' type='email' required />
                    <label
                        className='absolute top-0 left-0 text-sm pl-1 text-[gray] peer-focus-within:-translate-y-3 peer-focus-within:text-xs peer-valid:-translate-y-3 peer-valid:text-xs transition-all duration-100'
                        htmlFor='loginEmail'
                    >
                        Email Address
                    </label>
                </div>

                <div className='relative mt-8'>
                    <input ref={passwordRef} id='loginPassword' className='peer border-b border-[gray] w-full outline-none px-2 text-sm py-1 mt-1' type='password' required />
                    <label
                        className='absolute top-0 left-0 text-sm pl-1 text-[gray] peer-focus-within:-translate-y-3 peer-focus-within:text-xs peer-valid:-translate-y-3 peer-valid:text-xs transition-all duration-100'
                        htmlFor='loginPassword'
                    >
                        Password
                    </label>
                </div>

                <div className='relative mt-8'>
                    <input ref={confirmPasswordRef} id='confirmPassword' className='peer border-b border-[gray] w-full outline-none px-2 text-sm py-1 mt-1' type='password' required />
                    <label
                        className='absolute top-0 left-0 text-sm pl-1 text-[gray] peer-focus-within:-translate-y-3 peer-focus-within:text-xs peer-valid:-translate-y-3 peer-valid:text-xs transition-all duration-100'
                        htmlFor='confirmPassword'
                    >
                        Confirm Password
                    </label>
                </div>

                {!!error && <p className='text-xs text-[red] text-center mt-3 font-medium'>{error}</p>}

                <button type='submit' disabled={loading} className={`bg-accent mt-${error ? '3' : '8'} py-[.75em] px-[1em] text-white uppercase text-xs font-semibold`}>
                    Sign Up
                </button>
                <button
                    onClick={() => {
                        setIsOpen(false);
                        setIsLoginOpen(true);
                    }}
                    className='text-sm ml-2 underline'
                >
                    Already have an account?
                </button>
            </form>
        </AccountForm>
    );
};

export default SignUp;
