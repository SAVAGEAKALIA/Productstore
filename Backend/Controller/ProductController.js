import Product from "../models/Product_model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
}

export const postProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image || !product.description) {
        return res.status(400).json({ success:false, message: 'Please provide all fields '})
    }

    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct})
    } catch (error) {
        console.error('Error Occurred while creating new product:', error.message)
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

export const updateProduct = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ success: false, message: "invalid Id" })
    }

    try {
        const updatedProduct  = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({ success:true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteProduct = async (req, res) =>  {
    const { id } = req.params
    // console.log(id)

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ success: false, message: "invalid Id" })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
        res.status(500).json({ success:false, message: 'Server Error' })
    }

    res.status(200).json({ success: true, message: "Deleted"})
}

export const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' })
    }
    console.log(product)

    res.status(200).json({ success: true, data: product })
}