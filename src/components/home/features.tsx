import React from 'react';
import ProductCard from './productCard';


const DUMMY_PRODUCTS = [
  {
    id: "prod_1",
    name: "Organic Ashwagandha Root Tincture",
    price: 50000,
  },
  {
    id: "prod_2",
    name: "Organic Turmeric Root Powder",
    price: 25000,
  },
  {
    id: "prod_3",
    name: "Elderberry Immune Syrup",
    price: 35000,
  },
  {
    id: "prod_4",
    name: "Dried Hibiscus Flower (Zobo)",
    price: 15000,
  },
];

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-emerald-900 mb-4">Our Products</h2>
        <div className="h-1 w-20 bg-amber-400 mx-auto rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
       
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}

      </div>
    </section>
  );
}