import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CollectionsProvider } from './context/CollectionsContext';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Item from './pages/Item';
import Basket from './pages/Basket';
import AdminDashboard from './pages/AdminDashboard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Error404 from './pages/Error404';

const App = () => {
    return (
        <UserProvider>
            <CollectionsProvider>
                <div className='flex flex-col min-h-screen'>
                    <NavBar />
                    <div className='grow flex flex-col'>
                        <Routes>
                            <Route path='/' exact element={<Home />} />
                            <Route path='/collections' element={<Collections />} />
                            <Route path='/item/:id' element={<Item />} />
                            <Route path='/basket' element={<Basket />} />
                            <Route path='/admin' element={<AdminDashboard />} />
                            <Route path='*' element={<Error404 />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </CollectionsProvider>
        </UserProvider>
    );
};

export default App;
