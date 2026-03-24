import React from 'react';

const ProductCard = ({ product, isAdmin, onDelete, onEdit }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-name">{product.name}</div>
      <p style={{ color: '#666', fontSize: '13px', height: '35px' }}>{product.description}</p>
      <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
      
      {isAdmin && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          <button className="btn-primary" style={{ backgroundColor: '#ffc107', color: '#000', padding: '6px 12px' }} 
            onClick={() => onEdit(product)}>Edit</button>
          <button className="btn-delete" style={{ padding: '6px 12px' }} 
            onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;