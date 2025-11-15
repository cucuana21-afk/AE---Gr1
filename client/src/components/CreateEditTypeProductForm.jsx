// client/src/components/CreateEditTypeProductForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSpinner from './LoadingSpinner';

export default function CreateEditTypeProductForm({
  typeProduct = null,
  onSubmit,
  isLoading = false,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (typeProduct) {
      setFormData({
        name: typeProduct.name || '',
      });
    }
  }, [typeProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (formData.name.length < 3) {
      toast.error("Name must have at least 3 characters");
      return false;
    }

    if (formData.name.length > 50) {
      toast.error("Name must be 50 characters or less");
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

  const handleCancel = () => {
    navigate('/typeProducts');
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          {typeProduct ? 'Edit Type Product' : 'Create New Type Product'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm border-gray-300 
                         focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Type product name"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitLoading}
              className="flex-1 flex justify-center rounded-md bg-indigo-600 px-3 py-2 
                         text-sm font-semibold text-white hover:bg-indigo-500 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLoading ? 'Saving...' : typeProduct ? 'Update Type Product' : 'Create Type Product'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 flex justify-center rounded-md border border-gray-300 bg-white 
                         px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
