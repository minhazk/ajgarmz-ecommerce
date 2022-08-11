import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password).then(cred => setDoc(doc(db, 'users', cred.user.uid), { type: 'user' }));

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logout = () => auth.signOut();

    useEffect(() => {
        return auth.onAuthStateChanged(async user => {
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            setUser({ ...user, ...docSnap.data() });
        });
    }, []);

    return <UserContext.Provider value={{ user, createUser, login, logout }}>{children}</UserContext.Provider>;
};
