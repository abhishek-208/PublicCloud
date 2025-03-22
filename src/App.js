import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/products";  // Change this to your deployed API URL later

function App() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });

    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Handle adding a new product
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input before sending request
        if (!newProduct.name || !newProduct.price || !newProduct.category) {
            alert("Please fill all fields!");
            return;
        }

        try {
            await axios.post(API_URL, {
                name: newProduct.name.trim(),
                price: parseFloat(newProduct.price),
                category: newProduct.category.trim(),
            });

            setNewProduct({ name: "", price: "", category: "" });  // Reset form fields
            fetchProducts();  // Refresh product list
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Product Catalogue</h1>

            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>

            <h2>Product List</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.name} - Rs.{product.price} ({product.category})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
