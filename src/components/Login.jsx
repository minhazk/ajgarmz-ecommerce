import React, { useState, useRef } from 'react';
import { useUserContext } from '../context/UserContext';
import AccountForm from './AccountForm';
const Login = ({ isOpen, setIsOpen, setIsSignUpOpen }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useUserContext();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setIsOpen(false);
        } catch {
            setError('Failed to login');
        }

        setLoading(false);
    };

    return (
        <AccountForm name='Login' isOpen={isOpen} closeModal={setIsOpen} error={error}>
            <form onSubmit={handleSubmit}>
                <div className='relative mt-8'>
                    <input ref={emailRef} id='email' className='peer border-b border-[gray] w-full outline-none px-1 text-sm py-1 mt-1' type='text' required />
                    <label
                        className='absolute top-0 left-0 text-sm pl-2 text-[gray] peer-focus-within:-translate-y-3 peer-focus-within:text-xs peer-valid:-translate-y-3 peer-valid:text-xs transition-all duration-300'
                        htmlFor='email'
                    >
                        Email Address
                    </label>
                </div>

                <div className='relative mt-8'>
                    <input ref={passwordRef} id='password' className='peer border-b border-[gray] w-full outline-none px-1 text-sm py-1 mt-1' type='password' required />
                    <label
                        className='absolute top-0 left-0 text-sm pl-2 text-[gray] peer-focus-within:-translate-y-3 peer-focus-within:text-xs peer-valid:-translate-y-3 peer-valid:text-xs transition-all duration-300'
                        htmlFor='password'
                    >
                        Password
                    </label>
                </div>

                {!!error && <p className='text-xs text-[red] text-center mt-3 font-medium'>{error}</p>}

                <button type='submit' disabled={loading} className={`bg-accent mt-${error ? '3' : '8'} py-[.75em] px-[1em] text-white uppercase text-xs font-semibold`}>
                    Login
                </button>
                <button
                    onClick={() => {
                        setIsOpen(false);
                        setIsSignUpOpen(true);
                    }}
                    className='text-sm ml-2 underline'
                >
                    Don't have an account?
                </button>
            </form>

            <p className='text-xs font-medium text-center text-accent underline mt-2'>Forgot Password?</p>
        </AccountForm>
    );
};

export default Login;
