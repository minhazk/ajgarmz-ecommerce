import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { CgMenu } from 'react-icons/cg';
import { BiUser } from 'react-icons/bi';
import { MdOutlineClose, MdDashboardCustomize } from 'react-icons/md';
import { useUserContext } from '../context/UserContext';
import SearchBar from './SearchBar';
import Login from './Login';
import SignUp from './SignUp';

const NavBar = () => {
    const { user, logout } = useUserContext();
    const tempMenBtns = ['Tshirts', 'Hoodies', 'Shirts', 'Jumpers', 'Jackets', 'Watches', 'Belts', 'Trainers'];
    const tempWomenBtns = ['Tshirts', 'Jackets', 'Dresses', 'Accessories', 'Shoes', 'Watches', 'Tops', 'Shirts'];

    const [category, setCategory] = useState('men');
    const [subLinks, setSubLinks] = useState(tempMenBtns);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) setIsBurgerOpen(false);
        });
    }, []);

    return (
        <>
            <nav className='relative bg-primary text-white flex items-center gap-4 md:gap-7 px-5 h-[3.5em]'>
                <button onClick={() => setIsBurgerOpen(prev => !prev)}>{isBurgerOpen ? <MdOutlineClose size={25} className='md:hidden' /> : <CgMenu size={25} className='md:hidden' />}</button>
                <Link to='/' className='text-3xl font-bold'>
                    AJGarmz
                </Link>
                <div className='self-stretch hidden md:flex'>
                    <button
                        onClick={() => {
                            setCategory('men');
                            setSubLinks(tempMenBtns);
                        }}
                        className={`text-sm px-5 ${category === 'men' && 'bg-accent'}`}
                    >
                        Men
                    </button>
                    <button
                        onClick={() => {
                            setCategory('women');
                            setSubLinks(tempWomenBtns);
                        }}
                        className={`text-sm px-5 ${category === 'women' && 'bg-accent'}`}
                    >
                        Women
                    </button>
                </div>

                <div className='hidden md:block grow'>
                    <SearchBar />
                </div>

                <div className='ml-auto flex gap-3'>
                    {user !== null ? (
                        <>
                            <button onClick={logout} className='text-sm hidden md:block'>
                                Logout
                            </button>
                            <button className='text-sm hidden md:block'>{<BiUser size={19} />}</button>
                            {user && (
                                <Link to='/admin'>
                                    <MdDashboardCustomize size={20} />
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsLoginOpen(true)} className='text-sm hidden md:block'>
                                Login
                            </button>
                            <button onClick={() => setIsSignUpOpen(true)} className='text-sm hidden md:block'>
                                Sign up
                            </button>
                        </>
                    )}
                    <Link to='/basket' className='my-auto'>
                        <BsBag />
                    </Link>
                </div>

                <div
                    className={`${!isBurgerOpen && '-translate-x-full'} transition-transform duration-500 absolute top-full left-0 bg-white shadow-lg flex flex-col overflow-y-auto z-50`}
                    style={{ height: 'calc(100vh - 3.5em)' }}
                >
                    <div className='py-2 px-2'>
                        <SearchBar />
                    </div>

                    <div className='text-primary flex'>
                        <button
                            onClick={() => {
                                setCategory('men');
                                setSubLinks(tempMenBtns);
                            }}
                            className={`text-sm p-3 w-full font-semibold ${category === 'men' && 'bg-accent text-white'}`}
                        >
                            Men
                        </button>
                        <button
                            onClick={() => {
                                setCategory('women');
                                setSubLinks(tempWomenBtns);
                            }}
                            className={`text-sm p-3 w-full font-semibold ${category === 'women' && 'bg-accent text-white'}`}
                        >
                            Women
                        </button>
                    </div>

                    <div className='grow flex flex-col gap-2 p-2'>
                        {subLinks.map(btn => (
                            <Link to='/collections' className='text-sm font-bold text-primary bg-muted w-full text-center p-3' key={btn}>
                                {btn}
                            </Link>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2 p-2'>
                        {user !== null ? (
                            <>
                                <button className='text-sm py-2 px-2 bg-accent text-white w-full'>Your Account</button>
                                <button onClick={logout} className='text-sm py-2 px-2 bg-accent text-white w-full'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsLoginOpen(true)} className='text-sm py-2 px-2 bg-accent text-white w-full'>
                                    Login
                                </button>
                                <button onClick={() => setIsSignUpOpen(true)} className='text-sm py-2 px-2 bg-accent text-white w-full'>
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className='hidden md:flex justify-center bg-accent text-white'>
                <Link to='/collections' className='bg-orange text-sm font-bold py-3 px-4'>
                    SALE
                </Link>
                {subLinks.map(btn => (
                    <Link to='/collections' className='text-sm font-bold py-3 px-4 hover:bg-primary transition-[background-color] duration-200' key={btn}>
                        {btn}
                    </Link>
                ))}
            </div>

            <div className='hidden text-[#000] shadow-md shadow-accent p-2 flex flex-col justify-center items-center'>
                <p className='uppercase font-bold text-xs'>Full Site Sale</p>
                <p className='uppercase font-bold text-sm'>Sales up to 70% off</p>
            </div>

            <Login isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen} />
            <SignUp isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} setIsLoginOpen={setIsLoginOpen} />
        </>
    );
};

export default NavBar;
