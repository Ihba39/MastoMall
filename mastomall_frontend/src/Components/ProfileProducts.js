import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProfileProducts.css'
import Footer from "./Footer";
import Navbar from "./Navbar";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the Axios configuration for the API request
    const axiosConfig = {
      method: 'get',
      url: 'https://mastomall-backend.vercel.app/products/',
    };

    
    axios.request(axiosConfig)
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 

  const handleDelete = async (productId) => {
    try {
     
      await axios.delete(`https://mastomall-backend.vercel.app/products/${productId}`);

      // Update the state to remove the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
       <p class='heading'>Product List</p>
       <br />
       {products.map((product) => (
            <div key={product._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', minWidth: '200px' }}> 
              <div class="card">
                <div class="imgBx">
                      <img src={`data:image/jpeg;base64,${product.image}`} alt="fetch-image" />
                </div>
                    <h3>Condition:</h3> <span>{product.condition}</span>
                    <h3>Category:</h3> <span>{product.category}</span>
                    <h3>Price:</h3> <span>{product.price}</span>
                  </div>
                  <button onClick={() => handleDelete(product._id)} class='button'>Update as Sold</button>
                </div>
              ))}
              <Footer />
    </div>
    </>
  );
};

export default DisplayProducts;
