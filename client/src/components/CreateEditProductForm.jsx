// client/src/components/CreateEditProductForm.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSpinner from './LoadingSpinner';
import { fetchTypeProducts } from '../api/typeProduct.routes';

export default function CreateEditProductForm({
  product = null,
  onSubmit,
  isLoading = false
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    type_id: '',
  });

  const [typeProducts, setTypeProducts] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Load type products for dropdown
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const res = await fetchTypeProducts();
        if (res?.data) setTypeProducts(res.data);
      } catch (err) {
        console.error("Failed to load type products:", err);
        toast.error("Failed to load product types");
      }
    };
    loadTypes();
  }, []);

  // Pre-fill form for edit
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        stock: product.stock || '',
        type_id: product.type_id || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return false;
    }
    if (formData.name.length < 3 || formData.name.length > 255) {
      toast.error('Name must be between 3 and 255 characters');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      toast.error('Price must be 0 or greater');
      return false;
    }
    if (formData.stock === '' || parseInt(formData.stock) < 0) {
      toast.error('Stock cannot be negative');
      return false;
    }
    if (!formData.type_id) {
      toast.error('You must select a product type');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancel = () => navigate('/products');

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          {product ? 'Edit Product' : 'Create New Product'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm"
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price *</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm"
              placeholder="0.00"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock *</label>
            <input
              type="number"
              name="stock"
              required
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm"
              placeholder="0"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-40 w-40 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/160?text=Invalid+Image';
                  }}
                />
              </div>
            )}
          </div>

          {/* TypeProduct Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type *</label>
            <select
              name="type_id"
              required
              value={formData.type_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm"
            >
              <option value="">Select type...</option>
              {typeProducts.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitLoading}
              className="flex-1 bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 disabled:opacity-50"
            >
              {submitLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 border border-gray-300 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
