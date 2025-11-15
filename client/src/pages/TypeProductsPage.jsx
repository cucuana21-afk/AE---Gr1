import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TypeProductsPage() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/typeProducts")
      .then((res) => setTypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Type Products</h1>

        <Link
          to="/typeProducts/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + Add Type
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b p-2">ID</th>
              <th className="border-b p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {types.map((t) => (
              <tr key={t.id}>
                <td className="border-b p-2">{t.id}</td>
                <td className="border-b p-2">{t.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
