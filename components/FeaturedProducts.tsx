import Image from 'next/image';
import React from 'react';

export type Product = {
  id: string;
  name: string;
  image: string;
};

export interface FeaturedProductsProps {
  products: Product[];
  promoText?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, promoText }) => {
  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="carousel">
        {products.map((product) => (
          <div key={product.id} className="item">
            <Image src={product.image} alt={product.name} width={200} height={200} />
          </div>
        ))}
      </div>
      {promoText && <p className="promo">{promoText}</p>}
      <style jsx>{`
        .featured-products {
          margin: 1rem 0;
        }
        .carousel {
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          padding: 1rem 0;
        }
        .item {
          flex: 0 0 auto;
        }
        .promo {
          margin-top: 0.5rem;
          font-style: italic;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
