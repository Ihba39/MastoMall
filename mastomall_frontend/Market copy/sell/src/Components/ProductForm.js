import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    condition:''
  });

  const handleChange = (e) => {
    const { title, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [title]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to a server)
    console.log('Product data submitted:', product);
    // Reset the form after submission
    setProduct({
      title: '',
      price: '',
      description: '',
      condition:''
    });
  };

  return (
    <div>
      <h2 classtitle='productSell'>Sell With Us!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            title="title"
            value={product.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            title="price"
            value={product.price}
            onChange={handleChange}
          />
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
        <br />
        <label>
          Condition:
          <textarea
            title="condition"
            value={product.condition}
            onChange={handleChange}
          />
        </label>
        <button className='navbar-primary-button' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
