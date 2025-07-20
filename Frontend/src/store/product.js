import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {

    if (!newProduct || !newProduct.name || !newProduct.price || !newProduct.image) {
        console.error('Invalid product data:', newProduct);
        return {success: false, message: 'Invalid product data'};
    }
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const product = await response.json();
            set((state) => ({ products: [...state.products, product.data] }));
            return {success: true, message: 'Product Successfully Created', product: product.data};
        } catch (error) {
            console.error('Error creating product:', error);
        }
    },


    fetchProducts: async() => {
        try {
            const response = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            set({ products: data.data });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },

    deleteProduct: async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId)
            }));
            return { success: true, message: 'Product deleted successfully' };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, message: 'Error deleting product' };
        }
    },

    editProduct: async (productId, updatedProduct) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId ? data.data : product
                )
            }));
            return { success: true, message: 'Product updated successfully', product: data.data };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, message: 'Error updating product' };
        }
    },

    removeProduct: (productId) => set((state) => ({
        products: state.products.filter(product => product.id !== productId)
    })),
    updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
        )
    }))
}));

