import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductForm.css';
import Footer from './Footer';
import SellNavbar from './SellNav';

const ProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: 'Electronics',
    condition: 'Used',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = async (e) => {
  const { name, value } = e.target;

  if (name === 'image') {
    const file = e.target.files[0];

    if (file) {
      const base64String = await convertImageToBase64(file);
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: base64String,
      }));
    }
  } else {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }
};

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data in the desired format
      const requestData = JSON.stringify({
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition,
      });
      console.log(requestData)

      // Set up the Axios configuration
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://mastomall-backend.vercel.app/products',
        headers: {
          'Content-Type': 'application/json',
        },
        data: requestData,
      };

      // Use Axios to send a POST request
      const response = await axios.request(config);

      console.log('Response from backend:', response.data);
      setSubmittedData(product);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }

    // Reset the form after submission
    setProduct((prev) => ({
      name: '',
      image: prev.image,
      description: '',
      price: '',
      category: prev.category,
      condition: prev.condition,
    }));
  };

  return (
    <>
      <SellNavbar />
      <div className="main-block">
        <div className='right-part'>
          <form onSubmit={handleSubmit}>
            <h1>List Your Product</h1>
              <div className="info">
                <input className="fname" type="text" name="name" placeholder="Title" title="name" value={product.name} onChange={handleChange}/>
                <label htmlFor="dropdown">Select the Category:</label>
                  <select
                    id="dropdown1"
                    value={product.category}
                    onChange={(e) => handleChange({ target: { title: 'category', value: e.target.value } })}
                  >
                    <option value="Books">Books</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                <br />
                <label htmlFor="dropdown">Select the condition:</label>
              <select
                id="dropdown"
                value={product.condition}
                onChange={(e) => handleChange({ target: { title: 'condition', value: e.target.value } })}
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Moderate">Moderate</option>
              </select>
            <input className="fprice" type="text" name="price" placeholder="Price" title="price" value={product.price} onChange={handleChange}/>
               <p>Upload an Image</p><input type="file" name="image" placeholder='Upload an Image' title="image" onChange={handleChange}/>
              </div>
              <input className="fdescription" type="text" name="description" placeholder="Description" title="description" value={product.description} onChange={handleChange}/>
             
              <button className="navbar-primary-button" type="submit">Submit </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductForm;
