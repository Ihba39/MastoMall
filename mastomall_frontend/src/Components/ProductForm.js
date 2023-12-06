import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Assets/logo.jpeg';
import './ProductForm.css';

const ProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: 'Books',
    condition: 'New',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = async (e) => {
    const { title, value } = e.target;

    if (title === 'image') {
      const file = e.target.files[0];

      if (file) {
        const base64String = await convertImageToBase64(file);
        setProduct((prevProduct) => ({
          ...prevProduct,
          [title]: base64String,
        }));
      }
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [title]: value,
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

  const handleLoginSignupClick = () => {
    localStorage.removeItem('authToken');
    navigate('/Home');
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

      // Set up the Axios configuration
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://mastomall-backend.vercel.app/products/',
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
      <nav>
        <div className="nav-logo-container">
          <img src={Logo} alt="" className="nav-logo" />
        </div>
        <div className="nav-text-section">
          <h1 className="nav-primary-heading">Mastodon Mall</h1>
        </div>
        <div className="navbar-links-container">
          <button className="back-primary-button" onClick={handleLoginSignupClick}>
            LogOut
          </button>
        </div>
      </nav>
      <div className="app-container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column" id="first-column">
              <label>
                <h3 className="h3">Upload an Image:</h3>
                <input type="file" title="image" onChange={handleChange} />
              </label>
            </div>
            <div className="column" id="second-column">
              <h2>List Your Product</h2>
              <label className="title">
                Name:
                <input type="text" title="name" value={product.name} onChange={handleChange} />
              </label>
              <br />
              <label htmlFor="dropdown">Select the Category:</label>
              <select
                id="dropdown"
                value={product.category}
                onChange={(e) => handleChange({ target: { title: 'category', value: e.target.value } })}
              >
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
              </select>
              <br />
              <br />
              <br />
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
              <br />
              <br />
              <br />
              <br />
              <label>
                Price:
                <input type="text" title="price" value={product.price} onChange={handleChange} />
              </label>
              <br />
              <label>
                Description:
                <textarea
                  title="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <br />
          <br />
          <button className="navbar-primary-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
