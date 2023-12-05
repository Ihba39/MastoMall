import React from 'react';
import ProductForm from './Components/ProductForm';
import Navbar from './Components/Navbar';
import Footer from './Components/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProductForm />
      <Footer />
    </div>
  );
}

export default App;
