import React, { useEffect, useState, useCallback } from 'react';
import productService from '../services/productService';
import authService from '../services/authService';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // 1. Load Products from Backend
  const loadProducts = useCallback(async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }, []);

  // 2. Check User Auth on Page Load
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadProducts();
    } else {
      window.location.href = "/login";
    }
  }, [loadProducts]);

  // 3. Admin: Delete Product Logic
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Remove this item?',
      text: "This action will delete the product permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4d4d',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productService.deleteProduct(id);
          Swal.fire('Deleted!', 'Product removed successfully.', 'success');
          loadProducts();
        } catch (error) {
          Swal.fire('Error', 'Unauthorized action!', 'error');
        }
      }
    });
  };

  // 4. Admin: Edit Product Logic
  const handleEdit = (product) => {
    Swal.fire({
      title: 'Edit Product Details',
      html:
        `<input id="e-name" class="swal2-input" placeholder="Name" value="${product.name}">` +
        `<input id="e-desc" class="swal2-input" placeholder="Description" value="${product.description}">` +
        `<input id="e-price" class="swal2-input" type="number" placeholder="Price" value="${product.price}">` +
        `<input id="e-img" class="swal2-input" placeholder="Image URL" value="${product.imageUrl}">`,
      confirmButtonColor: '#002e5b',
      showCancelButton: true,
      preConfirm: () => {
        return {
          name: document.getElementById('e-name').value,
          description: document.getElementById('e-desc').value,
          price: document.getElementById('e-price').value,
          imageUrl: document.getElementById('e-img').value
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productService.updateProduct(product.id, result.value);
          Swal.fire('Updated!', 'Product has been updated.', 'success');
          loadProducts();
        } catch (err) {
          Swal.fire('Error', 'Update failed!', 'error');
        }
      }
    });
  };

  // 5. Admin: Add New Product Logic
  const openAddProductModal = () => {
    Swal.fire({
      title: 'List New Product',
      html:
        '<input id="p-name" class="swal2-input" placeholder="Product Name">' +
        '<input id="p-desc" class="swal2-input" placeholder="Short Description">' +
        '<input id="p-price" class="swal2-input" type="number" placeholder="Price in ₹">' +
        '<input id="p-img" class="swal2-input" placeholder="Image URL">',
      confirmButtonColor: '#002e5b',
      showCancelButton: true,
      preConfirm: () => {
        return {
          name: document.getElementById('p-name').value,
          description: document.getElementById('p-desc').value,
          price: document.getElementById('p-price').value,
          imageUrl: document.getElementById('p-img').value
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productService.createProduct(result.value);
          Swal.fire('Success!', 'Product is now live.', 'success');
          loadProducts();
        } catch (err) {
          Swal.fire('Error', 'Failed to add product.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <Navbar user={currentUser} />
      
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#002e5b' }}>Exclusive Collection</h2>
          
          {/* RBAC: Only show Add button to ADMIN */}
          {currentUser?.role === 'ROLE_ADMIN' && (
            <button className="btn-primary" style={{ width: '200px' }} onClick={openAddProductModal}>
              + Add New Item
            </button>
          )}
        </div>

        {/* Product Grid Layout */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAdmin={currentUser?.role === 'ROLE_ADMIN'} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          ))}
        </div>
        

        {/* Empty State */}
        {products.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#666' }}>No products available in the store.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;