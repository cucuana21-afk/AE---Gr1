import { useEffect, useState } from "react";
import {
  getTypeProductById,
  updateTypeProduct,
} from "../api/typeProduct.routes";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CreateEditTypeProductForm from "../components/CreateEditTypeProductForm";

export default function EditTypeProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [typeProduct, setTypeProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadType = async () => {
    try {
      const res = await getTypeProductById(id);

      if (!res.success) {
        toast.error(res.message || "Error loading type product");
        navigate("/type-products");
        return;
      }

      setTypeProduct(res.data);
    } catch (error) {
      toast.error("Server error while loading type");
      navigate("/type-products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadType();
  }, [id]);

  const handleSubmit = async (data) => {
    const res = await updateTypeProduct(id, data);

    if (res.success) {
      toast.success("Updated successfully!");
      navigate("/type-products");
    } else {
      toast.error(res.message || "Error updating type product");
    }
  };

  return (
    <CreateEditTypeProductForm
      typeProduct={typeProduct}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  );
}
