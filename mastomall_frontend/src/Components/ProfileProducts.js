import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import SellNav from "./SellNav";
import Footer from "./Footer";
import axios from 'axios';

const ProfileProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    // Define the Axios configuration for the API request
    const axiosConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/products/',
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

  const result = (products);

  return (
     
    <><h1>Your Products</h1>
    <SellNav />
      <Products result={result} />
    <Footer />
    </>
  );
};

export default ProfileProducts;
