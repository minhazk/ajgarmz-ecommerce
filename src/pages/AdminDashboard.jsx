import React, { useState, useRef } from 'react';
import { AiOutlineCloudUpload, AiOutlineFileImage } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { useUserContext } from '../context/UserContext';
import { useCollectionsContext } from '../context/CollectionsContext';
import Error404 from './Error404';
import AdminItemOptions from '../components/AdminItemOptions';

const AdminDashboard = () => {
    const [images, setImages] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [sizes, setSizes] = useState(['XL', 'L', 'M', 'S', 'XS'].reverse());
    const [colours, setColours] = useState(['Black', 'White']);
    const [gender, setGender] = useState(['Men', 'Women']);
    const [type, setType] = useState(['Clothing', 'Footwear', 'Accessories']);
    const [category, setCategory] = useState(['Tshirts']);

    const { createItem, uploadProgress } = useCollectionsContext();
    const { user } = useUserContext();

    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    if (user?.type !== 'admin') return <Error404 />;

    const handleSubmit = () => {
        if (images.length === 0) return alert('Add at least one image');

        for (let input of [nameRef.current, priceRef.current]) {
            if (input.value === '' || input.value === null) {
                return alert(input.dataset.name + ' cannot be empty!');
            }
        }

        const item = {
            images,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            sizes,
            colours,
            gender,
            type,
            category,
        };

        createItem(item);
    };

    const onFileDrop = e => setImages([...images, ...e.target.files]);

    return (
        <div className='h-full bg-white flex-1 text-primary pb-5'>
            <div className='max-w-[700px] mx-auto mt-3 px-4'>
                <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>
                <div className='my-5'>
                    <div className={`relative bg-[#0000000f] border-2 border-dashed border-accent rounded-md py-6 px-4 flex flex-col items-center gap-2 ${isHovering && 'opacity-60'}`}>
                        <AiOutlineCloudUpload size={40} />
                        <p className='text-accent text-sm' dangerouslySetInnerHTML={{ __html: 'Drag & Drop your images or click to browse files' }} />
                        <input
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onDragEnter={() => setIsHovering(true)}
                            onDragLeave={() => setIsHovering(false)}
                            onDrop={() => setIsHovering(false)}
                            onInput={onFileDrop}
                            type='file'
                            multiple
                            className='absolute inset-0 opacity-0 cursor-pointer'
                        />
                    </div>

                    {!!images.length && (
                        <div className='mt-5 flex flex-col gap-2'>
                            {images.map((image, i) => (
                                <div className='bg-[#1414140f] border border-[gray] py-2 px-4 rounded-md flex items-center gap-2' key={i}>
                                    <AiOutlineFileImage size={30} />
                                    <div className='flex flex-col w-3/4'>
                                        <p className='text-sm text-ellipsis whitespace-nowrap overflow-hidden'>{image.name}</p>
                                        <p className='text-sm'>{image.size}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setImages(images.filter(img => img !== image));
                                        }}
                                        className=' ml-auto my-auto'
                                    >
                                        <MdOutlineClose />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='flex flex-col gap-3'>
                    <input data-name='Name' ref={nameRef} className='py-2 px-2 text-sm rounded-md w-full border border-muted text-primary outline-none' placeholder='Item Name' />
                    <input data-name='Price' ref={priceRef} className='py-2 px-2 text-sm rounded-md w-full border border-muted text-primary outline-none' type='number' placeholder='123.45' />
                    <input ref={descriptionRef} className='py-2 px-2 text-sm rounded-md w-full border border-muted text-primary outline-none' placeholder='Description' />

                    <AdminItemOptions name='Sizes' options={sizes} setOptions={setSizes} />
                    <AdminItemOptions name='Colours' options={colours} setOptions={setColours} />
                    <AdminItemOptions name='Gender' options={gender} setOptions={setGender} />
                    <AdminItemOptions name='Type' options={type} setOptions={setType} />
                    <AdminItemOptions name='Category' options={category} setOptions={setCategory} limited />

                    <button onClick={handleSubmit} className='bg-accent text-white rounded-md w-full mt-2 py-2 text-sm'>
                        Upload
                    </button>

                    {!!uploadProgress && (
                        <div className='h-3 w-full mt-2 mb-5'>
                            <div style={{ width: `${uploadProgress}%` }} className='bg-accent h-full rounded-md'></div>
                            <p className='mt-1 text-center font-semibold text-sm text-accent'>{uploadProgress}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
