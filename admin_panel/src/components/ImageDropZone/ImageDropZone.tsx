import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

interface ImageFile {
    id: string;
    file: File;
    preview: string;
}

const ImageDropZone: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] },
        maxFiles: 10,
        multiple: true,
        onDrop: (acceptedFiles) => {
            const newImages = acceptedFiles.map(file => ({
                id: uuidv4(),
                file,
                preview: URL.createObjectURL(file),
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        },
    });

    const handleUpload = () => {
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image.file);
        });

        fetch('/upload', {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
            .then(data => console.log('Upload successful', data))
            .catch(error => console.error('Upload error', error));
    };

    const handleDelete = (id: string) => {
        setImages(images.filter(image => image.id !== id));
    };

    return (
        <div className="flex flex-col items-start justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-gray-600">
                <div {...getRootProps({ className: 'flex flex-col items-center justify-center pt-5 pb-6' })}>
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input {...getInputProps()} />
            </label>
            <div className="flex gap-4 my-5 flex-wrap">
                {images.map(image => (
                    <div key={image.id} className="relative">
                        <img src={image.preview} alt="Preview" className="w-50 h-50 border border-gray-400 rounded" />
                        <button
                            onClick={() => handleDelete(image.id)}
                            className="absolute top-[-10px] right-[-10px] p-1 w-[20px] h-[20px] flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-700"
                            aria-label="Delete image"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageDropZone;
