// CategoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryList.css'; // Import the CSS file for styling

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        const categoryList = uniqueCategories.map(category => ({
          name: category,
          products: products.filter(product => product.category === category)
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {categories.map(category => (
        <div key={category.name} className="category">
          <h2 className="category-title">{category.name}</h2>
          <div className="product-grid">
            {category.products.map(product => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
