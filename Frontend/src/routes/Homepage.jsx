import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useProductStore} from "@/store/product.js";
import ProductCard from "@/components/ProductCard.jsx";

function Homepage(props) {
    const {fetchProducts, products} = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="flex flex-col items-center min-h-screen py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">Current Products</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-5xl p-8 rounded-2xl shadow-xl  text-center">
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                    Welcome to the Product Store! Here you can find a variety of products available for purchase.
                </p>
                <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
                    Use the navigation bar to explore different categories and <Link to={'/create'}><span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">add new products.</span></Link>
                </p>
                <p className={"text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg"}>Application Built by Saviour Akalia</p>
                <div className="flex flex-wrap justify-center gap-8 w-full mt-8 animate-fadeIn">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;