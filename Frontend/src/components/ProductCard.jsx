import React, { useState } from 'react';
import { useProductStore } from "@/store/product.js";

const ProductCard = ({ product }) => {
    const { deleteProduct, fetchProducts, editProduct } = useProductStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
    });

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(product._id);
            fetchProducts();
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset form if canceling edit
        if (isEditing) {
            setEditedProduct({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await editProduct(product._id, editedProduct);
        if (result?.success) {
            setIsEditing(false);
            fetchProducts();
        }
    };

    return (
        <div className="mt-8 mb-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-md mx-auto min-w-[260px] sm:min-w-[320px] lg:min-w-[350px]">
            <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                    className="max-w-full object-cover hover:scale-105 transition duration-200"
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Product+Image";
                    }}
                />
            </div>

            <div className="flex flex-col gap-2 px-6 py-4">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={editedProduct.description}
                                onChange={handleChange}
                                rows="2"
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={editedProduct.image}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                type="submit"
                                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition duration-200 font-medium shadow"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 active:scale-95 transition duration-200 font-medium shadow"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">{product.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{product.description}</p>
                        <span className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">${product.price}</span>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleEditToggle}
                                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition duration-200 font-medium shadow"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition duration-200 font-medium shadow"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

