import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./Components/Card";
import ProductForm from "./Components/ProductForm";
import ProfileProducts from "./Components/ProfileProducts";
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    // Define the Axios configuration for the API request
    const axiosConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://mastomall-backend.vercel.app/products/',
      headers: {}
    };

    // Make the API request when the component mounts
    axios.request(axiosConfig)
      .then((response) => {
        setProducts(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.includes('-')) {
      setPriceRange(value.split('-').map(Number));
    } else {
      setSelectedCategory(value);
    }
  };

  function filteredData(products, selected, query, priceRange) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === selectedCategory
      );
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange;
      filteredProducts = filteredProducts.filter(product => {
        const price = product.newPrice; 
        return price >= minPrice && (maxPrice ? price <= maxPrice : true);
      });
    }

    return filteredProducts.map(product => (
      <Card
        key={product._id} 
        img={`data:image/jpeg;base64,${product.image}`}
        title={product.name}
        description={product.description}
        condition={product.condition}
        newPrice={`$${product.price}`}
      />
    ));
  }

  const result = filteredData(products, selectedCategory, query, priceRange);

  const BuyPage = () => (
    <>
      <Sidebar handleChange={handleChange} />
      <Products result={result} />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/buy-page" element={<BuyPage />} /> 
        <Route path="/sell-page" element={<ProductForm />} />
        <Route path="/your-products" element={<ProfileProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
