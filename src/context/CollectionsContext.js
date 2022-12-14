import { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, setDoc, getDocs, getDoc, collection, query, where, documentId } from 'firebase/firestore';
import { ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import uuid from 'react-uuid';

const LOCAL_STORAGE_BASKET_KEY = 'ajgarmz_basket';
const LOCAL_STORAGE_ITEMS_KEY = 'ajgarmz_items';

const CollectionsContext = createContext();

export const useCollectionsContext = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        getItems();
        setBasket(getBasket());
    }, []);

    const getItems = async () => {
        setItems([]);
        const ls_items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) || null;
        if (ls_items && new Date() - new Date(ls_items.last_update) < 90 * 60 * 1000) return setItems(ls_items.items);
        const querySnapshot = await getDocs(collection(db, 'items'));
        const items = [];
        querySnapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });
        setItems(items);
        localStorage.setItem(
            LOCAL_STORAGE_ITEMS_KEY,
            JSON.stringify({
                last_update: new Date(),
                items,
            })
        );
    };

    const getItem = async id => {
        const ls_items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) || null;
        if (ls_items) {
            const filter = ls_items.items.find(item => item.id === id);
            if (filter) return filter;
        }
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log('No such document!');
        }
    };

    const getSpecificItems = async ids => {
        const itemsRef = collection(db, 'items');
        const q = query(itemsRef, where(documentId(), 'in', ids));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });
        return items;
    };

    const createItem = async item => {
        const itemId = uuid();
        await item.images.forEach(image => {
            const storageRef = sRef(storage, `${itemId}/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    if (progress === 100) {
                        setTimeout(() => {
                            setUploadProgress(0);
                        }, 1500);
                    }
                },
                err => {
                    console.log(err.message);
                    setUploadProgress('Upload Failed');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        setImageUrls(prev => [...prev, url]);
                    });
                }
            );
        });

        const fullItem = {
            ...item,
            images: imageUrls,
        };

        await setDoc(doc(db, 'items', itemId), fullItem);
        // getItems();
        setItems(items => [...items, fullItem]);
    };

    const addToBasket = item => {
        const ls_basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET_KEY)) || [];
        setBasket([...ls_basket, item]);
        localStorage.setItem(LOCAL_STORAGE_BASKET_KEY, JSON.stringify(basket));
    };

    const getBasket = () => {
        return basket;
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET_KEY)) || [];
    };

    const removeFromBasket = id => {
        const ls_basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET_KEY)) || [];
        setBasket(ls_basket.filter(item => item.id !== id));
        localStorage.setItem(LOCAL_STORAGE_BASKET_KEY, JSON.stringify(basket));
    };

    const getPromoCodes = async () => {
        const querySnapshot = await getDocs(collection(db, 'promoCodes'));
        const promoCodes = [];
        querySnapshot.forEach((doc, i) => {
            promoCodes.push(doc.data());
        });
        return promoCodes;
    };

    return (
        <CollectionsContext.Provider value={{ items, createItem, uploadProgress, getItem, getBasket, basket, removeFromBasket, addToBasket, getPromoCodes, getSpecificItems }}>
            {children}
        </CollectionsContext.Provider>
    );
};
