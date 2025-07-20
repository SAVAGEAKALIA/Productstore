import React, {useState} from 'react';
import {useProductStore} from "@/store/product.js";

function CreatePage(props) {
    const [notification, setNotification] = useState('')
    const [isError, setIsError] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    });

    const { createProduct } = useProductStore()
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you would typically send the newProduct data to your backend
        const {success, message}=await createProduct(newProduct);
        if (!success) {
            setIsError(true)
            setNotification(message);
            setTimeout(() => setNotification(''), 3000);
            console.error('Error creating product:', message);
            return;
        }
        // If successful, you might want to redirect or show a success message
        setIsError(false);
        setNotification(message);
        setTimeout(() => setNotification(''), 3000); // Hide after 3 seconds
        console.log('Success creating product:', message);
        console.log('New Product Created:', newProduct);
        // Reset the form
        setNewProduct({name: '', price: '', description: '', image: ''});
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Create New Product</h1>
            </div>

            <div className={"max-w-md w-full bg-gray-300 dark:bg-gray-50 p-6 rounded-lg shadow-md"}>
                <form className={"flex flex-col gap-4"}>
                    {notification && (
                        <div className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow-lg z-50 ${isError ? 'bg-red-500' : 'bg-green-500'}`}>
                            {notification}
                        </div>
                    )}
                    <div>
                        <label htmlFor="name" className={"block text-md font-medium text-gray-700"}>Product Name:</label>
                        <input
                            className={"bg-gray-100 dark:bg-gray-700 dark:text-white mt-1 block w-full px-2 border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-500 focus:ring-2"}
                            type="text"
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className={"block text-md font-medium text-gray-700"}>Price:</label>
                        <input
                            className={"bg-gray-100 dark:bg-gray-700 dark:text-white mt-1 block w-full px-2 border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-500 focus:ring-2"}
                            type="number"
                            id="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className={"block text-md font-medium text-gray-700"}>Description:</label>
                        <textarea
                            className={"bg-gray-100 dark:bg-gray-700 dark:text-white mt-1 block w-full px-2 border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-500 focus:ring-2"}
                            type="text"
                            id="description"
                            rows="2"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className={"block text-md font-medium text-gray-700"}>Image URL:</label>
                        <input
                            className={"bg-gray-100 dark:bg-gray-700 dark:text-white mt-1 block w-full px-2 border-gray-300 rounded-md shadow-md focus:border-blue-500 focus:ring-blue-500 focus:ring-2"}
                            type="text"
                            id="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} className={"w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"}>Create Product</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePage;